import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { AlertController} from '@ionic/angular';


import { SingletonService } from './../services/singleton.service';
import { LoginService } from './../services/login.service';
import { CmService } from './../services/cm.service';


declare var Expression:any;
declare var eventHandler:any;
declare var cordova: any;

@Injectable({
  providedIn: 'root'
})
export class ExpressionService {

  constructor(private http:HttpClient, 
              private alertCtrl: AlertController,
              private network: Network,
              private storage:Storage,
              public singleton:SingletonService,
              public myservice:LoginService,
              public mycmservice:CmService ) {

                 console.log('hello ExpressionService') 

               }


  async  hiddenElementexp(components:any,UserDetails:any,preset_value:any,selectedOptions:any,type:any,thisCallbk:any,isAllHidden:any,fieldJson:any,wholeJson:any,optionsJson:any,dynamicpopup_key_value_array:any,modify:any){

        // Here components won't be iterated to avoid async request issue
        // Take first component from array, work with that, then splice array at the end, it will remove that first copmponent
        // After splicing check array length
        // If length > 0, do recursive
        // If length < 0 , do exit

        let datasetForHiddenComp : any;
        if(components.length>0){
            let component = components[0]
            let currentFieldArray;
            try{
                //IF THIS FUNCTION CALLING FROM TRANSACTION
                for(let i = 0;i<fieldJson.length;i++){
                    currentFieldArray =fieldJson[i].filter((item:any)=>{
                        return (item['idt'] == component)
                    });
                    if(currentFieldArray.length > 0){
                        break;
                    }
                }
            }
            catch(err){
                //IF THIS FUNCTION CALLING FROM REPORT PARAM MODAL PAGE
                console.log(err);
                currentFieldArray =fieldJson.filter((item:any)=>{
                    return (item['idt'] == component)
                });
            }
            
            
            let currentfield = currentFieldArray[0];
      
      
      
      if(currentfield)
      {
        
        let componentType = "";
        try{
          componentType = currentfield["ct"];
        }
        catch(err){
          componentType = "";
        }

       if(componentType == "AutoField" && modify==false){
          let expr = currentfield["exp"];
          if(this.network.type != "none" ){
            this.generateNextAutoFieldVal(component,expr,preset_value,wholeJson);
          }
          else{
            this.alertFun("No Network! Couldn't generate value for "+component+" field.")
          }

          components.splice(0,1);
          if(components.length > 0){
            this.hiddenElementexp(components,UserDetails,preset_value,selectedOptions,type,thisCallbk,isAllHidden,fieldJson,wholeJson,optionsJson,dynamicpopup_key_value_array,modify);
          }
          else{
            if(type=="report" && isAllHidden == true){
              thisCallbk.getreport();
            }
            
          }               
          
        }
        else{
          let nextElement = document.getElementsByName(component);
          datasetForHiddenComp = document.getElementById(component);
          datasetForHiddenComp.dataset[component] = currentfield.sql;
          //CHECK FOR SQL 
          if (currentfield == undefined ||currentfield.sql == "" || currentfield.sql == "None" || currentfield.sql == undefined){
            
          }
          else{

            //call service for sql
            let dynamic = false;
            var sql = currentfield.sql;
            
            let sqlObj = JSON.parse(sql);
            let sqlquery = sqlObj["Sql"]
      
      
            if(sqlquery.indexOf("`${master}`") > 0)
            {
              //Need to make dynamic
               dynamic = true; 
               sqlquery = sqlquery.replace("`${master}`", "master_"+preset_value["activecompany"].toLowerCase() );
            }
            
            
            let mapValue = {};
            let finalSql = "";
            let paramStr = this.findParamValues(sql,preset_value);
            let data  = {};
            
            if(dynamic)
            {
              
              
          
              //Assiging values 
              data  = {
                fieldType : "combofield",
                eFormId : datasetForHiddenComp.dataset.eformid,
                fieldName : datasetForHiddenComp.dataset.fieldname,
                type : type,
                projectName : this.singleton.projectname,
                projectId : this.singleton.PID,
                username : UserDetails["USERNAME"],
                MapValue : paramStr,
                dynamictable : "master_"+preset_value["activecompany"].toLowerCase(),     
              
              };
              
              
            }
            else
            {
              
              //Assiging values 
              data  = {
                fieldType : "combofield",
                eFormId : datasetForHiddenComp.dataset.eformid,
                fieldName : datasetForHiddenComp.dataset.fieldname,
                type : type,
                projectName : this.singleton.projectname,
                projectId : this.singleton.PID,
                username : UserDetails["USERNAME"],
                MapValue : paramStr,
                dynamictable : "",            
              
              };
              
              
            }
            
          
            console.log(data); 

            let loginData= await this.myservice.selectService(data);//.subscribe((loginData:any[]) => {
              console.log(loginData);
              let responseOfSqlArray = loginData;

              if (responseOfSqlArray){
                let responseOfSql = responseOfSqlArray[0];
                console.log(responseOfSql);
                optionsJson[component] = responseOfSqlArray;
                 
                // document.getElementById(component).getElementsByTagName("input")[0].value = responseOfSql;
                if(datasetForHiddenComp.dataset.widgettype == "check" ||datasetForHiddenComp.dataset.widgettype == "select" || datasetForHiddenComp.dataset.widgettype == "radio" ){
                  selectedOptions[component] = responseOfSql[datasetForHiddenComp.dataset.sqlvalue.trim()];
                }
               
                  if(responseOfSql != null)
                {
                  
                   preset_value[component] = responseOfSql[datasetForHiddenComp.dataset.sqlvalue.trim()];
                  
                }
                else
                {
                  preset_value[component] = "";
                }
                
                
              
              
                  if(datasetForHiddenComp.dataset.readonly  == "True")
                {
                  
                    if(responseOfSql != null)
                  {
                  
                    var obj = JSON.parse(datasetForHiddenComp.dataset[component]);
                    var okey = obj.key;
                    var ojson = responseOfSql;
                    dynamicpopup_key_value_array[component] = ojson[okey];
                    preset_value[component+"-displayname"] =  ojson[okey];
                  }
                    
                
                  
                }
                
                if(datasetForHiddenComp.dataset.componenttype == "OneToOneField"){
                  for(var key in responseOfSql){
                    let logicalFieldID = "logical_"+component+"_"+key;
                    preset_value[logicalFieldID] = responseOfSql[key];
                  }
                }
                try{    
                  if(datasetForHiddenComp.dataset.cf == "True"){
                    let report_id = datasetForHiddenComp.dataset.eformid;
                    UserDetails[report_id+"_cfid"] = component;
                    UserDetails[report_id+"_cfv"] = responseOfSqlArray;
                  }
                }
                catch(err){
                  console.log(err);
                }
                
                
                  
                if(datasetForHiddenComp.dataset.validateexp)
                {
                  UserDetails['preset_value'] = preset_value
                  let value = this.getExpressionValue(datasetForHiddenComp.dataset.validateexp,UserDetails,datasetForHiddenComp.dataset.eformid)
                  
                  if( value.toUpperCase() != "T")
                  {
                    
                      this.alertFun(value);
                    return;
                  }
                  
                }

                
                components.splice(0,1);
                if(components.length > 0){
                  this.hiddenElementexp(components,UserDetails,preset_value,selectedOptions,type,thisCallbk,isAllHidden,fieldJson,wholeJson,optionsJson,dynamicpopup_key_value_array,modify);
                }
                else{
                  if(type=="report" && isAllHidden == true){
                    thisCallbk.getreport();
                  }
                  
                }

              }
            //});

            
          }

          //CHECK FOR EXP
          if (datasetForHiddenComp.dataset.expression != ""){
            this.evaluateExp("",nextElement,currentfield,UserDetails,preset_value);
            components.splice(0,1);
            if(components.length > 0){
              this.hiddenElementexp(components,UserDetails,preset_value,selectedOptions,type,thisCallbk,isAllHidden,fieldJson,wholeJson,optionsJson,dynamicpopup_key_value_array,modify);
            }
            else{
              if(type=="report" && isAllHidden == true){
                thisCallbk.getreport();
              }
              
            }
          }

          //IF BOTH ARE NONE MIGHT BE A LOGICAL FIELD
          else if ((currentfield == undefined)|| ((datasetForHiddenComp.dataset.expression == "" || datasetForHiddenComp.dataset.expression == undefined) && (currentfield.sql == "" || currentfield.sql == undefined))){
            components.splice(0,1);
            if(components.length > 0){
              this.hiddenElementexp(components,UserDetails,preset_value,selectedOptions,type,thisCallbk,isAllHidden,fieldJson,wholeJson,optionsJson,dynamicpopup_key_value_array,modify);
            }
            else{
              if(type=="report" && isAllHidden == true){
                thisCallbk.getreport();
              }
              
            }
          }

        }  
      }
        }
        
    }

    findParamValues(sql:any,preset_value:any){
        let paramStr = "";
        var found = [],         // an array to collect the strings that are found
             str = sql,
            curMatch;
            var rxp = /\:(\w+)/g;
            var rxps = /\$(\w+)/g;

        while( curMatch = rxps.exec( str ) ) {
            found.push( curMatch[1] );
        }
          while( curMatch = rxp.exec( str ) ) {
            found.push( curMatch[1] );
        }
        console.log(found);

        //Creating JSON Object
        if(found.length>0){
            for(let k=0;k<found.length;k++){
        if(document.getElementsByName(found[k]) != undefined && document.getElementsByName(found[k]).length >0 && document.getElementsByName(found[k])[0]["nodeName"] == "ION-DATETIME"){
          let formatted_date = this.formatDate(preset_value[found[k]]);
          paramStr += "&"+found[k]+"="+encodeURIComponent(formatted_date);
        }
        else{
          
          if(preset_value[found[k]+"-displayname"] != null)
          {
            paramStr += "&"+found[k]+"="+encodeURIComponent(preset_value[found[k]+"-displayname"]);
          }
          else
          {
            paramStr += "&"+found[k]+"="+encodeURIComponent(preset_value[found[k]]);
          }
        }
                
            }

        }
        return paramStr;
    } 
  
    formatDate(date:any) {
    
    
    if(date.toString().indexOf("/") > 0)
    {
      
      var spval = date.toString().split("/");
      
      var dateObject = new Date(parseInt(spval[2]),parseInt(spval[1]),parseInt(spval[0])); 
      
      date = dateObject;
      
    }
    
    
     
    let monthNames =["Jan","Feb","Mar","Apr",
              "May","Jun","Jul","Aug",
              "Sep", "Oct","Nov","Dec"];
    
     
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();
      
      
    let mon = d.getMonth() + 1;

    if (month.length < 2) month = '0' + month;
    
    var mmm = monthNames[mon - 1];
    
    if (day.length < 2) day = '0' + day;


        var val = [day,mmm,year].join('-');
    return val;
    }

    evaluateExp(event:any,document:any,fieldJSon:any,stValues:any,preset_value:any){
        let id = "";
        let modeofEntry="";
        let onChangevalue ="";
        let GetVal:any;
        let eformid;
        let expArray;
        let expression = fieldJSon["exp"];
        let suggestive = fieldJSon["sug"];
        if(document == "button")
        {
            eformid =fieldJSon["eformid"];
            this.setStValues(stValues);
        }else{
            eformid =document[0].dataset["eformid"];
        }
    
        stValues['EFORMID'] = eformid;
        id = fieldJSon["idt"];
        modeofEntry = fieldJSon["moe"];
        stValues['preset_value'] = preset_value;

        if (!expression) {
          return null; 
        }

        if (expression.includes('(')) {
        
            expArray = expression.split('(');        
            
        }
    
    
      if (expression) {
              // if(expression.includes("pfcapture") || expression.includes("pfverify") ){
              //     let expr = expression.split("(")[0];
              //     let field_slug = expression.split("(")[1].slice(0,-1);
              //     if(preset_value[field_slug] != undefined && preset_value[field_slug] != "" ){
              //         this.fingerPrintExpression(expr,preset_value[field_slug]);
              //     }
              //     else{
              //         // THROW ERROR
              //     }

              // }
        
        //GetClosingStockWOLOC
        
        // if(expArray[0].toLowerCase().includes("getclosingstockwloc")){
        //     let methodparam = expArray[1].slice(0, -1);
             
        //     let paramsplit = methodparam.split(',');
             
        //     stValues["OP_STOCKQTY"] = "";
        //     stValues["OP_STOCKVALUE"] = "";
        //     stValues["REC_STOCKQTY"] = "";
        //             stValues["REC_STOCKVALUE"] = "";
        //             stValues["ISS_STOCKQTY"] = "";
        //             stValues["ISS_STOCKQTY"] = "";
            
            
        //      let itemid  = stValues['preset_value'][paramsplit[0]];
        //      let docdate = this.formatDate(stValues['preset_value'][paramsplit[1]]);
        //      let valmethod = stValues['preset_value'][paramsplit[2]];
        //      let locationid =  stValues['preset_value'][paramsplit[3]];
             

        //      if(itemid == 0)
        //                {
        
        //       stValues["OP_STOCKQTY"] = Number(0).toFixed(2);
        //       stValues["OP_STOCKVALUE"] = Number(0).toFixed(2);
        //       stValues["REC_STOCKQTY"] = Number(0).toFixed(2);
        //       stValues["REC_STOCKVALUE"] = Number(0).toFixed(2);
        //       stValues["ISS_STOCKQTY"] = Number(0).toFixed(2);
        //       stValues["ISS_STOCKQTY"] = Number(0).toFixed(2);
              
        //       return;
        //      }
             
        //     let data  = {
              
        //       "itemid": itemid,
        //       "docdate" : docdate,
        //       "valmethod" : valmethod,
        //       "locationid" : locationid,
        //       "invfname" : "CLSTKWL",
        //       "fieldname" : stValues["CURRENTOBJ"],
        //       projectname : stValues["PROJECTNAME"],
        //       username : stValues["USERNAME"],
              
            
        //     };
            
            
        //     console.log(data); 

        //     this.myservice.stockService(data,stValues).subscribe(loginData => {
                
        //         let responseOfSqlArray = loginData;

        //         if (responseOfSqlArray){
                  
                
                
        //           var globalStock = responseOfSqlArray["data"].split("^");

        //           stValues['OP_STOCKQTY'] = Number(globalStock[0]).toFixed(6);

        //           stValues['OP_STOCKVALUE'] = Number(globalStock[1]).toFixed(6);

        //           stValues['REC_STOCKQTY'] = Number(globalStock[2]).toFixed(6);

        //           stValues['REC_STOCKVALUE'] = Number(globalStock[3]).toFixed(6);

        //           stValues['ISS_STOCKQTY'] = Number(globalStock[4]).toFixed(6);

        //           stValues['ISS_STOCKVALUE'] = Number(globalStock[5]).toFixed(6);
        //         }

              

        //         }
        //     );
              
              
        //     return "";



        // }       
            
        
        // else if(expArray[0].toLowerCase().includes("getclosingstockwoloc")){
        //        let methodparam = expArray[1].slice(0, -1);
             
        //      let paramsplit = methodparam.split(',');
             
        //      stValues["OP_STOCKQTY"] = "";
        //      stValues["OP_STOCKVALUE"] = "";
        //      stValues["REC_STOCKQTY"] = "";
        //              stValues["REC_STOCKVALUE"] = "";
        //              stValues["ISS_STOCKQTY"] = "";
        //              stValues["ISS_STOCKQTY"] = "";
             
        //      let itemid  = stValues['preset_value'][paramsplit[0]];
        //      let docdate = this.formatDate(stValues['preset_value'][paramsplit[1]]);
        //      let valmethod = stValues['preset_value'][paramsplit[2]];
             
        //       if(itemid == 0)
        //                 {
        
        //       stValues["OP_STOCKQTY"] = Number(0).toFixed(2);
        //       stValues["OP_STOCKVALUE"] = Number(0).toFixed(2);
        //       stValues["REC_STOCKQTY"] = Number(0).toFixed(2);
        //       stValues["REC_STOCKVALUE"] = Number(0).toFixed(2);
        //       stValues["ISS_STOCKQTY"] = Number(0).toFixed(2);
        //       stValues["ISS_STOCKQTY"] = Number(0).toFixed(2);
              
        //       return;
        //       }
              
              
             
            
        //     //call service for sql
              
        //       let data  = {
                
        //         "itemid": itemid,
        //         "docdate" : docdate,
        //         "valmethod" : valmethod,
        //         "invfname" : "CLSTKWOL",
        //         "fieldname" : stValues["CURRENTOBJ"],
        //         projectname : stValues["PROJECTNAME"],
        //         username : stValues["USERNAME"],
                
              
        //       };
        //       console.log(data); 

        //       this.myservice.stockService(data,stValues).subscribe(loginData => {
                
        //         let responseOfSqlArray = loginData;

        //         if (responseOfSqlArray){
                  
                
                
        //           var globalStock = responseOfSqlArray["data"].split("^");

        //           stValues['OP_STOCKQTY'] = Number(globalStock[0]).toFixed(6);

        //           stValues['OP_STOCKVALUE'] = Number(globalStock[1]).toFixed(6);

        //           stValues['REC_STOCKQTY'] = Number(globalStock[2]).toFixed(6);

        //           stValues['REC_STOCKVALUE'] = Number(globalStock[3]).toFixed(6);

        //           stValues['ISS_STOCKQTY'] = Number(globalStock[4]).toFixed(6);

        //           stValues['ISS_STOCKVALUE'] = Number(globalStock[5]).toFixed(6);
        //         }

              

        //         }
        //       );
              
              
        //       return "";

          
       // }
        
        
        if (suggestive =="False" || document != undefined || event._text =="" || modeofEntry =='tbc'){ 
                  let ExprObj = new Expression("");
                  ExprObj.Expression(expression, stValues, stValues, "");
                  GetVal = ExprObj.Evaluate();
            if(GetVal == 'AUTOGENERATE'){
              let prefix = id.substring(0, 3).toUpperCase();
              let uniqueId = new Date().valueOf().toString();
              GetVal = prefix+uniqueId;
            }  
                  console.log(GetVal);  
            if (document[0].tagName == "ION-INPUT" || document[0].tagName == "ION-SELECT" || document[0].tagName =="ION-TEXTAREA")
            {
              if(document[0].dataset.widgettype=='date'){
                preset_value[id] = this.formatDate(GetVal);
              }
              else{
                 preset_value[id] = GetVal;
              }
             
          
            if(event){
              event._value = GetVal;
              event['_native']['nativeElement']['value'] = GetVal;
              
               event['_native']["nativeElement"].onblur = function() {
                {
                  onChangevalue = preset_value[id];
                  
                  if(modeofEntry == 'tbe' && suggestive =="False"){
                    preset_value[id] =''; 
                    preset_value[id] = onChangevalue ;
                  }
                  else if(modeofEntry == 'tbc'){
                    //let tbcValue = document.getElementsByName(id);
                    if(onChangevalue == ""){  
                      preset_value[id] =""; 
                      preset_value[id] = GetVal;  
                    }
                    else if(onChangevalue){
                      preset_value[id] =""; 
                      preset_value[id] = GetVal;  
                    }
                  }
                }
              }   
         
          }
        }
        else if(document[0].tagName =="ION-DATETIME"){
                 var aa = new Date(GetVal);
                  if(!isNaN(aa.getDate())){
                      if(document[0]['dataset']['format'] == "time"){
                          let time = ((aa.getHours() < 10)?"0":"") + aa.getHours() +":"+ ((aa.getMinutes() < 10)?"0":"") + aa.getMinutes() +":"+ ((aa.getSeconds() < 10)?"0":"") + aa.getSeconds();
                      preset_value[id] = time;
                    }else{
                         preset_value[id] = this.formatDate(GetVal);

                    }
                  }
                  else{
                      if(GetVal.indexOf("-")>0){
              
                          alert("Entering Wrong date Format");
                          preset_value[id] = this.convertDateToValidFormat(GetVal,"-");
                      }
                      else if(GetVal.indexOf("/")>0){
              
                          alert("Entering Wrong date Format");
                          preset_value[id] = this.convertDateToValidFormat(GetVal,"/");
                      }
                      else{
              
                          preset_value[id] =this.formatDate(GetVal);; 
                      }
                      
                  }
         
        }     
        }
      } 
      return "";  
    }


   async generateNextAutoFieldVal(component:any,expr:any,preset_value:any,wholeJson:any){
      let prefix=preset_value.seqprefix;
       let result =await this.mycmservice.getNextAutoField(wholeJson['dpt'],wholeJson['didt'],prefix, component);//.subscribe(async (result:any[]) => {
            console.log(result);
            let resultArray = result;
           
           if(resultArray.length > 1){
                this.alertFun("More than One Configuration For Auto Field ");
            }
            else if(resultArray.length == 1){
                let res = resultArray[0];
                if(res["is_dynamic"] == 1 ){
                    //IF COMPONENT HAVING EXPRESSION
                    if(expr != "" && expr != null){
                        try {
                            let prefix = preset_value[expr];
                            let autoFieldValue = prefix+res["lastno"].toString().padStart(res["zeropadding"],0);
                            console.log(autoFieldValue);
                            preset_value[component] = autoFieldValue;
                        }
                        catch(e){
                            console.log(e);
                        }
                    }
                }
                else{
                    if( res["prefix"] == "None"){
                        this.alertFun("No Prefix For Auto Field ")
                    }
                    else{
                        let autoFieldValue = res["prefix"]+res["lastno"].toString().padStart(res["zeropadding"],0);
                        console.log(autoFieldValue);
                        preset_value[component] = autoFieldValue;
                    }
                    
                }
            }

        // }),
        // (err=>{
        //     console.log(err);
        // });
    }

    async alertFun(msg:any){
        let alert =await this.alertCtrl.create({
            header: 'Alert',
            subHeader: msg,
            buttons: ['Okay']
          });
         await alert.present();
    }
    
    convertDateToValidFormat(dateStr:any,splitStr:any){
        let strArray = dateStr.split(splitStr);
        if(strArray.length == 3){
            dateStr = strArray[2]+"-"+strArray[1]+"-"+strArray[0]; //YYYY-MM-DD
            console.log(new Date(dateStr).toISOString());
            return new Date(dateStr).toISOString();
        }
        return dateStr
    }

    evaluateEventexp(elementEvent:any,stValues:any,eformid:any,preset_value:any){
        stValues['preset_value'] = preset_value;
        // let ExprObj = new Expression("");
        // ExprObj.Expression(elementEvent, stValues, eformid, "");
        // let GetVal = ExprObj.Evaluate();
        this.setStValues(stValues);
        let GetVal = eventHandler(elementEvent, stValues, eformid);
        console.log(GetVal)
        return GetVal;    

    }

    setStValues(stValues:any){
        if(this.singleton.ismultitenant == "True"){
      stValues["RESTURL"] = this.singleton.dynamicresturl;
    }
    else if(this.singleton.ismultitenant == "False"){
      stValues["RESTURL"] = this.singleton.resturl;

    }
        
        stValues["PROJECTID"] = this.singleton.PID;
        stValues["PROJECTNAME"] = this.singleton.projectname;
        stValues["ISMULTITENANT"] = this.singleton.ismultitenant;
    }
  
    getExpressionValue(expression:any,stValues:any,eformid:any){
    let ExprObj = new Expression("");
    ExprObj.Expression(expression, stValues, eformid, "");
      let GetVal = ExprObj.Evaluate();
      return GetVal;
    }





}
