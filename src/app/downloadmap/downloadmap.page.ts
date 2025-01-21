import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit ,ViewChild, ElementRef} from '@angular/core';
import { IonSelect, ToastController,Platform,NavController ,NavParams,ModalController,LoadingController} from '@ionic/angular';
import { StatusBar } from '@capacitor/status-bar';
import { Router,NavigationExtras,ActivatedRoute } from '@angular/router'
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';
import { FilePath } from '@awesome-cordova-plugins/file-path/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { SQLitePorter } from '@awesome-cordova-plugins/sqlite-porter/ngx';
import { HttpClient,HttpHeaders } from '@angular/common/http';
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
  selector: 'app-downloadmap',
  templateUrl: './downloadmap.page.html',
  styleUrls: ['./downloadmap.page.scss'],
})
export class DownloadmapPage implements OnInit {

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
  map: any;
  isLoading: boolean = false;
  mapName:any;
  private dbInstance!: SQLiteObject;

  @ViewChild('map') mapRef!: ElementRef<HTMLElement>; 
  @ViewChild('searchInput', { static: false }) searchInput!: ElementRef;

  constructor( 
     private geolocation: Geolocation,
     public toastController: ToastController,
     public loadCtrl: LoadingController,
     public http:HttpClient,
     public platform:Platform,
     private sqlite:SQLite,
     private sqlitePorter:SQLitePorter,
     public file:File, 
     private cdr: ChangeDetectorRef
    ) { 

    this.isLoading = true;

    this.getCurrentLocation().then((data) => {

      this.isLoading = false;

      this.showMap(data.lat, data.lng);

    }).catch((e) => {
        this.showMap(12.971,77.594);
     });
  }

  ngOnInit() {  }


  async showMap(lat: number, lng: number) {

    this.isLoading = true;

    const location = { lat: lat, lng: lng }; // Define the location object

    const options = {
      center: location,
      zoom: 18,
      disableDefaultUI: true // Keeps the map UI minimal
    };

      this.isLoading = false;

        this.map = new google.maps.Map(this.mapRef.nativeElement, options);
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            this.map.setCenter({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          });      
      }

      this.initializePlaceSearch();

  }

  initializePlaceSearch() {
    const searchBox = new google.maps.places.SearchBox(this.searchInput.nativeElement);

    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(this.searchInput.nativeElement);

    searchBox.addListener('places_changed', () => {
      const places = searchBox.getPlaces();

      if (places?.length === 0) {
        return;
      }

      const place = places[0];
      if (!place.geometry || !place.geometry.location) {
        return;
      }

      this.curLat = place.geometry.location.lat();
      this.curLng = place.geometry.location.lng();

       const bounds = this.calculateBoundingBox(this.curLat, this.curLng, 1);


      this.boundsSW = bounds.southwest; 
      this.boundsNE = bounds.northeast;


      console.log('Place Latitude:',  this.curLat);
      console.log('Place Longitude:', this.curLng);

      this.map.setCenter(place.geometry.location);
      new google.maps.Marker({
        map: this.map,
        position: place.geometry.location,
      });


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

  async downloadMap() {

  if(this.mapName){

    if( this.boundsSW.length>0 && this.boundsNE.length>0){

      const loading = await this.loadCtrl.create({
        message: "Downloading",
         
      });
      loading.present();

      const mapboxUrl = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/[${this.boundsSW[1]},${this.boundsSW[0]},${this.boundsNE[1]},${this.boundsNE[0]}]/1280x720?access_token=pk.eyJ1IjoiYmFzYXZhcmFqM24iLCJhIjoiY20xb3hvZGx4MWF2YzJqcXhqc3c5Nnc4YyJ9.4O_AwlpATkv--bzPnA_vOA`;

       try {
        const blob = await this.http.get(mapboxUrl, { responseType: 'blob' }).toPromise();

          await this.platform.ready();

            const folderPath = 'Download';
            //const fileName = this.mapName+'.png';            

            const boundsSWString = JSON.stringify(this.boundsSW);
            const boundsNEString = JSON.stringify(this.boundsNE);

            const fileName = this.mapName+'_'+boundsSWString+'_'+boundsNEString+'.png'; 
             const filePath = `${folderPath}/${fileName}`;

          const folderExists = await this.checkFolderExists(folderPath);

          let path;
            if(this.platform.is('android')){
               path = this.file.externalRootDirectory ; //+'Download/';
            }
            else {
                path = this.file.documentsDirectory; 
            }
        
          if (!folderExists) {
            await this.file.createDir(this.file.externalRootDirectory, folderPath, false);
          }

          if (blob) {
             await this.file.writeFile(this.file.externalRootDirectory + '/' + folderPath, fileName, blob, { replace: true });
             console.log('Tile saved:', filePath);
             await loading.dismiss();
             this.toast('Map saved successfully!');
          } else {
            console.log("Blob is undefined, unable to write file.");
          }
       // await this.file.writeFile(this.file.externalRootDirectory + '/' + folderPath, fileName, blob, { replace: true });
       
        

         try {
            const boundsSWString = JSON.stringify(this.boundsSW);
            const boundsNEString = JSON.stringify(this.boundsNE);
            const query = `INSERT INTO maps_data (boundsSW, boundsNE, filename) VALUES (?, ?, ?)`;
            const values = [boundsSWString, boundsNEString, this.mapName];
            
            const result = await this.dbInstance.executeSql(query, values);
            console.log('Data saved successfully', result);
          
            if (result.rowsAffected > 0) {
              console.log('Inserted ID:', result.insertId);
            } else {
              console.error('No data was inserted.');
            }
          } catch (error) {
            console.error('Error saving data:', error);
          }

      } catch (error) {
        console.error('Error downloading tile:', error);
         await loading.dismiss();
        this.toast('Map save failed!');
      }
    }
    else{
      this.toast('Search which place you want download..');
    }
  }
  else{
       this.toast('Enter Map Name');
  }
    
  }


  async toast(message:any){
      const toast = await this.toastController.create({
        message: message,
        duration: 2000
        
      });
      toast.present();
  }


  async checkFolderExists(folderPath: string): Promise<boolean> {
    try {
      await this.file.checkDir(this.file.externalRootDirectory , folderPath);
      return true;
    } catch {
      return false;
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

}
