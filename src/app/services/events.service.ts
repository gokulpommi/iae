import { Injectable } from '@angular/core';
import { Subject, Observable, Subscription,BehaviorSubject  } from 'rxjs';
import { LoadingController,ModalController,AlertController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private userDetails=new Subject<any>();
  // private User=new BehaviorSubject<any>();
  private loadingPresent:any;
  

 constructor(public loadingController:LoadingController,public modalController:ModalController,public alertCtrl:AlertController) { }

  publish(data:any){
    this.userDetails.next(data);
  }

  getObservable():Subject<any>{
    return this.userDetails;
  }




 async Loading() {
    this.loadingPresent = true;
    const loading = await this.loadingController.create({
      message: ' Please Wait...',
    });
    return await loading.present();
  }

  async loadDismiss() {
    if (this.loadingPresent) {
      await this.loadingController.dismiss();
    }
    this.loadingPresent = false;
  }


   dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  async txAlert(){
     let alert =await this.alertCtrl.create({
        header: 'Alert',
        subHeader: 'value',
        buttons: ['Okay']
        });
        await alert.present();
  }

   async txLoading() {
    this.loadingPresent = true;
    const loading = await this.loadingController.create({
      spinner: 'bubbles',
      message: 'Saving! Please Wait...',
    });
    return await loading.present();
  }

  async txloadDismiss() {
    if (this.loadingPresent) {
      await this.loadingController.dismiss();
    }
    this.loadingPresent = false;
  }

  async txsyncAlert(){
    let alert = this.alertCtrl.create({
        header: 'Sync Alert',
        subHeader: "Successfully synced with your google calendar.",
         buttons: ['Dismiss']
  });
  }

  async txbuttonclikLoad(){

    this.loadingPresent = true;
    const loading = await this.loadingController.create({
      spinner: null,
      message: 'Please Wait...',
    });
    return await loading.present();

  }

  async txButtonalert(){
    let alert =await this.alertCtrl.create({
      header: 'Information',
      subHeader: 'Please Contact System Admin(OR)Login after Sometime.',
      buttons: ['OK']
  });
  await alert.present();
  }

  async txButtonError(){
    let alert =await this.alertCtrl.create({
      header: 'Information',
      subHeader: 'Network Connection Error.Please Check',
      buttons: ['OK']
  });
 await alert.present();
  }

 
}
