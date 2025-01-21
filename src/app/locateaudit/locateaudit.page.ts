import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit ,ViewChild, ElementRef} from '@angular/core';
import { IonSelect, ToastController,Platform,NavController ,NavParams,ModalController} from '@ionic/angular';
import { StatusBar } from '@capacitor/status-bar';
import { Router,NavigationExtras,ActivatedRoute } from '@angular/router'
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';
import { FilePath } from '@awesome-cordova-plugins/file-path/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { SQLitePorter } from '@awesome-cordova-plugins/sqlite-porter/ngx';
import * as L from 'leaflet';
import * as turf from '@turf/turf';


declare var google: any; 


interface Area {
  value: number,
  transformedValue: number,
  unit: Unit
}

interface Unit {
  name: string,
  label: string,
  default?: boolean,
  transform: (value: number) => string
}

const apiKey = 'AIzaSyDHjAlpV-0-nuzMQ5qj131vdcNlcSsG_k4';   // Used to remove the selected marker position;


@Component({
  selector: 'app-locateaudit',
  templateUrl: './locateaudit.page.html',
  styleUrls: ['./locateaudit.page.scss'],
})
export class LocateauditPage implements OnInit {

    units: Unit[] = [
    {
      name: 'meter sq',
      label: 'meter<sup>2</sup>',
      default: true,
      transform: (value) => value.toFixed(2)
    },
    {
      name: 'kilometer sq',
      label: 'kilometer<sup>2</sup>',
      transform: (value) => (value / 1e6).toFixed(6)
    },
    {
      name: 'foot sq',
      label: 'foot<sup>2</sup>',
      transform: (value) => (value * 10.7639).toFixed(2)
    },
    {
      name: 'yard sq',
      label: 'yard<sup>2</sup>',
      transform: (value) => (value * 1.19599).toFixed(2)
    },
    {
      name: 'acre',
      label: 'acre',
      transform: (value) => (value / 4046.86).toFixed(6)
    },
    {
      name: 'hectare',
      label: 'hectare',
      transform: (value) => (value / 10000).toFixed(6)
    }
  ];


  isLoading: boolean = false;
  markers: any[] = [];
  polygons: any[] = [];
  currentPolygon :any;
  offlinePolygon: L.Polygon | undefined;
  map: any;
  mp:any;


  mapboxurl = 'https://api.mapbox.com/styles/v1/mapbox/streets-v11/static';
  TILE_URL = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'; 
  ZOOM_LEVELS = [10, 12, 14]; 
  TILE_SIZE = 256; 
  offmap: L.Map | undefined;
  private drawnItems!: L.FeatureGroup;
  private markerCoordinates: L.LatLng[] = [];

  boundsSW: number[] = []; 
  boundsNE: number[] = [];

  curLat:any;
  curLng:any;

  imageWidth = 1280;
  imageHeight = 720;
  Download:boolean = false;
  //markers: { id: string, latLng: LatLng }[] = []
  //polygons: CustomPolygon[] = []

  @ViewChild('map') mapRef!: ElementRef<HTMLElement>;
  @ViewChild('mapTypes') selectPop!: IonSelect;

  dbInstance!: SQLiteObject; 
  imageDetails:any;
  area: Area | undefined = undefined;
  mapArea:any;
  selectedUnit: Unit = this.units.find(unit => unit.default) || this.units[0];

  //selectedUnit: Unit = this.units.map(unit => { if (unit.default) return unit })[0];

  constructor( 
            public modalCtrl:ModalController,
            public cdr:ChangeDetectorRef,
            public file:File,
            public filePath:FilePath,
    ) { }

  ngOnInit() {  }


  ionViewDidEnter() {
      this.getCurrentLocation().then((data:any) => {

        this.isLoading = false;

        this.curLat = data.lat;
        this.curLng = data.lng;

        const bounds = this.calculateBoundingBox(this.curLat, this.curLng, 1);


        this.boundsSW = bounds.southwest; 
        this.boundsNE = bounds.northeast;

        this.showMap(data.lat, data.lng);

      }).catch((e) => {

        this.isLoading = false;     

        const bounds = this.calculateBoundingBox(this.curLat, this.curLng, 1);

        this.boundsSW = bounds.southwest; 
        this.boundsNE = bounds.northeast;

        console.error('getCurrentLocation error', e);
         this.showMap(this.curLat, this.curLng);

      })
  }

  async showMap(lat: number, lng: number) {


    this.isLoading = true;

    const location = { lat: lat, lng: lng }; // Define the location object

    const options = {
      center: location,
      zoom: 18,
      disableDefaultUI: true // Keeps the map UI minimal
    };

      this.isLoading = false;

      if (navigator.onLine) {
        this.map = new google.maps.Map(this.mapRef.nativeElement, options);
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position:any) => {
            this.map.setCenter({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          });
        }

         // Map click listener
        this.map.addListener('click', async (e:any) => {
          const coordinateObj = { lat: e.latLng.lat(), lng: e.latLng.lng() };
          await this.addMarker(coordinateObj);
          this.drawPoly(this.getMarkerCoordinates());
        });
      }
      else {

        this.loadDownload(location);
      }

    
  }

  async addMarker(latLng: { lat: number; lng: number }) {
    const marker = new google.maps.Marker({
      position: latLng,
      map: this.map,
      draggable: true,
      icon: {
        url: 'assets/icon/pin.png',
        scaledSize: new google.maps.Size(30, 30),
        anchor: new google.maps.Point(15, 28),
      },
    });

     marker.addListener('dragend', (e:any) => {
    const index = this.markers.findIndex((m:any) => m.id === marker);
    if (index !== -1) {
      this.markers[index].latLng = { lat: e.latLng.lat(), lng: e.latLng.lng() };
      this.drawPoly(this.getMarkerCoordinates());
    }
  });

    this.markers.push({
      id: marker,
      latLng: latLng,
    });
  }

  async loadDownload(location: { lat: number, lng: number }) {



 
 // //this.mp = this.map
 //  let latti = location.lat;
 //  let long = location.lng;
 //  let zoom = 18;
 //  let centerPixel = { x: 0, y: 0  };
 //      if(latti && long){
 //        centerPixel = this.boundlatLngToPixel(L.latLng(latti, long));
 //      }
 //      else{

 //      }

 //        const online = navigator.onLine;

 //         const regex = /.*\[(.*?)\]\_\[(.*?)\]\.png$/;
 //        const match = this.imageDetails['imagename'].match(regex);

 //        if (match && match.length === 3) {
 //          const boundsSWString = match[1];
 //          const boundsNEString = match[2];

 //          // Parse the coordinates into arrays of numbers
 //          this.boundsSW = boundsSWString.split(',').map(Number) as [number, number];
 //          this.boundsNE = boundsNEString.split(',').map(Number) as [number, number];

 //          console.log('boundsSW:', this.boundsSW);
 //          console.log('boundsNE:', this.boundsNE);
 //        } else {
 //          console.error('Filename does not match the expected format');
 //        }

 //       // const mapboxUrl = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/[${this.boundsSW[1]},${this.boundsSW[0]},${this.boundsNE[1]},${this.boundsNE[0]}]/1280x720?access_token=pk.eyJ1IjoicGdva3VscHB0IiwiYSI6ImNtMGkwam9pMzA3MTkya3M4cDRmdWV3ZHAifQ.Jw18c6Ve5T0arTMngKMUeg`;
 //        const bottompixels = this.boundlatLngToPixel(L.latLng(this.boundsSW[0], this.boundsSW[1]));
 //        const toppixels = this.boundlatLngToPixel(L.latLng(this.boundsNE[0], this.boundsNE[1]));
 //        const imageBounds = [bottompixels, toppixels];

 //        this.map = L.map(this.mapRef.nativeElement, {
 //            crs: L.CRS.Simple,
 //            minZoom: 0,
 //            maxZoom: 1,
 //            maxBounds: imageBounds,
 //            maxBoundsViscosity: 1.0
 //        }).setView([centerPixel.y, centerPixel.x], 18);

 //        const imagePath = this.file.externalRootDirectory +'Download/'+this.imageDetails['imagename'];

 //        this.filePath.resolveNativePath(imagePath)
 //          .then((resolvedPath) => {
 //            console.log('Resolved native path:', resolvedPath);
 //            this.readFile(resolvedPath);
 //          })
 //          .catch((error) => {
 //            console.error('Error resolving native path:', error);
 //          });
 //        try {

 //           this.file.readAsArrayBuffer(this.file.externalRootDirectory  + 'Download/', this.imageDetails['imagename'])
 //                .then((arrayBuffer:any) => {
 //                  let base64Image = this.arrayBufferToBase64(arrayBuffer);
 //                  console.log('Base64 Image:', base64Image);
 //                  // Use the base64 string as needed
 //                })
 //                .catch((error:any) => {
 //                  console.error('Error reading image file:', error);
 //                });

             

 //          // this.file.resolveLocalFilesystemUrl(this.file.externalRootDirectory  + 'Download/' + this.imageDetails['imagename'])
 //          //   .then(fileEntry => {
 //          //     return this.file.readAsDataURL(this.file.externalRootDirectory  + 'Download/', this.imageDetails['imagename']);
 //          //   })
 //          //   .then(base64Image => {
 //          //     L.imageOverlay(base64Image, [[0, 0], [this.imageHeight, this.imageWidth]]).addTo(this.map);
 //          //     this.map.fitBounds([[0, 0], [this.imageHeight, this.imageWidth]]);
 //          //     console.log('Image successfully loaded and displayed.');
 //          //   })
 //          //   .catch(error => {
 //          //     console.error('Error loading image:', error);
 //          //   });
 //        } catch (error) {
 //          console.error('Error loading image:', error);
 //        }

 //        //L.imageOverlay(imagePath, [[0, 0], [this.imageHeight, this.imageWidth]]).addTo(this.map);


 //          this.map.on('click',async (e:any) => {
           
 //              const pixelCoords = e.latlng;     
 //              console.log('Clicked pixel coordinates:', pixelCoords);   
 //              await this.addDraggableMarker(pixelCoords);
 //              this.drawstatPoly(this.getMarkerCoordinates());
 //          });

 //          this.Download = true;
     
  }

  boundlatLngToPixel(latLng: L.LatLng): L.Point {
    // Extract latitude and longitude
    const { lat, lng } = latLng;

    // Calculate the relative position within the bounds
    const latRatio = (lat - this.boundsSW[0]) / (this.boundsNE[0] - this.boundsSW[0]);
    const lngRatio = (lng - this.boundsSW[1]) / (this.boundsNE[1] - this.boundsSW[1]);

    // Calculate pixel coordinates
    const x = lngRatio * this.imageWidth;
    const y = (1 - latRatio) * this.imageHeight; // Invert Y-axis to match image coordinates

    return new L.Point(x, y);
  }

  async drawPoly(pathCords: { lat: number; lng: number }[]) {
    try {
     
      this.polygons.forEach((polygon) => polygon.setMap(null));
      this.polygons = [];

      const polygon = new google.maps.Polygon({
        paths: pathCords,
        strokeColor: '#000000',
        strokeOpacity: 1.0,
        strokeWeight: 2,
        fillColor: '#000000',
        fillOpacity: 0.2,
      });

      polygon.setMap(this.map);
      this.polygons.push(polygon);

      this.calculateArea();
    } catch (e) {
      console.log(e);
    }
  }


  async locateMe() {
      try {
        const result = await this.getCurrentLocation();
        this.map.setCenter(result);
        this.map.setZoom(18);
      } catch (err) {
        alert(JSON.stringify(err));
      }
  }


  async getCurrentLocation(): Promise<{ lat: number; lng: number }> {
      return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              resolve({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              });
            },
            (err) => reject(err)
          );
        } else {
          reject('Geolocation not supported');
        }
      });
  }


  calculateBoundingBox(lat: number, lng: number, distance_km: number) {
    const R = 6378.1; // Earth's radius in kilometers
    const lat_rad = lat * Math.PI / 180;
    const lng_rad = lng * Math.PI / 180;
    const d = distance_km / R;

    const min_lat = lat_rad - d;
    const max_lat = lat_rad + d;
    const min_lng = lng_rad - d / Math.cos(lat_rad);
    const max_lng = lng_rad + d / Math.cos(lat_rad);

    return {
        southwest: [min_lat * 180 / Math.PI, min_lng * 180 / Math.PI],
        northeast: [max_lat * 180 / Math.PI, max_lng * 180 / Math.PI]
    };
  }


  async calculateArea() {
  for (const polygon of this.polygons) {
    const path = polygon.getPath(); 
    if (path && path.getLength() > 0) {
      const pathArray = path.getArray().map((latLng:any) => ({ lat: latLng.lat(), lng: latLng.lng() }));

      const result = pathArray.map((coord:any) => `lat: ${coord.lat}, lng: ${coord.lng};`).join(' ');
      this.mapArea = result;
      console.log(result);

      const area = google.maps.geometry.spherical.computeArea(path);
    
      this.area = {
        value: area,
        transformedValue: Number(this.selectedUnit.transform(area)),
        unit: this.selectedUnit
      };

      this.cdr.detectChanges();
    } else {
      console.log('Polygon does not have valid paths');
    }
  }
  }

  getMarkerCoordinates(): { lat: number; lng: number }[] {
    return this.markers.map(marker => ({
        lat: marker.latLng.lat,
        lng: marker.latLng.lng
    }));
  }


  onUnitChange(event: any) {

      this.selectedUnit = event.detail.value;

      if (this.area) {
        this.area.transformedValue = Number(this.selectedUnit.transform(this.area.value));
        this.area.unit = this.selectedUnit;
      }

  }

  changeMapStyle() {
    const mapType = this.selectPop.value.toLowerCase();

    switch (mapType) {
      case "terrain":
        this.map.setMapTypeId(google.maps.MapTypeId.TERRAIN);
        break;

      case "satellite":
        this.map.setMapTypeId(google.maps.MapTypeId.SATELLITE);
        break;

      case "hybrid":
        this.map.setMapTypeId(google.maps.MapTypeId.HYBRID);
        break;

      case "normal":
      case "roadmap":
        this.map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
        break;

      default:
        console.log("Invalid map type");
        break;
    }
  }

  openMapTypeSelecter() {
      this.selectPop.open();
  }

  onClearMarkersClicked() {

      if (confirm('Remove selected area?')) {
        this.clearMarkersAndPolygons()
      }

  }

  async clearMarkersAndPolygons() {
    try {

      if(this.Download){
         if (this.markers.length > 0) {
          this.markers.forEach(markerObj => this.map.removeLayer(markerObj.id));
          this.markers = [];
        }
       
        if (this.currentPolygon) {
          this.map.removeLayer(this.currentPolygon);
          this.currentPolygon = undefined;
        }
       
        this.area = undefined;
      }
      else{

         if (this.markers.length > 0) {
          this.markers.forEach(marker => marker.id.setMap(null));
          this.markers = [];
        }

       
        if (this.polygons.length > 0) {
          this.polygons.forEach(polygon => polygon.setMap(null));
          this.polygons = [];
          this.area = undefined;
        }
      }

    }catch (error) {
      console.error('Error clearing markers and polygons:', error);
    }
  }


  closeModal(){
      this.modalCtrl.dismiss();  
  }
   
  save(){

       this.imageDetails['preset_value']['areapoint']=this.area!.transformedValue;
       this.imageDetails['preset_value']['maparea'] = this.mapArea;
       this.modalCtrl.dismiss(this.imageDetails['preset_value']);
      //this.navCtrl.navigateBack('/area')
  }

  ngOnDestroy() {
    
    this.clearMarkersAndPolygons();

    
    if (this.map) {
      google.maps.event.clearInstanceListeners(this.map);
    }

   
    this.map = null;
  }


}
