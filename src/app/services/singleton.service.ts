import { Injectable } from '@angular/core';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
//import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SingletonService {
  public PID = "";
  public userid = "";
  //public resturl = "http://192.168.125.204:32923/mservice/";
  //public resturl = "http://203.95.216.62:32927/mservice/";
  public resturl = "https://farm.auvitapps.com:32443/mservice/";
  //public resturl = "http://203.95.216.148:32923/mservice/";
  //public resturl = "http://103.155.85.158:32923/mservice/";
  public dynamicresturl = "";
  public projectname = "farmerppm";
  public ismultitenant = "True";
  public table_underscore = "False";
  public imei_based_login = "False";
  public role = "";
  public apikey = "5f22a33d-c290-4520-bed3-107fc0ada012";
  public senderid = "5f22a33d-c290-4520-bed3-107fc0ada012";
  public googleapikey = "AIzaSyDOj7AIc3eJdUEILY3dYZEwjEEfuj8KkKI";
  public googleclientid = "aaaa";
  public tracking = "true";
  public trackInterval = "600000";
  public weatherapiKey = "8ec970a60c1c4fc18e1124422190403";

  constructor(private http: HTTP) {
    console.log('Hello Singleton Service');
     }
}
