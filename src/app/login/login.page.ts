import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { HttpClient } from '@angular/common/http';
import { SQLitePorter } from '@awesome-cordova-plugins/sqlite-porter/ngx';
//import { Network } from '@capacitor/network';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { Device } from '@capacitor/device';
import { Storage } from '@ionic/storage-angular'

import { SingletonService } from '../services/singleton.service';
import { LoginService } from '../services/login.service';
import { EventsService } from '../services/events.service';
import { ExpressionService } from '../services/expression.service';

//import { ReportparammodalPage } from '../reportparammodal/reportparammodal.page';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

 loginWithEmailForm: FormGroup = this.formBuilder.group({
    username: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern('(?=.*)(?=.*[a-z])(?=.*[A-Z]).{8,}')]],
    rememberme: [false]
  });

  loginWithPhoneForm: FormGroup = this.formBuilder.group({
    countrycode: ['+91', Validators.required],
    phone: ['', [Validators.required, Validators.pattern("[0-9 ]{10}")]],
    resendotp: [false]
  });

  
  sqlString         : any;
  database          : any;
  showLoginPassword : boolean = false;
  companysetup      = "false";
  globalsetup       = "false";
  branchsetup       = "false";
  offlinesync       = "false";
  deviceBased       = "false";
  forgetpassword    = "false";
  networks          : any;
  status            : any;
  UserDetails       : any;
  playerId          : any;
  deviceId          : any;
  db!               : SQLiteObject;
  getType           : string ="password";
  eyeIcon           : string ="eye-off-sharp"; 
  passwordInputMode : any;

   username:any; 
   password:any; 

   //username =  "8073697088"
   //password =  "8073697088"

   //username =  "7899119993"
   //password =  "7899119993"


  constructor(
        private route             : Router,
        private navCtrl           : NavController,
        public  formBuilder       : FormBuilder,
        private alertCtrl         : AlertController,
        private toastCtrl         : ToastController,
        private sqlite            : SQLite,
        private http              : HttpClient,
        private network           : Network,
        private sqlitePorter      : SQLitePorter,
        private storage           : Storage,
        public  loadingController : LoadingController,
        public  events            : EventsService,
        private singleton         : SingletonService,
        private loginService      : LoginService

  ) {

     
    this.copydb();

  }

  async ngOnInit() {

     const deviceid = await Device.getId();
      this.deviceId = deviceid.identifier;
    
  }

  toggleLoginPasswordVisibility() {
    this.showLoginPassword = !this.showLoginPassword;
    this.passwordInputMode = this.passwordInputMode === 'password' ? 'text' : 'password';
  }

  async login(event: any) {

    let pid        : any;
    let sql        : any;
    let params     : any;
    let loginType  : any;
    let idArray    : any[] = [];
    let paramsValues: { [key: string]: any } = {};

    
    sql = event.currentTarget.dataset.sql;
    loginType = event.currentTarget.dataset.type;
    params = event.currentTarget.dataset.params;

    const splitParams = params.split(',').map((item: string) => item.trim());

    for (let i = 0; i < splitParams.length; i++) {
      let id = 'login_' + splitParams[i].toLowerCase() + '_id';
      idArray.push(id);

    }

    for (let j = 0; j < splitParams.length; j++) {

      if ((document.getElementById(idArray[j]) as HTMLInputElement).value != null) {
        paramsValues[splitParams[j]] = (document.getElementById(idArray[j]) as HTMLInputElement).value;

      }

      else {

        alert("Please Enter User Details");
        return;
      }

    }

    const keys = ['companysetup', 'globalsetup', 'offlinesync', 'forgetpassword', 'deviceid'];

    const placeholders = keys.map(() => '?').join(', ');

    const msql = `SELECT * FROM mcontrol WHERE key IN (${placeholders})`;

    const loader = await this.loadingController.create({
      message: 'Logging in...',
      duration: 5000  
    });
    await loader.present();
     


    await this.executeSql(msql, keys).then((result:any) => {
      let company: any, globalset: any, offline: any, forgot: any, device:any ;

      for (let i = 0; i < result.rows.length; i++) {
        const row = result.rows.item(i);
        
        switch (row.key) {
          case 'companysetup':
            this.companysetup = row.value;
            break;
          case 'globalsetup':
            this.globalsetup = row.value;
            break;
          case 'offlinesync':
           this.offlinesync = row.value;
            break;
          case 'forgetpassword':
            this.forgetpassword = row.value;
            break;
          case 'deviceid':
            this.deviceBased = row.value;
            break;
          default:
            
            break;
        }
      }
    });

  
    let username = paramsValues['USERNAME']; 
    let password = paramsValues['PASSWORD']; 
    this.playerId = 'playerId';

    if (this.network.type != "none" ) {
      this.loginService.login(sql,loginType,paramsValues,pid).subscribe(
        (response: any) => {
          console.log('login response', response);
          let loginData = response;
           loader.dismiss();
         // this.events.publish({userdetails:loginData});

          this.storage.set('userObj', response);
          localStorage.setItem('role', loginData['ROLE']);        
          if (loginType === 'form') {
            if(loginData.TYPE === 'SUCCESS') {
              this.passwordUpdate(username,password);
              this.loginProcess(loginData);
            } 
            else {
              this.events.loadDismiss();
              this.toastMessage(`${loginData.MESSAGE}`,2000,'bottom');
            }
            
          }
          else if(loginType = 'otp') {

            if(loginData.TYPE === 'SUCCESS') {
            this.passwordUpdate(username,password);
            this.toastMessage(`${loginData.MESSAGE}`,2000,'bottom');
              const data = {
                loginData     : loginData,
                globalsetup   : this.globalsetup,
                offlinesync   : this.offlinesync,
                companysetup  : this.companysetup,
                branchsetup   : this.branchsetup,
                devicebased   : this.deviceBased
              };    
              this.events.loadDismiss();
              this.navCtrl.navigateForward(['/otpverify'], {state: data});
            }
            else {
              this.events.loadDismiss();
              this.toastMessage(`${loginData.MESSAGE}`,2000,'bottom');
            }
          }
        }, (error: any) => {
            this.events.loadDismiss();
            if (error.status === 0) {      
              this.toastMessage('Server Connection Failed', 2000, 'bottom');
            } else {
             this.events.loadDismiss();
              this.toastMessage('An unexpected error occurred. Please try again later.', 2000, 'bottom');
            }
         } 
      );

    } else {

      this.toastMessage("No Network Connections ", 2000, "bottom");
      try {
       
        const result = await this.db.executeSql(sql, [username, password]);

        if (result.rows.length > 0) {
          const data = result.rows.item(0);
          console.log('value4: ', data);
          this.setUserDetails(data,'');

          this.storage.set('userObj', data);

          this.loginProcess(data);

        } else {
          console.log('User not found');
        }
      } catch (error) {
        console.error('Error executing SQL:', error);
      }
    }



  }



  loginProcess(loginData:any){
      let user_details  = {};
      let user_active   = loginData["is_active"];
      let enable_mobile = loginData["enable_mobile"];

      if (user_active == "T" || user_active == true) {
          if (enable_mobile == "T" || enable_mobile == true) {
              if (this.deviceBased == "true") {
                  if (this.deviceId == loginData.deviceId) {                   
                      
                          this.setUserDetails(loginData,user_details);
                          this.setNavigatePages(loginData);
                      
                  } else {
                      this.events.loadDismiss();
                      this.toastMessage("Deviceid does not match ", 2000, "bottom");
                  }
              } else {
               
                
                      this.setUserDetails(loginData,user_details);
                      this.setNavigatePages(loginData);
                 
              }
          } else {
              this.events.loadDismiss();
              this.toastMessage("You Number not enabled yet. Contact admin.", 2000, "bottom");
          }
      } else {
          this.events.loadDismiss();
          this.toastMessage("You Are Not An Active User. Please Contact Admin", 2000, "bottom");
      }

  }


  executeSql(query: string, params: any[]): Promise<any> {
    return this.db.executeSql(query, params);
  }

  async passwordUpdate(username:any,password:any){
    let update=  await this.executeSql('UPDATE euser SET password=?, repassword=? WHERE mobilenumber=?', [password, password, username]);
          console.log(update); 
        if (update.rowsAffected > 0) {
          console.log('Password updated successfully');
          return update.rowsAffected;
        } else {
          console.log('Password update failed');
          return 0; 
        }
  }

  copydb() {

    this.http.get('assets/db.sql', { responseType: 'text' }).subscribe((data: any) => {
      this.sqlString = data;
      this.sqlite.create({ name: 'data.db', location: 'default' }).then((db: SQLiteObject) => {
        this.database = db;
        this.dbimporter();
        this.db = db;
      }).catch((error: any) => {
      })
    });

  }

  dbimporter() {

    this.sqlitePorter.importSqlToDb(this.database, this.sqlString).then(() => {
      console.log('SQL imported successfully');
    }).catch((error: any) => {
      if (error.message.includes("already exists")) {
        console.log('Database already imported')
      }
      else {
        console.log('Database Creation error')
      }
    })
  }

  forgotPassword() {

    this.alertCtrl.create({
      header: "Forgot Password?",
      subHeader: "Are you sure want to reset your password.",
      buttons: [
        {
          text: "Cancel",
          role: 'cancel',
          handler: () => {
            console.log("Cancel clicked");
          }
        },

        {
          text: "Reset",
          handler: () => {
            this.route.navigate(['/forgot-password'])
          }
        }
      ]
    }).then(alert => alert.present())

  }

  setUserDetails(loginData:any,user_details:any) {

      user_details['USERNAME']      = loginData['first_name'];
      user_details['FIRSTNAME']     = loginData['firstname'];
      user_details['EMAIL']         = loginData['email_id'];
      user_details['MOBILENUMBER']  = loginData['mobile_number'];
      user_details['ROLE']          = loginData['role'];
      user_details['USERID']        = loginData['muserid'];
      user_details['PROJECTID']     = loginData['projectid'];
      user_details['PROJECTNAME']   = loginData["PROJECTNAME"];
      user_details['SERVICEURL']    = this.singleton.resturl;
      user_details['RESTURL']       = this.singleton.resturl;
      this.singleton.PID            = loginData['projectid'];
      this.singleton.userid         = loginData['muserid'];
      this.UserDetails = user_details;
      this.events.publish({userdetails:user_details});
      this.storage.set('role',user_details['ROLE']);
      this.storage.set('userObj', user_details);

    
  }

  setGlobalUserdetails(loginData:any){
    let user_details      : any;
    this.singleton.PID    = loginData['PROJECTID'];
    this.singleton.userid = loginData['USERID'];
    var pid               = this.singleton.PID;
    var mlt               = this.singleton.ismultitenant;
    var userid            = loginData['USERNAME'];
    let authKey           = loginData['AUTHKEY'];

    this.loginService.getGlobalList(pid,mlt,userid).subscribe((restfulURL:any) => {
      
      var jsonvalue = JSON.parse(restfulURL.toString()) 
       var obj = jsonvalue["data"][0]
        for (var key in obj){
          var value = obj[key];
        
           user_details[key] = value;
        }
      
     this.UserDetails = user_details;
      this.storage.set('userObj', user_details);     
      this.storage.set('role',loginData['ROLE']);
      this.storage.set('token',loginData["AUTHKEY"]);
    
    });

  }



  setNavigatePages(userdetails:any) {

    this.storage.set('loginStatus',true);
    this.events.loadDismiss();
    if (this.offlinesync == "false") {
            const data = {
              userData      : userdetails,
              globalsetup   : this.globalsetup,
              offlinesync   : this.offlinesync,
              companysetup  : this.companysetup,
              branchsetup   : this.branchsetup,
              devicebased   : this.deviceBased
            };   
      this.navCtrl.navigateForward('/syncmaster',{state:data});
    }
    else if (this.companysetup == "true") {
            const data = {
              userData      : userdetails,
              globalsetup   : this.globalsetup,
              offlinesync   : this.offlinesync,
              companysetup  : this.companysetup,
              branchsetup   : this.branchsetup,
              devicebased   : this.deviceBased
            };    
      this.navCtrl.navigateForward('/company',{state:data});

    }
    else if (this.branchsetup == "true") {

            const data = {
              userData      : userdetails,
              globalsetup   : this.globalsetup,
              offlinesync   : this.offlinesync,
              companysetup  : this.companysetup,
              branchsetup   : this.branchsetup,
              devicebased   : this.deviceBased
            };    
      this.navCtrl.navigateForward('/branch',{state:data});

    }
    
    else {
      this.events.loadDismiss();
      this.navCtrl.navigateForward('/menu',{state:this.UserDetails});
    }
  }

  async toastMessage(message: string, duration: any, position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: duration,
      position: position
    });
    toast.present();
  }

    public toggleTextPassword() {
      
        this.getType= this.getType  ==='password' ? 'text' : 'password';
        this.eyeIcon = this.eyeIcon === 'eye-sharp' ? 'eye-off-sharp' : 'eye-sharp';
       
  }


  

}


