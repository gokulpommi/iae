import { Component, OnInit,Injector,OnDestroy } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { NavController, NavParams,Platform,AlertController} from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { PopoverController,ToastController,MenuController,ModalController  } from '@ionic/angular';
import { Router,NavigationExtras , ActivatedRoute } from '@angular/router';
import { BackgroundGeolocationError, BackgroundGeolocationPlugin, ConfigureOptions, Location } from "cordova-background-geolocation-plugin";
import { ForegroundService, StartForegroundServiceOptions } from '@capawesome-team/capacitor-android-foreground-service';
import { AttandanceTxnPage } from './../attandance-txn/attandance-txn.page';

import { Subscription } from 'rxjs';

import { PopoverPage } from './../popover/popover.page';


import { TxService } from './../services/tx.service';
import { CmService } from './../services/cm.service';
import { SingletonService } from './../services/singleton.service';
import { PagenavService } from './../services/pagenav.service';


declare var BackgroundGeolocation: BackgroundGeolocationPlugin;


@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  private tracking: boolean = false;

   grid         : any;
  param         : any;
  pagenav       : any;
  subgrid       : any;
  alert         : any;  
  modalPortal   : any;
  roleJson      : any;
  public alertShown  : boolean = false;
  public mainMenu    : boolean = true;
  subscription: Subscription = new Subscription(); 
  modal: HTMLIonModalElement | null = null;

  constructor(
              private storage           : Storage,
              private router            : Router,
              public  alertCtrl         : AlertController,
              public  modalController   : ModalController,             
              public  platform          : Platform,
              private alertController   : AlertController,
              public  toastCtrl         : ToastController,
              public  popoverController : PopoverController,
              public  navParams         : NavParams,              
              private http              : HttpClient,
              public  singleton         : SingletonService,
              public  mytxservice       : TxService,
              public  cmservice         : CmService,
              private injector          : Injector,
              public  activateRoute     : ActivatedRoute,
              private navCtrl           : NavController
    ) {

    this.pagenav = this.injector.get(PagenavService);

     this.activateRoute.queryParams.subscribe(_p => {
      const navParams = this.router.getCurrentNavigation()?.extras.state;

    });
    this.param = this.router.getCurrentNavigation()?.extras.state;
    console.log(this.param);

    if(this.param){
          this.singleton.dynamicresturl = this.param['SERVICEURL'];
          this.singleton.PID            = this.param['PROJECTID'];
          this.singleton.userid         = this.param['USERID'];
          this.singleton.role           = this.param['ROLE'];
    }

  
    
    this.initializerole();
    this.initializeApp();
  }


  async initializerole(){

    if(this.param == undefined || this.param == null){

       this.param                    = await this.storage.get('userObj');
       this.singleton.dynamicresturl = this.param['SERVICEURL'];
       this.singleton.PID            = this.param['PROJECTID'];
       this.singleton.userid         = this.param['USERID'];
       this.singleton.role           = this.param['ROLE'];
     }
    
    let role="default";
    if(this.singleton.role == '' || this.singleton.role != undefined){
      role = this.singleton.role;     
    } 
  
    
    this.http.get('assets/menu/'+role+'.json').subscribe((data:any) => {
      // console.log(data);

      let menu_json = JSON.parse(JSON.stringify(data || null ));
      this.roleJson = menu_json;
      let sort_component = menu_json['menus'].sort(function(a:any, b:any) {
        return a.do - b.do;
      });
      this.grid = sort_component;
     
   });

  }
   

 initializeApp(){  }


 async openPage(page:any) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario 
  const page_filter = this.pagenav['pages'].filter((item:any) => {
        console.log(item);
        return (item['id'] == page);        
      }); 
   let navigationExtras: NavigationExtras = {
      queryParams: {
        userdetails: this.param,
        fromWhere:'menu'
      }
    }; 


    if(page_filter[0]['id'] == "attandance-txn"){

                 let componentpage;
                      for (let i=0;i<this.pagenav.pages.length;i++){
                        if(this.pagenav.pages[i]['id'] == page){
                            componentpage = this.pagenav.pages[i]['component'];        
                        }        
                    }

                  const modal =await this.modalController.create({
                        component:componentpage,
                        cssClass: 'feedback-modal',
                        componentProps:{ 'userdetails':this.param,'modalTransactions':true, myData: encodeURIComponent(JSON.stringify(this.param))}
                  });
                await modal.present();
                this.mytxservice.setModal(modal);
                  modal.onDidDismiss().then((result:any) => {

                 console.log(result);
                 if (this.modal) {
                    this.modal.dismiss();
                  }
               });
                                   
                  

    }
    else{
      this.navCtrl.navigateForward('/' + page_filter[0]['id'], { state: this.param });
    }

    // this.navCtrl.navigateForward('/'+page_filter[0]['id'],{state:this.param});
  }

      async logout(){
      const alert = await this.alertCtrl.create({
      header: 'Confirm!',
      message: 'Do you want to Logout?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Yes',
          handler: async () => {
            console.log('Confirm Okay');
             this.storage.remove('loginStatus');
             this.storage.remove('userObj');
             this.storage.remove('reportParams');
            
             this.navCtrl.navigateForward('/login');

              let toast = await this.toastCtrl.create({
                     message: 'User Logged Out Successfully',
                     duration: 3000,
                     position: 'bottom'
                   }); 

                   toast.present();   
                   
           
          }
        }
      ]
    });

    await alert.present();
  }

  async presentPopover(myEvent:any) {
    console.log(myEvent);
     const popover = await this.popoverController.create({
      component: PopoverPage,
      componentProps: {userDetails:this.param,pagenav:this.pagenav,fromsearch:false,roleJson:this.roleJson},
      event: myEvent,
      translucent: true
    });
    await popover.present();
   
  }

  

  closeModal(){
      this.modalController.dismiss({
      'dismissed': true
    });
  }


// async  startTracking() {
//     //if (this.tracking) return; // Prevent multiple starts

//          const locationTracking = () => {

//       document.addEventListener('deviceready', function () {

//         let config: ConfigureOptions = {
//           locationProvider: BackgroundGeolocation.ACTIVITY_PROVIDER,
//           desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
//           stationaryRadius: 50,
//           distanceFilter: 50,
//           notificationTitle: 'Background tracking',
//           notificationText: 'Enabled',
//           notificationsEnabled: true,
//           debug: true,
//           stopOnTerminate: false,
//           startForeground: true,
//           saveBatteryOnBackground: false,
//           startOnBoot: true,
//           interval: 10000,
//           fastestInterval: 5000,
//           activitiesInterval: 10000,
//           url: 'http://192.168.125.232:5000/post-data',
//           syncUrl: 'http://192.168.125.232:5000/post-data'
//         };

//         BackgroundGeolocation.configure(config, function () {

//           console.log('BackgroundGeolocation configuration success!!!👍');

//           BackgroundGeolocation.start().then(() => { console.log('BackgroundGeoLocation started...!!!') });

//         }, function () {
//           console.log('BackgroundGeolocation configuration failed!!!😭')
//         });

//       }, false);

//       BackgroundGeolocation.on('location', function (location: any) {
//         console.log('[INFO] Location: ', location);
//         let count = Number(localStorage.getItem('bg_location_result'));
//         count += 1;
//         localStorage.setItem('bg_location_result', (count).toString());
//       });

//       BackgroundGeolocation.on('foreground', function () {
//         console.log('App enterd foreground 🤺')
//       });

//       BackgroundGeolocation.on("background", function () {
//         console.log('App enterd background 🤺')
//       })

//       BackgroundGeolocation.on('start', function () {
//         console.log('BackgroundGeolocation Started!!! 💪')
//       })

//       BackgroundGeolocation.on('stop', function () {
//         console.log('BackgroundGeolocation Stopped!!! 😭')
//       })

//       // Shit Started

//       // BackgroundGeolocation.deleteAllLocations(() => {
//       //   localStorage.setItem('bg_location_result', (0).toString());
//       //   console.log('Deleted!!!')
//       // });

//       BackgroundGeolocation.checkStatus((result: any) => {
//         console.log('Service Status', result)
//       })

//       BackgroundGeolocation.getLocations((locations: Location[]) => {

//         console.log('Stored locations', locations)

//       }, (error: BackgroundGeolocationError) => {

//       })

//       // Shit Ended

//     }

//     locationTracking();

//     return;

//     if ((await ForegroundService.checkManageOverlayPermission()).granted) {

//       console.log('Permission result', true)

//       // locationTracking()

//       // await ForegroundService.moveToForeground();

//       const options: StartForegroundServiceOptions = {
//         body: 'Tracking location in background',
//         id: 1,
//         smallIcon: '',
//         title: 'App is tracking your location'
//       }

//       // ForegroundService.stopForegroundService();

//       if ((await ForegroundService.checkPermissions()).display != 'granted')
//         ForegroundService.requestPermissions()

//       ForegroundService.startForegroundService(options).then(() => {

//         ForegroundService.moveToForeground().then(() => {

//           console.log('Foreground task started');

//           locationTracking();

//           setInterval(() => {

//             let count = Number(localStorage.getItem('count')) || 0;

//             count += 1;

//             localStorage.setItem('count', count.toString());

//           }, 2000);

//         })

//       })

//     } else {

//       console.log('Permission result', false)

//       ForegroundService.requestManageOverlayPermission().then(result => {

//         if (result.granted) {

//           // locationTracking()

//         }

//       })

//     }
//   }

//   async stopTracking() {
//    //if (!this.tracking) return;
//   BackgroundGeolocation.stop().then(() => {
//     console.log('BackgroundGeolocation stopped!!!');
//   });

 
//   BackgroundGeolocation.getLocations(async(locations: Location[]) => {
//     console.log('Saving locations to database:', locations);
//     this.tracking = false;
//     await this.saveLocationsToDatabase(locations);
//   }, (error: BackgroundGeolocationError) => {
//     console.error('Error getting locations:', error);
//   });
// }

// async saveLocationsToDatabase(locations:any){
//   console.log(locations);
//    let transformedLocations = [];
//     transformedLocations = locations.map((location:any) => {
//       return {
//         latitude: location.latitude,
//         longitude: location.longitude,
//         id: location.id,
//         time: location.time,
//         accuracy: location.accuracy
//       };
//     });

//     console.log(transformedLocations);
//   this.cmservice.saveTracking(transformedLocations).subscribe((data:any)=>{
//     console.log(data);
//   })
// }


  ngOnInit() {  }



}
