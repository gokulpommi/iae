import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { AlertController} from '@ionic/angular';


import { SingletonService } from './../services/singleton.service';

declare var Expression:any;

@Injectable({
  providedIn: 'root'
})
export class CmService {

  subtitles:any;
  lastname:any;
  firstname:any;
  projectname:any;
  pid:any;
  reportid:any;
  show_grand_total:any;
  groupfield:any;
  columnproperty:any;
  pageHeaderFooter : any;
  reportHeaderFooter : any;
  enter:any;
  printReportParams: Object =  {};  
  username:any;
  userid:any;
  userDetails:any;
  carosalfieldobj : Object =  {}; 
  weatherapi:any;

  constructor(  private http:HttpClient, 
                private alertCtrl: AlertController,
                private network: Network,
                private storage:Storage,
                public singleton:SingletonService) { 

          console.log('hello CmService');
          this.projectname = this.singleton.projectname;
          this.weatherapi = this.singleton.weatherapiKey;
  }



  sendReportParams(reportType:any,inputValue:any,projectname:any,reportid:any,multiselectvalues:any,groupfield:any,columnproperty:any,stl:any,multitenant:any,reportParams:any){
  
    let params:Record<string, any> = {                                   
      "projectname": projectname,
        "reportid":reportid,
        "multiselectvalues":multiselectvalues,        
      "groupfield":groupfield,
      "columnproperty":columnproperty,
      "stl":stl,
      "multitenant":multitenant,  
      "PID" : this.singleton.PID, 
    }
    var Keys = Object.keys(inputValue); 
    for(var j = 0; j < Keys.length; ++j) {
      if (inputValue.hasOwnProperty(Keys[j])) 
      {
        params [Keys[j]]=inputValue[Keys[j]]
      }
     }
    console.log(params);
    // if(reportType == "CarouselReport"){
    //   const carouselColumnArray = reportParams.filter((item:any)=>{
    //     return item["cf"] == "True"
    //   })
    //   if(carouselColumnArray.length>0){
    //     let carousalColumn = carouselColumnArray[0];
    //     this.carosalfieldobj[decodeURIComponent(inputValue[carousalColumn["sl"]])] = params;        
    //     this.printReportParams[reportid] = this.carosalfieldobj;
    //   }
    // } 
    // else{
    //   this.printReportParams[reportid] = params;
    // }
    
      
  let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' })
    };
    let report = "PID="+this.singleton.PID+"&params="+JSON.stringify(params);   
    return this.http.post(this.singleton.resturl+'mobileserviceapi/getReportData/', report , httpOptions);

  }
  
  sendReportwithoutParams(projectname:any,reportid:any,multiselectvalues:any,groupfield:any,columnproperty:any,stl:any,multitenant:any){
    let params = {                                   
      "projectname": projectname,
        "reportid":reportid,
        "multiselectvalues":multiselectvalues,        
      "groupfield":groupfield,    
      "columnproperty":columnproperty,
      "stl":stl,
      "multitenant":multitenant,
      "PID" : this.singleton.PID,
    }
    console.log(params);
   // this.printReportParams[reportid] = params
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' })
    };
    let report = "PID="+this.singleton.PID+"&params="+JSON.stringify(params);   
    return this.http.post(this.singleton.resturl+'mobileserviceapi/getReportData/', report , httpOptions);

  }


   getNextAutoField(projectname:any,txviewname:any,prefix:any,componentid:any):Promise<any>{
    var item = {
      "PROJECTSLUG"  : projectname,
      "TXVIEW" :  txviewname,
      "FIELD" : componentid,
      "ISMULTITENANT" : this.singleton.ismultitenant,
      "PROJECTID" : this.singleton.PID,
      "SEQPREFIX": prefix,
      "DYNAMICSEQ": "T"
    }
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' })
    };
    let report = "params="+JSON.stringify(item); 
    console.log(report);
    return this.http.post<any>(this.singleton.resturl+'mobileserviceapi/getNextAutoField/', report, httpOptions).toPromise();      
  }


  saveTracking(locations:any){

    let location = {
      "PROJECTID" : this.singleton.PID,
      "LOCATIONS": locations
    }


    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' })
    };
    let track = "params="+JSON.stringify(location); 
    console.log(location);
    return this.http.post<any>(this.singleton.resturl+'mobileserviceapi/savetrack/', track, httpOptions);      
  

  }

  locationtracking(idcard:any,date:any){
    let data = {
      "PROJECTID" : this.singleton.PID,
      "MOBILENUMBER" : idcard,
      "TDATE"  : date,
    }


      let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' })
    };
    let track = "params="+JSON.stringify(data); 
    console.log(track);
    return this.http.post<any>(this.singleton.resturl+'mobileserviceapi/gettracklocation/', track, httpOptions);      
  
  }



}
