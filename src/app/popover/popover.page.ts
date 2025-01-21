import { Component, OnInit } from '@angular/core';
import { NavController,NavParams,ModalController,PopoverController} from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { map } from 'rxjs/operators';

import { EventsService } from './../services/events.service';
import { SingletonService } from './../services/singleton.service';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.page.html',
  styleUrls: ['./popover.page.scss'],
})
export class PopoverPage implements OnInit {

  jsonUrl:any;
  txservice:any;
  recordId:any;
  pid:any;
  parent_tableid:any;
  UserDetails:any;
  pagenav:any;
  optionsJson:any;
  public searchEnabled: boolean = false;
  subMenu:any;
  roleJson:any;

  constructor(
    private storage:Storage,
    public navCtrl:NavController,
    public popoverController:PopoverController,
    public events:EventsService,
    public modalCtrl:ModalController,
    private http:HttpClient,
    public navParams:NavParams,
    public singleton:SingletonService) {

      this.searchEnabled = navParams.get('fromsearch');
      if(this.searchEnabled == true){
        this.txservice = navParams.get('txservice');
        this.jsonUrl = navParams.get('jsonUrl');
        this.recordId = navParams.get('recordId');
        this.optionsJson = navParams.get('selectoptions');
      }
      else{
        this.roleJson = navParams.get('roleJson');
      let sort_component = this.roleJson[0]['sub'].sort(function(a:any, b:any) {
          return a.do - b.do;
        }); 
       this.subMenu =  sort_component;
      }
      this.UserDetails = navParams.get('userDetails');
      this.pagenav = navParams.get('pagenav')
      this.pid = this.singleton.PID;

     }

  ngOnInit() {  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopoverPage');
  }

  view($event:any){
    this.UserDetails['viewMode'] = true;
    this.UserDetails['optionJson'] = this.optionsJson;
    this.UserDetails['recordId'] = this.recordId;
    if($event =="modify"){
      this.UserDetails['modifyMode'] = true;
    }
    else{
      this.UserDetails['modifyMode'] = false;
    }

     this.http.get(this.jsonUrl, {responseType: 'json'}).subscribe((data:any) => {
  console.log(data);

    //this.http.get(this.jsonUrl).map(res => res.json()).subscribe(data => {
      let tx_id = data[0]['idt'];
      this.pagefilter(tx_id);
    });
  
  
  }

  redirectpage(action:any,id:any){
    if(action == 'redirect'){
      this.pagefilter(id);
      
    }
  
  }

    pagefilter(page:any){
    const page_filter = this.pagenav['pages'].filter((item:any) => {
        return (item['id'] == page['view']);
      });
      this.navCtrl.navigateForward(page_filter[0]['id'],this.UserDetails).then(() => {
        this.modalCtrl.dismiss();
       });
  }

  async logout(){
    
        await this.popoverController.dismiss();

    this.storage.get('nextlogin').then((status:any) =>{
      if(status != 'pin'){
        this.storage.remove('loginStatus');
        this.storage.remove('userObj');
      }
    }); 
    const pages = this.pagenav.pages.filter((item:any) => {
      console.log(item);
            return (item['id'] == 'login');
          });
    if(pages.length >0){
      
      this.navCtrl.back();
    
  }
}


}
