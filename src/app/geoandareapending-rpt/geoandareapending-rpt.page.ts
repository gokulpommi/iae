import { Component, OnInit,ViewChild,Injector,ElementRef  } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { Platform,ModalController, NavController,AlertController,ToastController,LoadingController,NavParams} from '@ionic/angular';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { DatePipe } from '@angular/common';
import { Chart } from 'chart.js';
import { Router,NavigationExtras,ActivatedRoute  } from '@angular/router';




import { EventsService } from './../services/events.service';
import { SingletonService } from './../services/singleton.service';
import { PagenavService } from './../services/pagenav.service';
import { ExpressionService } from './../services/expression.service';
import { CmService } from './../services/cm.service';
import { TxService } from './../services/tx.service';

import { ReportparammodalPage } from './../reportparammodal/reportparammodal.page';



declare var cordova : any;
declare var Mustache:any;
declare var RazorpayCheckout: any;

interface optionJson {
  [key: string]: any; 
}

interface PresetValue {
  [key: string]: any; 
}

@Component({
  selector: 'app-geoandareapending-rpt',
  templateUrl: './geoandareapending-rpt.page.html',
  styleUrls: ['./geoandareapending-rpt.page.scss'],
})
export class GeoandareapendingRptPage implements OnInit {


    @ViewChild('Canvas') Canvas!: ElementRef<HTMLCanvasElement>;
    subtitles: any;
    reportSlug : any;
    projectname: any;
    reportid: any;
    show_grand_total: any;
    groupfield: any;
    columnproperty: any;
    reports: any;
    title: any;
    titles: any;
    reportfield: any;
    values: any;
    LoginDetails: any;
    username: any;
    jsonUrl: any;
    methodparam : any;
    names: any[] = [];
    datass:any[] = [];
    //inputValue: string;
    sqlSelectFieldValue: any[] = [];    
    jsonObj: any;
    column: any;
    UserDetails: any;
    norepeatUniqueColumnName: any;
    reportHeaderFooter: any;
    otherService: any;
    report_meta: any;
    elementList: any[] = [];
    selectId:any;
    selectedOptions: Object =  {};
    optionsJson:optionJson =  {}; 
    preset_value:PresetValue = {};
    rptName:any;
    report_result_array:any[] = [];
    resturl :any;
    multitenant:any;
    headerOne:any;
    headerTwo:any;
    footerOne:any;
    footerTwo:any;
    isAllHiddenParams : Boolean = false;
    isAllSqlExpParams : Boolean = false;
    dynamicpopup_key_value_array : Object =  {};
   // public image: SafeResourceUrl;
    reportParams: any[] = [];
    reportFields: any[] = [];
    public Options:any = {
    scales: { yAxes: [{ticks: {beginAtZero:true }}]}
    };
    public Labels:string[] = [];
    public Type: string = "bar";
    public Legend:boolean = true;
    public searchDisplay:boolean = false;
    public Data:any[] = [{label: 'Nil',data:[],borderWidth: 1}];
    carouselFieldVal: any[] = [];
    carousalRptObj : Object =  {};
    isRadpidCalling :boolean = true;
    carosalfieldobj : Object =  {}; 
    isUsingPrevParams : Boolean = false;
    CaurosalReportPrevParams: Object =  {};
    fab:any;
    slides:any;
    User:any;


  constructor( 
          public singleton:SingletonService,
          public injector:Injector,
          public activateRoute:ActivatedRoute,
          public router:Router,
          public navCtrl:NavController,
          public modalCtrl:ModalController,
          public datePipe:DatePipe,
          public myexpression:ExpressionService,
          public loadingCtrl:LoadingController,
          private http:HttpClient,
          public storage:Storage,
          public events:EventsService,
          public mycmservice:CmService,

    ) { 

        this.resturl = this.singleton.resturl;
        this.multitenant = this.singleton.ismultitenant;
        this.rptName = 'geoandareapending_rpt';
        this.otherService = this.injector.get(PagenavService); 

        this.activateRoute.queryParams.subscribe(_p => {
       const navParams = this.router.getCurrentNavigation()?.extras.state;
      
    });
    this.UserDetails= this.router.getCurrentNavigation()?.extras.state;
    console.log(this.UserDetails);   


  }

  ngOnInit() {  }

   ionViewDidEnter() {
        console.log('ionViewDidLoad ReportdetailsPage');
        let loading = this.loadingCtrl.create({
            message: 'Please wait...'
        });
    this.jsonUrl = 'assets/json/geoandareapending_rpt.json';
        //this.http.get('assets/json/farmerapp_rpt.json').map(res => res.json()).subscribe(data => {
          this.http.get('assets/json/geoandareapending_rpt.json', {responseType: 'json'}).subscribe((data:any) => {
           console.log(data);
            this.subtitles = data;
            this.report_meta = data;
            this.reportSlug =  this.subtitles.idt
            this.Type=this.subtitles.gtype;
            this.reportHeaderFooter = {
                report_header_line1: this.subtitles.rh1,
                report_header_line2: this.subtitles.rh2,
                report_footer_line1: this.subtitles.rf1,
                report_footer_line2: this.subtitles.rf2,
            };
            
          //  this.UserDetails = this.User;
            if (this.UserDetails == undefined) {
                this.storage.get('userObj').then((loginInfo:any) => {
                    this.UserDetails = loginInfo;
                    this.UserDetails['pagetype'] = 'displayreport'; //for differentiate transaction or report in expr.js
                });
                this.isRadpidCalling = false;
            } else {
                this.UserDetails['pagetype'] = 'displayreport'; //for differentiate transaction or report in expr.js
               
                if (this.UserDetails['onthefly']){
                    this.isRadpidCalling = this.UserDetails['onthefly'];
                    Object.assign(this.preset_value,this.UserDetails['ontheflyData']);
                }
                else{
                    this.isRadpidCalling = false;
                }                    
              
            }


            let reporttype = this.subtitles.rt;
            this.reportParams = this.subtitles.reportparamfield_meta
            this.reportFields = this.subtitles.reportfield_meta;
            let keys = JSON.stringify(this.reportParams);
            console.log(keys);
            let jsonObj = JSON.parse(keys);
            let projectname = this.subtitles.proj;
            let reportid = this.subtitles.tit;
            let multiselectvalues = "[]";
            let stl = this.subtitles.stl;
            let multitenant=this.multitenant;
            let groupfield = JSON.stringify(this.subtitles.repgrouping_meta);
            let columnproperty = JSON.stringify(this.reportFields);
            
            //IF CALLING FROM ON THE FLY
            if(this.isRadpidCalling == true){
                this.getreport();
                delete this.UserDetails.onthefly;
                delete this.UserDetails.ontheflyData;
            }

            //REPORT WITH ZERO PARAM 
            else if (jsonObj.length == 0) {
                 //let loading=this.events.Loading();
                //this.setHeaderFooter();
                this.mycmservice.sendReportwithoutParams(projectname, reportid, multiselectvalues, groupfield, columnproperty, stl,multitenant).subscribe((responseData:any) => {
                this.events.loadDismiss();
                    this.reports = responseData;   
                    let reportfield = this.reports['reportData'];    
                    let datas =JSON.parse(reportfield);
                    let id =datas['store']['fields'].indexOf('pname');
                    this.column=datas['store']['data']['frame'];
                    this.titles = datas['store']['fields'];
                    console.log(this.titles);

                    if (reporttype == "displayreport") {
                        this.renderDisplayReport();
                    }
                    else if(reporttype == "graphicalreport"){
                        this.renderGraphicalReport();
                    }
                    else{
                        this.renderTableReport(datas,this.subtitles);
                    }
                
                });

            }
            
            //REPORT WITH PARAM
            else{
                
                let hiddenParams = this.reportParams.filter((item:any)=>{
                    return (item['ih'] == "True");
                });                
               
                if(hiddenParams.length == this.reportParams.length){
                    //IF ALL PARAMS ARE HIDDEN
                    this.isAllHiddenParams = true;
                    let formid = this.rptName+"Form";
                    let formElement = document.getElementById(formid);

                    if (formElement) { 
                        let elements = formElement.querySelectorAll('*[name]');
                    //let elements = document.getElementById(formid).querySelectorAll('*[name]');
                      for (let i = 0; i < elements.length; i++) {
                          if (elements[i].id != "" && elements[i].tagName != "FORM") {
                              this.elementList.push(elements[i].id);
                          }
                      }
                    }
                    this.UserDetails['pagetype'] = 'txview';
                    this.myexpression.hiddenElementexp(this.elementList, this.UserDetails,this.preset_value,this.selectedOptions,"report",this,this.isAllHiddenParams,this.reportParams,this.subtitles,this.optionsJson,this.dynamicpopup_key_value_array,"");
                    this.getreport();
          
                }
                
                else{
                    //NON HIDDEN PARAMS
                    this.storage.get('reportParams').then((params:any) => {
                        if(params != null){
                            if(params[this.reportSlug]){

                                if(this.subtitles["rt"] == 'CarouselReport'){
                                    // this.CaurosalReportPrevParams = params[this.reportSlug];  
                                    // let firstKey = Object.keys(this.CaurosalReportPrevParams)[0];
                                    // Object.assign(this.preset_value,this.CaurosalReportPrevParams[firstKey]);  
                                }else{
                                    let param = params[this.reportSlug];  
                                    Object.assign(this.preset_value,param);                     
                                }
                                
                                
                                this.isUsingPrevParams = true;
                                this.getreport();
                            }
                            else{
                                this.isAllHiddenParams = false;
                                this.UserDetails['pagetype'] = 'txview';
                                this.paramModal("",this.fab);
                            }
                        }
                        else{
                            this.isAllHiddenParams = false;
                            this.UserDetails['pagetype'] = 'txview';
                            this.paramModal("",this.fab);
                        }
                        
                        
                    });                              
                }              
            }
        });
        
    }

   getreport() {
        let projectname = this.subtitles.proj;
        let reportid = this.subtitles.tit;
        let multiselectvalues = "[]";
        let stl = this.subtitles.stl;
        let multitenant=this.multitenant;
        let groupfield = JSON.stringify(this.subtitles.repgrouping_meta);
        let columnproperty = JSON.stringify(this.reportFields);
        let keys = JSON.stringify(this.reportParams);
        console.log(keys);
        let jsonObj = JSON.parse(keys);
        let keyset = [];
        let obj = [];
        let inputValue:Record<string,any> = {};
        let loading=this.events.Loading();
        
        if (this.subtitles["rt"] == 'offlinereport') {
            // let elementnodelList = [];
            // let sql = "";
            // sql = this.subtitles["query_meta"][0]["sq"];
            // let columns = this.subtitles['reportfield_meta'];
            // let formid = this.rptName+"Form";
            // let elements = document.getElementById(formid).querySelectorAll('*[name]');
           
            // for (let i = 0; i < elements.length; i++) {
            //     if (elements[i].id != "") {
            //         elementnodelList.push(elements[i].id);
            //     }
            // }
           
            // for (let e = 0; e < elementnodelList.length; e++) {
            //     let id = elementnodelList[e];
            //     let fieldvalue = document.getElementById(id).getElementsByTagName("input")[0].value;
            //     sql = sql.replace(":" + id, "'" + fieldvalue + "'")
            // }
            // this.reporttbgrid(sql, columns);
        }
        
        // else if (this.subtitles["rt"] == 'CarouselReport') {
           
        //     this.setHeaderFooter();
        //     setTimeout(() => {
        //         this.events.loadDismiss();
        //       }, 4000);
        //     this.carouselFieldVal = []
        //     if(this.isUsingPrevParams == true){
        //         this.getCarousalReportUsingPrevParam(this.CaurosalReportPrevParams,projectname,reportid,multiselectvalues,groupfield,columnproperty,stl,multitenant);
        //     }
        //     else if (this.isUsingPrevParams == false){
        //         let carouselFieldValArray = this.UserDetails[this.reportSlug+"_cfv"];
        //         let cfId = this.UserDetails[this.reportSlug+"_cfid"]
        //         this.carosalfieldobj = {}
        //         this.getCarousalReport(carouselFieldValArray,cfId,jsonObj,keyset,obj,projectname,reportid,multiselectvalues,groupfield,columnproperty,stl,multitenant);
        //     }
            
            

        // }
        else {
            if(this.isUsingPrevParams == true){ 
                Object.assign(inputValue,this.preset_value);
                for (var i = 0; i < jsonObj.length; i++) 
                {
                  keyset.push(jsonObj[i]['sl']);
                            let id = jsonObj[i]["idt"];
                            let exp = jsonObj[i]["exp"];
                  let wt = jsonObj[i]["wt"]
                  obj.push(jsonObj[i]["idt"]);
                  if(exp)
                  {

                   let expval  =  this.myexpression.evaluateEventexp(exp,this.UserDetails,this.reportSlug,this.preset_value);
                   
                   if( wt == "date")
                   {
                     
                    expval = this.datePipe.transform(expval,"dd-MMM-yy");
                    this.preset_value[jsonObj[i]['sl']] =expval;
                     
                   }
                   else
                     {  
                    this.preset_value[jsonObj[i]['sl']] =expval;
                    
                   }
                    
                  }
                }
                Object.assign(inputValue,this.preset_value);
                this.isUsingPrevParams = false;
            }
            else if(this.isUsingPrevParams == false){
                for (var i = 0; i < jsonObj.length; i++) {              
                    keyset.push(jsonObj[i]['sl']);
                    let id = jsonObj[i]["idt"];
                    obj.push(jsonObj[i]["idt"]);
                    if(jsonObj[i]["wt"]=="date"){
                        let date=this.preset_value[id];
                        if(this.isRadpidCalling == false){
                            inputValue[keyset[i]]=this.datePipe.transform(date,"dd-MMM-yy");
                        }
                        else if(this.isRadpidCalling == true){
                            var aa = new Date(date);
                            if(!isNaN(aa.getDate())){
                                inputValue[keyset[i]] = date;
                            }
                            else{
                                if(date.indexOf("-")>0){
                                    inputValue[keyset[i]] = this.myexpression.convertDateToValidFormat(date,"-");
                                }
                                else if(date.indexOf("/")>0){
                                    inputValue[keyset[i]]  = this.myexpression.convertDateToValidFormat(date,"/");
                                }
                                else{
                                    inputValue[keyset[i]]  = date; 
                                }                            
                            }
                        }
                        
                    }
                    else{
                        inputValue[keyset[i]] = encodeURIComponent(this.preset_value[id]);
                    }
                }
            }
            
            console.log(inputValue);       
            //this.setHeaderFooter();     
           
            this.mycmservice.sendReportParams(this.subtitles["rt"],inputValue, projectname, reportid, multiselectvalues, groupfield, columnproperty, stl,multitenant,this.reportParams).subscribe((responseData:any) => {
                console.log(responseData);
               this.events.loadDismiss();
                this.reports = responseData;
                let reportfield = this.reports['reportData'];
                let datas = JSON.parse(reportfield);
                let id = datas['store']['fields'].indexOf('pname')
                this.column=datas['store']['data']['frame'];
                this.titles = datas['store']['fields'];
                console.log(this.titles);
                
                //STORE PARAM VALUE   
        
                this.storage.get('reportParams').then((params:any) => {
                    if(params != null){
                        params[this.reportSlug] = inputValue;
                        this.storage.set('reportParams',params) ;
                    }
                    else{
                        let r_params:Record<string,any> = {};
                         r_params[this.reportSlug] = inputValue;
                         this.storage.set('reportParams',r_params) ;
                    }
                    
                });
        
                         

                if(this.subtitles["rt"] == "displayreport"){
                    this.renderDisplayReport();
                }
                else if(this.subtitles["rt"] == "graphicalreport"){
                    this.renderGraphicalReport();
                }
                else{
                    this.renderTableReport(datas,this.subtitles);
                }
            });
        }
    }


  renderDisplayReport(){
        this.names =[];
        for (var i = 0; i < this.column.length; i++) {
            let values: Record<string, any> = {};
            for(var j=0;j< this.titles.length; j++){
                let fieldValue = this.column[i][j];
                let fieldArray = this.reportFields.filter((item:any)=>{
                    return (item['sl'] == this.titles[j]);
                });
                if(fieldArray.length>0){
                    let fieldJson = fieldArray[0]
                    if(fieldJson['ac'] == "T"){
                        fieldValue = this.ApplyComma(fieldValue);

                    }
                    if(fieldJson['data_typ'] == "nymeric"){
                        fieldValue = fieldValue.toFixed(fieldJson['nod']);

                    }
                    values[this.titles[j]] =fieldValue;                    
                    
                }                
                
            }
            this.names.push(values);
            this.report_result_array.push(values);
        }
        
        let imageid=this.names; 
        
        // if(imageid){
        //     for (var k=0;k< imageid.length;k++){
        //         let objId=imageid[k].objectid;
        //         let imagetable = imageid[k].imagetable;
        //         if (objId != undefined && imagetable != undefined){
        //             this.getImageById(objId,imagetable); 
        //         }
        //     } 
        // }
  }

  renderGraphicalReport(){
    let colors = ["#f4a460","#c6c42c", "#a48a9e","#00bfff","#d2737d","#778899",
        "#b11573","#1c0365","#9966ff", "#c6e1e8","#f0e68c","#e6e6fa" ,"#228916","#75d89e",
        "#f205e6"  ,"#14a9ad" ,"#4ca2f9" ,"#a4e43f" ,"#d298e2" ,"#6119d0",
        "#c0a43c" ,"#f2510e" ,"#651be6" ,"#79806e" ,"#61da5e" ,"#cd2f00" ,
        "#9348af" ,"#01ac53" ,"#c5a4fb" ,"#996635","#ea9e70" ,"#4bb473" ,"#ce7d78" ,
        "#2f3f94" ,"#2f7b99" ,"#da967d" ,"#34891f" ,"#b0d87b" ,"#ca4751" ,"#7e50a8" ,
        "#c4d647" ,"#e0eeb8" ,"#250662" ,"#289812" ,"#566ca0" ,"#ffdbe1" ,"#2f1179" ,
        "#935b6d" ,"#916988" ,"#63b598" ,"#aead3a", "#9e6d71", "#4b5bdc", "#0cd36d",
        "#539397", "#ea24a3", "#ac3e1b", "#df514a", "#ffce56", "#880977" ];
        let chart_color = [];
        this.datass =[];
        this.names=[];
    let xaxis=this.subtitles.xcoord;
        let xaxis_index = this.titles.findIndex((item:any) =>{
            return (item == xaxis);
        });
        let yaxis=this.subtitles.ycoord;   
        let yaxis_index = this.titles.findIndex((item:any) =>{
            return (item == yaxis);
        });
        
        for(var j=0;j< this.titles.length; j++){
            let xaxis=(this.subtitles.xcoord);                                
            if(xaxis==this.titles[j]){
                for (var i = 0; i < this.column.length; i++) {                                    
                    let labels={};
                    labels=this.column[i][xaxis_index];
                    this.names.push(labels);
                }                                
                    
            }
            if(yaxis==this.titles[j]){
                for (var k = 0; k < this.column.length; k++) {
                    let values = {};                                                                         
                    values =this.column[k][yaxis_index];                                
                    this.datass.push(values);
          if(this.Type == 'bar' || this.Type =='horizontalBar'){
            chart_color.push('#36a2eb');
          }
          else{
           chart_color.push(colors[k]);
          }
                }   
            }
        }
    if (this.Type == 'line'){
      var data = {
        labels: this.names,
        datasets: [
                    {
            label: this.subtitles.tit,
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.datass,
            spanGaps: false,
          }
        ]
      };
      return this.getChart(this.Canvas.nativeElement,this.Type, data);
    }
    else
    {
      let data = {
        labels: this.names,
        datasets: [{
                    label: this.subtitles.tit,
          data: this.datass,
          backgroundColor: chart_color,
                    borderColor: chart_color,
                    borderWidth : 1
        }]
      };
      let options = {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
      if(this.Type == 'pie'){
        return this.getChart(this.Canvas.nativeElement, this.Type, data);
      }
      else{
        return this.getChart(this.Canvas.nativeElement, this.Type, data,options);
      }
    }
        
    }



  renderTableReport(datas:any,report_json:any){
    
    let report_field_meta = report_json['reportfield_meta'];
    let index_al:any;
    let field_ids = Array.from(this.titles);
    let field_already_display:any;
    let fn = this;
    if (report_json['fd_to_dp'] != null && report_json['fd_to_dp'] != ""){ 
       field_already_display = report_json['fd_to_dp'].split(',');
    }
        let table = document.getElementsByName(this.subtitles.idt+'_tb')[0];
        let tbody = table.getElementsByTagName('tbody')[0];
        let thead = table.getElementsByTagName('thead')[0];
        let thead_length = thead["children"].length;
        if (tbody.rows.length > 0) {
            for (let k = tbody.children.length; k > 0; k--) {
                tbody.deleteRow(k - 1);
            }
        }
        
        if(this.column.length > 0){
            for (var i = 0; i < this.column.length; i++) {

                let rowlength = tbody.rows.length;
                let rowdata = this.column[i];
                let newRow: HTMLTableRowElement = tbody.insertRow(rowlength);
                let previousRowvalue = rowlength - 1;
                let currentValue = "";
                newRow.id = 'id' + rowlength;
                
                for (let j = 0; j < thead["children"].length; j++) {
                    let align_text = "";
                    let idt = (thead["children"][j] as HTMLElement).dataset["idt"] ;
                    const f_index = field_ids.findIndex((aa:any) =>aa==idt);
                    let newCell: HTMLTableCellElement = newRow.insertCell(j);
                    if((thead["children"][j] as HTMLElement).dataset["expandbt"] == "false"){
                    if((thead["children"][j] as HTMLElement).dataset["type"] == "number"){
                        align_text = "right";
                    }
                    else{
                        align_text = "left";
                    }
                    newCell.style.textAlign = align_text;
                    
                    if ((thead["children"][j] as HTMLElement).dataset["hidden"] == "true") {
                       // newCell["hidden"] = true;
                        newCell.style.display = "none";
                    }
        
                    if ((thead["children"][j] as HTMLElement).dataset["dontrepeat"] == "true") {
                        if (rowlength != 0){
                            let previousValue = tbody["children"][previousRowvalue]["children"][j].textContent;
                            if (previousValue == rowdata[j] || previousValue == "") {
                                currentValue = "";
                            } else {
                          if(f_index !=-1){
                            currentValue = rowdata[f_index];
                          }
                                      }
                                  }
                    } else {
                        if(f_index !=-1){
                        currentValue = rowdata[f_index];
                      }
                    }
        
                    if ((thead["children"][j] as HTMLElement).dataset['type'] == "button") {
                        let row_Index = newRow['rowIndex'];
                        var btn = document.createElement("ION-BUTTON");
                        var iconcls=(thead["children"][j] as HTMLElement).dataset['icons']
                        btn.setAttribute("slot","icon-only");
                        btn.setAttribute("size","small");
                        btn.className = "reportButton";
                        btn.innerHTML='<ion-icon name="'+iconcls+'" ></ion-icon>';
                        btn.dataset['exp'] = (thead["children"][j] as HTMLElement).dataset['exp'];
                        btn.dataset['idt'] = (thead["children"][j] as HTMLElement).dataset['idt'];
                        if((thead["children"][j] as HTMLElement).dataset['exp'] == "print()"){
                            btn.addEventListener('click',(evt:any) =>  this.printReport(evt,this.fab),false);
                            btn.dataset['tableheaders'] =JSON.stringify( datas["store"]["fields"]);
                        }
                        else{
                            btn.addEventListener('click',(evt:any) =>  this.reportButtonOnClick(evt,row_Index),false);
                        }                         
                        newCell.appendChild(btn);       
                    }
                    else{
                        
                        // Append a text node to the cell
                        let newText;
                        if(rowdata[j] == "blockheaderrow" || rowdata[j] == "subtotalrow"|| 
                            rowdata[j] == "grandtotalrow" || rowdata[j] == "linespacerow"||
                            rowdata[j] == "openingbalancerow" || rowdata[j] == "closingbalancerow" ) {
                                
                                newText = document.createTextNode("");
                                newRow.style.color = this.getCss(rowdata[j]);
                                newRow.style.fontWeight  = "600";
            
                        }
                        else{
                            let cellVal = rowdata[f_index];
                            let noOfDecimalVal = (thead["children"][j] as HTMLElement).dataset['nod'];
                            if((thead["children"][j] as HTMLElement).dataset['type']== "number" && cellVal != ""){
                                
                if(this.isNumber(cellVal))
                {
                  cellVal = cellVal.toFixed(noOfDecimalVal);
                }
                            }
                           
                            if((thead["children"][j] as HTMLElement).dataset['ac']== "T" && cellVal != ""){
                                let commaStr = this.ApplyComma(cellVal);
                                newText = document.createTextNode(commaStr);
                            }
                            else{
                                newText = document.createTextNode(cellVal);
                            } 
                        }
                        newCell.appendChild(newText);
                    }
                }
        else{
          var btn = document.createElement("ION-BUTTON");
          var iconcls=(thead["children"][j] as HTMLElement).dataset['icons']
              btn.setAttribute("slot","icon-only");
              btn.dataset['opened'] = "false";
              btn.setAttribute("size","small")
              btn.setAttribute("clear","");
              btn.className = "reportButton";
              var icon = document.createElement("ION-ICON");
              icon.setAttribute("name","chevron-forward-outline");                           
              icon['style']['color'] = "#FFFFFF";
              btn.appendChild(icon);
              btn.onclick = function(event:any){
              let rowIndex = (document.getElementById(newRow['id'])as HTMLTableRowElement).rowIndex;
              let row_data_meta = Array.from(rowdata);
              let report_field_Meta = report_field_meta;
              let fields_id = field_ids;

          
              if(document.getElementById(newRow['id']+'_expand')){
                event['currentTarget']['firstElementChild']['size'] = "small";
                event['currentTarget']['firstElementChild']['style']['color'] = "#FFFFFF";
                let expand_row = document.getElementById(newRow['id']+'_expand') as HTMLTableRowElement ;
                let expand_row_index = expand_row.rowIndex;  
                tbody.deleteRow(expand_row_index);
              }
              else{
                if(field_already_display != undefined && field_already_display.length>0){
                  let index_no =[];
                  for(let f=0;f<field_already_display.length;f++){
                    try{
                    const index = report_field_Meta.findIndex((aa:any) =>aa.sl==field_already_display[f]);
                                            if(index !=-1){
                                                index_no.push(index);                   
                                            }
                    }
                    catch(err){
                     
                    }
                  }
                  if(index_no.length >0){
                    index_al = index_no;
                    event['currentTarget']['dataset']['opened'] = "true"; 
                  }else{
                   if(index_al.length >0 && event['currentTarget']['dataset']['opened'] == "false"){
                     event['currentTarget']['dataset']['opened'] = "true";   
                     for (let k=0;k<index_al.length;k++){
                       delete row_data_meta[index_al[k]];
                     }
                   }
                  }
                  
                                    for (let k=0;k<index_no.length;k++){
                                      if(index_no[k] != -1){
                      delete row_data_meta[index_no[k]];
                      delete report_field_Meta[index_no[k]]; 
                      delete fields_id[index_no[k]];
                                            
                    }
                                    }
                  field_ids =  fields_id.filter((item:any)=>{return item !=undefined});
                  report_field_meta = report_field_Meta.filter((item:any)=>{return item !=undefined});
                  rowdata = row_data_meta.filter((item:any)=>{return item !=undefined});
                }
                
                event['currentTarget']['firstElementChild']['size'] = "small";                                
                event['currentTarget']['firstElementChild']['style']['color'] = "#f01616";
                let innerRow = tbody.insertRow(newRow['rowIndex']+1);
                innerRow['id'] = newRow['id']+"_expand";
                var baseList = document.createElement("td");
                                baseList.setAttribute("colspan",thead_length.toString());
                                var innertable = document.createElement("table");
                                innertable.setAttribute("class","table table-striped");
                                var innertbody = document.createElement("tbody");
                                innertable.setAttribute("cellpadding","5");
                                innertable.setAttribute("cellspacing","0");
                let  full_button_list = [];
                for(let k=0;k<field_ids.length;k++){
                  const filter = report_field_meta.filter((data:any) => {
                    return data['sl'] == field_ids[k];
                     });
                  if(filter.length >0 && filter[0]['data_typ'] != "button"){
                      var innerRow_tb = document.createElement("tr");
                    if(filter[0]['ih'] == 'T'){
                      innerRow_tb['hidden'] = true;
                    }
                                        innerRow_tb.setAttribute("text-wrap","");
                        // and give it some content 
                                        var firstcolumn =  document.createElement("td");
                                        firstcolumn.setAttribute("class","td-list-hd");
                                        var secondcolumn =  document.createElement("td");
                                        secondcolumn.setAttribute("class","td-list-value");
                    var firstContent = document.createTextNode(report_field_meta[k]['cap']);
                                        var secondContent = document.createTextNode(rowdata[k]);
                        // add the text node to the newly created div
                    firstcolumn.appendChild(firstContent);
                                        secondcolumn.appendChild(secondContent);
                    innerRow_tb.appendChild(firstcolumn);
                                        innerRow_tb.appendChild(secondcolumn);
                                        innertbody.appendChild(innerRow_tb);
                    
                  }
                  else if(filter.length>0 && filter[0]['data_typ'] == "button"){
                    full_button_list.push(field_ids[k]);
                  }
                }
                innertable.appendChild(innertbody);
                baseList.appendChild(innertable);
                
                if(full_button_list.length >0){
                  var bt_div = document.createElement("div");
                  while(full_button_list.length){
                    let button_list = full_button_list.splice(0,2);                   
                    var bt_row = document.createElement("div");
                    for(let bt=0;bt<button_list.length;bt++){
                      
                      bt_row.setAttribute("class","row");
                  
                    const bt_filter = report_field_Meta.filter((data:any) => {
                      return data['sl'] == button_list[bt];
                        });
                    if(bt_filter.length >0){
                    var bt_col = document.createElement("div");
                    bt_col.setAttribute("class","col");
                    var btn = document.createElement("ION-BUTTON");
                    var iconcls= bt_filter[0]['icls'];
                    btn.setAttribute("slot","icon-only");
                    btn.setAttribute("size","small");
                    btn.className = "exp-report-btn";
                    btn.innerHTML='<ion-icon name="'+iconcls+'" ></ion-icon>';
                    btn.dataset['exp'] = bt_filter[0]['exp'];
                    btn.dataset['idt'] = bt_filter[0]['sl'];
                            if(bt_filter[0]['exp'] == "print()"){
                                        btn.addEventListener('click',(evt:any) =>  fn.printReport(evt,fn.fab),false);
                                        btn.dataset['tableheaders'] =JSON.stringify( datas["store"]["fields"]);
                                        }
                                       else{
                                         btn.addEventListener('click',(evt:any) =>  fn.reportButtonOnClick(evt,rowIndex),false);
                                          }
                    var bt_title = document.createTextNode(bt_filter[0]['cap']);
                    btn.appendChild(bt_title);  
                    bt_col.appendChild(btn);
                    bt_row.appendChild(bt_col); 
                    bt_div.appendChild(bt_row); 
                    }
                    
                  }
                  baseList.appendChild(bt_div);
                  
                }
              }
                innerRow.appendChild(baseList);
                
                                
                                
              }
              
              
            };
              newCell.appendChild(btn); 
          }
      }
            }

        }else if(this.column.length == 0){
           let newRow = tbody.insertRow(0);
            let newCell = newRow.insertCell(0);
            let newText = document.createTextNode("No Records Found");
            newCell.appendChild(newText);
            newCell.colSpan = thead.children.length;

            // Access style properties directly
            newRow.style.color = "red";
            newRow.style.textAlign = "center"; // Use camelCase for 'text-align'
            newRow.style.fontWeight = "600"; 
        }
    }


    printReport($event:any,fab:any){

        // //debugger;
        // console.log(event);
        // fab.close();
        // let headers = [];
        // let reportType = ""
        // try {
        //     const target = event?.currentTarget as HTMLElement; 
        //     const tableHeaders = target.dataset['tableheaders']; 

        //     if (tableHeaders) { 
        //         headers = JSON.parse(tableHeaders);
        //     } else {
                
        //         console.error("tableheaders is undefined");
        //         headers = []; 
        //     }
        // } catch (error) {
        //     console.error("Error parsing headers:", error);
        // }
        // try{

        //     const target = event?.currentTarget as HTMLElement; // Cast to HTMLElement
        //     const repType = target.dataset['reporttype'];

        //     if()
        // }
        // catch(err){
        //     reportType = "";
        // }
            
        // let mustacheJson = {};
        // let rowIndex = event.currentTarget['parentElement']['parentElement']['rowIndex'];
        // let mapValue = {};
        
        // let actions = this.subtitles["repaction_meta"]; //Actions of report
        // for(let i =0;i<actions.length;i++){
        //     if(actions[i]["at"] == "print_format"){
        //         let pfActionObj = actions[i]["ReportPrintFormatAction"]["pfc"]; //PF Action Object
        //         console.log(pfActionObj);
        //         if (pfActionObj){
        //             let sqlArray = pfActionObj["sql"];  //SQL Object
                    
        //             for(let j =0;j<sqlArray.length;j++){
        //                 //Getting Params in SQL
        //                 var found = [],          // an array to collect the strings that are found
        //                     rxp = /\:(\w+)/g,
        //                     str = sqlArray[j].sql,
        //                     curMatch;
        
        //                 while( curMatch = rxp.exec( str ) ) {
        //                     found.push( curMatch[1] );
        //                 }
        //                 console.log(found);
                        
        //                 //Creating JSON Object
        //                 if(found.length>0){
        //                     if(reportType == "displayreport"){
        //                         for(let k=0;k<found.length;k++){
        //                             mapValue[found[k]] = this.report_result_array[0][found[k]];
        //                         }
        //                     }
        //                     else{
        //                         for(let k=0;k<found.length;k++){
        //                             let columnindex = headers.indexOf(found[k]);
        //                             mapValue[found[k]] = this.column[rowIndex][columnindex]  
                                    
        //                         }
        //                     }
        //                 }
        //                 if(pfActionObj["at"]=="Server"){
        //                     this.mycmservice.printFormtSql(sqlArray[j].sql,sqlArray[j].st,mapValue).subscribe(result => {
        //                         console.log(result);
        //                         let resJson = JSON.parse(result['text']);
        //                         if (sqlArray[j]["st"] == "Nongrid"){
        //                             mustacheJson = resJson;
        //                         }
        //                         else if (sqlArray[j]["st"] == "Grid"){
        //                             mustacheJson[sqlArray[j]["do"]] = resJson;
        //                         }

        //                         if(j==sqlArray.length-1){
        //                             this.http.get('assets/mustache/farmerapp_rpt.html',{responseType: 'text'}).subscribe(html => {
        //                                 let template = html;
        //                                 var output = Mustache.render(template, mustacheJson);
        //                                 cordova.plugins.pdf.htmlToPDF({
        //                                     data: output,
        //                                     documentSize: "A4",
        //                                     landscape: 'portrait',
        //                                     type: "share"
        //                                 },
        //                                 (sucess) => console.log('sucess: ', sucess),
        //                                 (error) => console.log('error:', error));
            
        //                             });
        
        //                         }

        //                     });
        //                 }
        //                 else if(pfActionObj["at"]=="Client"){
        //                     let finalSql = "";
        //                     for (var key in mapValue) {
        //                         finalSql = sqlArray[j].sql.replace(":"+key,mapValue[key])

        //                     }
                            
        //                     this.sqlite.create({
        //                         name: 'data.db',
        //                         location: 'default'
        //                     }).then((db: SQLiteObject) => {
                    
        //                         db.executeSql(finalSql, []).then((data) => {
        //                             console.log(JSON.stringify(data));
        //                             let resJson = [];
        //                             if (data.rows.length > 0) {
                                        
        //                                 for (var i = 0; i < data.rows.length; i++) {
        //                                     console.log(data.rows.item(i).name);
        //                                     resJson.push(data.rows.item(i));
        //                                 }
        //                                 if (sqlArray[j]["st"] == "Nongrid"){
        //                                     for (var key in resJson[0]) {
        //                                         mustacheJson[key] = resJson[0][key];
        //                                     }
        //                                 }
        //                                 else if (sqlArray[j]["st"] == "Grid"){
        //                                     mustacheJson[sqlArray[j]["do"]] = resJson;
        //                                 }
        //                             }
                                    

        //                             if(j==sqlArray.length-1){
        //                                 this.http.get('assets/mustache/farmerapp_rpt.html',{responseType: 'text'}).subscribe(html => {
        //                                     let template = html;
        //                                     var output = Mustache.render(template, mustacheJson);
        //                                     cordova.plugins.pdf.htmlToPDF({
        //                                         data: output,
        //                                         documentSize: "A4",
        //                                         landscape: 'portrait',
        //                                         type: "share"
        //                                     },
        //                                     (sucess) => console.log('sucess: ', sucess),
        //                                     (error) => console.log('error:', error));
                
        //                                 });
            
        //                             }
        //                         }).catch(e => console.log(e));

        //                     }).catch(e => console.log(e));

                            
        //                 }
        //             }

        //         }
        //     }
        // }
    }

    getCss(rowIndicatorValue:any){
        let result;
        switch (rowIndicatorValue) {

      case 'linespacerow':
        result = "";
        break;
      case 'blockheaderrow':
        result = "#8B0000";
        break;
      case 'subtotalrow':
        result = "#006400"; 
        break;
      case 'grandtotalrow':
        result = "#4169e1";
        break;
      case 'openingbalancerow':
        result =  "#8B0000";
        break;
      case 'closingbalancerow':
        result = "#8B0000";
        break;
            default:
                result = "";
        }
        return result;
    }
    reportButtonOnClick(event:any,index:any){
        //debugger;
        console.log(event);      

        let reportExps = event.currentTarget['dataset']['exp'];
        let reportExpsArray = reportExps.split(/[\r\n]+/);
        for(let i=0;i<reportExpsArray.length;i++){
            let txnViewpage;
            let reportExp = reportExpsArray[i];
            let params = reportExp.substring(
                reportExp.lastIndexOf("(") + 1, 
                reportExp.lastIndexOf(")")
            );
            let paramsArray = params.split(",");
            for (let i=0;i<this.otherService.pages.length;i++){
                if(this.otherService.pages[i]['id'] == paramsArray[0]){
                    txnViewpage = this.otherService.pages[i]['id'];

                }

            }
            if(reportExp.includes("viewtxn")){
            
                if(paramsArray[1] == "N"){
                    this.UserDetails['onthefly'] = true;
                    this.UserDetails['viewMode'] = false;
                    this.UserDetails['modifyMode'] = false;
                    this.UserDetails['RECORDID'] = 0;
                     let navigationExtras: NavigationExtras = {
                    queryParams: {
                      userdetails: this.UserDetails                      
                    }
                  }; 
                    this.navCtrl.navigateForward('/'+txnViewpage,navigationExtras);
                }
                else if(paramsArray[1] == "M" ||paramsArray[1] == "V"  ){
                    let param_index = this.titles.indexOf(paramsArray[2]);
                    if(param_index != -1){
                        this.UserDetails['RECORDID'] = this.column[index][param_index];
                        this.UserDetails['viewMode'] = true;
                        this.UserDetails['onthefly'] = true;
                        if (paramsArray[1] == "M"){
                            this.UserDetails['modifyMode'] = true;
                        }
                        else if(paramsArray[1] == "V"){
                            this.UserDetails['modifyMode'] = false;
                        }
                        let navigationExtras: NavigationExtras = {
                    queryParams: {
                      userdetails: this.UserDetails                      
                    }
                  }; 
                        this.navCtrl.navigateForward('/'+txnViewpage,navigationExtras);
                    }
                    else{
                        let msg = 'Error While Opening Transaction.';
                        this.errAlert(msg);
                    }
                }
            }
      // else if(reportExp.includes("sendsms")){
        
      //   let completeexp = reportExp.split('(')
      //     let getexpparamary = completeexp[1].slice(0, -1);
      //   let paramsplit =  getexpparamary.split(",");
        
      //   console.log(paramsplit[0]);
      //   console.log(paramsplit[1]);
      //   console.log(this.jsonUrl);
        
      //   let field_index = this.titles.indexOf(paramsplit[0]);
      //   let mobilenumber = this.column[index][field_index];
      //   console.log(mobilenumber);
      //   this.methodparam = getexpparamary;
        
      //  // this.http.get(this.jsonUrl).map(res => res.json()).subscribe(data => {
      //    this.http.get(this.jsonUrl, {responseType: 'json'}).subscribe(data => {
      //    console.log(data);
         
      //   let txView = data;
      //   let savetype = txView['sms_config'];
      //   let param = this.methodparam;
        
      //   let paramsplit = param.split(',');
        
        
        
      //   let field_index = this.titles.indexOf(paramsplit[0]);
        
      //   let rowdata = {}
        
      //   for(i=0; i < this.titles.length;i++)
      //   {
      //     var colindex = i;
      //     var columname = this.titles[i]
      //     var coldata = this.column[index][colindex];
      //     rowdata[columname] = coldata;
          
      //   }
        
      //   let pname  =  this.subtitles.proj
      //   let templatename = paramsplit[1];
      //   let mobilenos =  this.column[index][field_index];
        
      //   var msgtext = Mustache.render(savetype[1][templatename], rowdata);      
        
      //   if(savetype[0].server_config["use_server_sms"])
      //   {
      //      var smsjson = {}
      //      smsjson['PROJECTNAME'] = this.singleton.projectname;
      //      smsjson['MESSAGE'] = msgtext
      //      smsjson['MOBILENUMBER'] = mobilenos
          
           
           
      //     this.sendSMSjson(smsjson).subscribe(smsMessage => {
      //         setTimeout(() => {
      //         //this.loadingCtrl.dismiss();
      //           if (smsMessage){
      //             console.log("SMS Sent SuccessFully");
                  
      //           }
      //         }, 200);
      //       },
      //       err => {
      //         setTimeout(() => {
      //           console.log("SMS Failed Send");
      //         }, 200);
      //       });
           
      //   }
      //   else
      //   {
          
          
      //   }
      //  });
        
        
      // }
      // else if(reportExp.includes("sendmail")){
      //         let completeexp = reportExp.split('(')
      //     let getexpparamary = completeexp[1].slice(0, -1);
      //   let paramsplit =  getexpparamary.split(",");
       
      //   console.log(paramsplit[0]);
        
        
      //   console.log(this.jsonUrl);
        
       
      //   this.methodparam = paramsplit[0];
        
      //   this.http.get(this.jsonUrl,{responseType: 'json'}).subscribe(data => {
      //    console.log(data); 
      //   let txView = data;
      //   let savetype = txView['email_config'];
      //   let param = this.methodparam;   
      //   let paramsplit = param.split(',');
      //   let pname  =  this.subtitles.proj
      //   let templatename = paramsplit[1];
      //   let gettemplate = null;
        
      //   for(var i =0 ; i < savetype.length ; i++)
      //   {
      //         if(savetype[i][param])
      //                 {
      //        gettemplate = savetype[i][param];
      //        break;
      //       }             
          
      //   }
      //   let field_index = this.titles.indexOf(paramsplit[0]);
        
      //   let rowdata = {}
        
      //   for(i=0; i < this.titles.length;i++)
      //   {
      //     var colindex = i;
      //     var columname = this.titles[i]
      //     var coldata = this.column[index][colindex];
      //     rowdata[columname] = coldata;
          
      //   }
      //   var msgtext = Mustache.render(gettemplate["mail_template"].templates,rowdata); 
        
        
      //   if(gettemplate != null && gettemplate["mail_template"].use_templates)
      //   {
      //      var mailJson = {}
      //      mailJson['PROJECTNAME'] = this.singleton.projectname;
      //      mailJson['BODY']= msgtext
      
      //      for( var j = 0 ; j < gettemplate["mail_field_mapping"].length ; j++)
      //        {

      //         if(gettemplate["mail_field_mapping"][j].attribute_type == "to")
      //       {
      //         if(gettemplate["mail_field_mapping"][j].use_from_field)
      //         {
      //           var name = gettemplate["mail_field_mapping"][j].attribute_field           
      //           mailJson['TOADDRESS'] = rowdata[name]
      //         }
      //         else
      //         {
                
      //           if(gettemplate["mail_field_mapping"][j].static_value != null && gettemplate["mail_field_mapping"][j].static_value.length > 0)
      //           {
      //           mailJson['TOADDRESS'] = gettemplate["mail_field_mapping"][j].static_value
      //           }
                
      //         }
      //       }
            
      //       if(gettemplate["mail_field_mapping"][j].attribute_type ==  "subject")
      //       {
      //         if(gettemplate["mail_field_mapping"][j].use_from_field)
      //         {
      //           var name = gettemplate["mail_field_mapping"][j].attribute_field           
      //           mailJson['TOADDRESS'] = rowdata[name]
      //         }
      //         else{
      //           if(gettemplate["mail_field_mapping"][j].static_value != null && gettemplate["mail_field_mapping"][j].static_value.length > 0)
      //         {
      //           mailJson['SUBJECT'] = gettemplate["mail_field_mapping"][j].static_value
      //            }
      //         }
      //       }
      //       if(gettemplate["mail_field_mapping"][j].attribute_type ==  "cc")
      //       {   
      //             if(gettemplate["mail_field_mapping"][j].use_from_field)
      //         {
      //           var name = gettemplate["mail_field_mapping"][j].attribute_field           
      //           mailJson['TOADDRESS'] = rowdata[name]
      //         }
      //         else{
      //           if(gettemplate["mail_field_mapping"][j].static_value != null && gettemplate["mail_field_mapping"][j].static_value.length > 0)
      //         {
      //            mailJson['cc'] = gettemplate["mail_field_mapping"][j].static_value
      //            }
      //         }
      //       }
      //       if(gettemplate["mail_field_mapping"][j].attribute_type ==  "bcc")
      //       {
      //         if(gettemplate["mail_field_mapping"][j].use_from_field)
      //         {
      //           var name = gettemplate["mail_field_mapping"][j].attribute_field           
      //           mailJson['TOADDRESS'] = rowdata[name]
      //         }
      //         else{
      //           if(gettemplate["mail_field_mapping"][j].static_value != null && gettemplate["mail_field_mapping"][j].static_value.length > 0)
      //         {
      //           mailJson['bcc'] = gettemplate["mail_field_mapping"][j].static_value
                  
      //           }
      //         }
      //       }
      //       if(gettemplate["mail_field_mapping"][j].attribute_type ==  "body")
      //       {   
      //             if(gettemplate["mail_field_mapping"][j].use_from_field)
      //         {
      //           var name = gettemplate["mail_field_mapping"][j].attribute_field           
      //           mailJson['TOADDRESS'] = rowdata[name]
      //         }
      //         else{
      //           if(gettemplate["mail_field_mapping"][j].static_value != null && gettemplate["mail_field_mapping"][j].static_value.length > 0)
      //         {
      //           mailJson['body'] = gettemplate["mail_field_mapping"][j].static_value
      //             }
      //         }
      //       }
              
      //         mailJson['FROMADDRESS'] = "default"
      //       mailJson['FROMUNDERSCORE'] = ""
      //       mailJson['PROJECTNAME'] = this.singleton.projectname;
            
      //      }
           
      //       this.sendMailjson(mailJson).subscribe((emailMessage:any) => {
      //         setTimeout(() => {
      //         //this.loadingCtrl.dismiss();
      //           if (emailMessage){
      //             console.log("MAIL Sent SuccessFully");
                  
      //           }
      //         }, 200);
      //       },
      //       err => {
      //         setTimeout(() => {
      //           console.log("MAIL Failed Send");
      //         }, 200);
          
      //              });
          
      //        }
      //   });
      // }
            else if(reportExp.includes("viewreport")){
                let paramObj: Record<string, any> = {};
                let subParamsArray = reportExp.substring(reportExp.lastIndexOf("{") + 1, reportExp.lastIndexOf("}")).split("/");
                //FETCH VALUE FROM CURRENT REPORT PARAM
                if (subParamsArray[0].length>2){
                    let rptParamsArray = subParamsArray[0].substring(subParamsArray[0].lastIndexOf("[") + 1,subParamsArray[0].lastIndexOf("]")).split(",");
                    for(let i=0;i<rptParamsArray.length;i++){
                        try{
                            paramObj[rptParamsArray[i]] = this.preset_value[rptParamsArray[i]];
                        }
                        catch(err){
                            let msg = 'Error While Opening Report.';
                            this.errAlert(msg);
                        }
                        
                    }
                }
                
                //FETCH VALUE FROM CURRENT REPORT FILED DATA
                else if (subParamsArray[1].length>2){
                    let rptFieldArray = subParamsArray[1].substring(subParamsArray[1].lastIndexOf("[") + 1,subParamsArray[1].lastIndexOf("]")).split(",");
                    for(let i=0;i<rptFieldArray.length;i++){
                        let field_index = this.titles.indexOf(rptFieldArray[i]);
                        if(field_index != -1){
                            paramObj[rptFieldArray[i]] = this.column[index][field_index];
                        }
                        else{
                            let msg = 'Error While Opening Report.';
                            this.errAlert(msg);
                            break; 
                        }
                    }
                }

                //FETCH VALUE FROM GLOBAL VARIABLE
                else if (subParamsArray[2].length>2){
                    let globalVarArray = subParamsArray[2].substring(subParamsArray[2].lastIndexOf("[") + 1,subParamsArray[2].lastIndexOf("]")).split(",");
                    for(let i=0;i<globalVarArray.length;i++){
                        try{
                            let keyValueArray = globalVarArray[i].split(":");
                            paramObj[keyValueArray[0]] = this.UserDetails[keyValueArray[1]];
                        }
                        catch(err){
                            let msg = 'Error While Opening Report.';
                            this.errAlert(msg);
                            break; 
                        }
                        
                    }
                }
                this.UserDetails['onthefly'] = true;
                this.UserDetails['ontheflyData'] = paramObj;
                let navigationExtras: NavigationExtras = {
                    queryParams: {
                      userdetails: this.UserDetails                      
                    }
                  }; 
                this.navCtrl.navigateForward('/'+txnViewpage,{state:this.UserDetails});
                    
            }else if((reportExp.includes("firesql")) &&  !(reportExp.includes("changerowcolor"))){
                
                let elelmentId = event.currentTarget['dataset']['idt'];
                let fieldArray = this.reportFields.filter((item)=>{
                    return (item['sl'] == elelmentId);
                });
                if(fieldArray.length == 1){
                    let fieldJson = fieldArray[0];
                    if(fieldJson.data_typ == "button"){
                        fieldJson["eformid"] = this.subtitles['idt'];
                        this.UserDetails['pagetype'] = 'txview';
                        this.UserDetails['eformid'] = this.subtitles['idt'];
                        let firesqlName = paramsArray[0].substring(paramsArray[0].lastIndexOf("{") + 1,paramsArray[0].lastIndexOf("}"));
                        if(paramsArray[3].length>0){
              let lastind = paramsArray[3].length-1;
                            let expParamArray = paramsArray[3].substring(1,lastind).split(";");
                            for(let k=0;k<expParamArray.length;k++){
                                if(!(expParamArray[k] in this.UserDetails) && !(expParamArray[k] in this.preset_value)){
                                    console.log(expParamArray[k]);
                                    let ind = this.titles.indexOf(expParamArray[k]);
                                    if(ind != -1){
                                        this.UserDetails[this.subtitles['idt']+"-"+expParamArray[k]] = this.column[index][ind];
                                    }
                                }
                            }
                        }
                        // this.myexpression.evaluateExp(event, "button", fieldJson, this.UserDetails,this.preset_value);
                        this.myexpression.evaluateEventexp(reportExp, this.UserDetails, this.reportSlug,this.preset_value);
                        if(this.UserDetails[this.subtitles['idt'] + "-" + firesqlName]){
                            let firesqlResult = this.UserDetails[this.subtitles['idt'] + "-" + firesqlName];
                            if(firesqlResult["status"] == "failure"){
                                this.errAlert(firesqlResult["data"]);
                            }
                        }
                    }
                }
                
            }else if(reportExp.includes("linkform")) {
                let txnpage;
                let expArray = reportExp.substring(reportExp.lastIndexOf("(") + 1, reportExp.lastIndexOf(")")).split(",");
                let buttonExpresionConfig = this.subtitles.repfieldbutexp_meta;
                let configJSonArray = buttonExpresionConfig.filter((item:any)=>{
                    return (item['sl']==expArray[1])
                });
                if(configJSonArray.length == 1){
                    let configJSon = configJSonArray[0];
                    let fieldMapJson = configJSon.lfs;
                    let keyValObj:Record<string,any> = {};
                    for(let i=0;i<fieldMapJson.length;i++){
                        
                        //GETTING VALUES FROM TRANSACTION
                        if(fieldMapJson[i].fst == "True"){
                            console.log("FROM TRANSACTION");
                        }
                        
                        //GETTING STATIC GIVEN VALUE
                        else if(fieldMapJson[i].stcv){
                            keyValObj[fieldMapJson[i].ttc] = fieldMapJson[i].stcv;
                        }
                        
                        //GETTING VALUE FROM REPORT FIELDS
                        else if(fieldMapJson[i].srf){
                            let ind = this.titles.indexOf(fieldMapJson[i].srf);
                            keyValObj[fieldMapJson[i].ttc] = this.column[index][ind];
                        }
                    }

                    for (let i=0;i<this.otherService.pages.length;i++){
                        if(this.otherService.pages[i]['id'] == configJSon.tt){
                            txnpage = this.otherService.pages[i]['component'];        
                        }        
                    }
                    this.UserDetails['onthefly'] = true;
                    this.UserDetails['linkFormData'] = keyValObj;
                    this.UserDetails['linkForm'] = true;
                     let navigationExtras: NavigationExtras = {
                    queryParams: {
                      userdetails: this.UserDetails                      
                    }
                  }; 
                    this.navCtrl.navigateForward('/'+txnpage,navigationExtras);

                }         
            }

            // else if(reportExp.includes("call")){
            //     //CALL NUMBER
            //     let contactNoFieldID = reportExp.substring(reportExp.lastIndexOf("(") + 1, reportExp.lastIndexOf(")"))
            //     let ind = this.titles.indexOf(contactNoFieldID);
            //     let MobileNumber = this.column[index][ind];
            //     this.callProvider.dial(MobileNumber);
            // }

            // else if(reportExp.includes("pfcapture") || reportExp.includes("pfverify") ){
            //     let expr = reportExp.split("(")[0];
            //     let field_slug = reportExp.split("(")[1].slice(0,-1);
            //     let field_val = ""

            //     if(field_slug in this.UserDetails){
            //         field_val = this.UserDetails[field_slug]

            //     }else if(field_slug in this.preset_value){
            //         field_val = this.preset_value[field_val]
            //     }
            //     else{
            //         let ind = this.titles.indexOf(field_slug);
            //         if(ind != -1){
            //             field_val = this.column[index][ind];
            //         }
            //     }

            //     if(field_val != undefined && field_val != "" ){
            //         this.myexpression.fingerPrintExpression(expr,field_val);
            //     }
            //     else{
            //         // THROW ERROR
            //         alert("Error");
            //     }
            // }
            // else if(reportExp.includes("changerowcolor")) {
            //     let expArray = reportExp.substring(reportExp.lastIndexOf("(") + 1, reportExp.lastIndexOf(")")).split(",");
            //     let firesqlname = expArray[0];
            //     let firesqlStatus = expArray[1];
            //     let color = expArray[2];
            //     if(this.UserDetails[this.subtitles['idt'] + "-" + firesqlname]){
            //         let firesqlResult = this.UserDetails[this.subtitles['idt'] + "-" + firesqlname];
            //         if( firesqlStatus == ("on"+firesqlResult["status"])){
            //             console.log(firesqlResult);
            //             if(color == "green"){
            //                 document.getElementById("id"+index).style.backgroundColor='yellowgreen';
            //             }
            //             if(color == "red"){
            //                 document.getElementById("id"+index).style.backgroundColor='orangered';
            //             }
                        
            //         }
            //     }
            // }

            // else if(reportExp.includes("callPrinter")) {
            //     let expParams =  reportExp.match(/\{.*?\}/g);
            //     let rpt_field_params = expParams[0].substring(expParams[0].lastIndexOf("{") + 1,expParams[0].lastIndexOf("}")).split(",");
            //     let params = {}
            //     params ["type"] = expParams[1].substring(expParams[1].lastIndexOf("{") + 1,expParams[1].lastIndexOf("}"));
            //     for(let i=0;i<rpt_field_params.length;i++){
            //         if(this.preset_value[rpt_field_params[i]]){
            //             params[rpt_field_params[i]] = this.preset_value[rpt_field_params[i]];
            //         }
            //         else if(this.titles.indexOf(rpt_field_params[i]) != -1){
            //             let field_index = this.titles.indexOf(rpt_field_params[i]);
            //             params[rpt_field_params[i]] = this.column[index][field_index];                       
            //         }
            //         else if(this.UserDetails[rpt_field_params[i]]){
            //             params[rpt_field_params[i]] = this.UserDetails[rpt_field_params[i]];
            //         }
            //         else{
            //             params[rpt_field_params[i]] = "";
            //         }
            //     }
            //     this.myexpression.callPrinter(params);
            // }

        }
    }

    checkBlur(event:any) {
        let id = event._elementRef.nativeElement.dataset["id"];
        this.next_hiddenelements(id);

    }  
    
    checkChange($event:any, elemtId:any) {
        this.next_hiddenelements(elemtId);
    }

    ApplyComma(value:any){
        var result = "";
        let nStr;
        let PorM;

    
        if (value === 0) {
            result = value;
        } else if (value > 0) {
            nStr=value;
            PorM = "p";
        } else {
            nStr=String(value).split('-')[1]; 
            PorM = "m";
        }
        nStr += '';
        let x = nStr.split('.');
        let x1 = x[0];
        let x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        var z = 0;
      if(x1.indexOf("-")!=-1)
      {
        x1 = x1.split("-")[1];
        PorM ='m';
      }
        var len = String(x1).length;
        var num = Math.floor((len/2)-1);
 
        while (rgx.test(x1))
        {
            if(z > 0)
            {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
            }
            else
            {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
            rgx = /(\d+)(\d{2})/;
            }
            z++;
            num--;
            if(num == 0)
            {
            break;
            }
        }
        if(PorM=='p')
        {
            return x1 + x2;
        }  
        else
        {
            return '-'+x1 + x2;
        }
    }

    getChart(context:any, chartType:any, data:any, options?:any) {
        return new Chart(context, {
          type: chartType,
          data: data,
          options: options
        });
    }

    isNumber(obj :any) {
    
       return !isNaN(parseFloat(obj))
    }

    next_hiddenelements(id:any){
        let nextHiddenComponents: any[] = [];
        let elementIdList = [];
        let formid = this.rptName+"Form";
        let elements = document.getElementById(formid)?.querySelectorAll('*[name]');
        if(elements){
          for (let i = 0; i < elements.length; i++) {
              if (elements[i].id != "") {
                  elementIdList.push(elements[i].id);
              }
          }
          var unique = elementIdList.filter(function(elem, index, self) {
              return index === self.indexOf(elem);
          })
          var remainingArray  = unique.slice((unique.indexOf(id)+1),(unique.length+1));
         
          for (let i of remainingArray) {
              if ((document.getElementById(i) as HTMLElement).dataset['hidden'] == "True") {
                  nextHiddenComponents.push(i);
              }
              else{
                  break;
              }
          }

          if ((nextHiddenComponents.length) != 0) {
              this.myexpression.hiddenElementexp(nextHiddenComponents, this.UserDetails,this.preset_value,this.selectedOptions,"report",this,false,this.reportParams,this.subtitles,this.optionsJson,this.dynamicpopup_key_value_array,"");
          }
      }

    }

      async paramModal(event:any,fab:any){
        const modal =await this.modalCtrl.create({
            component:ReportparammodalPage,
            cssClass: 'param-modal',
         componentProps:{ 'jsonVal': this.subtitles,'userdetails':this.UserDetails,'modaltemplate':'goo'}
       });
       modal.onDidDismiss().then((data:any) => {
               let newData=data["data"];
        if (newData) {
            console.log(newData);
            this.preset_value = {};
            Object.assign(this.preset_value,newData);
            console.log(this.preset_value);
            this.getreport();
        }
    });
       
       return await modal.present();
        fab.close();
      /* await modal.onWillDismiss(data => {
            if (data) {
                console.log(data);
                this.preset_value = {};
                Object.assign(this.preset_value,data);
                console.log(this.preset_value);
                this.getreport();
            }
        });  */
        
    }  

    async errAlert(msg:any){
       //  let alert =await this.alertCtrl.create({
       //      header: 'Alert',
       //      subHeader: msg,
       //      buttons: ['Dismiss']
       //  });
       // await alert.present(); 
    }

}
