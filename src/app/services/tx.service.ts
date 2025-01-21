import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Platform,ModalController, NavController,AlertController,ToastController,LoadingController,NavParams,IonModal} from '@ionic/angular';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@awesome-cordova-plugins/file-transfer/ngx';
import { map } from 'rxjs/operators';
import { Observable,of } from 'rxjs';



import { SingletonService } from './../services/singleton.service';
import { ExpressionService } from './../services/expression.service';
import { EventsService } from './../services/events.service';

@Injectable({
  providedIn: 'root'
})
export class TxService {

   private modal!: HTMLIonModalElement;

    modifyMode:any;
    userDetails:any;
    input_values:any;
    username:any;
    userid:any;
    projectname:any;
    pid:any;
    ismultitenant:any;
    table_underscore:any;
    txn_slug:any;
    auto_txnslug:any;
    auto_pName:any;
    errorStatus:any;
    gridDelRow:any;
    gridModify:any;
    modalTxn:any;
    table_sort:any;

    json = [];
    table_value = [];
    table = [];
   
    cbValue = [];
    epValue = [];
    eptValue =[];
    saveValue=[];

  constructor(private http:HttpClient,
              public network:Network,
              public file:File,
              public transfer:FileTransfer,
              public singleton:SingletonService,
              public events:EventsService,
              public myexpression:ExpressionService,
              public alertCtrl:AlertController,
              public toastCtrl:ToastController,
              public navCtrl:NavController,

              ) { }




  async saveJson(userDetails:any, url:any, form:any, selectedOptions:any, pagenav:any, presetValue:any, saveExp:any, isRapidCalling:any, modifyMode:any, rowgridObject:any) {
    
    this.modifyMode = modifyMode;
    this.userDetails = userDetails;
    let preset_value = { ...presetValue };
    this.input_values = { ...presetValue };
    this.table_sort=[];
    this.table_value = [];
    this.table = [];
   
    this.cbValue = [];
    this.epValue = [];
    this.eptValue =[];
    this.saveValue=[];

    if (userDetails) {
        this.username = userDetails.USERNAME;
        this.userid = userDetails.USERID;
        this.projectname = userDetails.PROJECTNAME;
    }
    this.pid = this.singleton.PID;
    this.ismultitenant = this.singleton.ismultitenant;
    this.table_underscore = this.singleton.table_underscore;

    try {
        const txView = await this.fetchTransactionView(url);
       
          this.txn_slug = txView['idt'];
          this.auto_txnslug = txView['didt'];
          this.auto_pName = txView['dpt'];
          const savetype = txView['st'];
          const content = txView['cont_meta'];
          const parentDT = txView['tran_meta'][0]['prm_meta'][0];


          this.table_sort = this.sortComponents(content[0]['comp_meta']);
          this.processComponents(this.table_sort, content[0], parentDT, txView, selectedOptions, presetValue, rowgridObject);

          if (!this.errorStatus) {
            this.handleSaveType(savetype,parentDT,url,saveExp,form,preset_value,selectedOptions,userDetails,pagenav,isRapidCalling);
          } else {
            this.events.txloadDismiss();
          }
        
      
    } catch (error) {
        //this.handleError(error);
    }
  }


  sortComponents(component:any) {
    return component.sort((a:any, b:any) => a.do - b.do);
  }

  processComponents(components: any[], content: any, parentDT: any, txView: any, selectedOptions: any, presetValue: any, rowgridObject: any) {
     if (this.isComponentTypeHandled(content)) {
        for (let index = 0; index < components.length; index++) {
            let referJson;
            try {
                referJson = components[index].cjson[0];
            } catch (err) {
                referJson = undefined;
            }

            if (referJson !== undefined) {
                
                const errorStatus = this.constructJsonForSave(index, components[index], referJson, this.table, this.saveValue, this.cbValue, "", parentDT, selectedOptions, presetValue, txView.vt, txView.gp_op);

                if (errorStatus === "True") {
                    console.error(`Error processing component at index ${index}: ${components[index]}`);
                    this.errorStatus=true;
                    break; // Stop the loop if errorStatus is "True"
                }
            }
        }
    } else if (content.ctype === 'grid') {
        //this.constructJsonForGrid(components, content, parentDT, txView, presetValue, rowgridObject);
    }
  }

  handleSaveType(saveType: string, parentDT: any,url:any,saveExp:any,form:any,preset_value:any,selectedOptions:any,userDetails:any,pagenav:any,isRapidCalling:any) {

    const layers = this.constructLayers(parentDT);

    if (['online', 'both'].includes(saveType)) {
      this.modifyMode ? this.sendUpdateJson(layers,url,saveExp,form,preset_value,selectedOptions,userDetails,pagenav,isRapidCalling) : this.sendSaveJson(layers,url,saveExp,form,preset_value,selectedOptions,userDetails,pagenav,isRapidCalling);
    } else if (saveType === 'offline') {
      //this.offlineSave(layers);
    } else {
     // this.events.txloadDismiss();
    }
  }

  sendUpdateJson(layers: any,url:any,saveExp:any,form:any,preset_value:any,selectedOptions:any,userDetails:any,pagenav:any,isRapidCalling:any) {
    this.sendUpdate(layers,userDetails).subscribe((updateMessage:any) => {
        
        let userMessage = updateMessage;
        let status = userMessage["values"]["SAVED"];
        
        if (status === "TRUE") {
            this.getToast('Updated Successfully');
            if (form === "tr") {
                this.notificationAfterSave(url, saveExp, preset_value, selectedOptions, userDetails, userMessage, pagenav, "MODIFY", isRapidCalling);
            }
        } else {
            this.getToast('Update Failed');
        }
    },
    (err:any) => {
        setTimeout(() => {
            //this.events.txloadDismiss();
            this.getSaveAlert("Connection to server failed. Please try again.");
            this.handleError(err);
        }, 200);
    
    });
  }

  sendSaveJson(layers: any,url:any,saveExp:any,form:any,preset_value:any,selectedOptions:any,userDetails:any,pagenav:any,isRapidCalling:any) {
    
    this.sendsave(layers).subscribe(async(saveMessage: any) => {
        if (saveMessage) {
            let userMessage = saveMessage;
            let saveStatus = userMessage["values"]["SAVED"];
            let regpage = ""; 

            try {
                regpage = userDetails.PAGE; 
            } catch (e) {
                console.error("Error accessing PAGE:", e);
            }

            if (saveStatus === "TRUE") {
                userDetails['SAVEID'] = userMessage["values"]["SaveId"];
                
                if (form === "reg") {
                    const alert = await this.alertCtrl.create({
                        header: 'Information',
                        subHeader: "Registered Successfully. You can Log In now.",
                        buttons: ['OK']
                    });
                    await alert.present();
                    this.navCtrl.navigateForward(pagenav[0].id);                 
                } else if (form === "tr") {
                    this.notificationAfterSave(url, saveExp, preset_value, selectedOptions, userDetails, userMessage, pagenav, "NEW", isRapidCalling);
                }
            } else if (saveStatus === "FALSE") {
                console.log("Save operation failed:", saveMessage);
                this.getSaveAlert(userMessage["values"]["MESSAGE"]);
            }    
        }

      },
      (err: any) => {  
        this.handleError(err);
      }
    );
  }

  notificationAfterSave(url:any, saveExp:any, preset_value:any, selectedOptions:any, userDetails:any, userMessage:any, pagenav:any, mode:any, isRapidCalling:any){
     let notificationExp;
    let currentStage : any;
    if(saveExp != "" && saveExp != undefined && saveExp != null){
        this.navigationAfterSave(mode,userMessage,userDetails,isRapidCalling);
    }
    else{
      this.navigationAfterSave(mode,userMessage,userDetails,isRapidCalling);
    }
  }

  constructLayers(parentDT: any) {

     let table_sort = this.table.sort(function(a:any, b:any) {
        return a.od - b.od
      });

    return {
      layers: table_sort, 
      primary_table: parentDT["tb_s"],
      user_name: this.username,
      pid: this.pid,
      user_id: this.userid,
      project_name: this.projectname,
      efrom_slug: this.txn_slug,
      auto_eform: this.auto_txnslug,
      auto_pname: this.auto_pName,
      CB: this.cbValue,
      EP: this.epValue,
      EPT: this.eptValue,
      isGridModify: this.gridModify,
      DR: this.gridDelRow,
      MLT: this.ismultitenant,
      TB_UD: this.table_underscore
    };
  }

  isComponentTypeHandled(content: any): boolean {
    return ['list', 'card', 'group_radio', 'group_checkbox'].includes(content.ctype);
  }

  async fetchTransactionView(url:any) {
    const response = await this.http.get(url, { responseType: 'json' }).toPromise();
    return (response as any)[0];
  }

  constructJsonForSave(i: number, component: any, referJson: any, table: any[], saveValue: any, cbValue: any[], base64Str: string, parentDT: any, selectedOptions: any, preset_value: any, vtype: string, group_op: any): string {
    let errorStatus = "";
    let fieldValue: any;
    let vexpr = component["vep"];

    // Validate expression if exists
    if (vexpr) {
        this.userDetails['preset_value'] = preset_value;
        const value = this.myexpression.getExpressionValue(vexpr, this.userDetails, "");

        if (value.toString().toUpperCase() !== "T") {
            this.events.txAlert();
            return "True"; 
        }
    }

   
    fieldValue = this.getFieldValue(component, preset_value, group_op);

  
    // if (vtype === "carousel_lock") {
    //     fieldValue = this.handleCarouselLockField(component, group_op);
    // }

   
    if (fieldValue === "error") {
        return "True"; 
    }

    
    if (referJson["datatype"] === "OneToOneField" && fieldValue === undefined) {
        fieldValue = "";
    }

   
    const item = {
        'FN': referJson["field_slug"],
        'FV': fieldValue,
        'DT': referJson["datatype"],
        'SV': referJson["isdbfield"],
        'AD': component["ad"],
        'WT': component["wt"]
    };

    saveValue[referJson["field_slug"]] = fieldValue;

    
    this.addToTable(table, item, referJson, parentDT, i);

    return errorStatus;
  }

  getFieldValue(component: any, preset_value: any, group_op: any): any {
      switch (component["wt"]) {
          case 'text':
          case 'password':
          case 'email':
          case 'number':
              return this.getInputfield(component);
          // case 'dpop':
          //     return this.handleDpopField(component, preset_value);
          case 'select':
              return this.getSelectfield(component);
          case 'sas':
              return this.getSelectWithSearchfield(component);
          case 'date':
              return this.getDatefield(component);
          case 'textarea':
              return this.gettextarea(component);
          case 'time':
              return this.getTimefield(component);
          // case 'check':
          //     return this.handleCheckboxField(component);
          // case 'radio':
          //     return this.getRadiobox(component);
          // case 'scan':
          //     return this.getScanvalue(component);
          case 'upload':
              return this.getDocfield(component);
          default:
              return null;
      }
  }

  addToTable(table: any[], item: any, referJson: any, parentDT: any, index: number): void {
      const tableName = referJson["txtabledetailid"];
      const order = table.length === 0 ? (tableName === parentDT['tb_s'] ? 1 : index + 2) : null;

      const existingTable = table.find((t:any) => t.table_name === tableName);
      if (existingTable) {
          existingTable.table_value.push(item);
      } else {
          const newTableEntry = {
              'table_name': tableName,
              'table_value': [item],
              'od': order,
              'fromdb': this.modifyMode ? 'True' : undefined,
              'grid_rowid': this.modifyMode ? "" : undefined 
          };
          table.push(newTableEntry);
      }
      // console.log(table);
      // console.log(this.table);
  }

  getInputfield(input: any): any {
    
    const id = input["idt"];
    let inputValue: any = this.input_values[id];

    
    if (inputValue === "" || inputValue === undefined) {
        if (input["ire"] === "True") {
            this.getAlert(input["cap"]); 
            return "error"; 
        }
        
       
        if (input['ct'] === 'IntegerField') {
            inputValue = 0; 
        } else {
            inputValue = ""; 
        }
    }

    return inputValue; 
  }

  getSelectfield(select: any): any {
    // Function to get the selected value from a select input
    const id = select["idt"];
    let selectValue: any = this.input_values[id];

    // Check if the select value is undefined
    if (selectValue === undefined) {
        if (select["ire"] === "True") {
            this.getAlert(select["cap"]); // Show alert for required fields
            return "error"; // Return error status if required
        }
        selectValue = ""; // Default to an empty string if not required
    }

    return selectValue; // Return the selected value
  }

  getSelectWithSearchfield(sas: any): any {
    const id = sas['idt'];
    let sasValue = "";

    try {
        const valueKey = JSON.parse(sas['sql'])['value'];

        // Check if the field is required
        if (sas["ire"] === "True") {
            // Validate if the input value exists
            if (!this.input_values[id]) {
                this.getAlert(sas["cap"]);
                return "error";
            } else if (!this.input_values[id][valueKey]) {
                this.getAlert(sas["cap"]);
                return "error";
            } else {
                sasValue = this.input_values[id][valueKey]; // Get the value
            }
        } else {
            // If not required, set sasValue based on input existence
            sasValue = this.input_values[id] ? this.input_values[id][valueKey] || "" : "";
        }

        return sasValue; // Return the retrieved value
    } catch (e) {
        this.getSaveAlert(`${sas["cap"]} failed to get value`); // Improved error message
        return "error"; // Return error on exception
    }
  }

  getDatefield(date: any): any {
    // Function to get DateField value in transaction
    const id = date["idt"];
    let ionicDateValue = this.input_values[id];
    let dateValue: any;

    if (ionicDateValue) {
        // Format the date if it's in the expected format
        if (ionicDateValue.includes('/')) {
            const parts = ionicDateValue.split('/');
            const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`; // Convert to YYYY-MM-DD
            dateValue = new Date(formattedDate);
        } else {
            dateValue = new Date(ionicDateValue);
        }

        // Check if the date is valid
        if (dateValue instanceof Date && !isNaN(dateValue.getTime())) {
            dateValue = dateValue.toDateString(); // Convert to string
        } else {
            dateValue = "Invalid Date";
        }
    } else {
        dateValue = ""; // Default to empty if no value is found
    }

    // Store the formatted date value back in the input values
    this.input_values[id] = dateValue;

    // Check for required field validation
    if (dateValue === "" || dateValue === "Invalid Date") {
        if (date["ire"] === "True") {
            this.getAlert(date["cap"]); // Alert for required fields
            return "error"; // Return error status
        }
        dateValue = ""; // Reset to empty if not required
    }

    return dateValue; // Return the formatted date value
  }

  getTimefield(time: any): any {
    // Function to get TimeField value in transaction
    const id = time["idt"];
    let timeValue = "";

    timeValue = this.input_values[id];

    // Validation for required fields
    if (timeValue === "" || timeValue === time["cap"] || timeValue === undefined) {
        if (time["ire"] === "True") {
            this.getAlert(time["cap"]); // Alert for required fields
            return "error"; // Return error status
        }
        timeValue = ""; // Reset to empty if not required
    }

    return timeValue; // Return the retrieved time value
  }

  gettextarea(area: any): any {
    // Function to get textarea value in transaction
    const id = area["idt"];
    let textareaValue = this.input_values[id] || ""; // Default to empty string if undefined

    // Validation for required fields
    if (textareaValue === "") {
        if (area["ire"] === "True") {
            this.getAlert(area["cap"]); // Alert for required fields
            return "error"; // Return error status
        }
        // If not required, return empty string
    }

    return textareaValue; // Return the retrieved textarea value
  }

  getDocfield(input: any): any {
    // Function to get input value in transaction
    const id = input["idt"];
    let inputValue: any = this.input_values[id]; // Retrieve value from input_values

    // Check for empty or undefined value
    if (inputValue === "" || inputValue === undefined) {
        if (input["ire"] === "True") {
            this.getAlert(input["cap"]); // Alert for required fields
            return "error"; // Return error status
        }

        // Set default value based on the input type
        inputValue = (input['ct'] === 'IntegerField') ? 0 : "";
    }

    return inputValue; // Return the retrieved input value
  }

  setModal(modal: HTMLIonModalElement) {
    this.modal = modal;
  }

  closeModal() {
    if (this.modal) {
      this.modal.dismiss();
    }
  }

  customSelectService(data:any){
      let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' })
    };
      let params = "fieldType="+data['fieldType']
                  +"&eformid="+data['eFormId']
                  +"&fieldName="+data['fieldName']
                  +"&projectid="+data['projectId']
                  +"&projectname="+data['projectName']
                  +"&USERNAME="+data['username']
                  +"&ISMULTITENANT="+this.singleton.ismultitenant
                  +"&dynamictable="+data['dynamictable']
                  +"&TYPE="+data['type']
                  +data['MapValue'];
      return this.http.post(this.singleton.resturl+'mobileserviceapi/eformsql',params,httpOptions);
  }

  selectService(data:Record<string, any>): Promise<any>{
      let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' })
    };
      let params = "fieldType="+data['fieldType']
                  +"&eformid="+data['eFormId']
                  +"&fieldName="+data['fieldName']
                  +"&projectid="+data['projectId']
                  +"&projectname="+data['projectName']
                  +"&USERNAME="+data['username']
                  +"&ISMULTITENANT="+this.singleton.ismultitenant
                  +"&dynamictable="+data['dynamictable']
                  +"&TYPE="+data['type']
                  +data['MapValue'];
      return this.http.post<any>(this.singleton.resturl+'mobileserviceapi/eformsql',params,httpOptions).toPromise();
  }

  getSearchrecord(Json:any): Promise<any>{
      /* Server Request Calling for Save Function*/
      let recordJson = Json;
      
        let httpOptions = {
          headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' })
        };
        let stringify = JSON.stringify(recordJson);
        let params = "particularRecord=" + encodeURIComponent(stringify);
        console.log("Search Record Function Called!");
        return this.http.post<any>(this.singleton.resturl+'mobileserviceapi/getsearchRecord/', params, httpOptions).toPromise();
      
  }

  sendsave(Json: any): Observable<any> { 
    let saveJson = Json;

    
    if (this.network.type === "none") {
     // this.offlinesave(saveJson);
      return of(null); 
    } else {
      
      const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' })
      };

     
      const stringify = JSON.stringify(saveJson);
      const params = `saveJson=${encodeURIComponent(stringify)}`;
      console.log("Save Function Called!");

      
      return this.http.post(`${this.singleton.resturl}mobileserviceapi/saveJsonionic/`, params, httpOptions);
        
    }
  }

  sendUpdate(Json: any, userDetails: any): Observable<any> {
    
    let saveJson = { ...Json }; 
    saveJson['recordId'] = userDetails['RECORDID'] || userDetails['recordId'];

    
    if (this.network.type === "none") {
        //this.offlinesave(saveJson);
      return of(null);
    } else {
        
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' })
        };

       
        const stringify = JSON.stringify(saveJson);
        const params = `saveJson=${encodeURIComponent(stringify)}`;
        console.log("Update Function Called!");

       
        return this.http.post(`${this.singleton.resturl}mobileserviceapi/updateionic/`, params, httpOptions);
    }
  }

  upload(imagemeta:any,preset_value:any,id:any,loading:any){
    /* image upload in transaction */
    const fileTransfer: FileTransferObject = this.transfer.create();
    let file_dt ="";
    
     let options: FileUploadOptions = {
       fileKey: 'file',
       fileName: imagemeta['filename'],
       headers: {
      'Content-Type': 'multipart/form-data',
      'fileId': file_dt,
      'fileName':imagemeta['filename'],
      'mediaType':imagemeta['mediaType'],
      'iMt': "True",
      'pid':this.singleton.PID     
         }

        }
     
   fileTransfer.upload(imagemeta['imageData'], encodeURI(this.singleton.dynamicresturl + "mobileserviceapi/uploadImage"), options)
       .then((data:any) => {
       imagemeta['uploadstatus'] = true;
        preset_value[id] = data['response'];
        preset_value[id+"filename"]=imagemeta['filename'];

        this.getToast('Image Uploaded Successfully.');
        setTimeout(() => {
            loading.dismiss();
        }, 100);
      }, (err:any) => {
        // error
        imagemeta['uploadstatus'] = false;
        this.getToast('Image Uploaded Failed.');
        //preset_value[elemid] = file;
        console.log(err);
        setTimeout(() => {
            loading.dismiss();
        }, 100);
    }).catch((err:any) => {
        console.log(err);
        //file['status'] = "error";
        //preset_value[elemid] = file;
    });
  }
  
  deleteImage(img_id:any){
    this.getToast('Image Deleted Successfully.');
    var layers:Record<any,any> = {
      'FILEID': img_id,    //save values in transaction
      'MLT':this.ismultitenant,//for Projetc is multitenant or not
      'PID':this.singleton.PID//for projectid
    }
    let stringify = JSON.stringify(layers);
    let params = "imageJson=" + encodeURIComponent(stringify);
     let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' })
    };
    return this.http.post(this.singleton.resturl+'mobileserviceapi/deleteImagefile/', params, httpOptions);
  }

  navigationAfterSave(mode:any,userMessage:any,userDetails:any,isRapidCalling:any){
    if (mode == "NEW"){
      this.openNewModeTxn(userMessage,userDetails,isRapidCalling);
    }
    else if (mode == "MODIFY"){

      if(this.modalTxn == true){
         
        this.modal.dismiss();
      }
      else{

        
       this.navCtrl.back();
      }
     
    }
  
  }

  openNewModeTxn(userMessage: any, userDetails: any, isRapidCalling: boolean) {
   
    this.saveAlert(userMessage["values"]["MESSAGE"]);

    if (this.modalTxn) {
        
        this.modal.dismiss();
    } else if (!isRapidCalling) {
       
        setTimeout(() => {
            this.events.loadDismiss();
        }, 2000);
    }
  }

  async saveAlert(message: string) {
    const alert = await this.alertCtrl.create({
      subHeader: message,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.back();
          }
        }
      ]
    });

    await alert.present();
  }

  handleError(err: any) {
    //this.events.txloadDismiss();
    this.getSaveAlert("Network Connection Error! Please Check.");
  }

  async getAlert(message:any) {
    
      let alert =await this.alertCtrl.create({
        header: 'Save Alert',
        subHeader: message + " is required",
        buttons: ['Dismiss']
      });
     await alert.present();
  
  }

  async getToast(msg:any){
    let toast =await this.toastCtrl.create({
      message: msg ,
      duration: 3000,
      position: 'bottom'
    });
  await toast.present();
  }

  async getSaveAlert(message:any){
      let alert =await this.alertCtrl.create({
        header: 'Information',
        subHeader: message,
        buttons: ['OK']
      });
    await alert.present();

  }





}
