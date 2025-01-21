import { Component, NgModuleRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { AlertController, IonDatetime, ModalController, NavController, NavParams } from '@ionic/angular';
import { SingletonService } from '../services/singleton.service';
import { EventsService } from '../services/events.service';
import { TxService } from '../services/tx.service';
import { ExpressionService } from '../services/expression.service';
import { format, parseISO } from 'date-fns';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage-angular';


@Component({
  selector: 'app-reportparammodal',
  templateUrl: './reportparammodal.page.html',
  styleUrls: ['./reportparammodal.page.scss'],
})
export class ReportparammodalPage implements OnInit {

  @ViewChild('dynamicTemplate', { read: ViewContainerRef }) viewContainerRef: any;
  @ViewChild(IonDatetime, { static: true })
  datetime!: IonDatetime;

  preset_value: { [key: string]: string } = {};
  selectId: any;
  subtitles: any;
  projectname: any;
  UserDetails: any;
  sqlSelectFieldValue: any[] = [];
  rptName: any;
  optionsJson: { [key: string]: any } = {};
  selectedOptions: { [key: string]: string } = {};
  elementList: any[] = [];
  isAllHiddenParams: Boolean = false;
  paramsArray: any[] = [];
  modify: any;
  dynamicpopup_key_value_array: any = {};

  constructor(public navCtrl: NavController, 
    public modalCtrl: ModalController, 
    private storage: Storage, 
    public alertCtrl: AlertController, 
    public events: EventsService, 
    public mytxservice: TxService, 
    public myexpression: ExpressionService,
    public singleton: SingletonService, 
    public navParams: NavParams, 
    private _m: NgModuleRef<any>, 
    private route: ActivatedRoute) {

    console.log('hello Reportparam modal Page');
    this.projectname = this.singleton.projectname;
    this.UserDetails = this.navParams.get("userdetails");
    this.subtitles = this.navParams.get("jsonVal");
    this.rptName = this.subtitles.idt;

    if (!this.UserDetails) {
      this.storage.get('userObj').then((loginInfo) => {
        this.UserDetails = loginInfo;
        this.UserDetails['pagetype'] = 'txview';//for differentiate transaction or report in expr.js
      });
    }
    else {
      this.UserDetails['pagetype'] = 'txview';//for differentiate transaction or report in expr.js
    }


    this.paramsArray = this.subtitles.reportparamfield_meta;
    this.paramsArray.sort(function (a, b) {
      return a.do - b.do;
    })


  }

  ngOnInit() { }

  ionViewWillEnter() {
    console.log('ionViewDidLoad Cashbalancemodal_rptPage');

    let projectId = this.subtitles['pid'];
    let formid = this.rptName + "paramForm";
    const formElement = document.getElementById(formid);

    if (formElement) { 
      let elements = formElement.querySelectorAll('*[name]');

       this.elementList = Array.from(elements)
            .filter((el:any) => el.id && 
                !el.id.startsWith('ion-input') && // Exclude IDs starting with 'ion-input'
                !el.id.startsWith('ion-textarea') // Exclude IDs starting with 'ion-textarea'
            )
            .map((el:any) => el.id);

      // for (let i = 0; i < elementIdList.length; i++) {
      //   if (elements[i].id !== "") {
      //     this.elementList.push(elements[i].id);
      //   }
      // }

      let initalHiddenComponents: any[] = [];
      let nonHiddencomponents: any[] = [];

      for (let i of this.elementList) {
        const element = document.getElementById(i);
        if (element) { 
          if (element.dataset['hidden'] === "True" || element.dataset['readonly'] === "True") {
            initalHiddenComponents.push(i);
          } else {
            nonHiddencomponents.push(i);
          }
        }
      }


      if (initalHiddenComponents.length !== 0) {
         
        this.myexpression.hiddenElementexp(initalHiddenComponents,  this.UserDetails, this.preset_value, this.selectedOptions, "report", this, this.isAllHiddenParams, this.paramsArray, this.subtitles, this.optionsJson, this.dynamicpopup_key_value_array,this.modify,);
      }

      if (nonHiddencomponents.length !== 0) {
        this.myexpression.hiddenElementexp(nonHiddencomponents, this.UserDetails, this.preset_value, this.selectedOptions, "report", this, this.isAllHiddenParams, this.paramsArray, this.subtitles, this.optionsJson, this.dynamicpopup_key_value_array,this.modify,);
      }

      // NON-HIDDEN NON-DEPENDENT SQL COMPONENTS
      let SqlCompFields = this.filterSqlFields(this.paramsArray);
      if (SqlCompFields.length > 0) {
        this.getOptions(this.rptName, projectId, SqlCompFields);
      }
    } else {
      console.error(`Element with id '${formid}' not found.`);
    }
  }


  formatDate(value: string) {
    return format(parseISO(value), 'dd-MMM-yyyy');
  }

  viewReport() {
    this.modalCtrl.dismiss(this.preset_value);
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }




  checkfocus(event: any) {
    this.selectId = event.currentTarget.id;
  }

  checkBlur(event: any) {
    console.log(event);
    let id = event.currentTarget.dataset["id"];
    this.next_hiddenelements(id);
  }

  checkChange($event: any, elemtId: any) {
    //NEXT HIDDEN ELEMENTS
    this.next_hiddenelements(elemtId);
    this.selectedOptions[elemtId] = $event;
  }

  dateChange(event: any, idt: any) {
    console.log(event);
    let datevalue = event.currentTarget.value;
    let formatdate = this.formatDate(datevalue);
    this.preset_value[idt] = formatdate;
  }

  onFocus(event: any) {

    let elelmentId = event.currentTarget.dataset["id"];
    let currentFieldArray = this.paramsArray.filter((item) => {
      return (item['idt'] == elelmentId)
    });
    if (currentFieldArray.length > 0) {
      let currentField = currentFieldArray[0];
      let DOM = document.getElementsByName(elelmentId);
      let eFormId = this.subtitles['idt'];
      let projectId = this.subtitles['pid'];
      let sql = currentField["sql"];
      let expr = currentField["exp"];
      let widget = currentField["wt"];
      let sqlValueDependent = currentField["isdep"];

      //IF FIELD HAVE SQL
      if (sql != null && sql != "") {
        if (sqlValueDependent == "True" || widget == "dynamic_popup") {
          this.getOptions(eFormId, projectId, currentFieldArray);

        }
        else {
          if (widget == "select") {
            this.getOptions(eFormId, projectId, currentFieldArray);

          }
          else {
            let sqlValue = currentField["vf"];
            let inputValArray: any;
            try {
              inputValArray = this.optionsJson[elelmentId]
            }
            catch (err) {
              inputValArray = [];
            }
            if (inputValArray != undefined) {
              if (inputValArray.length > 0) {
                let valStr = inputValArray[0][sqlValue];
                (<HTMLInputElement>document.getElementById(elelmentId)).value = valStr;
                (<HTMLInputElement>document.getElementById(elelmentId)).textContent = valStr;
              }

            }
          }
        }
      }

      //IF FIELD HAVE EXPRESSION
      else if (expr != null && expr != "") {
        this.UserDetails['pagetype'] = 'txview';
        this.myexpression.evaluateExp(event, DOM, currentField, this.UserDetails, this.preset_value);
      }
    }
  }

  filterSqlFields(componentsArray: any) {
    let sqlCompFields = componentsArray.filter((item: any) => {
      return (item['wt'] == 'select' && item['sql'] != null && item['sql'] != "" && item['ih'] == "False" && item['isdep'] == "False") ||
        (item['wt'] == 'Text' && item['sql'] != null && item['sql'] != "" && item['ih'] == "False" && item['isdep'] == "False")
    });
    return sqlCompFields;

  }


  async getOptions(eFormId: any, projectId: any, fields: any) {

    for (let i = 0; i < fields.length; i++) {

      let currentField: any = fields[i];
      console.log(currentField);
      let sqlObj = currentField['sql'];
      let widgetType = currentField['wt'];
      let key = currentField['df'];
      let value = currentField['vf'];

      let data = {
        fieldType: "combofield",
        eFormId: eFormId,
        fieldName: currentField['idt'],
        projectName: this.singleton.projectname,
        projectId: this.singleton.PID,
        username: this.UserDetails["USERNAME"],
        type: "report",
        MapValue: this.myexpression.findParamValues(sqlObj, this.preset_value),
      };
      console.log(data);

      let loginData = await this.mytxservice.selectService(data);
      this.sqlSelectFieldValue = loginData;
      console.log(this.sqlSelectFieldValue);
      this.optionsJson[currentField['idt']] = this.sqlSelectFieldValue;
      if (widgetType == "select" || widgetType == "check" || widgetType == "radio") {
        this.optionsJson[currentField['idt']] = this.sqlSelectFieldValue;
      }
      else if (widgetType == "dynamic_popup") {
        this.optionsJson[currentField['idt']] = this.sqlSelectFieldValue;

        let inputArray: any = [];
        let isChecked = false;

        for (let i = 0; i < this.sqlSelectFieldValue.length; i++) {
          if (this.preset_value[currentField['idt']] != null && this.preset_value[currentField['idt']] != undefined && this.preset_value[currentField['idt']] == this.sqlSelectFieldValue[i][value]) {
            isChecked = true;
          }
          else {
            isChecked = false;
          }
          inputArray.push({
            type: 'radio',
            label: this.sqlSelectFieldValue[i][key],
            value: this.sqlSelectFieldValue[i][value],
            checked: isChecked
          })

        }

        let radioAlert = await this.alertCtrl.create({
          header: 'select',

          buttons: [{
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              console.log('Confirm Cancel');
            }
          }, {
            text: 'Ok',
            handler: (data) => {
              console.log("Ordered", data);
              this.preset_value[currentField['idt']] = data;
              let resArray = this.optionsJson[currentField['idt']].filter((item: any) => {
                return (item[value] == data)
              });
              if (resArray.length == 1) {
                this.dynamicpopup_key_value_array[currentField['idt']] = resArray[0][key];
              }
            }
          }
          ],
          inputs: inputArray
        });
        await radioAlert.present();


      }




    }
  }


  next_hiddenelements(id: any) {
    let nextHiddenComponents: any[] = [];
    let elementIdList: string[] = [];
    let formid = this.rptName + "paramForm";
    const formElement = document.getElementById(formid);
  
    if (formElement) { 
      let elements = formElement.querySelectorAll('*[name]');
  
      for (let i = 0; i < elements.length; i++) {
        if (elements[i].id !== "") {
          elementIdList.push(elements[i].id);
        }
      }
  
      const unique = elementIdList.filter((elem, index, self) => index === self.indexOf(elem));
      const remainingArray = unique.slice((unique.indexOf(id) + 1));
  
      for (let i of remainingArray) {
        const element = document.getElementById(i);
        if (element && element.dataset['hidden'] === "True") { 
          nextHiddenComponents.push(i);
        } else {
          break;
        }
      }
  
      if (nextHiddenComponents.length !== 0) {
        this.myexpression.hiddenElementexp(
          nextHiddenComponents,
          this.UserDetails,
          this.preset_value,
          this.selectedOptions,
          "report",
          this,
          false,
          this.paramsArray,
          this.subtitles,
          this.optionsJson,
          this.dynamicpopup_key_value_array,
          this.modify
        );
      }
    } else {
      console.error(`Element with id '${formid}' not found.`);
    }
  }
  



}
