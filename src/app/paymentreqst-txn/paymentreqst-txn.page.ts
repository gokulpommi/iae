import { Component, OnInit,ViewChild,Injector,ChangeDetectorRef,ElementRef,CUSTOM_ELEMENTS_SCHEMA   } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { IonContent,IonicSlides,ActionSheetController  } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { Platform,ModalController, NavController,AlertController,ToastController,LoadingController,NavParams,IonModal} from '@ionic/angular';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { DatePipe,CommonModule } from '@angular/common';
import { Chart } from 'chart.js';
import { Router,NavigationExtras,ActivatedRoute  } from '@angular/router';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';
import { IonicSelectableComponent } from 'ionic-selectable';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { Chooser } from '@awesome-cordova-plugins/chooser/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@awesome-cordova-plugins/native-geocoder/ngx';
import { Camera, CameraResultType,CameraSource } from '@capacitor/camera';


import { EventsService } from './../services/events.service';
import { SingletonService } from './../services/singleton.service';
import { PagenavService } from './../services/pagenav.service';
import { ExpressionService } from './../services/expression.service';
import { CmService } from './../services/cm.service';
import { TxService } from './../services/tx.service';

interface optionJson {
  [key: string]: any; 
}

interface PresetValue {
  [key: string]: any; 
}

interface takenimage {
  [key: string]: any; 
}

interface imagemeta {
  [key: string]: any; 
}

@Component({
  selector: 'app-paymentreqst-txn',
  templateUrl: './paymentreqst-txn.page.html',
  styleUrls: ['./paymentreqst-txn.page.scss'],
})
export class PaymentreqstTxnPage implements OnInit {

    @ViewChild(IonModal) modal!: IonModal;


    username                  : any;
    networkStatus             : any;
    UserDetails               : any;
    stValues                  : any; 
    networkWarningAlert       : any;
    pid                       : any;
    userid                    : any;
    projectname               : any;
    requiredValue             : any;
    selectedRow               : any;
    jsonUrl                   : any;
    database                  : any;
    geoAddressIdt             : any;   
    base64Str                 : any;
    speech                    : any;
    pagenav                   : any;
    viewJson                  : any;
    ismultitenant             : any;
    fromWhere                 : any;
    geoTagId                  : any;
    currentMedia              : any;   
    preset_map                : any;    
    imgfileName               : any;
    imgfile                   : any;
    imgfilepath               : any;
    image_Detials             : any;
    image_path                : any;
    image_preiview            : any;
    file_name                 : any;   
    imageURI                  : any;
    imgname                   : any;
    imageFileName             : any;
    User                      : any;
    linksqlField              : any; 
    totalAssessableValue      : any;
    total                     : any;
    latitude                  : any;
    longitude                 : any;
    address                   : any;

    eFormId              = "transaction";
    private fileCount    = 0;
    totalAmount          = 0;

    mdata                         : Object              = {};
    optionsJson                   : optionJson          = {}; 
    selectedOptions               : Record<string,any>  = {};
    preset_value                  : PresetValue         = {};
    gridObject                    : Object              = {};
    gridArray                     : Object              = {};
    griddata                      : Object              = {};
    dynamicpopup_key_value_array  : Object              = {};
    takenImage                    : takenimage          = {};
    image_meta                    : imagemeta           = {};
    modifynongrid                 : Object              = {};
    delGrid                       : Object              = {};

    //blobArray:any[]=[];
    tableData                              = [];
    newdata                        : any   = [];
    sqlSelectFieldValue            : any[] = [];
    sqlSelectValue                 : any[] = [];
    elementList                    : any[] = [];
    newarray                       : any   = [];
    newGrid                        : any[] = [];
    newpics                        : any[] = [];
    storedpics                     : any[] = [];
    newdocs                        : any[] = [];
    deleteid                       : any   = [];
    txnWholeCompoenets             : any[] = [];
    frm_booking_detailsarray       : any   = [];   
    frm_booking_detailsdata        : any   = [];


    modelpages: Array < { id: string, component: any  } > = []; 


    public viewMode           : boolean = true  ;
    public modifyMode         : boolean = true  ;
    public fromModal          : boolean = false ;
    public isRapidCalling     : boolean = true  ;
    public linkForm           : boolean = true  ;
    public isntLastslide      : boolean = false ;
    public isntFirstslide     : boolean = false ;
    public EnableSave         : boolean = true  ;
    public modifygrid         : boolean = false ;
    visible                   : boolean = false ;
    currency                  : boolean = false ;
    gst                       : boolean = false ;
    tds                       : boolean = false ;
    gridModify                : boolean = false ;
    isGeoTagExist             : boolean = false ;
    getGeolocation            : boolean = false ;
    focusradio                          = false ;

  constructor( 

          public  activateRoute   : ActivatedRoute,
          public  router          : Router,
          public  navParams       : NavParams,
          public  injector        : Injector,
          private storage         : Storage,
          private http            : HttpClient,
          private geolocation     : Geolocation,
          private nativeGeocoder  : NativeGeocoder,
          private chooser         : Chooser,
          public  file            : File,
          public  actionSheet     : ActionSheetController,
          public  alertCtrl       : AlertController,
          public  loadingCtrl     : LoadingController,
          public  cdr             : ChangeDetectorRef,
          public  navCtrl         : NavController,
          public  singleton       : SingletonService,
          public  myexpression    : ExpressionService,
          public  mytxservice     : TxService,
    ) { 

    this.jsonUrl = 'assets/json/paymentreqst_txn.json';
    this.activateRoute.queryParams.subscribe(_p => {
      const navParams = this.router.getCurrentNavigation()?.extras.state;
      
      });
    this.UserDetails= this.router.getCurrentNavigation()?.extras.state;
    console.log(this.UserDetails);


    if(navParams.get("isModal") != undefined){
      this.fromModal = navParams.get("isModal");
    }
        this.projectname    = this.singleton.projectname;
        this.fromWhere      = navParams.get("fromWhere");
        this.pagenav        = this.injector.get(PagenavService);
        this.pid            = this.singleton.PID;
        this.ismultitenant  = this.singleton.ismultitenant;
         
    
        if (this.UserDetails == undefined) {
    
            this.storage.get('userData').then((loginInfo:any) => {
                        console.log(loginInfo);
                    this.UserDetails = loginInfo;
                    
                if(this.UserDetails !=null){
                   this.setBoolenVar();
                   this.UserDetails['pagetype'] = 'txview';//for differentiate transaction or report in expr.js
                  
                }
            });
        }

    else{
        this.setBoolenVar();
        this.UserDetails['pagetype'] = 'txview';//for differentiate transaction or report in expr.js  
      
        }
        //this.modelpages = [  { id: 'frm_booking_details', component:ItemModalPage} ];
  }

  ngOnInit() {  }

  openModal() {
      this.modal.present();
  }

  backbutton(){
    this.navCtrl.back();
  }


  setBoolenVar(){

    if(this.UserDetails['viewMode']){
            this.viewMode = this.UserDetails['viewMode'];
            delete this.UserDetails['viewMode'];
        }else{
            this.viewMode = false;
        }
        
        if(this.UserDetails['modifyMode']){
            this.modifyMode = this.UserDetails['modifyMode'];
            delete this.UserDetails['modifyMode'];
        }else{
            this.modifyMode = false;
        }
        
        if (this.UserDetails['onthefly']){
            this.isRapidCalling = this.UserDetails['onthefly'];
            delete this.UserDetails['onthefly'];
        }else{
            this.isRapidCalling = false;
        } 
        
        if (this.UserDetails['linkForm']){
            this.linkForm = this.UserDetails['linkForm'];
            Object.assign(this.preset_value,this.UserDetails['linkFormData']); 
            delete this.UserDetails['linkForm'];
            delete this.UserDetails['linkFormData'];
        }else{
            this.linkForm = false;
        } 

  }


  async ionViewDidEnter(){

        console.log('hello ionviewdidenter');
        let initialHiddenComponents: string[] = [];
        this.elementList = [];

        let elements:any;
         elements = document.getElementById('myForm')?.querySelectorAll<HTMLElement>('*[name]');

          if (!elements) return;

          const elementIdList = Array.from(elements)
            .filter((el: any) => el.id &&
              !el.id.startsWith('ion-input') && // Exclude IDs starting with 'ion-input'
              !el.id.startsWith('ion-textarea') // Exclude IDs starting with 'ion-textarea'
            )
            .map((el: any) => el.id);

          let element: any;
          for (let id of elementIdList) {
            element = document.getElementById(id);
            if ((element).tagName !== 'ION-CHECKBOX') {
              this.elementList.push(id);
              if (element.dataset['hidden'] == 'True' || element.dataset['readonly'] == 'True') {
                initialHiddenComponents.push(id);
              }
              else {
                break;
              }
            }
          }


        try {
          const data = await this.http.get('assets/json/paymentreqst_txn.json').toPromise();
          this.viewJson = (data as any)[0];

          // Handle viewJson
          if (this.viewJson['vt'] === 'carousel_lock') {
            this.isntFirstslide = true;
            this.EnableSave     = false;
          }

          const containerMeta = this.viewJson['cont_meta'];
          await this.loadComponents(containerMeta);

          // Handle initial hidden components
          if (initialHiddenComponents.length) {
            this.UserDetails['RECORDID'] = this.UserDetails['RECORDID'] || 0;
            this.myexpression.hiddenElementexp(initialHiddenComponents, this.UserDetails, this.preset_value, this.selectedOptions, "transaction", this, false, this.txnWholeCompoenets, this.viewJson, this.optionsJson, this.dynamicpopup_key_value_array, this.modifyMode);
            this.cdr.detectChanges();
          }

          // Handle events on load
          if(this.viewJson['pos']){
            this.handleLoadEvents(this.viewJson['pos']);
          }
          

          // Load SQL for parent and child containers
          await this.loadSQLForContainers(containerMeta);

          // If user details are present, load record details
          if (this.UserDetails && this.viewMode) {
            await this.loadRecordDetails(data);
          }

          // Initialize map if necessary
          // this.initializeMap();
        } catch (error) {
          console.error('Error during initialization:', error);
        }

  }

  async loadComponents(containerMeta: any[]) {
    for (const component of containerMeta) {
      this.txnWholeCompoenets.push(component['comp_meta']);
      const children = component['children'];
      for (const child of children) {
        this.txnWholeCompoenets.push(child['comp_meta']);
      }
    }
  }

  async loadSQLForContainers(containerMeta: any[]) {
      for (const component of containerMeta) {
        const SqlCompFields = this.filterSqlFields(component['comp_meta']);
        if (SqlCompFields.length) {
          try {
            await this.getOptions("", this.viewJson['idt'], SqlCompFields, component['ctype'], component['db'], component['ct']);
          } catch (error) {
            console.error(`Error loading options for component ${component['idt']}:`, error);
          }
        }
        for (const child of component['children']) {
          const childrenSqlCompFields = this.filterSqlFields(child['comp_meta']);
          if (childrenSqlCompFields.length) {
            try {
              await this.getOptions("", this.viewJson['idt'], childrenSqlCompFields, child['ctype'], child['db'], component['ct']);
            } catch (error) {
              console.error(`Error loading options for child component ${child['idt']}:`, error);
            }
          }
        }
      }
  }


  async loadRecordDetails(data: any) {
    const recordId = this.UserDetails['RECORDID'];
    const parent_table = data[0]['tran_meta'][0]["prm_meta"][0]['tb'];
    const parent_tableid = parent_table + 'id';
    const json = {
      table_list: [], // Initialize as needed
      recordId,
      parent_id: parent_tableid,
      pid: this.pid,
      mlt: this.ismultitenant
    };

    const cont_meta = data[0]['cont_meta'];

    for (let k = 0; k < cont_meta.length; k++) {
        const children = cont_meta[k]['children'];
        this.field_json(json.table_list, cont_meta[k], parent_table); // Populate table_list

        if (children.length > 0) {
          for (let j = 0; j < children.length; j++) {
            this.field_json(json.table_list, children[j], children[j]['db']);
            
            if (children[j]['children'].length > 0) {
              for (let l = 0; l < children[j]['children'].length; l++) {
                this.field_json(json.table_list, children[j]['children'][l], children[j]['children'][l]['db']);
              }
            }
          }
        }
    }

  console.log(json.table_list);

    try {
      const response = await this.mytxservice.getSearchrecord(json);
      await this.presetInputValue(JSON.stringify(response));
    } catch (error) {
      console.error('Error loading record details:', error);
    }
  }

  handleLoadEvents(eventStr: string) {
    if (eventStr) {
      const eventJson = JSON.parse(eventStr);
      try {
        if (!this.viewMode && !this.modifyMode && !this.isRapidCalling) {
          if(eventJson.onformload){
            this.executeEvents(eventJson.onformload.COMPEVENT);
          }
          
        } else if (this.modifyMode || this.isRapidCalling) {
            if(eventJson.afterloaddata){
                this.executeEvents(eventJson.afterloaddata.COMPEVENT);
            }
          
        }
      } catch (e) {
        console.error('Error handling load events:', e);
      }
    }
  }

  executeEvents(events: any[]) {
    if (events) {
      events.forEach((elementEvent:any) => {
        this.myexpression.evaluateEventexp(elementEvent, this.UserDetails, this.viewJson['idt'], this.preset_value);
         this.cdr.detectChanges();
      });
    }
  }

  filterSqlFields(componentsArray:any) {
    // Will only get non-hidden SQL fields
    return componentsArray.filter((item:any) => {
        const isSelectOrRadioOrCheck = ['select', 'radio', 'check', 'email', 'number', 'text', 'sas'].includes(item['wt']);
        const hasSql = item['sql'] != null && item['sql'] !== "";
        const isVisible = item['ih'] === "False";
        
        return hasSql && isVisible && (
            (isSelectOrRadioOrCheck && item['isdep'] === "False") ||
            (isSelectOrRadioOrCheck && item['isdep'] === "True" && (item['wt'] === 'text' || item['wt'] === 'sas' || item['wt'] === 'select'))
        );
    });
}

async getOptions(event:any, eFormId:any, fields:any, ctype:any, dbName:any, datatype:any) {
    let newThis = this;
    for (let i = 0; i < fields.length; i++) {

        let currentField = fields[i];
        let fieldID = ctype === "grid" ? `${currentField['idt']}_${dbName}` : currentField['idt'];
        let widgetType = currentField['wt'];
        let sqlObj = JSON.parse(currentField['sql']);
        let sql = sqlObj["Sql"];
        
        // Handle dynamic SQL replacement
        let dynamic = false;
        if (sql.includes("`${master}`")) {
            dynamic = true;
            sql = sql.replace("`${master}`", `master_${this.preset_value["activecompany"]}`);
        }
        
        let data = {
            fieldType   : "combofield",
            eFormId     : eFormId,
            fieldName   : currentField['idt'],
            projectName : this.singleton.projectname,
            projectId   : this.singleton.PID?this.singleton.PID:newThis.singleton.PID,
            username    : this.UserDetails["USERNAME"],
            type        : "transaction",
            MapValue    : this.myexpression.findParamValues(sql, this.preset_value),
            dynamictable: dynamic ? `master_${this.preset_value["activecompany"]}` : "",
        };

        if (this.focusradio) {
            return; // Early exit if focusradio is true
        }

        console.log(data);

        // Call service
        let loginData = await this.mytxservice.selectService(data);//.subscribe(async (loginData: any[]) => {
            this.sqlSelectFieldValue = loginData;
            console.log(this.sqlSelectFieldValue);

            // Handle different widget types
            if (["select", "check", "radio", "sas"].includes(widgetType)) {
                this.optionsJson[fieldID] = this.sqlSelectFieldValue;
                this.cdr.detectChanges();
            } else {
                if (this.sqlSelectFieldValue.length > 0) {
                    const valueField = sqlObj["value"];
                    if (widgetType === 'date') {
                        this.preset_value[fieldID] = this.formatDate(this.sqlSelectFieldValue[0][valueField]);
                        this.cdr.detectChanges();
                    } else {
                        this.preset_value[fieldID] = this.sqlSelectFieldValue[0][valueField];
                        this.cdr.detectChanges();
                    }
                }
            }
        //});
    }
}

field_json(table_list:any,cont_meta:any,tablename:any){
        let table:Record<any,any> = {};
        let fields =[];
        table['tablename'] = cont_meta['db'];
        let component = cont_meta['comp_meta'];
        fields.push(tablename+"id");
        for(let i =0;i<component.length;i++){
            if(component[i]['cjson'].length>0){
                let compJosn = component[i]['cjson'][0]
                if(compJosn.isdbfield == true){
                    let field = this.fields_get(component[i]);
                    fields.push(field);
                }
                
            }
        }
        table['fields'] = fields;
        table_list.push(table);
}
    
fields_get(component:any){
        let cjson = component['cjson'][0];
        let field_slug = cjson['field_slug'];
        return field_slug
}

dateChange(event:any,id:any){
        console.log(event);
        let datevalue = event.currentTarget.value;
        let formatdate = this.formatDate(datevalue);
        this.preset_value[id] = formatdate;


}

onKeyUp(event: any,farmername:any) {
    if(farmername == "farmername"){
         this.preset_value['farmername'] = event.target.value.toUpperCase();
    }
    else if(farmername == "fathername"){
         this.preset_value['fathername'] = event.target.value.toUpperCase();

    }
   
  }

formatDate(date: any ) {
    // Handle date input as string
    if (typeof date === 'string' && date.includes('/')) {
        const [day, month, year] = date.split('/').map(Number);
        date = new Date(year, month - 1, day); 
    }

    const monthNames = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];

    const d = new Date(date);
    const day = d.getDate().toString().padStart(2, '0'); 
    const month = monthNames[d.getMonth()]; 
    const year = d.getFullYear();

    return `${day}/${month}/${year}`; 
}

onFocus(event:any){

    const element = (event.currentTarget as HTMLElement).dataset;
    const id = element["id"];
    const wholeform = document.getElementsByName('myForm')[0];
    const eformid = wholeform.dataset["eformid"];
    
    
    if (this.focusradio) {
        return;
    }
    if(id && eformid){
      const DOM = document.getElementsByName(id);
      const currentFieldArray = this.getCurrentFieldArray(id);
      
      if (currentFieldArray.length > 0) {
          const currentField = currentFieldArray[0];
          this.UserDetails["CURRENTOBJ"] = currentField["idt"];
          const { wt: widgetType, sql, exp: expr, ct: componentType, moe, sug } = currentField;
          const isSuggestive = sug.toLowerCase() === 'true';
          
          if (this.gridObject) {
              this.UserDetails["grid"] = this.gridObject;
              this.UserDetails["gridArray"] = this.gridArray;
          }

          if (componentType === "AutoField") {
              //this.handleAutoField(id, expr, event);
          } else {
              let DOMArray = Array.from(DOM);
              this.handleNonAutoField(id, expr, event, eformid, currentField, DOMArray, widgetType, moe, isSuggestive, sql);
          }
      }
    }

}

handleNonAutoField(id: string, expr: string, event: any, eformid: string, currentField: any, DOM: Element[], widgetType: string, moe: string, isSuggestive: boolean, sql: string) {
    let formEvent;
    try {
        formEvent = this.viewJson['pos'];
        if (formEvent) {
            formEvent = JSON.parse(formEvent);
        }
    } catch (e) {
        formEvent = "";
    }

    if (formEvent && formEvent.onenter && formEvent.onenter[id]) {
        formEvent.onenter[id].forEach((elementEvent:any) => {
            this.myexpression.evaluateEventexp(elementEvent, this.UserDetails, eformid, this.preset_value);
        });
    }

    if (moe === "tbc") {
        this.evaluateExpressionIfNeeded(event, DOM, currentField, expr);
    } else if (moe === "tbe") {
        if (isSuggestive) {
            this.handleSuggestiveField(id, sql, event, DOM, currentField,expr,eformid);
        } else {
            this.handleNonSuggestiveField(id, sql, event, DOM, currentField,expr,eformid);
        }
    }
}

evaluateExpressionIfNeeded(event: any, DOM: Element[], currentField: any, expr: string) {
    if (expr) {
        try {
            this.myexpression.evaluateExp(event, DOM, currentField, this.UserDetails, this.preset_value);
        } catch (e) {
            console.log(e);
        }
    }
}


handleSuggestiveField(id: string, sql: string, event: any, DOM: Element[],currentField: any, expr: string,eformid:any) {
    if (!this.preset_value.hasOwnProperty(id)) {
        this.preset_value[id] = "";
    }

    if (this.preset_value[id] === "" || this.preset_value[id] === 0) {
        this.fetchOptionsIfNeeded(id, sql, event,DOM, currentField,expr,eformid);
        this.evaluateExpressionIfNeeded(event, DOM, currentField, expr);
    }
}

handleNonSuggestiveField(id: string, sql: string, event: any, DOM: Element[],currentField: any, expr: string,eformid:any) {
    this.fetchOptionsIfNeeded(id, sql, event,DOM, currentField,expr,eformid);
    this.evaluateExpressionIfNeeded(event, DOM, currentField, expr);
}

fetchOptionsIfNeeded(id: string, sql: string, event: any,DOM: Element[],currentField: any, expr: string,eformid:any) {
    if (sql) {
        const sqlValueDependent = currentField["isdep"];
         let componentType = currentField["ct"]; 
        if (sqlValueDependent === "True") {
            this.getOptionsForDependentField(id, event,eformid,componentType);
        } else {
            this.getOptionsForStandardField(id, event,eformid,componentType);
        }
    }
}

getOptionsForDependentField(id: string, event: any,eformid:any,componentType:any) {
    const containerMeta = this.viewJson['cont_meta'];
    for (const container of containerMeta) {
        const componentMeta = container['comp_meta'];
        const filter = componentMeta.filter((item:any) => item['idt'] === id);
        if (filter.length > 0) {
            this.getOptions(event, eformid, filter, container.ctype, container.db, componentType);
            break;
        } else {
            const childrenMeta = container['children'];
            for (const children of childrenMeta) {
                const childFilter = children['comp_meta'].filter((item:any) => item['idt'] === id);
                if (childFilter.length > 0) {
                    this.getOptions(event, eformid, childFilter, children.ctype, children.db, componentType);
                    break;
                }
            }
        }
    }
}

getOptionsForStandardField(id: string, event: any,eformid:any,componentType:any) {
    const sqlValue = event._elementRef.nativeElement.dataset["sqlvalue"];
    let inputValArray: any[];

    // Attempt to retrieve the options for the given ID
    try {
        inputValArray = this.optionsJson[id] || []; // Default to an empty array if undefined
    } catch (err) {
        console.log("Error retrieving options:", err);
        inputValArray = [];
    }

    // Check if there are any options to set
    if (inputValArray.length > 0) {
        const valStr = inputValArray[0][sqlValue];
        const inputElement = document.getElementById(id) as HTMLInputElement;

        if (inputElement) {
            inputElement.value = valStr; // Set the input value
            inputElement.textContent = valStr; // Set the text content
        } else {
            console.log(`Element with id ${id} not found.`);
        }
    } else {
        console.log(`No options available for id ${id}.`);
    }
}



checkBlur(event:any){
   const element = (event.currentTarget as HTMLElement).dataset;

  
  const id = element["id"];
  const eformid = element["eformid"];

  if (id && eformid) {
     let DOM = document.getElementsByName(id);
     const currentFieldArray = this.getCurrentFieldArray(id);


    if (currentFieldArray.length > 0) {
      const currentField = currentFieldArray[0];
      const { moe, expr, vep: vexpr } = currentField;

      // Evaluate expression based on mode
      if (moe === "tbc" || (moe === "tbe" && currentField.sug.toLowerCase() !== 'true')) {
        this.myexpression.evaluateExp(event, DOM, currentField,this.UserDetails,this.preset_value);
                
      }

      // Check for expression evaluation based on vexpr
      if (vexpr) {
        this.UserDetails['preset_value'] = this.preset_value;
        const value = this.myexpression.getExpressionValue(vexpr, this.UserDetails, eformid);
        if (value.toString().toUpperCase() !== "T") {
          // this.events.txloadDismiss();
        }
      }
    }

    // Handle form events
    this.handleFormEvent(id,eformid);
    
    // Check for next hidden elements
    this.next_hiddenelements(id);
  }

}

getCurrentFieldArray(id: any): any[] {
  return this.txnWholeCompoenets.reduce((acc:any, components:any) => {
    return acc.concat(components.filter((item:any) => item['idt'] === id));
  }, []);
}

handleFormEvent(id: string,eformid:string) {
  let formEvent ;
  try {
      formEvent = this.viewJson['pos'];
      if (formEvent) {
        formEvent = JSON.parse(formEvent); // Keep it as a generic object
      }
    } catch (e) {
      formEvent = "";
  }


  if (formEvent && typeof formEvent === 'object' && formEvent.onexit && formEvent.onexit[id]) {
    for (const elementEvent of formEvent.onexit[id]) {
      this.myexpression.evaluateEventexp(elementEvent, this.UserDetails, eformid, this.preset_value);
    }
  }
}

sasChange(event:any, id:any){
  console.log('port:', event.value);
  this.preset_value[id]= event.value;
}

checkChange($event: any, elemtId: string): void {
    let choosenValue = $event;

    try {
        if ($event._componentName === "checkbox") {
            this.handleCheckboxChange($event, elemtId);
        } else {
            try {
              const widgetType = document.getElementById(elemtId)?.dataset['widgettype'];

              if (widgetType === "sas" || $event.currentTarget.dataset['widgettype'] === 'select') {
                 const filterComp = this.txnWholeCompoenets.find(comp => 
                                        comp.some((item:any) => item['idt'] === elemtId)
                                    )?.filter((item:any) => item['idt'] === elemtId) || [];

                  if (filterComp && filterComp.length === 1) {
                      const valueId = JSON.parse(filterComp[0].sql).value;
                      const value = $event.value ? $event.value[valueId] : $event.currentTarget.value;
                      choosenValue = value;
                      this.selectedOptions[elemtId] = value;
                  }
              }
          } catch (e) {
              console.error("Error handling other change:", e);
              this.selectedOptions[elemtId] = $event;
          }
        }
    } catch (err) {
        console.error("Error in checkChange:", err);
    }

    // Set value for logical field
    this.setValueForLogicalField(elemtId, choosenValue, "");

    // Handle radio group UI updates
    this.updateRadioGroupUI(elemtId);

    // Handle events based on the current value
    this.triggerOnChangeEvent(elemtId);
}

 handleCheckboxChange($event: any, elemtId: string): void {
    const check_array = {
        id: $event._elementRef.nativeElement.id,
        checked: $event._value,
        value: $event._elementRef.nativeElement.dataset.value
    };

    if (this.selectedOptions[elemtId]) {
        const index = this.selectedOptions[elemtId].findIndex((item:any) => item.id === check_array.id);
        if (index !== -1) {
            this.selectedOptions[elemtId][index] = { ...this.selectedOptions[elemtId][index], ...check_array };
        } else {
            this.selectedOptions[elemtId].push(check_array);
        }
    } else {
        this.selectedOptions[elemtId] = [check_array];
    }
}

 

 updateRadioGroupUI(id: string): void {
    const radioGroup = document.getElementsByName(id)[0]?.attributes.getNamedItem('radio-group');
    if (radioGroup) {
        const combObj = document.getElementsByName(id)[0]?.children;
        if (combObj) {
            for (let j = 1; j < combObj.length; j++) {
                const child = combObj[j].firstChild as Element; // Assert that firstChild is an Element
                if (child instanceof Element) {
                    const lastChild = child.lastElementChild;


                    if (lastChild && lastChild.firstChild instanceof Element) {
                        (lastChild.firstChild as Element).className = "radio-icon"; 
                    }
                }
            }
        }
    }
}

 triggerOnChangeEvent(id: string): void {
    const wholeForm = document.getElementsByName('myForm')[0];
    const eformId = wholeForm?.dataset["eformid"];
    const eventStr = this.viewJson?.pos;

    if (eventStr) {
        const eventJson = JSON.parse(eventStr);
        if (eventJson.onchange?.[id]) {
            for (const elementEvent of eventJson.onchange[id]) {
                this.myexpression.evaluateEventexp(elementEvent, this.UserDetails, eformId, this.preset_value);
            }
        }
    }
    
    this.next_hiddenelements(id);
}

setValueForLogicalField(id: string, choosenValue: any, datatype?: string) {
    let selectedOptionValues: { [key: string]: any } = {};
    let filterComp: any[];
    let sqljson: any = null;

    // Find the component related to the given ID
    for (const component of this.txnWholeCompoenets) {
        filterComp = component.filter((item:any) => item['idt'] === id);

        if (filterComp.length > 0) {
            sqljson = JSON.parse(filterComp[0].sql);
            break; // Exit loop once we find the matching component
        }
    }

    // Determine the datatype
    if (!datatype || datatype.length === 0) {
        const cjsonStr = document.getElementById(id)?.dataset['referjson'];
        const cjson = cjsonStr ? JSON.parse(cjsonStr) : [];
        datatype = cjson[0]?.datatype || '';
    }

    // Process for OneToOneField datatype
    if (datatype === "OneToOneField") {
        const logicalFieldValues = this.optionsJson[id];

        if (logicalFieldValues) {

          let propertyKey = sqljson['value'];
            let selectObj = logicalFieldValues.find((item:any) => choosenValue == item[propertyKey]);


            if (selectObj) {
                for (const key in selectObj) {
                    if (selectObj.hasOwnProperty(key)) {
                        const logicalFieldID = `logical_${id}_${key}`;
                        this.preset_value[logicalFieldID] = selectObj[key];
                    }
                }

                this.preset_value[`${sqljson['value']}displayname`] = selectObj[sqljson['key'].trim()];
            }
        }
    }

    this.cdr.detectChanges();
}


next_hiddenelements(elemtId: string) {
    // Get the next hidden elements for SQL and EXP
    const nextHiddenComponents: string[] = [];
    //const elementIdList: string[] = [];

    const elements = document.getElementById('myForm')?.querySelectorAll<HTMLElement>('*[name]');

    if (!elements) return; // Safeguard against null

    const elementIdList = Array.from(elements)
    .filter((el:any) => el.id && 
        !el.id.startsWith('ion-input') && // Exclude IDs starting with 'ion-input'
        !el.id.startsWith('ion-textarea') // Exclude IDs starting with 'ion-textarea'
    )
    .map((el:any) => el.id);

    // Filter out unique IDs
    const unique = Array.from(new Set(elementIdList));
    const remainingArray = unique.slice(unique.indexOf(elemtId) + 1);

    for (const id of remainingArray) {
        const element = document.getElementById(id);
        if (element) {
            const isHidden = element.dataset['hidden'] === "True";
            const isReadOnly = element.dataset['readonly'] === "True";
            const isSqlValueDependent = element.dataset['sqlvaluedependent'] === "True";

            if (isHidden || isReadOnly ) {
                nextHiddenComponents.push(id);
            } else {
                break; // Stop if a non-hidden element is encountered
            }
        }
    }

    if (nextHiddenComponents.length) {
        this.myexpression.hiddenElementexp(nextHiddenComponents,this.UserDetails,this.preset_value,this.selectedOptions,"transaction",this,false,this.txnWholeCompoenets,this.viewJson,this.optionsJson,this.dynamicpopup_key_value_array,this.modifyMode);
    }
}


save(event:any){

  let action_meta = this.viewJson.action_meta || [];
  let saveExp = ""; // Default value

  if (action_meta.length > 0) {
      const saveAction = action_meta.find((item:any) => item['at'] === 'Save');

      if (saveAction && saveAction.save && saveAction.save.pos) {
          saveExp = saveAction.save.pos;
      }
  }


 let saveStatus = this.mytxservice.saveJson(this.UserDetails,this.jsonUrl,"tr",this.selectedOptions,this.pagenav,this.preset_value,saveExp,this.isRapidCalling,this.modifyMode,this.gridArray);
    

}


presetInputValue(dataset: string): Promise<any> {
  return new Promise((resolve, reject) => {
    this.http.get(this.jsonUrl, { responseType: 'json' }).subscribe(
      (data:any) => {
        console.log(data);
        const content_meta = data[0]['cont_meta'];
        const eupdate_meta = data[0]['eupdate_meta'];
        const datasetValue = JSON.parse(dataset);
        const vtype = data[0]['vt'];
        let gp_choices = data[0]['gp_op'];

        // Iterate through content_meta
        for (let j = 0; j < content_meta.length; j++) {
          const children = content_meta[j]['children'];
          const identifiers = content_meta[j]['idt'];
          const component = content_meta[j]['comp_meta'];
          const ctype = content_meta[j]['ctype'];
          const datatype = content_meta[j]['ct'];
          const table_name = content_meta[j]['db'];
          const required_value = datasetValue[table_name];

          if (vtype === "carousel_lock") {
            gp_choices = content_meta[j]['cn_gp'];
          }

          this.setValues(component, ctype, required_value, identifiers, table_name, gp_choices, datatype);

          // Handle child components
          if (children.length > 0) {
            for (let k = 0; k < children.length; k++) {
              const c_children = children[k]['children'];
              const c_component = children[k]['comp_meta'];
              const c_identifiers = children[k]['idt'];
              const c_ctype = children[k]['ctype'];
              const c_table_name = children[k]['db'];
              const c_required_value = datasetValue[c_table_name];

              if (vtype === "carousel_lock") {
                gp_choices = children[k]['cn_gp'];
              }

              this.setValues(c_component, c_ctype, c_required_value, c_identifiers, c_table_name, gp_choices, datatype);
            }
          }
        }

        // Handle eupdate_meta
        

        console.log(dataset);
        resolve(true); // Resolve the promise successfully
      },
      error => {
        console.error('Error fetching JSON data:', error);
        reject(error); // Reject the promise in case of error
      }
    );
  });
}

async setValues(comp: any[], ctype: string, dataset: any, idt: string, tb_name: string, gpchoices: any, datatype: string) {
  if (ctype === 'card' || ctype === 'list') {
    for (let i = 0; i < comp.length; i++) {
      const id = comp[i]['idt'];
      if (comp[i]["cjson"]?.length > 0) {
        const cjson = comp[i]['cjson'][0];
        const widget = comp[i]['wt'];
        
        if (cjson['isdbfield']) {
          const value = dataset[0][id];
          
          switch (widget) {
            case 'check':
              if (value) {
                const enums = cjson['enum_meta'];
                const valuesArray = value.split(',');
                
                for (const val of valuesArray) {
                  const filter = enums.find((item:any) => item['value'] === val);
                  if (filter) {
                    const checkId = `${id}_${filter['key']}`;
                    this.preset_value[checkId] = true;
                  }
                }
              }
              break;

            case 'geotag':
             // initialize(value); // Assuming initialize is defined elsewhere
              break;

            case 'geopoint':
              // this.preset_map = value;
              // const [lat, long] = value.split(',');
              // this.mapaccess.setmapLocation(lat, long); // Assuming mapaccess is defined elsewhere
              break;

            case 'select':
              await this.handleSelectWidget(id, value, cjson, dataset,ctype,comp,idt,tb_name,i+1);
              break;

            case 'sas':
              await this.handleSASWidget(id, value, cjson, dataset,ctype,comp,idt,tb_name,i+1);
              break;

            case 'date':
              if (value) {
                const [year, month, day] = value.split("-");
                this.preset_value[id] = `${day}/${month}/${year}`;
              }
              break;

            default:
              if (value) {
                this.preset_value[id] = value; // Handle default case
              }
          }
        }
      }
    }
  }
}

async handleSelectWidget(id: string, value: any, cjson: any, dataset: any,ctype:any,comp:any,idt:any,tb_name:any,nextIdx:any) {
  if (!this.optionsJson[id] || this.optionsJson[id].length === 0) {
    const dbName = this.viewJson['cont_meta'][0].db;
    const datatype = cjson['datatype'];
    const eFormId = this.viewJson['idt'];
    let filterComp;

    for (const component of this.txnWholeCompoenets) {
        filterComp = component.filter((item:any) => item['idt'] === id);

        if (filterComp.length > 0) {
            
            break; 
        }
    }
    
    if (filterComp) {
     await this.getdependedOptions("", eFormId, filterComp, ctype, dbName, datatype, dataset, id, this.preset_value, comp, idt, tb_name,  nextIdx);
    }
  } else {
    this.preset_value[id] = dataset[0][id]?.toString() || '';
  }
}

async handleSASWidget(id: string, value: any, cjson: any, dataset: any,ctype:any,comp:any,idt:any,tb_name:any,nextIdx:any) {
  if (!this.optionsJson[id] || this.optionsJson[id].length === 0) {
    const dbName = this.viewJson['cont_meta'][0].db;
    const datatype = cjson['datatype'];
    const eFormId = this.viewJson['idt'];
    let filterComp;

    for (const component of this.txnWholeCompoenets) {
        filterComp = component.filter((item:any) => item['idt'] === id);

        if (filterComp.length > 0) {
            
            break; 
        }
    }
   
    if (filterComp) {
     await this.getdependedOptions("", eFormId, filterComp, ctype, dbName, datatype, dataset, id, this.preset_value, comp, idt, tb_name, nextIdx);
    }
  }
}

async getdependedOptions(event: any,eFormId: string,fields: any[],ctype: string,dbName: string,datatype: string,dataset: any,id: string,presetvalue: any,comp: any[],idt: string,tb_name: string,nextIdx: number) {
  for (const currentField of fields) {
    const fieldID = ctype === "grid" ? `${currentField['idt']}_${dbName}` : currentField['idt'];
    const widgetType = currentField['wt'];
    const sqlObj = JSON.parse(currentField['sql']);
    let dynamic = false;
    let sql = sqlObj["Sql"];

    // Handle dynamic SQL
    if (sql.includes("`${master}`")) {
        dynamic=true;
      sql = sql.replace("`${master}`", `master_${this.preset_value["activecompany"].toLowerCase()}`);
    }

    const sqlDbType = sqlObj["sqlDbType"];
    const paramStr = this.myexpression.findParamValues(sql, this.preset_value);

    if (this.focusradio) {
      return; // Early return if focusradio is set
    }

    if (sqlDbType === "server") {
      const data = {
                    fieldType: "combofield",
                    eFormId: eFormId,
                    fieldName: currentField['idt'],
                    projectName: this.singleton.projectname,
                    projectId: this.singleton.PID,
                    username: this.UserDetails["USERNAME"],
                    type: "transaction",
                    MapValue: paramStr,
                    dynamictable: dynamic ? `master_${this.preset_value["activecompany"].toLowerCase()}` : "",
                  };
      console.log(data); 

      try {
        const loginData = await lastValueFrom(this.mytxservice.customSelectService(data));
        await this.handleServiceResponse(widgetType, id, datatype, dataset, loginData, presetvalue, comp, ctype, tb_name,  nextIdx);
      } catch (error) {
        console.error('Error fetching data from the server:', error);
      }
    }
  }
}


async handleServiceResponse(widgetType: string,id: string,datatype: string,dataset: any,loginData: any,presetvalue: any,comp: any[],ctype: string,tb_name: string,nextIdx: number) {
  // this.sqlSelectFieldValue = loginData;
  // console.log(this.sqlSelectFieldValue); 

  this.optionsJson[id] = loginData;

  if (widgetType === "select" || widgetType === "check" || widgetType === "radio") {
    await this.updatePresetValuesForSelect(id, datatype, dataset,ctype);
   // this.setValuesRecursive(comp, ctype, dataset, idt, tb_name, gpchoices, datatype, nextIdx, this);
  } else if (widgetType === "sas") {
    await this.updatePresetValuesForSAS(id, datatype, dataset,ctype);
    //this.setValuesRecursive(comp, ctype, dataset, idt, tb_name, gpchoices, datatype, nextIdx, this);
  }
}

async updatePresetValuesForSelect(id: string, datatype: string, dataset: any,ctype:any) {
  if (datatype === "OneToOneField" && ctype === "grid") {
    //this.modifyGridLogicalField(id, dataset[id], datatype, dbName);
    this.preset_value[id] = dataset[id].toString();
  } else {
    await this.setValueForLogicalField(id, dataset[0][id], datatype);
    this.preset_value[id] = dataset[0][id].toString();
  }
}

async updatePresetValuesForSAS(id: string, datatype: string, dataset: any,ctype:any) {
    let newthis = this;
  if (datatype === "OneToOneField" && ctype === "grid") {
    //this.modifyGridLogicalField(id, dataset[id], datatype, dbName);
  } else {
    
     if (document.getElementById(id)) {
            const sqlvalueid = document.getElementById(id)!.dataset['sqlvalue'];

            if (newthis.optionsJson[id] && sqlvalueid) {
                newthis.preset_value[id] = newthis.optionsJson[id].find((m: any) => m[sqlvalueid] === dataset[0][id]);
            }

            await newthis.setValueForLogicalField(id, dataset[0][id], datatype);
    } 
    else {
         console.log(`Element with id ${id} not found.`);
    }
    
  }
}



  getlocation(){

    console.log("get location");
    this.geolocation.getCurrentPosition().then((resp:any) => {
        console.log(resp);
      this.latitude=resp.coords.latitude;
      this.longitude=resp.coords.longitude;
       this.getAddress(this.latitude, this.longitude);
    }).catch((error:any) => {
      console.log('Error getting location', error);
    });
  }

 nativeGeocoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  };
  // get address using coordinates
  getAddress(lat:any,long:any){
    this.nativeGeocoder.reverseGeocode(lat, long, this.nativeGeocoderOptions)
    .then((res: NativeGeocoderResult[]) => {
      this.address = this.pretifyAddress(res[0]);
      this.preset_value['address']=this.address;
      this.preset_value['latitude']=this.latitude;
      this.preset_value['longitude']=this.longitude;
    })
    .catch((error: any) => {
      alert('Error getting location'+ JSON.stringify(error));
    });
  }

   pretifyAddress(address:any){
    console.log (address);
    let obj = [];
    let data = "";
    for (let key in address) {
      obj.push(address[key]);
    }
    obj.reverse();
    for (let val in obj) {
      if(obj[val].length)
      data += obj[val]+', ';
    }
    return data.slice(0, -2);
  }

 chooseDocs(imageid:any){
        this.chooser.getFile().then( async (file:any) => {
            console.log(file);            
          let docData=file;
  
     
    this.imageURI =docData.dataURI ;
     var path=docData.uri;
     var filename=docData.name;
     var docType=docData.mediaType;

  
        this.takenImage[imageid] = this.imageURI;
                    let obj:Record<any,any> = {};
                    obj['filename'] = filename;
                    obj['mediaType']=docType;
                    obj['path'] = path;
                    obj['uploadstatus'] = false;
                    obj['imageData'] = this.imageURI;
                    obj['imagefromWhere'] = "taken";
                    this.image_meta[imageid] = obj;
       
        
 
  
    // let details = imageData.split('/');
     this.file_name=filename;
    }); 
}

async takePic(sourceType:any,imageid:any){

              const image = await Camera.getPhoto({
                source:sourceType,
                quality: 90,
                allowEditing: false,
                resultType: CameraResultType.DataUrl
              });

              console.log (image);

                const currentDate = new Date();
                const imageName = `img_${currentDate.getFullYear()}${currentDate.getMonth()+1}${currentDate.getDate()}${currentDate.getHours()}${currentDate.getMinutes()}${currentDate.getSeconds()}.jpeg`;
                console.log(imageName);               
                    this.takenImage[imageid] = image.dataUrl;
                    let obj:Record<any,any> = {};
                    obj['filename'] = imageName;                    
                    obj['mediaType']="image/"+image.format;
                    obj['uploadstatus'] = false;
                    obj['imageData'] = image.dataUrl;
                    obj['imagefromWhere'] = "taken";
                    this.image_meta[imageid] = obj;              
               
            
           }

async upload($event:any){
         let imageid  = $event['currentTarget']['id'];
        let actionSheet =await this.actionSheet.create({
            header: 'Select Files',
            buttons: [
            {
                text: 'Choose Docs',
                handler: async () => {
                    console.log('Choose photo clicked');
                    this.newpics=[];
                    this.storedpics=[];
                    if (this.newdocs.length < 1){
                        this.chooseDocs(imageid);
                    }
                    if (this.newdocs.length >= 1){
                        let alert =await this.alertCtrl.create({
                            header: 'Alert',
                            subHeader: 'Only 1 documents can be uploaded.',
                            buttons: ['Dismiss']
                        });
                      await  alert.present();
                    
                    }
                    
                  
                }
            },
            {
                text: 'Take Photo',
                handler:async () => {
                    console.log('Take Photo clicked');
                    this.storedpics=[];
                    this.newdocs=[];
                    if (this.newpics.length < 1){
                       // this.takePicture(this.camera.PictureSourceType.CAMERA,imageid);
                        this.takePic(CameraSource.Camera,imageid);
                    }
                    if (this.newpics.length == 1){
                        let alert =await this.alertCtrl.create({
                            header: 'Alert',
                            subHeader: 'Only 1 photos can be uploaded...',
                            buttons: ['Dismiss']
                        });
                       await alert.present();
                    
                    }
                    
                    
                }
            },
           
            {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
            }]
        });

       await actionSheet.present();
        
        
    }

    async uploadImage(imageid:any){
        const loading =await this.loadingCtrl.create({
                    spinner: null,
                    message: 'Please Wait Image Uploading...'
                });

             await loading.present();
        this.mytxservice.upload(this.image_meta[imageid],this.preset_value,imageid,loading);
          
    }
    
    deleteuploadImage(imageid:any){
        let image_obj = this.image_meta[imageid];
        let imd_id = this.preset_value[imageid];
        let imagefromWhere = image_obj['imagefromWhere'];
        if(imd_id){
           this.mytxservice.deleteImage(imd_id).subscribe((data:any) => {},
        error => {
        console.log(error);
      });
        }       
        this.preset_value[imageid] = "";
        this.image_meta[imageid] = {};
        this.takenImage[imageid] = undefined;
        if(imagefromWhere == "taken"){
            this.file.removeFile(image_obj['path'],image_obj['filename']).then((data:any) => {
                console.log('Directory exists')
                this.preset_value[imageid] = "";
            }).catch((err:any) => console.log('Directory doesn\'t exist'));
        }
        else{
           this.preset_value[imageid] = "";
        }
            
    
    }

}
