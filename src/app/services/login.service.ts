
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';

import { SingletonService } from './../services/singleton.service';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
      
      resturl :any;

  constructor(private http:HttpClient,public storage:Storage,public singleton:SingletonService) {
    console.log('Hello LoginService'); 
    this.resturl = this.singleton.resturl;

  }

  getServiceURL(pid:string,loginType:string,testJson:any) {
    let username = "";
    
    if(loginType == "form"){
      username = testJson["USERNAME"];
    }
    else if(loginType == "otp"){
      username = testJson["MOBILENUMBER"];
    }
    
    let usernameObj= {
      "USERNAME":username,
    };
    
   
    let params ="PID="+pid+"&usernameObj="+JSON.stringify(usernameObj);
     let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' })
    };
    return this.http.post(this.resturl+'mobileserviceapi/getServiceUrl',params,httpOptions);
  }
  
  getCompanyList(pid:string,mlt:string,userid:string)
  {
    
    
    let mapJson = {
      "PID":pid,
      "MLT":mlt,
            "USERNAME":userid,
            "username":userid       
    };
    
   
    let params ="PID="+pid+"&mapJson="+JSON.stringify(mapJson); 
      let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' })
    };
      return this.http.post(this.singleton.resturl+'mobileserviceapi/companysync',params,httpOptions);
    
    
    
  }
  
  
  updateCompanyList(pid:string,mlt:string,userid:string,companyid:string)
  {
  
    
    let mapJson = {
      "PID":pid,
      "MLT":mlt,
            "USERNAME":userid,
            "username":userid,
            "company":companyid,
            "COMPANY":companyid     
    };
    
   
    let params ="PID="+pid+"&mapJson="+JSON.stringify(mapJson); 
      let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' })
    };
      return this.http.post(this.singleton.resturl+'mobileserviceapi/updatecompanysync',params,httpOptions);
    
    
    
  }
  
  
  getGlobalList(pid:string,mlt:string,userid:string)
  {
    let mapJson = {
      "PID":pid,
      "MLT":mlt,
            "USERNAME":userid,
            "username":userid     
    };
   
     let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' })
    };
    let params ="PID="+pid+"&mapJson="+JSON.stringify(mapJson);  
    return this.http.post(this.singleton.resturl+'mobileserviceapi/globalsync',params, httpOptions); 
    
  }
  deviceidLogin(sql:string,loginType:string,testJson:any,pid:string,playerId:string,deviceid:string) {
    let quickDetails= {
      "SQL":sql,
      "SQLPARAMS":testJson,
      "PROJECTNAME":this.singleton.projectname,
      "PLAYERID":'playerId',
      "DEVICEID" : deviceid,
      "multitenant" : this.singleton.ismultitenant
    };
    
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' })
    };
   
    let params ="PID="+pid+"&quickDetails="+JSON.stringify(quickDetails); 
    
    if(loginType == "form"){
      return this.http.post(this.singleton.resturl+'mobileserviceapi/deviceidLogin',params,httpOptions);
    }
      else if(loginType =="otp"){
      return this.http.post(this.singleton.resturl+'mobileserviceapi/deviceidOtpNew',params,httpOptions);

    }
    else {
      return null; 
    }
    
  }

  login(sql:string,loginType:string,testJson:any,pid:string) {
    let quickDetails= {
      "SQL":sql,
      "SQLPARAMS":testJson,
      "PROJECTNAME":this.singleton.projectname,
      "PLAYERID":'playerId',
      "multitenant" : this.singleton.ismultitenant
    };
    
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' })
    };
   
    let params ="PID="+pid+"&quickDetails="+JSON.stringify(quickDetails); 
    
    if(loginType == "form"){
      return this.http.post(this.singleton.resturl+'mobileserviceapi/customLogin',params,httpOptions);
    }
      else if(loginType =="otp"){
      return this.http.post(this.singleton.resturl+'mobileserviceapi/customOtpNew',params,httpOptions);

    }
    
    return throwError ("Invalid Login Type");
  
    
  }

  customSearch(data:any,pid:string,projectname:string){
   
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' })
    };
   let params = "PID="+pid+"&searchButton="+JSON.stringify(data);   

    return this.http.post(this.singleton.resturl+'mobileserviceapi/customSearchButton',params,httpOptions);
  }
  
  hiddenSqlService(data:any){
   
     let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' })
    };

    let params = "fieldType=" + data.fieldType +
               "&eformid=" + data.eFormId +
               "&fieldName=" + data.fieldName +
               "&projectid=" + data.projectId +
               "&projectname=" + data.projectName +
               "&USERNAME=" + data.username +
               "&ISMULTITENANT=" + this.singleton.ismultitenant +
               "&TYPE=" + data.type + 
               data.MapValue + 
               "&dynamictable=" + data.dynamictable;
   
    //let params = "fieldType="+data['fieldType']+"&eformid="+data['eFormId']+"&fieldName="+data['fieldName']+"&projectid="+data['projectId']+"&projectname="+data['projectName']+"&USERNAME="+data['username']+"&ISMULTITENANT="+this.singleton.ismultitenant+"&TYPE="+data['type']+data['MapValue']+"&dynamictable="+data['dynamictable'];
  
    return this.http.post(this.singleton.resturl+'mobileserviceapi/eformsql',params,httpOptions);
  }

  selectService(data:any): Promise<any>{
   
     let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' })
    };
   
    let params = "fieldType="+data['fieldType']+"&eformid="+data['eFormId']+"&fieldName="+data['fieldName']+"&projectid="+data['projectId']+"&projectname="+data['projectName']+"&USERNAME="+data['username']+"&ISMULTITENANT="+this.singleton.ismultitenant+"&TYPE="+data['type']+data['MapValue']+"&dynamictable="+data['dynamictable'];
  
    return this.http.post<any>(this.singleton.resturl+'mobileserviceapi/eformsql',params,httpOptions).toPromise();;
  }


 
  
  
  
  stockService(data:any,stvalues:any){  
   
     let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' })
    };
    let params = "itemid=" + data['itemid'] + "&docdate=" + data['docdate'] + "&valmethod=" + data['valmethod'] + "&invfname=CLSTKWOL" + "&fieldname=" + data["fieldname"]+"&projectname="+data['projectname']+"&USERNAME="+data['username']+"&ISMULTITENANT="+this.singleton.ismultitenant;
  
    return this.http.post(this.singleton.resturl+'mobileserviceapi/einvstock',params,httpOptions);
  }
   
   
  sendMapjson(Json: any) {
        let MapJson = Json;
    MapJson['MLT'] = this.singleton.ismultitenant;
    console.log(MapJson);
        
         let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' })
    };
        let params = "mapJson="+JSON.stringify(MapJson);
        console.log("f");
        return this.http.post(this.singleton.resturl+'mobileserviceapi/syncmaster/',params,httpOptions);
  } 

}
