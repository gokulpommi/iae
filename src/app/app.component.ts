import { Component, ViewChild, Injector } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Platform, NavController, AlertController, ModalController, ToastController, NavParams } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
//import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar, Style } from '@capacitor/status-bar';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { App } from '@capacitor/app';

import { SingletonService } from './services/singleton.service';
import { EventsService } from './services/events.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  rootPage:any ;   
  //pages: Array<{title: string,cls: string, component: any}>;
  grid : any;
  param : any;
  pagenav:any;
  subgrid:any;
  public alertShown:boolean = false;
  public mainMenu:boolean = true;
  modalPortal:any;
  roleJson:any;
  page: any;

  constructor(
  private storage: Storage,
  public singleton: SingletonService,
  public events: EventsService,
  public platform: Platform,
  private http: HttpClient,
  public location: Location,
  public navCtrl: NavController,
  public alertCtrl: AlertController,
) {



  this.storage.create(); 
  this.initializeApp(); 
}

async initializeApp() {
  await this.platform.ready();  
  console.log('Platform ready');

 
  StatusBar.setOverlaysWebView({ overlay: false });
  StatusBar.setBackgroundColor({ color: '#007f70' });

  // Check login status from storage and navigate accordingly
  const loggedIn = await this.storage.get('loginStatus');
  if (loggedIn === true) {
    this.navCtrl.navigateForward('/menu');
  } else {
    this.navCtrl.navigateForward('/login');
  }

 
  this.platform.backButton.subscribeWithPriority(10, () => {
    console.log('Back press handler!');
    if (this.location.isCurrentPathEqualTo('/menu')) {
      console.log('Show Exit Alert!');
      this.logout();
    } else if (this.location.isCurrentPathEqualTo('/login')) {
      console.log('Show Exit Alert!');
      this.showAlert();
    } else {
      console.log('Navigate to back page');
      this.location.back();
    }
  });

 
  await this.sideMenu();
}

async sideMenu() {
  let role = this.singleton.role;
  console.log('User role:', role);

  if (role) {
   
    this.loadMenu(role);
  } else {
    // If role is not available, listen for role from the events service
    this.events.getObservable().subscribe(async (data: any) => {
      console.log('Data received:', data);
      const userRole = data['userdetails'].ROLE;
      await this.loadMenu(userRole);
    });
  }
}

async loadMenu(role: string) {
  
  this.http.get(`assets/menu/${role}.json`).subscribe((data: any) => {
    console.log('Menu data:', data);

    let menu_json = JSON.parse(JSON.stringify(data || null));
    this.roleJson = menu_json;

    // Sort the menu components
    let sortedMenu = menu_json[0]['menus'].sort((a: any, b: any) => a.do - b.do);
    this.page = sortedMenu;
  });
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
          handler: () => {
            console.log('Confirm Okay');
             this.storage.remove('loginStatus');
             this.storage.remove('userObj');
             const page_filter = this.pagenav['pages'].filter( (item:any) => {
              return (item['id'] == 'login');
            }); 
              this.navCtrl.navigateForward(page_filter[0]['id']);
           
          }
        }
      ]
    });

    await alert.present();
 }

  async showAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Confirm!',
      message: 'Do you want to exit the app?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Yes',
          handler: () => {
            console.log('Confirm Okay');
            App.exitApp();
          }
        }
      ]
    });

    await alert.present();
  }


}
