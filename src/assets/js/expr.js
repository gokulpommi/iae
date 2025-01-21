/*
 global  actionObjName  , 
 activeColumn  , 
 activeRow  , 
 ActiveRow  , 
 ActiveXObject  , 
 ajaxObj  , 
 alert  , 
 app_uniq_mv_Arr  , 
 arrPFix  , 
 bcsAjax  , 
 bcsAjaxObj  , 
 bcsMask  , 
 BCSUtill  , 
 checkIfSessionExpired  , 
 combo  , 
 combObj  , 
 compGframeNum  , 
 compObjOfContext  , 
 console  , 
 createDebugMap  , 
 currentReportGrid  , 
 d  , 
 date  , 
 deleted_Rec_Map  , 
 devStatus  , 
 docdate  , 
 document  , 
 dtype  , 
 eformMap  , 
 eformVarMap  , 
 EReportEvent  , 
 evaluateGridExpression  , 
 ExecuteOption  , 
 expressionSet  , 
 ExprObj  , 
 Ext  , 
 EXTJS_DATE_FORMAT_MAP  , 
 fNameWithF  , 
 getButtonComponent  , 
 getColObj  , 
 getEformJsonPR  , 
 getEformLayoutForContect  , 
 getFirstVisibleField  , 
 getGridHiddenComboData  , 
 getHiddenComboDataForFirstVisibleFields  , 
 getModifyComboData  , 
 GetparseObj  , 
 getPostGridComboData  , 
 getRefquery  , 
 getReportGridDataRefresh  , 
 getTextFieldData  , 
 getTextFieldDataForFirstVisibleFields  , 
 getURL  , 
 getVisibleComboDataForFirstVisibleFields  , 
 globalGenMap  , 
 globalMap  , 
 globalSearchEFormId  , 
 globalStock  , 
 gridColname  , 
 hashMap_reportEvent  , 
 i  , 
 idx  , 
 isParamValueChanged  , 
 itemid  , 
 kl  , 
 l  , 
 lform_curr_FieldLoc  , 
 lform_curr_FrameNo  , 
 lform_curr_Row  , 
 lform_location_Map  , 
 lForm_nGridtoGrid_Assoc  , 
 LObjId  , 
 location  , 
 locationId  , 
 m  , 
 mm  , 
 modifyStatus  , 
 month  , 
 objOp6  , 
 objOp7  , 
 ObjStr  , 
 objTmp  , 
 OpenTransForm  , 
 pa  , 
 param  , 
 paramField  , 
 paramValue  , 
 pattern_match  , 
 pgActivRow  , 
 pj  , 
 pobjval  , 
 postRecordUpdate  , 
 printerList  , 
 pstrExpression  , 
 pt  , 
 qty  , 
 rc  , 
 reAssembled  , 
 regvarField  , 
 reportCtStatus  , 
 reportEventVarMap  , 
 response  , 
 responseString  , 
 responseValue  , 
 row  , 
 rowCount  , 
 RowIndex  , 
 searchButtonToolbarStatus  , 
 searchResult  , 
 searchResultForLoadTstuct  , 
 selectedPrinter  , 
 setModifySrcFieldValueGrid  , 
 setSrcEFieldValueGrid  , 
 setSrcFieldValueNG  , 
 setTimeout  , 
 sgId  , 
 splitAmt  , 
 splitField  , 
 subGridStatus  , 
 sumByField  , 
 supportDBFmt  , 
 timeFormat  , 
 tlay  , 
 tp  , 
 validateHiddenExpr  , 
 valmethod  , 
 viewReportFnRefresh  , 
 window  , 
 x1  , 
 x2  , 
 XMLHttpRequest  , 
 year  
*/


/*******************************************************************************
 BCS_date.js File
 ******************************************************************************/
var currentRowObj = null;
var bcs = bcs || {};
//project namespace
bcs.app = bcs.app || {};
//dasboard report actions namespace
bcs.app.actions = bcs.app.actions || {};

//For Context Menu Namespace.
bcs.app.contextmenu = bcs.app.contextmenu || {};

var storages = null;

var rpGlobalMap = {}

var drildownEformCloseMap =  {};

var actionReportNextRecordMap =  {};

var getResponse = 0;

var MONTH_NAMES=new Array('January','February','March','April','May','June','July','August','September','October','November','December','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec');

var DAY_NAMES=new Array('Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sun','Mon','Tue','Wed','Thu','Fri','Sat');

var SUPPORTED_DATE_FORMATS=["y-M-d","MMM d, y","MMM d,y","y-MMM-d","d-MMM-y","MMM d","M/d/y","M-d-y","M.d.y","MMM-d","M/d","M-d","d/m/y","d-M-y","d.M.y","d-MMM","d/M","d-M", "dd/MM/yyyy"];
//changes done here

var EXTJS_DATE_FORMAT = {

    "DD/MM/YYYY" : "d/m/Y",
    "dd/MM/yyyy" : "d/m/Y"
};


var ONE_DAY = 1000 * 60 * 60 * 24;
var ONE_HR = 1000 * 60 * 60;
var ONE_MIN = 1000 * 60;

var EXTJS_DATE_FORMAT_MAP = {} ;

EXTJS_DATE_FORMAT_MAP["DD/MM/YYYY"] = "d/m/Y";
EXTJS_DATE_FORMAT_MAP["dd/mm/yyyy"]= "d/m/Y";

/*
 * This supportDBFmt map used for get Extjs Date format according to DB format
 */
var supportDBFmt =  {};
supportDBFmt["DD-MON-RR"] = "d-M-y";
var supportDBFmtReport = {};
supportDBFmtReport["DD-MON-RR"] =  "d-M-Y";
//till here

var fileArchiveStatusMap = {};

var fileArchiveBeforeSaveMap = {};

var exprMap={};

var hideFrameMap = {};

var allowFrameChangeMap = {};

// var gridCtRecordMap={};


/*************Tracking Expression*************/

var $eTracker={};
var $veTracker={};
var $fieldvalue={};

/********************************************/

/*****************SPECIAL CHARACTER***********/


    var specialCharMap={};
	    specialCharMap["SLASH"] = "/";
	  


/********************************************/

/*****************For Mobile*****************/
var eformVarMap = {};
var selectedValue = "";
var currencyCode = "";
/********************************************/

function setEformVarMap(mapValue) {	
	for (var i in mapValue)
		eformVarMap[i] = mapValue[i];
}

function setGetFieldval(event) {	
	selectedValue = event;
}

function amtInWord(decAmount,currency,subCurr,millionRep,decimal){
	if(currencyCode != "" && currencyCode !== 'INR'){
		var ccode = currencyCode;
		var currencyInfo = currencies.filter(function(a){
			return a.code === ccode;
		})[0];
		var inwords = BCSCurrtoWords(decAmount,currencyInfo.major,currencyInfo.minor,currencyInfo.decimal_digits);
		return inwords;
	}
	if(currency && (currency.toLowerCase() !== undefined && currency.toLowerCase() !== 'rs' ) && currencyCode !== 'INR'){
		return CurrtoWords(decAmount+'',currency,subCurr,decimal,undefined)
	}

	var amountInNum=parseFloat(decAmount);

	if(amountInNum < 0){

		return null;

	}

	var unit=new Array(20);
	var sTens=new Array(8);
	var sHundreds=new Array(6);
	var sMillionRep=new Array();
	var sAmount;
	var i,iLenAmount,iDecPart,iIntegerPart;

	unit[1]  = '';unit[2]  = 'One';unit[3]  = 'Two';unit[4]  = 'Three';unit[5]  = 'Four';unit[6]  = 'Five';
	unit[7]  = 'Six';unit[8]  = 'Seven';unit[9]  = 'Eight';unit[10] = 'Nine';unit[11] = 'Ten';unit[12] = 'Eleven';
	unit[13] = 'Twelve';unit[14] = 'Thirteen';unit[15] = 'Fourteen';unit[16] = 'Fifteen';unit[17] = 'Sixteen';
	unit[18] = 'Seventeen';unit[19] = 'Eighteen';unit[20] = 'Ninteen';

	sTens[1]   = 'Twenty';sTens[2]   = 'Thirty';sTens[3]   = 'Forty';sTens[4]   = 'Fifty';sTens[5]   = 'Sixty';sTens[6]   = 'Seventy';
	sTens[7]   = 'Eighty';sTens[8]   = 'Ninety';

	sHundreds[1] = 'Hundred';sHundreds[2] = 'Thousand';sHundreds[3] = 'Lac';sHundreds[4] = 'Crore';
	
	sMillionRep[1]='Million';sMillionRep[2]='Billion';
			
	if (decAmount == 10000000000000)
	{
		decAmount = 9999999999999.99;
	}
	if (decAmount  == 0)
	{
		return "";
	}

	iDecPart = (decAmount -  Math.round(decAmount)) * 100;
	iDecPart=Math.round(iDecPart);

	if(iDecPart<0)
	{
		iDecPart=100+iDecPart;
	}

	if( iDecPart == 0)
	{
		decAmount = decAmount;
	}
	else
	{
		decAmount =Math.round(decAmount - (iDecPart/100));
	}
	
	iLenAmount = ((String)(decAmount)).length;

	if (iLenAmount == 1)
	{
		var index=parseInt(decAmount)+1;
		sAmount = unit[index];
	}
	else	
	{
		for(i=iLenAmount;i>0;i--)
		{
			if (i==13 || i==12)
			{
				iIntegerPart = parseInt(decAmount/100000000000);
				decAmount = parseInt(decAmount % 100000000000);
				if(iIntegerPart==0)
				{
					sAmount = sAmount;
				}
				else
				{
					if(iIntegerPart<20)
					{
						sAmount = unit[iIntegerPart + 1] +" "+ sHundreds[6]+" ";
					}
					else
					{
						sAmount = sTens[parseInt(iIntegerPart/10) - 1] +" "+ unit[(iIntegerPart - parseInt(iIntegerPart/10)*10) + 1] +" "+ sHundreds[6]+" ";
					}
				}
			}
			else if (i==11 || i==10)
			{
				iIntegerPart = parseInt(decAmount/1000000000);
				decAmount = parseInt(decAmount % 1000000000);
				if(iIntegerPart==0)
				{
					sAmount = sAmount;
				}
				else
				{
					if(iIntegerPart<20)
					{
						if(sAmount == null)
						{
							sAmount = unit[iIntegerPart + 1] +" "+ sHundreds[5]+" ";
						}
						else
						{
							sAmount = sAmount+" "+unit[iIntegerPart + 1] +" "+ sHundreds[5]+" ";
						}
					}
					else
					{
						if(sAmount == null)
						{
							sAmount = sTens[parseInt(iIntegerPart/10) - 1] +" "+ unit[(iIntegerPart - parseInt(iIntegerPart/10)*10) + 1] +" "+ sHundreds[5]+" ";
						}
						else
						{
							sAmount = sAmount+" "+sTens[parseInt(iIntegerPart/10) - 1] +" "+ unit[(iIntegerPart - parseInt(iIntegerPart/10)*10) + 1] +" "+ sHundreds[5]+" ";
						}
					}
				}
			}
			else if (i==9 || i==8)
			{
				iIntegerPart = parseInt(decAmount/10000000);
				decAmount = parseInt(decAmount % 10000000);
				if(iIntegerPart==0)
				{
					sAmount = sAmount;
				}
				else
				{
					if(iIntegerPart<20)
					{
						if(sAmount == null)
						{
							sAmount = unit[iIntegerPart + 1] +" "+ sHundreds[4]+" ";
						}
						else
						{
							sAmount = sAmount+" "+unit[iIntegerPart + 1] +" "+ sHundreds[4]+" ";
						}
					}
					else
					{
						if(sAmount == null)
						{
								sAmount = sTens[parseInt(iIntegerPart/10) - 1] +" "+ unit[(iIntegerPart - parseInt(iIntegerPart/10)*10) + 1] +" "+ sHundreds[4]+" ";
						}
						else
						{
								sAmount = sAmount+" "+sTens[parseInt(iIntegerPart/10) - 1] +" "+ unit[(iIntegerPart - parseInt(iIntegerPart/10)*10) + 1] +" "+ sHundreds[4]+" ";
						}
					}
				}
			}
			else if(i==7 || i==6)
			{
				iIntegerPart = parseInt(decAmount/100000);
				decAmount = (decAmount % 100000);
				if(iIntegerPart==0)
				{
					sAmount = sAmount;
				}
				else
				{
					if(iIntegerPart < 20)
					{
						if(sAmount == null)
						{
							if(currency==undefined)
							{
							sAmount =unit[iIntegerPart + 1]+" "+ sHundreds[3]+" ";
							}
							else
							{
							sAmount =unit[iIntegerPart + 1]+" "+ sHundreds[3]+" ";
							}
							// sAmount=unit[iIntegerPart+1]+"
							// "+sMillionRep[1]+" ";

						}
						else
						{
							if(currency==undefined)
							{
							sAmount = sAmount+" "+unit[iIntegerPart + 1]+" "+ sHundreds[3]+" ";
							}
							else
							{
							sAmount = sAmount+" "+unit[iIntegerPart + 1]+" "+ sHundreds[3]+" ";
							}
							// sAmount=unit[iIntegerPart+1]+"
							// "+sMillionRep[1]+" ";
							
						}
					}
					else
					{
						if(sAmount == null)
						{
							sAmount = sTens[parseInt(iIntegerPart/10) - 1] +" "+ unit[(iIntegerPart - parseInt(iIntegerPart/10)*10) + 1] +" "+ sHundreds[3]+" ";
						}
						else
						{
							sAmount = sAmount+" "+sTens[parseInt(iIntegerPart/10) - 1] +" "+ unit[(iIntegerPart - parseInt(iIntegerPart/10)*10) + 1] +" "+ sHundreds[3]+" ";
						}
					}
				}
			}
			else if(i==5 || i==4)
			{
				iIntegerPart = parseInt(decAmount/1000);
				decAmount = (decAmount % 1000);
				if(iIntegerPart==0)
				{
					sAmount = sAmount;
				}
				else
				{
					if(iIntegerPart < 20)
					{
						if(sAmount == null)
						{
							sAmount = unit[iIntegerPart + 1]+" "+ sHundreds[2]+" ";
						}
						else
						{
							sAmount = sAmount+" "+unit[iIntegerPart + 1]+" "+ sHundreds[2]+" ";
						}
					}
					else
					{
						if(sAmount == null)
						{
							sAmount = sTens[parseInt(iIntegerPart/10) - 1] +" "+ unit[(iIntegerPart - parseInt(iIntegerPart/10)*10) + 1]+" "+ sHundreds[2]+" ";
						}
						else
						{
							sAmount = sAmount+" "+sTens[parseInt(iIntegerPart/10) - 1] +" "+ unit[(iIntegerPart - parseInt(iIntegerPart/10)*10) + 1]+" "+ sHundreds[2]+" ";
						}
					}
				}
			}
			else if(i==3)
			{
				iIntegerPart = parseInt(decAmount/100);
				decAmount = (decAmount % 100);
				if(iIntegerPart==0)
				{
					sAmount = sAmount;
				}
				else
				{
					var index;
					index=parseInt(iIntegerPart)+1;
					if (sAmount == null)
					{
						sAmount = unit[index] +" "+ sHundreds[1]+" ";
					}
					else
					{
						sAmount = sAmount+" "+unit[index] +" "+ sHundreds[1]+" ";
					}
				}
			}
			else if(i==2)
			{
				decAmount=parseInt(eval(decAmount));
				if(decAmount<20)
				{
					var index=parseInt(decAmount)+1;
					if (sAmount == null)
					{
						sAmount = unit[index];
					}
					else
					{
						sAmount = sAmount+" "+unit[index];
					}
				}
				else
				{
					var a=parseInt(((decAmount/10) - 1));
					var b=(decAmount%10) + 1;
					if (sAmount == null)
					{
						sAmount = sTens[a] +" "+ unit[b];
					}
					else
					{
						sAmount = sAmount+" "+sTens[a] +" "+ unit[b];
					}
				}	
			}
		}
	}
	if(iDecPart==0)
	{
		if(currency==undefined){
			// debugger;
		sAmount = "Rs. " + sAmount;
		}
		else{

		sAmount = currency+" "+ sAmount;
		
		}
	}
	else if(sAmount=="")
	{
		if(subCurr==undefined)
		{
		sAmount = "Paise ";
		}
		else
			{
			sAmount=" "+subCurr;
			}
	}
	else
	{
		sAmount = "Rs. "+sAmount+" And Paise";
	}

	if(iDecPart < 20)
	{
		sAmount = sAmount+" "+unit[iDecPart + 1]+" ";
	}
	else
	{
		var fi = parseInt(((iDecPart/10) - 1));
		var fii = parseInt((iDecPart % 10))+1;
		sAmount = sAmount+" "+sTens[fi] +" "+ unit[fii]+" " ;
	}
	
	sAmount = sAmount + "Only /-";

	return sAmount;

}

function getLastDateOfMonth(gvnDate){
	var lastDayOfMonth = new Date(gvnDate.getFullYear(), gvnDate.getMonth() + 1, 0);
	return lastDayOfMonth;
}

function isEqual(lastDateofMonth,givenDate){	
	if(lastDateofMonth.getDate() == givenDate.getDate()){
		return true;
	}
	else{
		return false;
	}
}

function LZ(x) {
	return (x < 0 || x > 9 ? "" : "0") + x;
}

var universalFormat = "DD/MM/YYYY";
var dtFormat = "DD-MON-YY";
var compStoreObj = null;
var compGridObj = null;
var compObjName = null;
function BCSDate() {
	var valDate = 0;	
	var actionObjName = null;
	var valMonth = 0;
	var valYear = 0;
	var dtStr = "";
	var dtValue = "";
	var dtFmt = dtFormat;
	
	var dtArrs = new Array();
	var ONE_DAY = 1000 * 60 * 60 * 24;
	var ONE_HR = 1000 * 60 * 60;
	var ONE_MIN = 1000 * 60;

	this.fmtDate = formattedDate;
	this.addtodate = addtodate;
	this.addtomonth = addtomonth;
	this.yearofdate = YearOfDate;
	this.lastdayofmonth = LastDayOfMonth;

	this.monthofdate = MonthOfDate;
	this.monthyear = cMonthYear;
	this.mkDate = MakeDate;
	this.mthandyr = MandY;
	this.yrandmth = YandM;

	this.datetochar = DTOC;
	this.chartodate = CTOD;
	this.weekNo=weekNo;
	this.daysElapsed = DaysElapsed;
	this.setBackground = setBackground;
	this.dayofdate = DayofDate;
	// this.dayofdate=SDayofDate;
	this.timeElaspsed = timeElaspsed;

	this.addtotime = AddtoTime;
	this.isemptyvalue = isEmptyValue;
	this.isempty = isEmpty;
	this.validencodedate = ValidEncodeDate;
	this.gridcoltotal = gridColTotal;

	this.getmin = getMin;
	this.getmax = getMax;
	this.getgridobj = getGridObj;
	this.getrowcount = getRowCount;
	this.getvalue = GetValue;
	this.getRoundOff=getRoundOff;
    this.remainder = remainder;

	this.getrow = GetRow;
	this.gridsum = GridSum;
	this.sumtill = SumTill;
	this.setvalue = SetValue;
	this.cmonthyear = cMonthYear;

	this.refreshField = refreshField;
	this.formatdatetime = formatDateTime;
	this.cell = cell;
	this.getSubTotal = getSubTotal;
	this.getID = getID;

	this.getOld = getOld;
	this.regVar = regVar;
	this.SQLRegVar = SQLRegVar;
	this.setProperty = setProperty;
	this.fireSQL = fireSQL;
	this.setPropertyByCondition = setPropertyByCondition;
	this.fireSqlArray=fireSqlArray;
	this.drawHtmlTable = drawHtmlTable;
	
	this.printPreview = printPreview;
	this.multiprintPreview = multiprintPreview;


	this.sqlGet = sqlGet;
	this.gen_id = gen_id;
	this.findRecord = findRecord;
	this.hideFrame = hideFrame;
	this.refreshFrame = refreshFrame;

	this.initGrid = initGrid;
	this.activateField = activateField;
	this.enableButton = enableButton;
	this.showHideButton = showHideButton;
	this.allowFrameChange = allowFrameChange;
	this.setSystemVar = setSystemVar;

	this.xrun = xrun;
	this.resetActiveComp = resetActiveComp;
	this.OpenTransform=OpenTransform;
	this.executeOption=executeOption;
	this.fieldChanged=fieldChanged;
	this.fieldChangedBoolean = fieldChangedBoolean;
	this.setSequence=setSequence;
	this.linkFormTrans =linkFormTrans;
	
	this.getCostRateWOLOC=getCostRateWOLOC;
	this.getCostRateWLOC=getCostRateWLOC;
	this.getClosingStockWLOC=getClosingStockWLOC;
	this.getClosingStockWOLOC=getClosingStockWOLOC;
	this.checkStockWOLOC=checkStockWOLOC;
	this.checkStockWLOC=checkStockWLOC;
	this.getStockAge=getStockAge;
	this.getStockValueWLOC=getStockValueWLOC;
    this.getStockValueWOLOC=getStockValueWOLOC;
    this.getValueFromDB = getValueFromDB;
	this.loadData=loadData;
	/*
	 * this.allowChange=allowChange; this.afterSaveStatus=afterSaveStatus;
	 */

	/*
	 * Report Functions
	 */
	/* For Setting The Decimal */

	 this.setDecimalToNumber=setDecimalToNumber;
	 this.appendNumber=appendNumber;

	 /*This is for Send Message */
	 this.sendSMS=sendSMS;

	  /*This is for Send Mail */
	 this.sendMail=sendMail;

	 /*This is for Send Mail */
	 this.getServerDateTime = getServerDateTime;

	 /*This is for String Length */
	  this.strLength = strLength;
	  
	 this.hideColumn=hideColumn;
	 this.unHideColumn=unHideColumn;
	 this.editColumn=editColumn;
	 // this.sortIView=sortIView;
	 this.addOption=addOption;
	 this.refreshview=refreshview;
	 this.setColumnValue=setColumnValue;

	 this.SetTotalValue=SetTotalValue;

	 this.setCellFont=setCellFont;
     this.isValidDrop=isValidDrop;
	 this.postRecord=postRecord;

	 this.getCell=getCell;
	 this.getRCell=getRCell;
	 this.searchUtility = searchUtility;
	 this.hideColumnReport=hideColumnReport;
	 this.contains = contains;
	 
	 /*MathFunctions*/
	 this.ceil=ceil;
	 
	 this.directPrintFormat=directPrintFormat;

	 /*New Implement Function*/
	 this.currentDayOfWeek=currentDayOfWeek;
	 this.remainingDaysOfMonth=remainingDaysOfMonth;
	 this.getDaysInMonth=getDaysInMonth;
	 this.getFirstDateOfMonth=getFirstDateOfMonth;

     this.fileArchiveBeforeSave = fileArchiveBeforeSave;
	 this.fileArchiveExists = fileArchiveExists;
	 this.transposetoeform = transposetoeform;
     //Find human age 
	 this.getAge=getAge;
	 this.getDays=getDays;
	 this.getAgeAndDays=getAgeAndDays;
     this.openEreport=openEreport;
	 
	 this.openPage = openPage;
	 this.validateLatLng = validateLatLng;
	 this.checkForRegExpr = checkForRegExpr;
	 
	 this.getLatitude = getLatitude;
	 this.getLongitude = getLongitude;
	 this.generateRedirectURL = generateRedirectURL;
     
     this.floor=floor;
     this.trunc=trunc;

}

function getAge(birthDate){
  //get rounded Age
  if(birthDate){

    birthDate=CTOD(birthDate);
    
    var today = new Date();
    //var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
    {
        age--;
    }
    return age;
  }
  return 0;

}

/*
  @Saravana
  getDays function is used for to find human days from birth date 

*/

function getDays(birthDate){
  //Calculate Dates

  //one day in milliseconds
  var oneDay=1000*60*60*24
   
  if(birthDate){
	 var bday=CTOD(birthDate);
     var totalDays=Ext.Date.getElapsed(bday)/oneDay; 
	 alert(Math.floor(totalDays));
     return Math.floor(totalDays);
  }
  return 0;

}

/*
  @Saravana
  getAgeAndDays function is used for to find human years and days from birth date 

*/
function getAgeAndDays(birthDate){
  //Calculate Age and Days output will be 27.256
    if(birthDate){
		var bday=CTOD(birthDate);
		var seconds=Ext.Date.getElapsed(bday)/1000;
		var numyears = Math.floor(seconds / 31536000);
		var numdays = Math.floor((seconds % 31536000) / 86400); 
		var numhours = Math.floor(((seconds % 31536000) % 86400) / 3600);
		var numminutes = Math.floor((((seconds % 31536000) % 86400) % 3600) / 60);
		var numseconds = (((seconds % 31536000) % 86400) % 3600) % 60;
		alert(numyears+ "." +numdays);
		return numyears+ "." +numdays;
	}
    return 0;

}
/*openreport({62187612},{TF1@RF2,TF2@RF2})*/
function openEreport(queryMasterId,inputParameters){



	      function getParameterValue(inputParamList){

			   var ctEform = globalMap.get("EFORMID");

			    var parameterValue={
				  
				  'queryMastID':queryMasterId
				  
				};

          
		       	for (var i = 0; i < inputParamList.length; i++) {

					   var mappingField = inputParamList[i].toLowerCase().split('@');
					   var transactionField=mappingField[0];
					   var reportField=mappingField[1];

					var paramObj = Ext.getCmp(ctEform + "-" +transactionField+ "-id");

					if (paramObj) {
						var paramField = paramObj.getValue();

						if (paramField instanceof Date) {
							databaseFormat = globalMap.get("DB_FORMAT");
							var extjsDBFormat = supportDBFmt.get(databaseFormat);
							ng_date_value = Ext.Date.format(paramField, extjsDBFormat);
							//param = param + "&" + paramArr[i].toLowerCase() + "=" + ng_date_value;

							parameterValue[reportField.toLowerCase()]=ng_date_value;
							parameterValue[reportField.toUpperCase()]=ng_date_value;

						} else {

							//param = param + "&" + paramArr[i].toLowerCase() + "=" + paramField;
							parameterValue[reportField.toLowerCase()]=paramField;
							parameterValue[reportField.toUpperCase()]=paramField;
						}

					}else{

						  var globalVariable=globalMap.get(transactionField.toUpperCase());

						  if(globalVariable){
						    parameterValue[reportField.toLowerCase()]=globalVariable;
							parameterValue[reportField.toUpperCase()]=globalVariable;
						  }
					
					}

				}
			    
		       return parameterValue;
		  }
	     
	  	  inputParameters = inputParameters.replace(/\s/g, "");
		  inputParameterList = inputParameters.split(",");
		  var parameterValue=getParameterValue(inputParameterList);
          //EReportEvent.nextQueryName(queryMasterId,parameterValue);
		  loadQuery(parameterValue,queryMasterId);
   
 
 }

 /*New Implement Function*/
 
 function transposetoeform(sourceFrameno,targetEformid){
	var transpose_toEform = {
		'isTransposeToEform': true,
		'frameno': sourceFrameno,
		'targetEformid': targetEformid
	}
	 // transposeToEform_Model.setFrameNo(sourceFrameno);
	 // transposeToEform_Model.setEformtarget(targetEformid);
	 // transposeToEform_Model.setIsTransposeToEform(true);
	transposeToEform_Model.addToTransposeToEformModel(transpose_toEform);
 }
 
 function openPage(pageName,targetPage){
		if(targetPage.toLowerCase() === 'new'){
			var fileMenuItems = Ext.getCmp('file').menu;
			var menuItem = {
				icon : 'images/content.png',
				iconCls : 'iconcursor',
				cls :'subMenuCls',
				text : pageName,
				pageName:pageName,
				targetPage:targetPage,
				handler : function (btn) {
					var url = getURL() + "apps/organizer/getPageDetailByPageName";
					var param = "pageName=" + btn.pageName;
					var page;
					bcs.app.ajaxhelper.doXhr(url, param, false, function (data) {
						var pageInfo = Ext.JSON.decode(data)[0];
						//callback(Ext.JSON.decode(data));
						var model = new bcs.organizer.makeOrganizerModel(pageInfo);
						var organizerView = new bcs.organizer.makeOrganizerView(model);
						organizerView.makePage();
						page = organizerView.getPage();
						if(btn.targetPage.toLowerCase() === 'home'){
							var welcomeComp = Ext.getCmp('docs-panel');
							//Ext.getCmp('doc-body').add(page);
							if(welcomeComp){
								welcomeComp.removeAll(true);
								welcomeComp['layout'] = 'fit';
								welcomeComp['width'] = '100%';
								welcomeComp['height'] = '100%';
								welcomeComp['closable'] = false;
								page['title'] = '';
								welcomeComp.add([page]);
								welcomeComp.doLayout();
							}
						}else if(btn.targetPage.toLowerCase() === 'new'){
							//page['title'] = pageInfo.TITLE;
							page['closable'] = true;
							Ext.getCmp('doc-body').add(page);
							Ext.getCmp('doc-body').setActiveTab(page.id);
						}
					}); 
				}
			}
			
			fileMenuItems.add(menuItem);
		}else{
			var url = getURL() + "apps/organizer/getPageDetailByPageName";
			var param = "pageName=" + pageName;
			var page;
			bcs.app.ajaxhelper.doXhr(url, param, false, function (data) {
				var pageInfo = Ext.JSON.decode(data)[0];
				//callback(Ext.JSON.decode(data));
				var model = new bcs.organizer.makeOrganizerModel(pageInfo);
				var organizerView = new bcs.organizer.makeOrganizerView(model);
				organizerView.makePage();
				page = organizerView.getPage();
				if(targetPage.toLowerCase() === 'home'){
					var welcomeComp = Ext.getCmp('docs-panel');
					//Ext.getCmp('doc-body').add(page);
					if(welcomeComp){
						welcomeComp.removeAll(true);
						// welcomeComp['layout'] = 'fit';
						// welcomeComp['width'] = '100%';
						// welcomeComp['height'] = '100%';
						 welcomeComp['closable'] = false;
						page['title'] = '';
						welcomeComp.add([page]);
						//welcomeComp.doLayout();
					}
				}else if(targetPage.toLowerCase() === 'new'){
					//page['title'] = pageInfo.TITLE;
					Ext.getCmp('doc-body').add(page)
				}
			}); 
		}
		//Ext.getCmp('toolBarTop-1').doLayout();
		
		
 }

 function remainder(m,n)
 {

     var rnd = Math.round(m/n);
     var nearest = n * rnd;
     var calc =  m - nearest ;
     return calc.toPrecision(2);


 }


 function ceil(value)
 {
    
      return Math.ceil(value);
 
 }

 function currentDayOfWeek(selectedDate){

     if (selectedDate != null)
		 {
		 selectedDate = CTOD(selectedDate);
		 }

	    return Ext.Date.format(selectedDate,'l');
 
 }

 function getFirstDateOfMonth(date){

	
    if (date != null)
	{
		 date = CTOD(date);
	}

    return Ext.Date.getFirstDateOfMonth(date);
 
 }

 /*
     This function will calculate remaining days in month;
 */
 function remainingDaysOfMonth(date){

	       date=CTOD(date);
		   var lastDate=Ext.Date.getLastDateOfMonth(date);
		   var ONE_DAY = 1000 * 60 * 60 * 24;
		   var milli=Ext.Date.getElapsed(date,lastDate);
		   var pdys=milli/ONE_DAY;
		   return Math.floor(pdys);

 }
/*
  This function will calculate total days in month;
*/
 function getDaysInMonth(date){
      
	 if (date != null)
		 {
		 date = CTOD(date);
		 }
     return Ext.Date.getDaysInMonth(date);
 
 }

 
 function floor(value)
 {
 
	var getValue = ToNumber(value);
    
     return Math.floor(getValue);
 
 }
 
 
 function trunc(objOp2, objOp1){
     
	 var getValue = ToNumber(objOp2);
	 var truncatedNumber = getValue.toFixed(objOp1);
	 
	 return ToNumber(truncatedNumber);
	 
 }


/*New Implement Function*/

/*******************************************************************************
 * REPORT (IVIEW) FUNCTIONS
 ******************************************************************************/
 

 /*
	 * hidecolumn function used for to hide a particular column in grid
	 * ex:hidecolumn(ColumnName);
	 */
  function hideColumnReport(columnDataIdx,hidden){

	   
	 var q=reportCtStatus.get("QID");
	 if(q){
		
        if(reportEventVarMap.get(q.concat(':-:',columnDataIdx.toLowerCase())))
	    {
		var dataIdx=reportEventVarMap.get(q.concat(':-:',columnDataIdx.toLowerCase()));
		}
		else
		{
		var dataIdx=columnDataIdx.toLowerCase();
		}

	 }else{
	  var dataIdx=columnDataIdx.toLowerCase();
	 }
	 var gridid =currentReportGrid.get("ctReportGrid");
	 var grid=Ext.getCmp(gridid);
	 var columns=grid.headerCt.getGridColumns();
	 var len=columns.length||0;

	           for (var c=0;c < len ; c++ )
	           {

				   if(columns[c].dataIndex==dataIdx.toLowerCase()){
                          
						  if(hidden.toUpperCase()=="F"){
				            columns[c].setVisible(false);

						  }else if (hidden.toUpperCase()=="T"){
						    columns[c].setVisible(true);
						  }
						  
						  break;
				   }
	           }
  }
  
  function contains(columnDataIdx,sampConst){
	  
	 if(columnDataIdx.indexOf(sampConst) > 0){
		 
		 return 'T';
	 }
	 else{
		 
		 return 'F';
	 }
  }

  function hideColumn(columnDataIdx)
  {

      var mainAppPanel = Ext.getCmp('doc-body');
	  var grid = mainAppPanel.getActiveTab().items.items[0];  
	  
	  if(grid && grid.config){
	  
	       var localVariables = grid.config.dataModel.getIViewVariables();
		   var dataIndex=null;
		   if(_.has(localVariables,columnDataIdx.toLowerCase())){
			  dataIndex=localVariables[columnDataIdx.toLowerCase()];
		   }else{
		      dataIndex=columnDataIdx.toLowerCase();
		   }   
		   grid.hideColumn(dataIndex);
		   return;
	  }
	  
	  
	 var q=reportCtStatus.get("QID");
	 if(q){
		
        if(reportEventVarMap.get(q.concat(':-:',columnDataIdx.toLowerCase())))
	    {
		var dataIdx=reportEventVarMap.get(q.concat(':-:',columnDataIdx.toLowerCase()));
		}
		else
		{
		var dataIdx=columnDataIdx.toLowerCase();
		}

	 }else{
	  var dataIdx=columnDataIdx.toLowerCase();
	 }
	 var gridid =currentReportGrid.get("ctReportGrid");
	 var grid=Ext.getCmp(gridid);
	 var columns=grid.headerCt.getGridColumns();
	 var len=columns.length||0;

	           for (var c=0;c < len ; c++ )
	           {

				   if(columns[c].dataIndex==dataIdx.toLowerCase()){

				          columns[c].setVisible(false);
						  break;
				   }
	           }
  
  }


 function fileArchiveExists(status)
  {  
	   console.log('inside file archive exists -> Status :'+status);

 	    var MainEformId = globalMap.get('EFORMID');

 	    fileArchiveStatusMap.removeAtKey(MainEformId,status);	 

	    fileArchiveStatusMap.add(MainEformId,status);	 
  }
   function fileArchiveBeforeSave(saveStatus)
  {  
	   console.log('inside file archive before saveStatus :'+saveStatus);

	   var MainEformId = globalMap.get('EFORMID');

	   fileArchiveBeforeSaveMap.removeAtKey(MainEformId);

	   fileArchiveBeforeSaveMap.add(MainEformId,saveStatus);

  }

  /*Function To Set The Decimal Places*/

  function setDecimalToNumber(num,d) {
		
		 var v = num/Math.pow(10, d);
		return v;
}

/*Function To Add Numbers*/
	function appendNumber(num,a) {
		
		var value = ""+num+a;

	return value;
	}

  function unHideColumn(columnDataIdx){
  
      var mainAppPanel = Ext.getCmp('doc-body');
	  var grid = mainAppPanel.getActiveTab().items.items[0];  
	  
	  if(grid && grid.config){
	  
	       var localVariables = grid.config.dataModel.getIViewVariables();
		   var dataIndex=null;
		   if(_.has(localVariables,columnDataIdx.toLowerCase())){
			  dataIndex=localVariables[columnDataIdx.toLowerCase()];
		   }else{
		      dataIndex=columnDataIdx.toLowerCase();
		   }   
		   grid.unHideColumn(dataIndex);
		   return;
	  }

	  console.log(columnDataIdx);

	  var q=reportCtStatus.get("QID");
	  if(q){
	  if(reportEventVarMap.get(q.concat(':-:',columnDataIdx.toLowerCase())))
	    {
		var dataIdx=reportEventVarMap.get(q.concat(':-:',columnDataIdx.toLowerCase()));
		}
		else
		{
		var dataIdx=columnDataIdx.toLowerCase();
		}
	  }else{
	  var dataIdx=columnDataIdx.toLowerCase();
	  }
	
	  var gridid =currentReportGrid.get("ctReportGrid");
	  var grid=Ext.getCmp(gridid);
	  var columns=grid.headerCt.getGridColumns();
	  var len=columns.length||0;

	           for (var c=0;c < len ; c++ )
	           {

				   if(columns[c].dataIndex==dataIdx.toLowerCase()){

				          columns[c].setVisible(true);
						  break;
				   }
	           }
  
  
  }

  function editColumn(eformid,columnName,prompt){

	  if(eformid != null  && eformid.length >  0)
      {

           var mainPanel=Ext.getCmp('doc-body');
	     var reportGrid=mainPanel.getActiveTab().items.items[0];
		 
		  if(reportGrid && reportGrid.config){
		  
		    var iviewVariables=reportGrid.config.dataModel.getIViewVariables();
			
			var colName=null;
			var eFormID=null;
			
			if(_.has(iviewVariables,columnName.toLowerCase())){
			    colName=iviewVariables[columnName.toLowerCase()];
			}
			if(_.has(iviewVariables,eformid.toLowerCase())){
			     eFormID=iviewVariables[eformid.toLowerCase()];
			}
			
			if(!_.isNull(eFormID)&&!_.isNull(columnName)){
			
			
			}
			
			var dataType =reportGrid.down('[dataIndex='+colName.toLowerCase()+']').colprop.data_type;
		  
		  }
		 
		 //Old Report Code
		 /* if(reportCtStatus.get("QID")){	
          var qMastID=reportCtStatus.get("QID");
          var eFormID=reportEventVarMap.get(qMastID+":-:"+eformid.toLowerCase());
          var colName=reportEventVarMap.get(qMastID+":-:"+columnName.toLowerCase());
		  var dataType = reportGrid.down('[dataIndex='+colName.toLowerCase()+']').dataType;
		  }*/
          if(eFormID.length != 0 || colName.length != 0){
            reportCtStatus.add("editColumn",colName);
           // Ext.MessageBox.prompt(colName,prompt,editColumnClick);
		    var msgBox=Ext.MessageBox;
			msgBox.minPromptWidth=300;
			
			if(reportGrid.down('[dataIndex='+colName.toLowerCase()+']')&&reportGrid.down('[dataIndex='+colName.toLowerCase()+']').colprop.data_type == "datetime")
			{
				var today = new Date();
				var dd = today.getDate();
				var mm = today.getMonth()+1; //January is 0!
				var yyyy = today.getFullYear();

				if(dd<10) {
				    dd='0'+dd;
				} 

				if(mm<10) {
				    mm='0'+mm;
				} 

				msgBox.prompt(colName,prompt,editColumnClick,'',false,dd+'/'+mm+'/'+yyyy);
			}
			else
			{
				msgBox.prompt(colName,prompt,editColumnClick);
			}
			
          }


      }
      else
      {

          Ext.Msg.alert('<Font color="red">Warning</Font>','<b>Cannot Perform Action EForm is Empty and Check Your Condition </b>');
          return;

      }

  }

   function editColumnClick(btn, text){
         
		    if(btn.toLowerCase() != "cancel"){
			var mainPanel=Ext.getCmp('doc-body');
	        var reportGrid=mainPanel.getActiveTab().items.items[0];
			if(reportGrid && reportGrid.config){
		     
			 var config =reportGrid.config;
             var dataModel = config.dataModel;
             var ipData = config.userInputValues;
             var bcsEvent = config.iViewMetaData.bcsEvent;
			 var aEList = bcsEvent.afteredit;
			 var modelMap = reportGrid.model;
		     var ctRec = modelMap.get("current_record").data;
			 
			 var columnsList = reportGrid.columns;
			 var colN = reportCtStatus.get("editColumn");
			 ctRec[colN.toLowerCase()]=text;
			 var data = ctRec;
			}
		    else{
		    reportCtStatus.add("eColTxt",text);
            var colN=reportCtStatus.get("editColumn");
            var currentRecord=reportCtStatus.get("ctRecord");
		    currentRecord.set(colN.toLowerCase(),text);

            // debugger;
            var ctRec=reportCtStatus.get("ctRecord");
		    var mainPanel=Ext.getCmp('doc-body');
	        var reportGrid=mainPanel.getActiveTab().items.items[0];
            var ipData=reportGrid.paramData;


		   var paramWindowCt=hashMap_reportEvent.get(reportGrid.id),
			   event=paramWindowCt.bcsEvent;

         
          /** *********************AFTEREDIT*************************** */
            var aEList=event.afteredit;
			//var dtype = Ext.getCmp(reportGrid).columns[colN.toLowerCase()].dataType;
             var columnsList=reportGrid.columns;
		}
			 for (var i=0;i<columnsList.length;i++)
			 {
				 var column = columnsList[i];
				 if(column.dataIndex==colN.toLowerCase()){
					 var dType = column.data_type;


				      	if (dType== "datetime") 
						{



                            if(text != null && text.length < 10)
                            {

                                var spttext = text.split("/");

                                var sptdate = spttext[0];
                                var sptmonth = spttext[1];
                                var sptyear = spttext[2];

                                if(sptdate.length == 1)
                                    {
									sptdate = "0"+sptdate;
									}

                                if(sptmonth.length == 1)
                                {
                                    sptmonth = "0"+sptmonth;
                                }


                                if(sptyear.length != 4)
                                {

                                    alert("Enter Year in the Format : YYYY");
                                    return;
                                }

                                text = sptdate+"/"+sptmonth+"/"+sptyear;


                            }
                            var dataValue = convertStringToDBFormat(text);
							if(ctRec.data[colN.toLowerCase()]){

								ctRec.data[colN.toLowerCase()]=dataValue;
							
							}
						}
				      break;
				 }
			 }

			  for(var colName in aEList)
			  {
				if(colN.toLowerCase()==colName.toLowerCase())
				{
					
                        var exprList=aEList[colName]; 
						if(reportGrid && reportGrid.config){
						   reportGrid.config.iViewEventHandler.afterEdit(colN.toLowerCase());
						}
						else{
					    EReportEvent.afterEdit(exprList,data,ipData);
						}
					}
			  }
		}

		 /** *********************AFTEREDIT*************************** */	
   }

   function setColumnValue(colName,value){

	         // console.log("ENTER SETCOLUMNVALUE");
			 // console.log(value);
             // debugger;
			 var currentRecord =null;
			 if(reportCtStatus.get("ctRecord")){
                currentRecord=reportCtStatus.get("ctRecord");
				currentRecord.set(colName.toLowerCase(),value);
			 }
			 else{
			    var mainPanel=Ext.getCmp('doc-body');
			    var reportGrid=mainPanel.getActiveTab().items.items[0];
				var modelMap = reportGrid.model;
		        var currentRecord = modelMap.get("current_record").data;
			    currentRecord[colName.toLowerCase()] = value;
			 
			 }
			 
   }


function SetTotalValue(num,colName,value){

             var currentRecord=reportCtStatus.get("BPGT");
             if(currentRecord[colName.toLowerCase()] != null){
			   currentRecord[colName.toLowerCase()]=value;
			 }
   }
    

   function setCellFont(colName,variable){
       
			var q=reportCtStatus.get("QID");
			var v=reportEventVarMap.get(q.concat(':-:',variable));
			console.log("v");
			console.log(v);

   }

  /*
	 * AddOption function used for add menuBtn to grid contextmenubar
	 * parameter:menuNames ex:addOption('btn1,btn2,btn3,.......');
	 * 
	 */

  function addOption(menuNames){
  
  
	   var mainAppPanel = Ext.getCmp('doc-body');
	   
	   var grid = mainAppPanel.getActiveTab().items.items[0];
       var menuList=menuNames.split(",");
	   
	   if(grid && _.isFunction(grid.addMenu)){
	           //New implementation
			   grid.addMenu(menuList,grid);
	  }

	     else{

		   var menuList=menuNames.split(",");
           var id=currentReportGrid.get("ctReportGrid");
		   var grid=Ext.getCmp(id);
		   var doubleClickValue = grid['doubleClickValue'];

		 //  if(grid.store.getCount()==0){
		   
//		         grid.view.on('containercontextmenu',function(view, e, eOp){
//					 var menu = new Ext.menu.Menu();
//				 for(var m=0;m<menuList.length;m++){
//
//					  if(menuList[m]=='F'){
//					  
//					  
//					  }
//					    else{
//						 menu.add(
//						 {
//						   text:menuList[m],
//						   handler:function(){
//                              var id=currentReportGrid.get("ctReportGrid");
//                              reportCtxMenuBtnHandler(id,{data:{}},this.text,doubleClickValue);
//
//						   }
//						 
//						 });
//						}
//				 }
//
//             menu.showAt(e.xy);
//			 e.stopEvent();
//				 
//				 })
		
		  // }else{

		   grid.on('itemcontextmenu',function(view, record, item, index, e){
			      reportCtStatus.add("ctRecord",record);
				  reportCtStatus.add("Ext.view.View",view);

				  if(record.raw['RECBOLD']||record.raw['linespace']||record.raw['GT']){
				   
				      return;
				  }
			    // gridCtRecordMap.add("ctrec",record);
		         var menu = new Ext.menu.Menu();
				 for(var m=0;m<menuList.length;m++){

					  if(menuList[m]=='F'){
					  
					  
					  }
					    else{
						 menu.add(
						 {
						   text:menuList[m],
						   icon:'images/reportView.png',
						   handler:function(){
								var contextButtonName	= this.text;
								var myMask = new Ext.LoadMask(Ext.getBody(), {msg:"Loading ..."});
								myMask.show();

								setTimeout(function (){
								   var record=reportCtStatus.get("ctRecord");
								   var extView=reportCtStatus.get("Ext.view.View");
								   reportCtxMenuBtnHandler(extView.ownerCt.id,record,contextButtonName,doubleClickValue);
									myMask.hide();
								},10);							   
						   }
						 
						 });
						}
				 }

             if(menu.items.items.length != 0){
				 menu.showAt(e.xy);
				 e.stopEvent();
			 }
		   
		   });
		  }
  
  
  }

  function reportEmptyContextMenu(){
  
  
  
  }

  function reportCtxMenuBtnHandler(gridId,ctRecord,btnText,doubleClickValue){

		  var data={};

	      var paramWindowCt=hashMap_reportEvent.get(gridId),
			  event=paramWindowCt.bcsEvent;

	          var grid=Ext.getCmp(gridId);
			  var paramData=grid.paramData;
			 // data=jsonConcat(ctRecord.data,paramData);

			  reportCtStatus.add("colExprVal",ctRecord);
	          reportCtStatus.add("inputParamVal",paramData);

              /** *********************ONCLICK*************************** */

		      var btns=event.onclick;

			  for(var btnName in btns)
			  {

					if(btnName.toLowerCase()==btnText.toLowerCase())
					{
						  EReportEvent.setReportGridId(gridId);
						  var exprList=btns[btnName]; 

						  for (var el=0;el<exprList.length;el++)
						  {    
							eventName = exprList[el].split(":=");
							if (eventName[0] != null && eventName[0].trim().toLowerCase().indexOf("setnextrecord") !== -1) {
								actionReportNextRecordMap.add("SAVENEXTRECORD", true);
								actionReportNextRecordMap.add("SAVENEXTRECORDGRIDOBJ", gridId);
								actionReportNextRecordMap.add("CURRENTRECORDOBJ", ctRecord);
								var reportEvent = hashMap_reportEvent.get(gridId).bcsEvent;
								actionReportNextRecordMap.add("REFRESHDATA",hashMap_reportEvent.get(gridId));
								
								var mainPanel = Ext.getCmp('doc-body');
			                    var activeTab = mainPanel.getActiveTab();
								var panelId = activeTab.id;
								var pTitle = activeTab.tabConfig.tooltip;
								var reportObjTabInfo = {};
								
								reportObjTabInfo['mainPanel'] =mainPanel;
								reportObjTabInfo['activeTab'] =activeTab;
								reportObjTabInfo['panelId'] =panelId;
								reportObjTabInfo['pTitle'] =pTitle;
								reportObjTabInfo['gridId'] =gridId;
								actionReportNextRecordMap.add("REPORTTABINFO",reportObjTabInfo);
								if(reportEvent){
									if(reportEvent.refreshdata){
										//actionReportNextRecordMap.add("REFRESHDATA",reportEvent.refreshdata.COMPEVENT);
										//actionReportNextRecordMap.add("REFRESHDATA",hashMap_reportEvent.get(gridId));
									}
									
								}
								
							}else {
								index = exprList[el].indexOf('//');
								if (index != 0) {
									EReportEvent.onclick(exprList[el], ctRecord.data, paramData);
								}
							}
						  }
					}
			  
			  }
			   /** *********************ONCLICK*************************** */

  }

  function refreshview(){

                var mainPanel=Ext.getCmp('doc-body');
				var reportGridId=mainPanel.getActiveTab().items.items[0].id;
				
				var grid =mainPanel.getActiveTab().items.items[0];
				
				if(grid && grid.config){
					grid.refreshReportGridView();
					return;
				}
				
				var reportActiveTabId=mainPanel.getActiveTab().id.split("-")[1];
				var panelId	= Ext.getCmp('doc-body').getActiveTab().id;
				var param;
				var compOBJ;
				var jsonForTemp;
				var pTitle		= Ext.getCmp('doc-body').getActiveTab().tabConfig.tooltip;
				if(Ext.getCmp(reportGridId).model){
				 param		= Ext.getCmp(reportGridId).model.param;
				 compOBJ	= Ext.getCmp(reportGridId).model.metaData;
				 jsonForTemp = Ext.getCmp(reportGridId).paramData;
				}
				else{			
					reportGridId = mainPanel.getActiveTab().items.items[1].items.items[0].id;
					param = Ext.getCmp(reportGridId).model.param;
					compOBJ = Ext.getCmp(reportGridId).model.metaData;
					jsonForTemp = Ext.getCmp(reportGridId).paramData;

				
				}
				

				if(param == "0")
				{
				getReportGridDataRefresh(compOBJ,mainPanel,pTitle,panelId,reportGridId);
				}
				else
				{
				viewReportFnRefresh(mainPanel,param,pTitle,panelId,compOBJ,jsonForTemp,reportGridId);
				}
  }
  
 //file attachment in button 
 function fileattachment(){
	eformid = globalMap.get("EFORMID");
	var win = Ext.create('Ext.window.Window', {
			title : 'Upload Document',
			width : 500,
			height : 200,
			bodyPadding : 10,
			modal : true,
			frame : true,					
			layout : 'fit',
			items : [{
					xtype : 'form',
					width : 400,
					bodyPadding : 40,
					id : 'uploadform',
					//hidden : true,
					fname : "",
					fsize  : "",
					allowBlank : false,
					renderTo : Ext.getBody(),
					items : [{
							xtype : 'filefield',
							name : 'file',
							fieldLabel : 'Select a File',
							labelWidth : 80,
							msgTarget : 'side',
							buttonConfig:{
								cls:'mybtn',
							},
							//fieldStyle : 'color: blue; text-decoration:underline; cursor:pointer',
							width : 360,
							x : 30,
							y : 40,
							allowBlank : false,
							anchor : '100%',
							listeners : {
								change : function (fld, value) {
								
									var form = this.up('form');					
									var newValue = value.replace(/C:\\fakepath\\/g, '');
									fld.setRawValue(newValue);
									var regex = new RegExp("(.*?)\.(txt|csv|docx|doc|pdf|xml|bmp|ppt|xls|png|jpg)");
									var file = fld.getEl().down('input[type=file]').dom.files[0];
									form.fname = file.name;
									if (file) {

										var bytes = file.size;
										if (bytes < 1024)
											bytes = bytes + " Bytes";
										else if (bytes < 1048576)
											bytes = (bytes / 1024).toFixed(3) + " KB";
										else if (bytes < 1073741824)
											bytes = (bytes / 1048576).toFixed(3) + " MB";
										else
											bytes = (bytes / 1073741824).toFixed(3) + " GB";
										
										form.fsize = bytes;
										
										
										if (bytes > 5 * 1048576) {
											Ext.Msg.show({
												title : 'File Error',
												msg : 'File Size Should not Exceed 5MB',
												buttons : Ext.Msg.OK,
												icon : Ext.Msg.ERROR
											});
										}

										if (!(regex.test(fld.rawValue))) {
											Ext.Msg.show({
												title : 'File Error',
												msg : 'Please Select Correct File Format (.txt,.csv,.docx,.doc,.pdf,.xml,.bmp,.ppt,.xls,.png,.jpg)',
												buttons : Ext.Msg.OK,
												icon : Ext.Msg.ERROR
											});
											fld.setRawValue(null);
										}									
									}
								}
							}
						},{
						xtype:'label',
						text :'(.pdf,.png,.jpg,.jpeg,.eml,.msf)',
						x : 85,
						y : 0,						
					},{
							xtype : 'button',
							text : 'Upload',
							x : 100,
							y : 20,
							width : 70,
							cls:'mybtn',
							handler : function () {
							
								var formCmp = this.up('form');
								var form = formCmp.getForm();
								var filename = formCmp.fname;
								var size = formCmp.fsize;
								
								/* for (var key in record.data) {
											
									if(key.match(/objectid/gi)){
										var uploadId=record.get(key);												
									}							
								}	 */					

								if (form.isValid()) {
									form.submit({

										url : getURL() + "apps/mongodb/Upload_File",
										method : 'POST',
										waitMsg : 'Uploading ' + filename + '(' + size + ')...',
										params : {
											eformid : eformid,											
											collection : "buttonfilecollection"
										},
										success : function (fp, o) {
											win.close();
											
											var uploadId = o.result.object;
											var fname = o.result.fileName;
											
											var btnfilename = Ext.getCmp(eformid+"-btnfilename-id");
											var btnobjectid = Ext.getCmp(eformid+"-btnobjectid-id");
											
											btnfilename.value = fname;
											btnobjectid.value = uploadId;	

											Ext.Msg.show({
												title : 'Status',
												msg : 'File Uploaded Successfully',
												buttons : Ext.Msg.OK
											});

										},
										failure : function (fp, o) {
											Ext.Msg.alert('Failure', 'File Uploading Failed');
										}
									});
								}
							}
						}, {
							xtype : 'button',
							text : 'Cancel',
							x : 110,
							y : 20,
							width : 70,
							cls:'mybtn',
							handler : function () {
								win.close();
							}
						}
					]
				}
			]
		});
 
	win.show();
 }
  function forcevoucheradjustmentbeforesave() {
  	var voucherobj = {};
  	var eformid = globalMap.get("EFORMID");

  	voucherobj = {
  		"forcevoucheradjustmentbeforesave" : true
  	};

  	rpGlobalMap.add(eformid, voucherobj);

  }

 function postRecord(eformid,basicid)
 {
  
          var recordDetails={};

		  if(eformid.length!=0)
		  {

		     recordDetails['transid']	= eformid;
		     recordDetails['recordid']	= basicid;
             var record="";
			 //Here Changed Based on new Report Code
			var mainPanel = Ext.getCmp('doc-body');
			var reportGrid = mainPanel.getActiveTab().items.items[0];
			if (reportGrid) {
				record =reportGrid.model.get('current_record');
		    }else{
				record=reportCtStatus.get("ctRecord");
			}

			 //alert("Current REcord");

			 var rowdata=record.data;

		     var valueArray=new Array();

			 for(var columnName in  rowdata)
			 {
		        var columnObj	= {};
				columnObj['FN']	= columnName;
				columnObj['FV']	= rowdata[columnName];
				//columnObj['DT']='D'

				valueArray.push(columnObj);

				//New line added by raja.i
				recordDetails[columnName] = rowdata[columnName];

			 }
            recordDetails['valueArray']=valueArray;


			//From Here Written by raja.i.
			globalSearchEFormId	= eformid;
			//Getting saved Value of Transation.
			var savedValue		= searchResult(basicid,'M','postRecord');

			//Getting eform json of transation.
			var eformJson		= getEformJsonPR(eformid);
			globalMap.add(eformid+":-:PRINTPREVIEW",eformJson.PRINTPREVIEW);
			eformMap.add(eformid,eformJson);
			
			//postRecord method.

            globalMap.add("POSTRECORD","POSTRECORD");
			postRecordUpdate(recordDetails,savedValue,eformJson);

          }else{

			  Ext.Msg.alert('<Font color="red">Warning</Font>','<b>Post Record Date Expression Failed Check in Expression Set. Eformid is Null </b>');
			  return;

		  }
      
  }

  function getCell(getTheColumn,cdnColumn,value){


       

		var storeArr=reportCtStatus.get("store");

		for (var s=0;s < storeArr.length ; s++)
		{
           
		   var record=storeArr[s];
           
		   if(record[cdnColumn.toLowerCase()] != 'undefined')
		   {

			   if (record[cdnColumn.toLowerCase()]==value)
			   {
                 return (record[getTheColumn.toLowerCase()]) ? record[getTheColumn.toLowerCase()] : "";
			   }
		   
		   }
		   

		}

		return 0;
  
  }

  function getRCell(columnName,rowno){

	  var no=rowno-1;
	  var cn=columnName.toLowerCase();

	  var storeArr=reportCtStatus.get("store");

	  var record=storeArr[no]||{};
      
	  return (record[cn]) ?record[cn] :"";
  
  
  }

  function searchUtility(btnName,cdn){
     
	 if(btnName != null){
	
	 if(btnName.toLowerCase() == "copyeform"){
	 
	      var btn = getButtonComponent("copyeform","searchWinToolbar");
		  btn.enable();
	 
	 }else if(btnName.toLowerCase() == "resendmail"){
	 
	      var btn = getButtonComponent("resendmail","searchWinToolbar");
		  btn.enable();
	 
	 }else if(btnName.toLowerCase() == "print"){
	 
	      var btn = getButtonComponent("print","searchWinToolbar");
		  btn.enable();
	 
	 }else{
	 
	       Ext.Msg.alert('Info', 'Select a proper utility to avail the functionality');
		   searchButtonToolbarStatus = false;
	 }

	 }
  
  
  }
/********************************************************************************************
                   END
*********************************************************************************************/


function loadData(basicID){

  
	var ctEform = globalMap.get("EFORMID");
	if(IsNumber(basicID))
	{
		
		 searchResultForLoadTstuct(basicID, "M",ctEform);
		 globalMap.add(ctEform+"-recordid-id",basicID);
		// eformMap.add(ctEform+"-modifyStatus",true);
		
	}
	else
	{
        var variable = null;

        if(basicID != null)
		{
		variable=eformVarMap.get(ctEform.concat('-',basicID.toLowerCase()));
		}


		if(variable!=null){
			
		   var loadid=variable.split(':-:')[1];
           searchResultForLoadTstuct(loadid, "M",ctEform);
		   globalMap.add(ctEform+"-recordid-id",loadid);

		}
		
		
	}
	
}

function loadDataNew(eformId,referenceField){
	 var eformMetadata = eformMap.get(eformId.toLowerCase());
	var parentTable;
	if(eformMetadata.related_tables && eformMetadata.related_tables.length>0){
		for(var ef=0;ef<eformMetadata.related_tables.length;ef++){
			if(eformMetadata.related_tables[ef].parent){
				parentTable = eformMetadata.related_tables[ef].parent;
				break;
			}
		}
	} 
	params = "EFORMID=" + parentTable+"&REFERENCEFIELD="+referenceField.toLowerCase()+"&USERNAME="+globalMap.get("USERNAME");
	url = getURL() + "apps/esearch/loadDataNew";
	bcs.app.ajaxhelper.doXhr(url, params, false,function (data) {
		loadData(data);
	});
	
}

function refreshField(fieldname) {

    // This Function Only for nonGridField

   var ctEform = globalMap.get("EFORMID");
   var obj = Ext.getCmp(ctEform + "-" + fieldname.toLowerCase() + "-id");
   var validExprResult ;

    if (obj != null && obj.compType == "NG") {

        var SQL = obj.sql;
        var Suggestive = obj.suggestive;
        var dmoe = obj.modeOfEntry;


        if (!obj.hidden) {

            if (obj.expression != "") {

                if (dmoe == 'From' && Suggestive == true)
                    {
					return;
					}

                if (dmoe == 'FL')
                    {
					return;
					}

                if (!SQL) {
                    if (dmoe == 'TBE' /* && Suggestive ==  false*/)
                        {
						return;
						}

                    var result = GetExprUIValidation(obj);
                    Ext.getCmp(obj.id).setValue(result);

                    if (obj.validateExpression != null && obj.validateExpression.length > 0) {
                        var validExpr = GetValidExpr(obj);
                        if (validExpr != null && validExpr.indexOf("_") < 0) {
							validExprResult = validExpr;
                            if (validExpr != false && validExpr.toLowerCase() != 't') {
                               // Ext.getCmp('doc-body').getEl().unmask();
                                if(bcsMask)
                                	bcsMask.hide();
                                Ext.Msg.alert("Warning","Vaildation Expression Fails for field "+obj.fieldLabel+" = "+"<b>"+ validExprResult+"</b>" );
                                globalMap.add('SAVECOMP', false);
                                return false;
                            }
                        }
                    }
                }

            }

        } else {
            if (obj.compName == 'comboremotefield' || obj.compName == 'combofield') {

                if (obj.compName == 'comboremotefield') {
                    //obj.expand(obj);
                } else if (obj.compName == 'combofield') {
                    //obj.expand();
                }

            } else if (obj.expression != "") {

                if (dmoe == 'From' && Suggestive == true)
                    {
					return;
					}

                if (dmoe == 'FL')
                    {
					return;
					}

                if (!SQL) {
                    if (dmoe == 'TBE' /* && Suggestive ==  false*/)
                        {
						return;
						}

                    var result = GetExprUIValidation(obj);
                    Ext.getCmp(obj.id).setValue(result);
                    if (obj.validateExpression != null && obj.validateExpression.length > 0) {
                        var validExpr = GetValidExpr(obj);
                        if (validExpr != null && validExpr.indexOf("_") < 0) {
							validExprResult = validExpr;
                            if (validExpr != false && validExpr.toLowerCase() != 't') {
                                //Ext.getCmp('doc-body').getEl().unmask();
                                if(bcsMask)
                            	  bcsMask.hide();
                                Ext.Msg.alert("Warning","Vaildation Expression Fails for field "+obj.fieldLabel+" = "+"<b>"+ validExprResult+"</b>" );
                                globalMap.add('SAVECOMP', false);
                                return false;
                            }
                        }
                    }

                }
            }

        }

    } else {
        var fieldName = ctEform + "-" + fieldname;
        var gridId = null;
        var dataStore = null;
        var gd_Obj = null;
        var columnField = Ext.getCmp(ctEform + "-" + fieldname.toLowerCase() + "-id");


        if (columnField != null)
            {
			if (columnField.config.editor != undefined) {

                gridId = columnField.config.editor.gridId;
                compGridObj = Ext.getCmp(gridId + "-grid");
                gd_Obj = compGridObj;
                dataStore = compGridObj.store;


            } else {
                gridId = columnField.field.gridId;
                compGridObj = Ext.getCmp(gridId + "-grid");
                gd_Obj = compGridObj;
                dataStore = compGridObj.store;
            }
			}
        if (dataStore != null) {
            for (var ds = 0; ds < dataStore.getCount(); ds++) {
                var dactiveRow = ds;

                globalMap.add("ACTIVEROW", dactiveRow + 1);

                if (columnField.config.editor != undefined) {

                    var SQL = columnField.config.editor.sql;
                    var Suggestive = columnField.config.editor.suggestive;
                    var dmoe = columnField.config.editor.modeOfEntry;

                    if (columnField.config.editor.expression != "") {

                        if (dmoe == 'From' && Suggestive == true)
                            {
							continue;
							}

                        if (dmoe == 'FL')
                            {
							continue;
							}

                        if (!SQL) {
                            if (dmoe == 'TBE'  /*&& Suggestive ==  false*/)
                                {
								continue;
								}
                            if (dataStore.data.items[ds].data[ctEform + "-validrow" + columnField.config.editor.gridslug] != "") {
                                var res = GridExprRow(columnField.config.editor, dactiveRow);
                               	
								if(columnField.config.editor.dataType == "N")
									{
									dataStore.data.items[ds].set(ctEform + "-" + fieldname.toLowerCase(),parseFloat(res));
									}
								else
									{
									dataStore.data.items[ds].set(ctEform + "-" + fieldname.toLowerCase(),res);
									}

                                if (columnField.config.editor.validateExpression != null
                                    && columnField.config.editor.validateExpression.length > 0) {

                                    var validExpr = GridValidExprRow(columnField.config.editor, dactiveRow);

                                    if (validExpr != null && validExpr.indexOf("_") < 0) {
                                         validExprResult = validExpr;
                                        if (validExpr != false && validExpr.toLowerCase() != 't') {
                                            //Ext.getCmp('doc-body').getEl().unmask();
                                        	if(bcsMask)
                                        	bcsMask.hide();
                                            Ext.Msg.alert("Warning","Vaildation Expression Fails for field "+columnField.text+" = "+"<b>"+ validExprResult+"</b>" );
                                            globalMap.add('SAVECOMP', false);
                                            return false;
                                        }

                                    }
                                }
                            }
                        }


                    }
                    if (columnField.config.editor.sourceField != "") {

                        setSrcEFieldValueGrid(columnField.config.editor, dataStore, dactiveRow, 1);
                       // if ((res != null && res > 0) || (res != null && res != "" ))
                       //     gd_Obj.getView().refreshNode(dactiveRow);
                    }
                }

                else if (columnField.field != undefined) {
                    var SQL = columnField.config.editor.sql;
                    var Suggestive = columnField.config.editor.suggestive;
                    var dmoe = columnField.config.editor.modeOfEntry;


                    if (columnField.field.expression != "") {

                        if (dmoe == 'From' && Suggestive == true)
                            {
							continue;
							}

                        if (dmoe == 'FL')
                            {
							continue;
							}

                        if (!SQL) {
                            if (dmoe == 'TBE'  /*&& Suggestive ==  false*/)
                                {
								continue;
								}

                            var res = GridExprRow(columnField.field, dactiveRow);
                           	if(columnField.field.dataType == "N")
								{
								dataStore.data.items[ds].set(ctEform + "-" + fieldname.toLowerCase(),parseFloat(res));
								}
							else
								{
								dataStore.data.items[ds].set(ctEform + "-" + fieldname.toLowerCase(),res);
								}
                          
                            if (columnField.config.editor.validateExpression != null
                                && columnField.config.editor.validateExpression.length > 0) {

                                var validExpr = GridValidExprRow(columnField.config.editor, dactiveRow);

                                if (validExpr != null && validExpr.indexOf("_") < 0) {
                                     validExprResult = validExpr;
                                    if (validExpr != false && validExpr.toLowerCase() != 't') {
                                       // Ext.getCmp('doc-body').getEl().unmask();
                                    	if(bcsMask)
                                        bcsMask.hide();
                                        Ext.Msg.alert("Warning","Vaildation Expression Fails for field "+columnField.config.editor.fieldLabel+" = "+"<b>"+ validExprResult+"</b>" );
                                         globalMap.add('SAVECOMP', false);
                                        return false;
                                    }

                                }
                            }

                        }

                    }

                    if (columnField.field.sourceField != "") {

                        setSrcEFieldValueGrid(columnField.config.editor, dataStore, dactiveRow, 1);
                        //if ((res != null && res > 0) || (res != null && res != "" ))
                         //   gd_Obj.getView().refreshNode(dactiveRow);
                    }


                }
            }

        }

    }
}


var printFormats=new Array();
function directPrintFormat(docid,eformid,formatName)
{

			// DIRECT PRINT CRYSTAL

		   var projectname	  = globalMap.get("PROJECTNAME");
		   var activeEformId  = eformid;
		   var activeDocId    = docid;

									   
			if (typeof XMLHttpRequest != 'undefined')

			{
			ajaxObj = new XMLHttpRequest();
			}

			else if (window.ActiveXObject) {

			var avers = ["Microsoft.XmlHttp", "MSXML2.XmlHttp","MSXML2.XmlHttp.3.0", "MSXML2.XmlHttp.4.0",		"MSXML2.XmlHttp.5.0"];

			for (var i = avers.length - 1; i >= 0; i--) {

				try {

					ajaxObj = new ActiveXObject(avers[i]);

					break;

					 } 
				
				catch (e) {

					}
					}
				}


             if (!ajaxObj)

		{
		throw new Error('XMLHttp (AJAX) not supported');
		}

		var url = getURL()+"apps/eprintreport/directPrintFormat";

		ajaxObj.open("POST", url, false);

		ajaxObj.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		ajaxObj.setRequestHeader("X-Requested-With","XMLHttpRequest");

		/****************This is For Logger****************/
		var param = "type=printFormat&eFormId="+activeEformId+"&printFormatName="+formatName+"&username="+globalMap.get("USERNAME")+"&projectid="+globalMap.get("PROJECTNAME");

		ajaxObj.onreadystatechange = function() {

			if (this.readyState == 4) {

				if (this.status == 200) {

					if(this.getResponseHeader("REDIRECT") == 'true'){

						 window.location.href = response.getResponseHeader("REDIRECT_PAGE");

					}
					else 
					{
						var sessionExists = checkIfSessionExpired(this.responseText);
						if(sessionExists)
						{
								var res=Ext.JSON.decode(this.responseText);
								var dataStore=Ext.create('Ext.data.Store',{
								fields:['reportFormatId','reportEFormId','reportFormatName','reportFileName','Status','ParamName','PaperSize'],
								data:res.listDirectPrintFormat,
								"proxy"	: {
								"type": 'memory',
								"reader": {
									"type": 'json',
									"root": "listDirectPrintFormat"
								}
							  }
							});


                            // PUSHING PRINT FORMAT NAME
							printFormats = [];
							printFormats.push(dataStore);


							// GETTING PRINTER NAMES
		  					var printerNames = printerList;
							var jsonString = "{";
							jsonString = jsonString + '"listofPrinters":[';

							for (i = 0; i < printerNames.length; i++) 
							{
								if(i==0)
								{
									var rep=printerNames[i].replace(/\\/gi, "\\\\");
									jsonString = jsonString + '{"printerName": "'+rep+'"}';
								}
								else
								{
								    var rep=printerNames[i].replace(/\\/gi, "\\\\");
									jsonString = jsonString + ',{"printerName": "'+rep+'"}';
								}
						    }
							

							jsonString = jsonString + "]}";

		    	
					  var dataStore1=Ext.create('Ext.data.Store',{         
							fields:['printerName'],
							data:Ext.JSON.decode(jsonString),
								"proxy"	: {
								"type": 'memory',
								"reader": {
								   "type": 'json',
									"root": "listofPrinters"
								}
                             }
						});

					   var printergrid= savePrinterNamesGrid(dataStore1); 
					   savePrinterNamesWindow(activeDocId,activeEformId,printergrid);

					    var Selected2 = selectedPrinter;
							for(m=0 ; m < Selected2.length; m++)
					      { 
								//alert(Selected2[m]);
								var selPrinter= Ext.getCmp('saveprinterNamesGridId').store.find('printerName',Selected2[m],0,false,false,true);
							    Ext.getCmp('saveprinterNamesGridId').getSelectionModel().select(selPrinter,true);
						  }

				    	}
						else
						{
							if(bcsMask) 
								bcsMask.hide();
							  Ext.Msg.alert({ 
									title    : '<font color="red"><b>Confirm Message</b></font>',
									msg      : "<b>Your Session has been Expired.Please Click Ok button to logout</b>",
									buttons	 : Ext.Msg.OK,
									closable : false,
									fn       : function (btn, text){
									if (btn == 'ok') 
									{
										 if(devStatus)
										 {
										 location.href = 'j_spring_security_logout?dev=true';
										 }
										else
										 {
										 location.href = 'j_spring_security_logout';
										 }
									}}
								});
							 return;
						}
					           
				   }
				}
			}
		};

		ajaxObj.send(param);

}



function savePrinterNamesGrid(printNamesStore){
	var grid =Ext.create('Ext.grid.Panel',{

     "id"			:'saveprinterNamesGridId',
	"selType"		: "checkboxmodel",
	"multiSelect"	: false,	
	//"simpleSelect"	:true,
	"store"			:printNamesStore,
	"forceFit"		: true,
	"columns"		:
		[	
		  {"header" : 'Printer Name',"dataIndex":'printerName',"width":400}
		],
	"autoScroll":true
	});
	return grid;
}



function savePrinterNamesWindow(printdocid,printEformid,printerNamesGrid){

Ext.create('Ext.window.Window', {
	    title	: 'List of Printer Names',
		id		: 'printFormatWindowId',
	    height	: 300,
	    width	: 450,
		modal	: true,
	    layout	: 'fit',
	    items	: [printerNamesGrid],
		dockedItems: [{
			xtype	: 'toolbar',
			dock	: 'bottom',
			checked: true,
			items	: [
			  '->',
	          {
				   icon: 'images/ok.png',
				   iconCls:'iconcursor',
				   text: '<b><FONT COLOR="black">Ok</FONT></b>',
				   cls			: "bg-button",
				   handler:function(mainPanel)
				  {
                        
                        // GETTING  PRINT FORMAT ATTRIBUTES
					    var printFormatValue = printFormats;

					    var printFormatId;
					    var printFormatFileName;
						var ParamNameValue;
						var PaperSizeValue;

						var projectname=globalMap.get("PROJECTNAME");
						var userid=globalMap.get("USERNAME");
						var reportid=printEformid;

						// GETTING SELECTED PRINTER NAME		
						var SelectedRecordsForReportFormat1 = Ext.getCmp('saveprinterNamesGridId').getSelectionModel().getSelection();
						var printerNames = SelectedRecordsForReportFormat1[0].data['printerName'];

						selectedPrinter = [];
						selectedPrinter.push(printerNames);	


		    // FOR MULTIPLE FORMATS PRINT

			      var formatLength = printFormatValue[0].data.items.length;
			
					for (var p = 0; p < formatLength ; p++) 
					{
							if(p==0)
							{
								 printFormatId = printFormatValue[0].data.items[p].data.reportFormatId;
								 printFormatFileName = printFormatValue[0].data.items[p].data.reportFileName;
								 ParamNameValue = printFormatValue[0].data.items[p].data.ParamName;
								 PaperSizeValue = printFormatValue[0].data.items[p].data.PaperSize;
			
									var passValue = "";
									var getAllParamName = ParamNameValue;
									var getPaperSize = PaperSizeValue;
								
										if(getAllParamName.indexOf(",") > 0)
										{
											var splitParamName = getAllParamName.split(",");
											for(var i = 0 ; i < splitParamName.length ; i++ )
											{
												var paramName = splitParamName[i].toString().toLowerCase();
												var efmap = eformMap.get(printEformid)['LAYERS'][0].items;

												for(var j=0;j<efmap.length;j++)
												{
													var efmapName = efmap[j].name.split("-")[1];

													if(efmap[j].modeOfEntry == 'AG')
													{
														//paramName == efmap[i].name.split("-")[1];
														//paramValue = Ext.getCmp(efmap[i].id).getValue();
														 paramValue = printdocid;
													}else if(efmapName == paramName)
													{
														paramValue = printdocid;
														passValue  = passValue+paramName+":-:"+paramValue;
													}
												} 

												//var paramValue=Ext.getCmp(printEformid+"-"+paramName+"-id").getValue();
												if(i == (splitParamName.length-1))
												{
												passValue = passValue+paramName+":-:"+paramValue;
												}
												else
												{
												passValue = passValue+paramName+":-:"+paramValue+":--:";
												}
											 }							
										}	
										else
										{
											var paramName = getAllParamName.toString().toLowerCase();

											var efmap = eformMap.get(printEformid)['LAYERS'][0].items;

											for(var j=0;j<efmap.length;j++)
											{
												var efmapName = efmap[j].name.split("-")[1];

												if(efmap[j].modeOfEntry == 'AG')
												{
													
													//paramValue = Ext.getCmp(efmap[i].id).getValue();
													paramValue = printdocid;
													passValue  = passValue+paramName+":-:"+paramValue;	
												}else if(efmapName == paramName)
												{
													paramValue = printdocid;
													passValue  = passValue+paramName+":-:"+paramValue;
												}
											} 							
										}

						
										ajaxReqDirectPrint(printFormatFileName,passValue,projectname,userid,printFormatId,reportid,printerNames,getPaperSize);

							}
							else
						  {
									 printFormatId = printFormatValue[0].data.items[p].data.reportFormatId;
									 printFormatFileName = printFormatValue[0].data.items[p].data.reportFileName;
									 ParamNameValue = printFormatValue[0].data.items[p].data.ParamName;
									 PaperSizeValue = printFormatValue[0].data.items[p].data.PaperSize;

									 var passValue = "";
									 var getAllParamName = ParamNameValue;
									 var getPaperSize = PaperSizeValue;
								
										if(getAllParamName.indexOf(",") > 0)
										{
											var splitParamName = getAllParamName.split(",");
											for(var i = 0 ; i < splitParamName.length ; i++ )
											{
												var paramName = splitParamName[i].toString().toLowerCase();
												var efmap = eformMap.get(printEformid)['LAYERS'][0].items;

												for(var j=0;j<efmap.length;j++)
												{
													var efmapName = efmap[j].name.split("-")[1];

													if(efmap[j].modeOfEntry == 'AG')
													{
														//paramName == efmap[i].name.split("-")[1];
														//paramValue = Ext.getCmp(efmap[i].id).getValue();
														 paramValue = printdocid;
													}else if(efmapName == paramName)
													{
														paramValue = printdocid;
														passValue  = passValue+paramName+":-:"+paramValue;
													}
												} 

												//var paramValue=Ext.getCmp(printEformid+"-"+paramName+"-id").getValue();
												if(i == (splitParamName.length-1))
												{
												passValue = passValue+paramName+":-:"+paramValue;
												}
												else
												{
												passValue = passValue+paramName+":-:"+paramValue+":--:";
												}
											 }							
										}	
										else
										{
											var paramName = getAllParamName.toString().toLowerCase();

											var efmap = eformMap.get(printEformid)['LAYERS'][0].items;

											for(var j=0;j<efmap.length;j++)
											{
												var efmapName = efmap[j].name.split("-")[1];

												if(efmap[j].modeOfEntry == 'AG')
												{
													
													//paramValue = Ext.getCmp(efmap[i].id).getValue();
													paramValue = printdocid;
													passValue  = passValue+paramName+":-:"+paramValue;	
												}else if(efmapName == paramName)
												{
													paramValue = printdocid;
													passValue  = passValue+paramName+":-:"+paramValue;
												}
											} 							
										}
						
									  ajaxReqDirectPrint(printFormatFileName,passValue,projectname,userid,printFormatId,reportid,printerNames,getPaperSize);
						  }
					}

							Ext.getCmp('printFormatWindowId').close();		
				   }
			  },{
					icon: 'images/close.png',
					iconCls:'iconcursor',				   
					text:'<b><FONT COLOR="black">Cancel</FONT></b>',
				    cls			: "bg-button",
				    handler:function()
					{
						Ext.getCmp('printFormatWindowId').close();
					}
			  }
	        ]
		}]

	}).show();
}


function ajaxReqDirectPrint(eformid,passValue,projectname,userid,edoctableid,reportid,printerNames,getPaperSize)
{
	 // AJAX REQUEST FOR CRYSTAL DIRECT PRINT

						if (!ajaxObj)
						{
						throw new Error('XMLHttp (AJAX) not supported');
						}

                        if(eformid.split('.')[1] == "jasper")
						{
							var url = getURL()+"apps/eprintreport";
						}else
					    {
							var url=getURL()+"apps/eprintreport/eprintcrystal";
					    }

						ajaxObj.open("POST", url, false);

						ajaxObj.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
						ajaxObj.setRequestHeader("X-Requested-With","XMLHttpRequest");

						/****************This is For Logger****************/
						var param =	"eformid="+eformid+"&docid="+passValue+"&projectname="+projectname+"&userid="+userid+"&edoctableid="+edoctableid+"&reportid="+reportid+"&printerName="+printerNames+"&getPaperSize="+getPaperSize+"&username="+globalMap.get("USERNAME");

						ajaxObj.onreadystatechange = function() {

							if (this.readyState == 4) {

								if (this.status == 200) {

									if(this.getResponseHeader("REDIRECT") == 'true')
									{
										window.location.href = response.getResponseHeader("REDIRECT_PAGE");
									}
									else 
									{
										var sessionExists = checkIfSessionExpired(this.responseText);
										if(sessionExists)
										{
											var res = this.responseText;
											if(res == "SUCCESS")
											{	 
												 Ext.Msg.alert('Info','Printed Successfully ..! ');
											}		
											else
											{
												Ext.Msg.alert('Info','Failed To Print ..! ');
											}
										}
										else
										{
											if(bcsMask) 
												bcsMask.hide();
											  Ext.Msg.alert({ 
													title    : '<font color="red"><b>Confirm Message</b></font>',
													msg      : "<b>Your Session has been Expired.Please Click Ok button to logout</b>",
													buttons	 : Ext.Msg.OK,
													closable : false,
													fn       : function (btn, text){
													if (btn == 'ok') 
													{
														 if(devStatus)
														 {
														 location.href = 'j_spring_security_logout?dev=true';
														 }
														else
														 {
														 location.href = 'j_spring_security_logout';
														 }
													}}
												});
											 return;
										}
									}
								}
							}
						};

						ajaxObj.send(param);
}

/** This Method is Used for fetch and draw the html table for ESEND Parameters **/
function drawHtmlTable(frameNo, params, totalCol) {

	var totalColArray = null;
	var eformId = globalMap.get('EFORMID');

	if (eformMap.get(eformId).FRAMES.length === 1) {

		return "";
	}

	var frameName = eformMap.get(eformId).FRAMES[frameNo - 1].split(":-:")[0];
	var drawTableGrid = Ext.getCmp(eformId + "-" + frameName.toLowerCase() + "-grid");
	var drawTableColumn = drawTableGrid.columns;
	var drawTableStore = drawTableGrid.store.data.items;

	if (postArray) {
		// TO-DO :
		return "";
	} else {
		var columnsArray = params.split(",");
		if (totalCol.length != null && totalCol.length > 0) {
			totalColArray = totalCol.split(",");
		}
		var htmlTableValue = "<table><tr>";

		//Draw header for table.
		for (var headi = 0; headi < columnsArray.length; headi++) {
		
			for (var columni = 0; columni < drawTableColumn.length; columni++) {
				if (drawTableColumn[columni].dataIndex != null && drawTableColumn[columni].dataIndex != "") {
					if (columnsArray[headi].toLowerCase() == drawTableColumn[columni].dataIndex.split("-")[1]) {
						htmlTableValue = htmlTableValue + "<th>" + drawTableColumn[columni].text.split("*")[0] + "</th>";
						break;
					}
				}
			}
		}
		htmlTableValue = htmlTableValue + "</tr>";

		if (drawTableStore.length > 0) {
		
			for (var drawi = 0; drawi < drawTableStore.length; drawi++) {
				var singleHtmlRow = "<tr>";
				for (var columni = 0; columni < columnsArray.length; columni++) {
					var singleColVal = drawTableStore[drawi].data[eformId + "-" + columnsArray[columni].toLowerCase()];
					singleHtmlRow = singleHtmlRow + "<td>" + singleColVal + "</td>";
				}
				singleHtmlRow = singleHtmlRow + "</tr>";
				htmlTableValue = htmlTableValue + singleHtmlRow;
			}
		}
		if (totalColArray) {
		
			var totalColumRow = "<tr>";
			var singleColumn = "";
			
			//Draw header for table.
			for (var headi = 0; headi < columnsArray.length; headi++) {
				singleColumn = "";
				
				//Footer tabel row.
				
				for (var footeri = 0; footeri < totalColArray.length; footeri++) {
					if (columnsArray[headi].toLowerCase() === totalColArray[footeri].toLowerCase()) {
					
						var colName = Ext.getCmp(eformId + "-" + totalColArray[footeri].toLowerCase() + "-id").getEditor().inputId;
						//var colNewVal = Ext.getCmp(eformId + "-" + totalColArray[footeri].toLowerCase() + "-id").getEditor().getValue();
						var colNewVal = drawTableGrid.store.data.items[footeri].data[colName];
						if (colNewVal !== null && colNewVal !== '') {
							var totalColValue = 0;
							if (typeof(drawTableGrid.store.sum(colName, true)) === "string") {

								totalColValue = ToNumber(drawTableGrid.store.sum(colName, true)).toFixed();

							} else {

								totalColValue = drawTableGrid.store.sum(colName, true).toFixed();

							}

						}
						singleColumn = "<td>" + totalColValue + "</td>";
						break;
					}
				}
				if (singleColumn === "") {
					singleColumn = "<td></td>";
				}

				totalColumRow = totalColumRow + singleColumn;
			}
			totalColumRow = totalColumRow + "</tr>";
			htmlTableValue = htmlTableValue + totalColumRow + "</table>";

		}
	}
	return htmlTableValue;
}


function fireSQL(storeName, EformId,inputSQLId, namedParam, sqltype, grid) {

	executeFireSQL(storeName,EformId, inputSQLId, namedParam, sqltype, grid);

}

function fireSqlArray(fireSqlArray) {

	executeFireSqlArray(fireSqlArray);
}

/** This method is used for convert one currency into different currencies.**/

function getCurrencyRate(key, baseValue, targetValue, rate){

	alert("Hi I am A currency converter");

}


function multiprintPreview(reportName,paramList)
{
if((reportName != null  && reportName.length > 0 )|| (paramList.length > 0 && paramList != null))
  {
	
	var newObj = "";
	var newpassValue = [];
	var params = [];
	var paramArray = new Array();

	var userName     = globalMap.get("USERNAME");
	var projectname  = globalMap.get("PROJECTNAME");
     
    paramArray = [];
	if(reportName != null && reportName.length >0)
	{


		 var grid    = Ext.getCmp('doc-body').getActiveTab().items.items[0];
		 var gridID  = grid.id;
         var iviewMetaData = grid.iViewMetaData;
		 var actions = iviewMetaData.report_actions;
		 var printPreviewAction = getPrintPreviewAction(actions).print_formats[0];
		 			
		 var  mongoDocid =printPreviewAction.print_format;
		 var SelectedRecordsForReportFormat = Ext.getCmp(gridID).getSelectionModel().getSelection();
  	     var val="";
		 for(var m=0; m<SelectedRecordsForReportFormat.length; m++)
	   {   
		   if(paramList.length > 0)
			{
			  params = paramList.toLowerCase().split(",");
			}
	        
	       if(params !=null && params.length > 0)
			{
	    	    var paramJson;
               	for(var i=0; i < params.length; i++)	
				{
	                var paramName  = params[i]; 
                  	var paramValue = SelectedRecordsForReportFormat[m].data[params[i]];
					
					if(paramValue != '' || paramValue != "")
					{
						 if(i==0)
						 {
						 paramJson = paramName+":"+paramValue;
						 }
						 else
						 {
						 paramJson = paramJson + ":-:"+paramName+":"+paramValue;
						 }
				    }
				}
				    if(paramJson != '' || paramJson != "")
			        {
					    //paramArray.push(paramJson);
						   if( (SelectedRecordsForReportFormat.length-1) == m)  
						   {
								val = val + paramJson;
						   } 
						   else
						   {
								val = val + paramJson + "~";

						   }
					}
			}
	    }

		var eformid = reportName;
 
			   if(SelectedRecordsForReportFormat.length < 1000)
			   {
				document.getElementById("formEid").value=eformid;
				document.getElementById("formDocid").value=val;
				document.getElementById("formProjName").value=projectname;
				document.getElementById("formUserid").value=userName;
				document.getElementById("objectid").value =mongoDocid; 

					if(eformid.split('.')[1] == "jasper"){
												
						var repoUrl=getURL()+"apps/eprintreport/multiprintPreview";
											
						document.getElementById("reportForm").action=repoUrl;
						document.getElementById('reportForm').submit();
					 }
			   }else
				{
					Ext.Msg.alert("<font color='red'>Warning</font>","<b>"+"MultiPrint should not exceed of 1000 records ..!"+"</b>");
				}
		}
		else
		  {
			Ext.Msg.alert("<font color='red'>Warning</font>","<b>"+"No Report Name Found ..!"+"</b>");
		  }
       } 
	   else{
			Ext.Msg.alert("<font color='red'>Warning</font>","<b>"+"No Preview For This Report ..!"+"</b>");
	      }
}

/**This method is used for Jasper Report Print Preview from EReport**/
function printPreview(reportName,paramList)
{
  if(reportName)
  {
	var multiParamValues = {};
	var params = [];
	var paramExist = 0;
	
	var userName     = globalMap.get("USERNAME");
	var projectname  = globalMap.get("PROJECTNAME");
    var mongoDocid="";
	var printPreviewSlug="";
		     if(paramList)
		    {
        	   params = paramList.toLowerCase().split(",");
        	          	  
   			    if(reportCtStatus.length > 0 && reportCtStatus.get('ctRecord'))
				{
				var  reportCurrentRecord =	reportCtStatus.get('ctRecord').data;
				}
   			    else{
   			    	
   			     var mainAppPanel = Ext.getCmp('doc-body');
   		         var grid = mainAppPanel.getActiveTab().items.items[0];
   			  
	   			  if(grid &&  grid.model){
	   			     //new implemented
	   			     var modelMap = grid.model;
					 var iviewMetaData = grid.iViewMetaData;
					 var actions = iviewMetaData.report_actions;
					 var printPreviewAction = getPrintPreviewAction(actions).print_formats[0];
					 //var printPreviewAction=printPreviewAction.print_formats[0];
					 mongoDocid =printPreviewAction.print_format;
					 //printPreviewSlug = iviewMetaData.slug;//printPreviewAction.slug;
	   			     reportCurrentRecord = modelMap.get("current_record").data;
	   			     var userInput = modelMap.get("user_input_values");
	   			  }
   			    	
   			    }
   			    

				for(var i=0; i < params.length; i++)	
				{
					var paramName  = params[i];
				    var paramValue = reportCurrentRecord[paramName];

					if(paramValue)
					{
						multiParamValues[paramName] = paramValue;
						paramExist = 1;

					}else
					{
					  console.log(' printPreview : '+paramName+' not able to Get the Param Value..!');
					  Ext.Msg.alert("<font color='red'>Warning</font>","<b>"+" Report is not Properly Defined..!"+"</b>");
					}

				}
				
				multiParamValues['mongodocid'] = mongoDocid;
				//multiParamValues['report_id'] = printPreviewSlug;
				

					if(reportName.split('.')[1].toLowerCase() == "jasper"){

						 if(paramExist == 1)    
						{	
							 var reportParam = JSON.stringify(multiParamValues);

							document.getElementById("formEid").value=reportName;
							document.getElementById("formDocid").value=reportParam;
							document.getElementById("formProjName").value=projectname;
							document.getElementById("formUserid").value=userName;
													
							var repoUrl=getURL()+"apps/eprintreport/printPreview";
												
							document.getElementById("reportForm").action=repoUrl;
							document.getElementById('reportForm').submit();
						}else
						{
						  console.log(' printPreview : Parameter Values not Exist ..! ');
						  Ext.Msg.alert("<font color='red'>Warning</font>","<b>"+" Report is not Properly Defined..!"+"</b>");
						}
											
					 }else
					{
					  console.log(' printPreview : '+reportName+' is not a Jasper Report ..!');
					  Ext.Msg.alert("<font color='red'>Warning</font>","<b>"+" Report is not Properly Defined..!"+"</b>");
					}

			}else{
	  				    console.log(' printPreview : '+paramList+' not able to Get the Report Parameters..!');
						Ext.Msg.alert("<font color='red'>Warning</font>","<b>"+" Report is not Properly Defined..!"+"</b>");
				 }

	 } else {
		      Ext.Msg.alert("<font color='red'>Warning</font>","<b>"+" Report is not Properly Defined ..!"+"</b>");
	 }
}

function getPrintPreviewAction(actions){
//action_type :"print_format"
    	
	for(var i=0;i <actions.length; i++ ){
	   if(actions[i].action_type ==="print_format" ){
	    var printPreview = actions[i];
	      break;
	   }
	
	}
  return printPreview;
}

function getColumnIndex(columns, dataIndex) {
	var column;

	for (var i = 0; i < columns.length; i++) {
		if (columns[i].dataIndex === dataIndex) {

			column = columns[i];
			break;

		}
	}

	return column;
}

function stringSplitFn(str,splitStr){
	
	      return str.split(splitStr);
	
}


function sqlGet(eformid, store, column) {

	return processSqlGet(eformid,store, column);

}

function findRecord(store, column, rowno) {

	var resultSet = eformVarMap.get(store);
	if (resultSet != undefined) {
		var getRowArray = eval("(" + resultSet[store] + ')');
		return getRowArray[rowno][column];
	}
	return null;
}

function gen_id(S, N) {

	// To send both param send to serverside

	var param = "BCSCompType=gen_id&ch=" + S + "&num=" + N+"&"+"username="+globalMap.get("USERNAME")+"&"+"&projectid="+globalMap.get("PROJECTNAME");

	var ajaxObj = null;
	if (typeof XMLHttpRequest != 'undefined')
		{
		ajaxObj = new XMLHttpRequest();
		}
	else if (window.ActiveXObject) {
		var avers = ["Microsoft.XmlHttp", "MSXML2.XmlHttp",
				"MSXML2.XmlHttp.3.0", "MSXML2.XmlHttp.4.0",
				"MSXML2.XmlHttp.5.0"];
		for (var i = avers.length - 1; i >= 0; i--) {
			try {
				ajaxObj = new ActiveXObject(avers[i]);
				break;
			} catch (e) {
			}
		}
	}
	if (!ajaxObj)

		{
		throw new Error('XMLHttp (AJAX) not supported');
		}

	var url = getURL() + "apps/eformsql/";

	ajaxObj.open("POST", url, false);

	ajaxObj.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	ajaxObj.setRequestHeader("X-Requested-With","XMLHttpRequest");

	ajaxObj.onreadystatechange = function() {
		if (this.readyState == 4) {
			if (this.status == 200) {
			if(this.getResponseHeader("REDIRECT") == 'true')
				{
				   window.location.href = response.getResponseHeader("REDIRECT_PAGE");
				}
				else
				{
					var sessionExists = checkIfSessionExpired(this.responseText);
					if(sessionExists)
					{
						var obj = this.responseText;
						responseString = obj.toString();
					}
					else
					{
						  if(bcsMask)
						  bcsMask.hide();
						  Ext.Msg.alert({ 
									title    : '<font color="red"><b>Confirm Message</b></font>',
									msg      : "<b>Your Session has been Expired.Please Click Ok button to logout</b>",
									buttons	 : Ext.Msg.OK,
									closable : false,
									fn       : function (btn, text){
									if (btn == 'ok') 
									{
										 if(devStatus)
										 {
										 location.href = 'j_spring_security_logout?dev=true';
										 }
										else
										 {
										 location.href = 'j_spring_security_logout';
										 }
									}}
								});
						 return;
					}
				}

			}
		}
	};
	ajaxObj.send(param);

}

function getGridObj(fieldname, actionfield,validRowStatus) {

	compStoreObj = null;
	compGridObj = null;
	compObjName = null;
    compGframeNum = 0;
	
	if(typeof(fieldname) == "string")
    {
		fieldname = fieldname.toLowerCase();
	}

	// var eformid = GetparseObj.id.split("-");

	var ctEform=globalMap.get("EFORMID");

	var eformid = new Array();

	 eformid[0] =ctEform;


	var ColumnObj = Ext.getCmp(eformid[0] + "-" + fieldname + "-id");

	
	if(postTarget != null)
	{
		
		
		var gridFName = globalMap.get("TGENEFORMID")+"-"+fieldname;
		var status = false;
		var visited = true;

       for (pa = 0; pa < postArray.length; pa++) 
	   {

				if (fieldname == postArray[pa].FN) {
					
				        status=true;
            			compObjName = gridFName;
						var gridname =  postArray[pa].GN
						compStoreObj = Ext.data.StoreManager.lookup(gridname);
						var getFramNum = gridname.split("-")
						compGframeNum  = getFramNum[1]
						visited = false;
						break;
					
				}
		}



      if(visited)
	  {

		for(var container=0 ; container < postTarget.LAYERS.length ; container++ )
		{
            var fieldArray = postTarget.LAYERS[container];

            if(fieldArray.fieldvalues instanceof Array)
            {

                 
                 for (fa = 0; fa < fieldArray.fieldvalues.length; fa++) {

					if (fieldArray.fieldvalues[fa].FN == fieldname) {


							status=true;
							var gridname = fieldArray.fieldvalues[fa].GN
							compStoreObj = Ext.data.StoreManager.lookup(gridname);
							var getFramNum = gridname.split("-");
							compGframeNum  = getFramNum[1];
							break;
						}


				}

            }
            else
            {

				   var obj = fieldArray.fieldvalues;

				   for (var key in obj) {

					 for (fa = 0; fa < obj[key].length; fa++) {

						if (obj[key][fa].FN == fieldname) {


								status=true;
								compObjName = gridFName;
								var gridname = obj[key][fa].GN
								compStoreObj = Ext.data.StoreManager.lookup(gridname);
								var getFramNum = gridname.split("-");
								compGframeNum  = getFramNum[1];
								visited = false;
								break;
						}


					}

					if(status)
					   break;

				}

                        
            }

		}


	  }
 


	/*	
		for (tp =0 ; tp < postTarget["NOSOFLAYERS"]; tp++)
        {
            	var tlayObj = postTarget["FRAMES"][tp];
            	var ASGRID =  postTarget["ASGRID"][tp];
            	var objMap = globalGenMap.get(globalMap.get("TGENEFORMID")+"-"+tlayObj);
            	if(objMap != null)
            	{
            	
            		if(ASGRID == "T")
            		{
            			compStoreObj = Ext.data.StoreManager.lookup(objMap); 
            			
            			if(compStoreObj.data.length > 0)
            			{
            				
            				var csObj = compStoreObj.data.items[0].data[gridFName];
            				
            				if(csObj != null)
            				{
            					status=true;
                                compGframeNum = tp+1;
            					compObjName = gridFName;
            					break;
            				}
            				else
            				{
            					status=false;
                                compGframeNum = tp+1;
            					compObjName = gridFName;
            					break;
            				}
            				
            			}
	            		
            		}           		
            	}
            	else
            	{

                   for (var pa = 0 ; pa < postArray.length; pa++)
                   {


                          if(postArray[pa].FN == fieldname )
                          {

								status=true;
                                compGframeNum = tp+1;
            					compObjName = gridFName;
            					break;

                          }

                   }   


            	}
            	
            	
            }


			*/
		
		 return status;
	}
	
	
	if (ColumnObj != undefined) {

		var validRw = null;

		if (ColumnObj.field != undefined){
         
		    var validRwValue = null;
 
			var GetGridId = ColumnObj.field.gridId;

			validRw = "validrow"+ColumnObj.field.gridslug;

			var gridRow = activeRow;

			var storeid = Ext.data.StoreManager.lookup(GetGridId+'-store');
			
			//validRwValue = "T";
			
			if(storeid.data.items[gridRow] != null)

            {
				validRwValue = storeid.data.items[gridRow].data[ColumnObj.field.name.split("-")[0]+"-"+validRw];
			}

			if(validRowStatus == "VG" && validRwValue != null && validRwValue.toLowerCase() == 'f'){
			
			  return false;
			
			}

		}
			
			

		else if(ColumnObj.editor != undefined){
         
		    var validRwValue = null;

			var GetGridId = ColumnObj.editor.gridId;

			validRw = "validrow"+ColumnObj.editor.gridslug;

			var gridRow = activeRow;

			var storeid = Ext.data.StoreManager.lookup(GetGridId+'-store');

			if(storeid.data.items[gridRow] != null)

            {
			validRwValue = storeid.data.items[gridRow].data[ColumnObj.editor.name.split("-")[0]+"-"+validRw];
			}

			if(validRowStatus == "VG" && validRwValue != null && validRwValue.toLowerCase() == 'f'){
			
			  return false;
			
			}

		 }
		
		else
		   {
		   return false;
		   }

		compGridObj = Ext.ComponentMgr.get(GetGridId + "-grid");

		compObjName = eformid[0] + "-" + fieldname;

		if (actionfield != undefined && actionfield != null)

			{
			actionObjName = eformid[0] + "-" + actionfield.toLowerCase();
			}

		return true;

	} else {

		return false;

	}

}

function cell(cIdx, rIdx) {
	var gridID = globalMap.get('CTGRID');
	var gridObj = Ext.getCmp(gridID);
	var columnHeader = gridObj.columns[cIdx].dataIndex;
	var value = gridObj.store.data.items[rIdx].data[columnHeader];
	return value;
}

function getSubTotal(fieldName, rowNo) {

	var gridSt = null;
	getGridObj(fieldName,null,"VG");
	if (compObjName != null) {
		if(compGridObj != null )
		{
		gridSt = compGridObj.store;
		}
		if(compStoreObj != null)
		{
		gridSt = compStoreObj;
		}
		if(gridSt != null)
		{
			var subTotalRecords = gridSt.getRange(0, rowNo - 1);
			var subTotal = gridSt.getSum(subTotalRecords, compObjName);
			return subTotal;
		}
		else
		{
			return false;
		}
		
	} else {
		return false;
	}
}

function getID(fieldname, rowNo) {
	
	
	// Done in wrong method(should correct in future)

    if(rowNo == -1){
	
	       return "";
	
	}
 

	getGridObj(fieldname,null,"VG");
	var dataStore = null;
	if (compObjName != null) {
		if(compGridObj != null )
			{
			dataStore = compGridObj.store;
			}
		if(compStoreObj != null)
			{
			dataStore = compStoreObj;
			}


			if(dataStore != null)
			{

				if(rowNo == 0){

					var fieldValue=dataStore.data.items[rowNo].data[compObjName];

                    if(postArray != null)
                    {


							fieldValue = fieldValue;
                    }
                    else
                    {

						var comp = Ext.getCmp(compObjName.split('-')[0]+'-'+fieldname.toLowerCase()+'-id').getEditor();
						if(comp.sourceKey)
						{
							var displayName = Ext.getCmp(compObjName.split('-')[0]+'-'+fieldname.toLowerCase()+'-id').getEditor().displayField;
							var storeid		= Ext.getCmp(compObjName.split('-')[0]+'-'+fieldname.toLowerCase()+'-id').getEditor().store.storeId;
		
								if(comp.cacheName || comp.gridSqlId)
								{
									 
									 
									
									if(comp.gridSqlId)
									{
		
										// if autocomplete behavior
										if(comp.filter ){
											
											getGridCacheRec(comp,rowNo, fieldValue, fieldValue,false);
										}
										else {
											
											getGridCacheRec(comp,rowNo, fieldValue, fieldValue,false);
										}
									}
									else
									{
										// if appcache
										// if autocomplete behaviour
										if(comp.filter ){
		
											getAppCacheRec(comp,rowNo,fieldValue,fieldValue, true);
										}
										else {
											 getAppCacheRec(comp,rowNo, fieldValue,fieldValue, true);
										}
									}
		
								}
								else
								{
										getPostGridComboData(comp,rowNo,fieldValue);
										
								}

							var recordIndex = Ext.data.StoreManager.lookup(
										storeid).find(displayName,
										fieldValue,0, false, false, true);
								if (recordIndex == -1) {
									fieldValue = 0;
								}
							 else{

									var id = comp.sourceTable.toLowerCase()+'id';
									fieldValue = Ext.data.StoreManager.lookup(storeid).getAt(recordIndex).get(id);
								}
						}

                    }
					return fieldValue;


				}else{
                    // add by Sidhu
					var fieldValue=dataStore.data.items[rowNo-1].data[compObjName];
					if(typeof(fieldValue) == "string"){
					
						if(postTarget != null)
						{
										    
							fieldValue=dataStore.data.items[rowNo-1].data[compObjName];
						}
						else
						{
							var comp = Ext.getCmp(compObjName.split('-')[0]+'-'+fieldname.toLowerCase()+'-id').getEditor();
							if(comp.sourceKey)
							{
								var displayName = Ext.getCmp(compObjName.split('-')[0]+'-'+fieldname.toLowerCase()+'-id').getEditor().displayField;
								var storeid = Ext.getCmp(compObjName.split('-')[0]+'-'+fieldname.toLowerCase()+'-id').getEditor().store.storeId;
			
								if(comp.cacheName || comp.gridSqlId)
								{
									 
									 
									
									if(comp.gridSqlId)
									{

										// if autocomplete behavior
										if(comp.filter ){
											
											getGridCacheRec(comp,rowNo-1, fieldValue, fieldValue,false);
										}
										else {
											
											getGridCacheRec(comp,rowNo-1, fieldValue, fieldValue,false);
										}
									}
									else
									{
										// if appcache
										// if autocomplete behaviour
										if(comp.filter ){

											getAppCacheRec(comp,rowNo-1,fieldValue,fieldValue, false);
										}
										else {
											 getAppCacheRec(comp,rowNo-1, fieldValue,fieldValue, false);
										}
									}

								}
								else
								{
									
								
								
								getPostGridComboData(comp,rowNo-1,fieldValue);
								
								}

								var recordIndex = Ext.data.StoreManager.lookup(
											storeid).find(displayName,
											fieldValue,0, false, false, true);
									if (recordIndex == -1) {
										fieldValue = 0;
									}
								 else{
									  
									var id = comp.sourceTable.toLowerCase()+'id';
									fieldValue = Ext.data.StoreManager.lookup(storeid).getAt(recordIndex).get(id);
								}
							}
					
						}

					}
					return fieldValue;



				}

			}



	}
	else
	{

		var eformID=GetparseObj.id.split("-");
	    var compObj=Ext.getCmp(eformID[0]+"-"+fieldname.toLowerCase()+"-id");
	    
	    if(compObj.compName=='comboremotefield' && compObj.compType=='NG'){
	    	
	    	var rec = compObj.findRecordByValue(compObj.value);
	    	if(rec != -1){
		    	    var dataIdx=compObj.sourceTable+"id";
		    	    
		    	    var fieldValue=rec.data[dataIdx];
		    	    
		    	    return fieldValue;
	    	}else{
	    	        return null;
	    	}
	    		
	    
	    }
		
	}



}

function getOld(fieldName, rowNo) {

    var param = "";
    var value = "";
    var eformID = '';
    var primaryKeyVal = -1;
    var compType;
    var url;
    var oldData;

    if (modifyStatus) {

        if (postArray && postTarget) {
            eformID = globalMap.get("EFORMID");
            primaryKeyVal = globalMap.get(eformID + "-recordid-id");

            if (postCurrentRow === -1) {

                param = "eformid=" + eformID + "&FN=" + fieldName + "&recid=" + primaryKeyVal;

            } else {

                param = "eformid=" + eformID + "&FN=" + fieldName + "&recid=" + primaryKeyVal + "&activeRow=" + rowNo;

            }

        } else {
            eformID = globalMap.get("EFORMID");
            primaryKeyVal = globalMap.get(eformID + "-recordid-id");
            compType = Ext.getCmp(eformID + '-' + fieldName.toLowerCase() + '-id').compType;

            if (compType === "NG") {

                param = "eformid=" + eformID + "&FN=" + fieldName + "&recid=" + primaryKeyVal;
            } else {

                param = "eformid=" + eformID + "&FN=" + fieldName + "&recid=" + primaryKeyVal + "&activeRow=" + rowNo;

            }

        }

        url = getURL() + "apps/getOldData/";

        bcs.app.ajaxhelper.doXhr(url, param, false, function(data) {
			
			if(!data instanceof Date){
				oldData = Ext.JSON.decode(data);
			} else {
				oldData = data;
			}
            if (oldData.Error) {
                Ext.Msg.alert("<font color='red'><b>Error</b></font>", "<b>" + "Error While getting Old data for field:" + fieldName + " " + oldData.Error + "</b>");
                return;

            }
            if (!oldData.Error) {
                value = oldData;
            }

        });
    }
    return value;
}

function regVar(fieldVar, type, value) {
	var ctEform = globalMap.get("EFORMID");

	if (fieldVar != null) {

		regvarField = ctEform + "-" + fieldVar.toLowerCase();

		eformVarMap.add(regvarField, type + ":-:" + value);
		
		return true;

	}

}

function SQLRegVar(inputSQLID) {
	var ctEform = globalMap.get("EFORMID");
	var responseString;

	/****************This is For Logger****************/
	var param = "inputSQLID=" + inputSQLID + "&BCSCompType=sqlregvar&eformid="
			+ ctEform +"&username="+globalMap.get("USERNAME")+"&projectid="+globalMap.get("PROJECTNAME");
	var ajaxObj = null;
	if (typeof XMLHttpRequest != 'undefined')
		{
		ajaxObj = new XMLHttpRequest();
		}
	else if (window.ActiveXObject) {
		var avers = ["Microsoft.XmlHttp", "MSXML2.XmlHttp",
				"MSXML2.XmlHttp.3.0", "MSXML2.XmlHttp.4.0",
				"MSXML2.XmlHttp.5.0"];
		for (var i = avers.length - 1; i >= 0; i--) {
			try {
				ajaxObj = new ActiveXObject(avers[i]);
				break;
			} catch (e) {
			}
		}
	}
	if (!ajaxObj)

		{
		throw new Error('XMLHttp (AJAX) not supported');
		}

	var url = getURL() + "apps/eformsql/";

	ajaxObj.open("POST", url, false);

	ajaxObj.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	ajaxObj.setRequestHeader("X-Requested-With","XMLHttpRequest");

	ajaxObj.onreadystatechange = function() {
		if (this.readyState == 4) {
			if (this.status == 200) {
				
			 if(this.getResponseHeader("REDIRECT") == 'true'){
				    window.location.href = response.getResponseHeader("REDIRECT_PAGE");
			}
			else
			 {
				var sessionExists = checkIfSessionExpired(this.responseText);
				if(sessionExists)
				{
					var obj = this.responseText;
					responseString = obj.toString();
				}
				else
				 {
					 if(bcsMask)
						 bcsMask.hide();
					  Ext.Msg.alert({ 
							title    : '<font color="red"><b>Confirm Message</b></font>',
							msg      : "<b>Your Session has been Expired.Please Click Ok button to logout</b>",
							buttons	 : Ext.Msg.OK,
							closable : false,
							fn       : function (btn, text){
							if (btn == 'ok') 
							{
								 if(devStatus)
								 {
								 location.href = 'j_spring_security_logout?dev=true';
								 }
								else
								 {
								 location.href = 'j_spring_security_logout';
								 }
							}}
						});
					 return;
				 }
			 }

			}
		}
	};
	ajaxObj.send(param);

	if (responseString != null && responseString.length != 0) {
		var rowString = responseString.split(":?:");
		for (var i = 0; i < rowString.length - 1; i++) {

			var row = rowString[i].split(":-:");
			var varName = row[0];
			var varType = row[1];
			var varValue = row[2];
			eformVarMap.add(varName, varType + ":-:" + varValue);

		}

	}

}

function setPropertyByCondition(fieldName, property, value,lcondition,rcondition) {
	
	var	ExprObj = new Expression("");
	ExprObj.Expression("iif("+lcondition+"={"+rcondition+"},{T},{F})", '', '');
	var contextData = undefined;
	var result = ExprObj.Evaluate(contextData);
	
	if(fieldName.indexOf('::')>-1){
		var fieldnames = fieldName.split('::');
		for(var k =0;k<fieldnames.length;k++){
			var fname = fieldnames[k];
			if(result.toUpperCase() === 'T'){
				setProperty(fname.trim(), property, value);
			}

		}
	}else{
		if(result.toUpperCase() === 'T'){
			setProperty(fieldName, property, value);
		}

	}
}

function setProperty(fieldName, property, value) {

	//var combObj = $('[name="'+fieldName+'"]');
		
	if(document.getElementsByName(fieldName)){
		if(property.toUpperCase() === "VISIBLE"){
			if(value.toLowerCase() === 'f'){
				setPropVisible(fieldName,true,"True");
			}else if(value.toLowerCase() === 't'){
				//combObj.closest('.form-group').show();
				setPropVisible(fieldName,false,"False");
			}
		}
		else if(property.toUpperCase() === "READONLY"){
			if(value.toLowerCase() === 'f'){
				//var val = false;
				setPropReadonly(fieldName,false,"False");
			}
			else if(value.toLowerCase() === 't'){
				//combObj.attr("readonly", 'readonly');
				//var val = true;
				setPropReadonly(fieldName,true,"True");
			}
		}
		
	}
}

function setPropVisible(fieldName,val,val1){
  var element = document.getElementsByName(fieldName);
  
    document.getElementById(fieldName).dataset.hidden = val1;
	
	if(element[0].tagName =="ION-INPUT" || element[0].tagName =="ION-DATETIME" || element[0].tagName =="ION-SELECT"){
		document.getElementsByName(fieldName+'item')[0].hidden = val; 
		document.getElementsByName(fieldName)[0].hidden = val; 
		document.getElementsByName(fieldName)[1].hidden = val; 
		datasetval = ""
		if(val == false){
			datasetval = "False"
		}
		else if(val == true){
			datasetval = "True"
		}
		document.getElementsByName(fieldName)[0].dataset.hidden = datasetval;
		document.getElementsByName(fieldName)[1].dataset.hidden = datasetval;
	}
	else if(document.getElementById(fieldName).getAttribute('role') == "radiogroup" || document.getElementById(fieldName).getAttribute('role') == "checkgroup"){
		element[0].hidden = val;
	}

}
	
function setPropReadonly(fieldName,val,val1){
	var element = document.getElementsByName(fieldName);
	
	document.getElementById(fieldName).dataset.readonly = val1;
	
	if(element[0].tagName =="ION-INPUT"){
	element[1].disabled = val;
	element[1].readOnly	= val;
	}
	else if(element[0].tagName =="ION-DATETIME"){
		
		if (val == true){
		element[0].className = "datetime datetime-md datetime-disabled ng-untouched ng-pristine ng-valid ";
		}
		else if(val == false){
		element[0].className ="datetime datetime-md ng-untouched ng-pristine ng-valid";
		}
	
	}
	else if(document.getElementById(fieldName).getAttribute('role') == "radiogroup"){
		if (val== true){
		for(var i=1;i<element[0].children.length;i++)
		{
		element[0].children[i].className ="item item-block item-md item-radio item-radio-disabled";
		element[0].children[i].firstChild.lastElementChild.className  ="radio radio-md radio-disabled";
		}
		}
		else if(val == false){
		for(var i=1;i<element[0].children.length;i++)
		{
		element[0].children[i].className ="item item-block item-md item-radio";
		element[0].children[i].firstChild.lastElementChild.className ="radio radio-md";	
		}	
		}
	}
	else if (document.getElementById(fieldName).getAttribute('role') == "checkgroup"){
		if (val== true){
		for(var i=1;i<element[0].children.length;i++)
		{
		element[0].children[i].firstChild.className ="item item-block item-md item-checkbox item-checkbox-disabled";
		element[0].children[1].firstChild.firstChild.className="checkbox checkbox-md checkbox-disabled";
		}
		}
		else if(val == false){
		for(var i=1;i<element[0].children.length;i++)
		{
		element[0].children[i].firstChild.className ="item item-block item-md item-checkbox";
		element[0].children[i].firstChild.firstChild.className="checkbox checkbox-md";
		}	
		}
	
	}
	
	
}	
/*	var ctEform = globalMap.get("EFORMID");

	if (fieldName) {
		var compObj = Ext.getCmp(ctEform + "-" + fieldName.toLowerCase() + "-id");

		if (!compObj) {

			return false;
		}
		if (compObj.compName) {

			setPropertyForCtObj(compObj, property, value);
		}
		if (compObj.editor) {

			// setPropertyForCtObj(compObj.editor,property,value);
			setPropertyGridField(compObj, property, value, compObj.editor);

		}
		if (compObj.field) {

			setPropertyGridField(compObj, property, value, compObj.field);
		}
	}*/


// Frame Functions
function hideFrame(frameNo, hide) {
	 var ctEform = globalMap.get("EFORMID");
	 if(frameNo.indexOf("#")>0){
	 	frameNo =frameNo.split('#')[0]+'-grid';
	 	frameNo = frameNo.toString().trim();
	 	var tid = Ext.getCmp(ctEform + "-" + frameNo);
	 }else{
		frameNo = frameNo.toString().trim();
		var tid = Ext.getCmp(ctEform + "-" + frameNo+'-id');
		hideFrameMap.isHide=true;
	}
	
	if(Ext.getCmp('docs-'+ctEform) && Ext.getCmp('docs-'+ctEform).wizard)
	{
		if (hide.toUpperCase() == "T"){
			tid.hide();
			hideFrameMap.add(ctEform+"-"+ frameNo,"T");
		}
		else if (hide.toUpperCase() == "F"){
			tid.show();
			hideFrameMap.add(ctEform+"-"+ frameNo,"F");
		}
		else
		{
			var value=eformVarMap.get(ctEform+'-'+hide);
			if(value){
			   var hide	= value.split(':-:')[1];
				if (hide.toUpperCase() == "T"){
					tid.hide();
					hideFrameMap.add(ctEform+"-"+ frameNo,"T");
				}
				else if (hide.toUpperCase() == "F"){
					tid.show();
					hideFrameMap.add(ctEform+"-"+ frameNo,"F");
				}	   
			}
		}
	}
    else if(tid != null)
    {
        if (tid.tab) {
            if (hide.toUpperCase() == "T"){
				/* if(globalMap.get("AUVITCRM")){
					tid.tab.hide();
				}else{ */
					tid.tab.hide();
					hideFrameMap.add(ctEform+"-"+ frameNo,"T");
				//}
                /* hideFrameMap.add(ctEform+"-"+ frameNo,"T");
                for(var ky=0;ky < tabPanelObj.items.keys.length;ky++){
					if (!globalMap.get("AUVITCRM")){ 	
						if (!tabPanelObj.getComponent(ctEform + "-FN-" + tabPanelObj.items.keys[ky].split("-")[2]).tab.hidden) {
							tabPanelObj.setActiveTab(ctEform + "-FN-" + tabPanelObj.items.keys[ky].split("-")[2]);
							break;
						}
					}
                } */
            }
            else if (hide.toUpperCase() == "F"){
				/* if(globalMap.get("AUVITCRM")){
					tid.tab.show();
				}else{ */
					tid.tab.show();
					hideFrameMap.add(ctEform+"-"+ frameNo,"F");
				//}
                /* hideFrameMap.add(ctEform+"-"+ frameNo,"F");
                for(var ky=0;ky < tabPanelObj.items.keys.length;ky++){
					if (!globalMap.get("AUVITCRM")) {
						if (!tabPanelObj.getComponent(ctEform + "-FN-" + tabPanelObj.items.keys[ky].split("-")[2]).tab.hidden) {
							tabPanelObj.setActiveTab(ctEform + "-FN-" + tabPanelObj.items.keys[ky].split("-")[2]);
							break;
						}
					}

                } */
            }
            else {
                // debugger;
                if (eformVarMap.get(ctEform + "-" + hide.toLowerCase()) != undefined) {
                    var set = eformVarMap.get(ctEform + "-" + hide.toLowerCase())
                            .split(":-:")[1];
                    if (set.toUpperCase() == "T"){
                        tabPanelObj.getComponent(ctEform + "-FN-" + frameNo).tab
                                .hide();

                        hideFrameMap.add(ctEform+"-"+ frameNo,"T");

                    }

                   else if (set.toUpperCase() == "F"){
                        tabPanelObj.getComponent(ctEform + "-FN-" + frameNo).tab
                                .show();
                        hideFrameMap.add(ctEform+"-"+ frameNo,"F");

                   }
                }
            }

        } else {

            if (hide.toUpperCase() == "T")
            {
                tid.hide();
                hideFrameMap.add(ctEform+"-"+ frameNo,"T");
            }
            else if (hide.toUpperCase() == "F")
            {
				var eformObj = eformMap.get(ctEform);
				if(eformObj != null){
				var wizardLic = eformObj['WIZARDDEF'];
				if(wizardLic != null && wizardLic['STORECLASS'].toUpperCase() == "WIZARD"){
                var lastActiveCard = Ext.getCmp('docs-'+ctEform).getActiveTab();
				tid.show();
                hideFrameMap.add(ctEform+"-"+ frameNo,"F");
                Ext.getCmp('docs-'+ctEform).setActiveTab(lastActiveCard.id);   
				}else{
                tid.show();
                hideFrameMap.add(ctEform+"-"+ frameNo,"F");
				}
				}
            }
      }

    }
}

function refreshFrame(frameNo) {

	var ctEform = globalMap.get("EFORMID");
	var DC = Ext.getCmp(ctEform + "-FN-" + frameNo);
	
	//Dc should be there.
	if(DC != null)
	{
	if (DC.ownerCt.initialConfig.xtype == 'tabpanel') {
		if (DC.items.items[0].xtype == 'bcsgrid') {
			// alert("Grid in tab");
            var currentRow = activeRow;
			gridRecalculate(DC.items.items[0].id,frameNo,ctEform);
            activeRow = currentRow;
            ActiveRow = activeRow + 1;
            globalMap.add("ACTIVEROW", ActiveRow);

		} else {
			// alert("NG in tab");
			var noOfFieldInCt = DC.items.items.length;
			var fieldCt = DC.items.items;

			for (var fld = 0; fld < noOfFieldInCt; fld++) {
				var ctObj = fieldCt[fld];
				ngRecalculate(ctObj);
			}

		}
	} else // Panel
	{

		if (DC.items.items[0].xtype == 'bcsgrid') {

            var currentRow = activeRow;
			gridRecalculate(DC.items.items[0].id,frameNo,ctEform);
            activeRow = currentRow;
            ActiveRow = activeRow + 1;
            globalMap.add("ACTIVEROW", ActiveRow);

            // TO--DO FOR GRID
		} else {
			var noOfFieldInCt = DC.items.items.length;
			var fieldCt = DC.items.items;

			for (var fld = 0; fld < noOfFieldInCt; fld++) {
				var ctObj = fieldCt[fld];
				ngRecalculate(ctObj);
			}

		}

	}
}
}

function ngRecalculate(obj) {

	if (obj.expression != null && obj.expression != "") 
	{

        if (obj.modeOfEntry == "TBC")
        {

            GetExpr(obj);

        }
        else if (obj.modeOfEntry == "TBE")
		{
			if(obj.getValue() == null || obj.getValue() == "")
				{
				GetExpr(obj);
				}

		}
        else
        {

           if(obj.suggestive == false)
            {
			GetExpr(obj);
			}
		}

	}

	if (obj.SQL == true && obj.compName != 'comboremotefield') {

		getTextFieldData(obj,0);

	}

	if (obj.linkField != null && obj.sourceField != null) {

		if (obj.linkField.length != 0 && obj.sourceField.length != 0) {

			if (obj.getValue() == "") {
				setSrcFieldValueNG(obj);
			}
		}

	}

	if (obj.compName == 'comboremotefield' || obj.compName == 'combofield') {
		if (obj.compName == 'comboremotefield') {
		//	obj.expand(obj);

		} else if (obj.compName == 'combofield') {
		//	obj.expand();
		}

	}
}

function allowFrameChange(frameNo, allow) {

	var ctEform = globalMap.get("EFORMID");
	var dc = Ext.getCmp(ctEform + "-FN-" + frameNo);
     if(!allowFrameChangeMap.containsKey(ctEform)){
						  
		allowFrameChangeMap.add(ctEform,{});

		var lcl_frameMap = allowFrameChangeMap.get(ctEform);

		lcl_frameMap.add(frameNo,allow);
	  
	  }else{
	  
		var lcl_frameMap = allowFrameChangeMap.get(ctEform);

		lcl_frameMap.add(frameNo,allow);

	  }


	if (dc != undefined) {
		return doAllowFrameChange(dc, allow);
	} else {
		return false;
	}
}

function initGrid(frameNo) {

	var ctEform = globalMap.get("EFORMID");
		
	var gridCt = Ext.getCmp(ctEform + "-" + frameNo+"-grid");
	var storeObj;
	
	if(gridCt){
		storeObj = gridCt.items.items[0].store;	
	}
	
    if(storeObj){
	var count = storeObj.getCount();
	var i = count;
	for (i; --i >= 0;) {
		    if(modifyStatus){
			var getGName = storeObj.storeId.split("-");

			getGName = ctEform+"-"+getGName[1]+"-grid";
			var imp = storeObj.getAt(i);
			if(deleted_Rec_Map.containsKey(getGName)){
								 
			var presentRec =deleted_Rec_Map.get(getGName);

			presentRec.push(imp);
			deleted_Rec_Map.add(getGName,presentRec);

			}else{
									 
			var myArr = new Array();
			deleted_Rec_Map.add(getGName,myArr);
			var mtRec = deleted_Rec_Map.get(getGName);
			mtRec.push(imp);
			deleted_Rec_Map.add(getGName,mtRec);

			}
			}
		 if (i === 0) {
			
			//storeObj.removeAt(i);
			//storeObj.insert(i + 1, storeObj.defalutTemplate);
			var fc			= gridCt.items.items[0];
			var storeData	= fc.store.data.items[0];
			for(var f=0; f <  gridCt.columns.length ; f++)
			{
				storeData.set(gridCt.columns[f].dataIndex,"");

				if(storeData.data['readonly'] != null){
				   storeData.data['readonly'] = false;
				}
			}
			

		} else {

			storeObj.removeAt(i);
		}
	}
}

}

function sleep(numberMillis) {
	var now = new Date();
	var wakeUp = now.getTime() + numberMillis;
	while (true) {
		now = new Date();
		if (now.getTime() > wakeUp)
			{
			return;
			}
	}
}

function activateField(fieldName, rowNum) {
	var rowno = parseInt(rowNum);
	var ctEform = globalMap.get("EFORMID");
	var compId = ctEform + "-" + fieldName.toLowerCase() + "-id";
	var fieldObj = Ext.getCmp(compId);

	if (rowno == -1) {
		fieldObj.focus();
	} else {

		if (fieldObj.editor != undefined) {
			var objGrid = Ext.getCmp(fieldObj.editor.gridId + "-grid");
			var columIdArray = Ext.getCmp(ctEform + "-"
					+ fieldName.toLowerCase() + "-id").ownerCt.items.keys;
			var colIdx = columnIndex(columIdArray, compId);
			var objSelModel = objGrid.getView().selModel;
			var editPlugin = objGrid.editingPlugin;
			var position = {
				row : rowno-1,
				column : colIdx
			};

			//editPlugin.startEditByPosition(position);
			objSelModel.view.editingPlugin.completeEdit();
			objSelModel.view.editingPlugin.startEditByPosition({row:position.row,column:position.column});
		 	objSelModel.view.getSelectionModel().setCurrentPosition({row:position.row,column:position.column});
			return true;

		} else if (fieldObj.field != undefined) {

			var objGrid = Ext.getCmp(fieldObj.editor.gridId + "-grid");

			var columIdArray = Ext.getCmp(ctEform + "-"
					+ fieldName.toLowerCase() + "-id").ownerCt.items.keys;
			var colIdx = columnIndex(columIdArray, compId);
			var objSelModel = objGrid.getView().selModel;
			var editPlugin = objGrid.editingPlugin;
			var position = {
				row : rowno,
				column : colIdx
			};
			editPlugin.startEditByPosition(position);
			objSelModel.wasEditing = true;

		}

	}

}

function columnIndex(columIdArray, compId) {

	var colIx = -1;
	for (var i = 0; i < columIdArray.length; i++) {

		if (columIdArray[i] == compId) {
			colIx = i;
			break;
		}
	}
	return colIx;
}

function doActivateColumn(fieldObj, compId) {

}

var btn;

function subEnableButton(button,btnId){
	btn = button.menu.items.map[btnId];
	if(btn == null)
	{
		Object.keys(button.menu.items.map).forEach(function(key) {
			var value = button.menu.items.map[key];
			if(value.menu != null)
				{
				subEnableButton(value,btnId);
				}
		});
	}
}



function enableButton(caption, flag) {
	if(caption.toLowerCase() === "manage" ){
		fileArchiveStatusMap.add("MANAGE",flag);
	}else if(caption.toLowerCase() === "view document"){
		fileArchiveStatusMap.add("VIEW",flag);
	}else{
	var ctEform = globalMap.get("EFORMID");
	var btnId = ctEform + "_" + caption.toLowerCase();
	var topTB = Ext.getCmp("toolBarTop-1");
	if(!globalMap.get("BUTTONINLINE")){
		var bottomTB = Ext.getCmp("toolBarBottom-2");
	}else{
		var bottomTB = Ext.getCmp(ctEform+'inlinebuttons');
	}
	btn = topTB.items.map[btnId] || bottomTB.items.map[btnId];
	//Search sub buttons also , Written by raja.i.
	if(btn == null)
	{
		Object.keys(topTB.items.map).forEach(function(key) {
			var value = topTB.items.map[key];
			if(value.menu != null)
				{
				subEnableButton(value,btnId);
				}
		});
	}

	if (btn != undefined) {
		return doEnableButton(btn, flag);
	} else {

		if(Ext.getCmp("toolBarBottom-2").items.map[btnId] != null){
		var optionBtnItems = Ext.getCmp("toolBarBottom-2").items.map[btnId];
		var subBtn = optionBtnItems;
		return (subBtn != undefined) ? doEnableButton(subBtn, flag) : false;
		}
	}
  }
}

function doEnableButton(btn, flag) {

	if (flag.toUpperCase() == "T" || flag.toUpperCase() == "F") {
		var aftBtnBehChange = (flag.toUpperCase() == "F") ? btn.disable() : btn
				.enable();
		return (aftBtnBehChange) ? true : false;
	} else {
		return false;
	}
}

function showHideButton(buttonName,flag){
	var currerntEformId = globalMap.get("EFORMID");
	if(!globalMap.get("BUTTONINLINE")){
		var tBarButtons = Ext.getCmp("toolBarBottom-2");
	}else{
		var  tBarButtons = Ext.getCmp(currerntEformId+'inlinebuttons');
	}
	if(buttonName.toLowerCase() === "fillgrid"){
		var btnId = currerntEformId + "-" + buttonName.toLowerCase();
	}else{
		var btnId = currerntEformId + "_" + buttonName.toLowerCase();
	}
	var currentBtn = tBarButtons.items.map[btnId];
	if(currentBtn){
		if(flag.toUpperCase() === "T"){
			currentBtn.show();
		}else{
			currentBtn.hide();
		}
	}
}

function setSystemVar(varName, value) {

	if (varName != null) {
		globalMap.add(varName, value);
	} else {
		return null;
	}

}

function xrun(filePath) {

	if (Ext.isWindows) {

	} else if (Ext.isMac) {

	} else if (Ext.isLinux) {

	}

}

function OpenTransform(openT) {
	// debugger;

	OpenTransForm(openT);

}

function executeOption(btnName) {
	if(globalMap.get('CURRENTOBJ')){
		var efld = Ext.getCmp(globalMap.get('EFORMID')+"-"+globalMap.get('CURRENTOBJ').split(':-:')[0]+"-id");
	}
	var innlineBtns = Ext.getCmp(globalMap.get('EFORMID')+'inlinebuttons');
	if(efld != undefined && efld.compType=="NG"){
			if(efld.tabEventFired){
			globalMap.add("FILLGRIDID","fromExpr");
			ExecuteOption(btnName);
			}
	
	}else if(innlineBtns && innlineBtns.items.items){
		for(var btn=0;btn<innlineBtns.items.items.length;btn++){
			if(innlineBtns.items.items[btn].text === "Populate"){
				var fillGridButtons = innlineBtns.items.items[btn].menu.items.items;
				if(fillGridButtons && fillGridButtons.length>0){
					for(var fg=0;fg<fillGridButtons.length;fg++){
						if(fillGridButtons[fg].text.toLowerCase() === btnName.toLowerCase()){					
							//globalMap.add("FILLGRIDID","fromExpr");
							ExecuteOption(fillGridButtons[fg]);
						}
					}
				}
			}

		}

	}else{
    var currentRow = activeRow;
	globalMap.add("FILLGRIDID","fromExpr");
	ExecuteOption(btnName);
    activeRow = currentRow;
    ActiveRow = activeRow + 1;
    globalMap.add("ACTIVEROW", ActiveRow);

	}
}
	
function resetActiveComp() {

	// revert whatever set in setProperty

}


function fieldChanged(field,rowNo){

    var ctEform = globalMap.get("EFORMID");

	// var givenComp=Ext.getCmp(ctEform+"-"+field.toLowerCase()+"-id");
   
   globalMap.add("fieldChangedExp",ctEform+"-"+field.toLowerCase()+"-id");
    
	if(globalMap.get(ctEform+"-recordid-id") > 0){
		
	  if(postTarget != null)
	  {
		    	
		    	
		  return 'F';
			 
	  }
	  else
	  {
	  
    
			if(Ext.getCmp(ctEform+"-"+field.toLowerCase()+"-id").compType=="NG") {
		         var preValue=Ext.getCmp(ctEform+"-"+field.toLowerCase()+"-id").previousValue;
				 if(preValue !=null && preValue !="")
				 {
					 
					  if(Ext.getCmp(ctEform+"-"+field.toLowerCase()+"-id").dataType == "D")
					  {
						  
						  var preDatValue = "";
						  var databaseFormat = globalMap.get("DB_FORMAT");
						  var databaseDateFmt = supportDBFmt.get(databaseFormat);
						  
						  if(preValue instanceof Date)
						  {
						  preDatValue =  Ext.Date.format(preValue,databaseDateFmt);
						  }
						  else
						  {
						  preDatValue = convertStringToDBFormat(preValue);
						  }
						  
						  
						  var value = getDateDBFormat(Ext.getCmp(ctEform+"-"+field.toLowerCase()+"-id").getValue());
						  if(preDatValue == value)
						  {  
							  return 'F';
						  }
						  else
						  {
							  return 'T';
						  }
						  
						  
					  }
					  else
					  {
						  if(Ext.getCmp(ctEform+"-"+field.toLowerCase()+"-id").getValue()==preValue){
								   return 'F';
							  }else{
								  //It is added by raja.i For accounts tree valuechanged event was breaking.before change this,Inform me.
								  //Ext.getCmp(ctEform+"-"+field.toLowerCase()+"-id").setValue(preValue);
								   return 'T';
							  }				  
					   }
				 } 
				 else
				 {
					 
				      return 'F';
				 }
			 
			}
			else if(Ext.getCmp(ctEform+"-"+field.toLowerCase()+"-id").getEditor() != null)
			{

			   var gridValue = ""; 

			   var gridComp = Ext.getCmp(ctEform+"-"+field.toLowerCase()+"-id").field;

               var gridStoreId = gridComp.gridId+"-store";
			       
			   var gridStore = Ext.data.StoreManager.lookup(gridStoreId);

			   var recordIndex = Ext.data.StoreManager
									.lookup(gridStore).find(
											gridComp.inputId,
											gridComp.getValue(), 0, false, false,
											true);

									if (recordIndex === -1) {
										return 'F';

									} else {

										var recData = Ext.data.StoreManager
										.lookup(gridStore).getAt(
												recordIndex);

                                      var modifiedRec = recData.modified[gridComp.inputId];
									  

									  if(modifiedRec != null && modifiedRec !="" ){
									  if(modifiedRec == recData.data[gridComp.inputId]){
									  
									      return 'F';
									  
									  }else{
									  
									     return 'T';
									  
									  }
									  }else{
									  
									    return 'F';
									  
									  }

									}
		
			}else if(Ext.getCmp(ctEform+"-"+field.toLowerCase()+"-id").field != undefined)
			{
			 
			   var gridValue = ""; 

			   var gridComp = Ext.getCmp(ctEform+"-"+field.toLowerCase()+"-id").field;

               var gridStoreId = gridComp.gridId+"-store";
			       
			   var gridStore = Ext.data.StoreManager.lookup(gridStoreId);

			   var recordIndex = Ext.data.StoreManager
									.lookup(gridStore).find(
											gridComp.inputId,
											gridComp.getValue(), 0, false, false,
											true);

									if (recordIndex === -1) {
										return 'F';

									} else {

										var recData = Ext.data.StoreManager
										.lookup(gridStore).getAt(
												recordIndex);

                                      var modifiedRec = recData.modified[gridComp.inputId];
									  

									  if(modifiedRec != null && modifiedRec !=""  ){
									  if(modifiedRec == recData.data[gridComp.inputId]){
									  
									      return 'F';
									  
									  }else{
									  
									     return 'T';
									  
									  }
									  }else{
									  
									    return 'F';
									  
									  }

									}

			
			}
			
	  }

	}
	else{

    return 'F';
 
	}



}



function fieldChangedBoolean(field,rowNo){

    var ctEform = globalMap.get("EFORMID");

	// var givenComp=Ext.getCmp(ctEform+"-"+field.toLowerCase()+"-id");
   
   
    
	if(globalMap.get(ctEform+"-recordid-id") > 0){
		
	  if(postTarget != null)
	  {
		    	
		    	
		  return 'F';
			 
	  }
	  else
	  {
	  
    
			if(Ext.getCmp(ctEform+"-"+field.toLowerCase()+"-id").compType=="NG") {
		         var preValue=Ext.getCmp(ctEform+"-"+field.toLowerCase()+"-id").previousValue;
				 if(preValue !=null && preValue !="")
				 {
					 
					  if(Ext.getCmp(ctEform+"-"+field.toLowerCase()+"-id").dataType == "D")
					  {
						  
						  var preDatValue = convertStringToDBFormat(preValue);
						  var value = getDateDBFormat(Ext.getCmp(ctEform+"-"+field.toLowerCase()+"-id").getValue());
						  if(preDatValue == value)
						  {  
							  return 'F';
						  }
						  else
						  {
							  return 'T';
						  }
						  
						  
					  }
					  else
					  {
						  if(Ext.getCmp(ctEform+"-"+field.toLowerCase()+"-id").getValue()==preValue){
								   return 'F';
							  }else{
								  //It is added by raja.i For accounts tree valuechanged event was breaking.before change this,Inform me.
								 // Ext.getCmp(ctEform+"-"+field.toLowerCase()+"-id").setValue(preValue);
								   return 'T';
							  }				  
					   }
				 } 
				 else
				 {
					 
				      return 'F';
				 }
			 
			}
			else if(Ext.getCmp(ctEform+"-"+field.toLowerCase()+"-id").getEditor() != null)
			{

			   var gridValue = ""; 

			   var gridComp = Ext.getCmp(ctEform+"-"+field.toLowerCase()+"-id").field;

               var gridStoreId = gridComp.gridId+"-store";
			       
			   var gridStore = Ext.data.StoreManager.lookup(gridStoreId);

			   var recordIndex = Ext.data.StoreManager
									.lookup(gridStore).find(
											gridComp.inputId,
											gridComp.getValue(), 0, false, false,
											true);

									if (recordIndex === -1) {
										return 'F';

									} else {

										var recData = Ext.data.StoreManager
										.lookup(gridStore).getAt(
												recordIndex);

                                      var modifiedRec = recData.modified[gridComp.inputId];
									  

									  if(modifiedRec != null && modifiedRec !=""  ){
									  if(modifiedRec == recData.data[gridComp.inputId]){
									  
									      return 'F';
									  
									  }else{
									  
									     return 'T';
									  
									  }
									  }else{
									  
									    return 'F';
									  
									  }

									}
		
			}else if(Ext.getCmp(ctEform+"-"+field.toLowerCase()+"-id").field != undefined)
			{
			 
			   var gridValue = ""; 

			   var gridComp = Ext.getCmp(ctEform+"-"+field.toLowerCase()+"-id").field;

               var gridStoreId = gridComp.gridId+"-store";
			       
			   var gridStore = Ext.data.StoreManager.lookup(gridStoreId);

			   var recordIndex = Ext.data.StoreManager
									.lookup(gridStore).find(
											gridComp.inputId,
											gridComp.getValue(), 0, false, false,
											true);

									if (recordIndex === -1) {
										return 'F';

									} else {

										var recData = Ext.data.StoreManager
										.lookup(gridStore).getAt(
												recordIndex);

                                      var modifiedRec = recData.modified[gridComp.inputId];
									  

									  if(modifiedRec != null && modifiedRec !=""  ){
									  if(modifiedRec == recData.data[gridComp.inputId]){
									  
									      return 'F';
									  
									  }else{
									  
									     return 'T';
									  
									  }
									  }else{
									  
									    return 'F';
									  
									  }

									}

			
			}
			
	  }

	}
	else{

    return 'F';
 
	}



}

function setSequence(field,prefix){

   var ctEform = globalMap.get("EFORMID");
   var fieldname = field.toLowerCase();
   var type = "AG";

  fNameWithF=fieldname+":-:SS";

	/****************This is For Logger****************/
   param = "eformid=" + ctEform + "&fieldname=" + fNameWithF + "&prefix=" + prefix + "&BCSCompType=" + type +"&username="+globalMap.get("USERNAME")+"&projectid="+globalMap.get("PROJECTNAME");
				

   	var ajaxObj = null;
	if (typeof XMLHttpRequest != 'undefined')
		{
		ajaxObj = new XMLHttpRequest();
		}
	else if (window.ActiveXObject) {
		var avers = ["Microsoft.XmlHttp", "MSXML2.XmlHttp",
				"MSXML2.XmlHttp.3.0", "MSXML2.XmlHttp.4.0",
				"MSXML2.XmlHttp.5.0"];
		for (var i = avers.length - 1; i >= 0; i--) {
			try {
				ajaxObj = new ActiveXObject(avers[i]);
				break;
			} catch (e) {
			}
		}
	}
	if (!ajaxObj)

		{
		throw new Error('XMLHttp (AJAX) not supported');
		}

	var url = getURL() + "apps/eformsql/";

	ajaxObj.open("POST", url, false);

	ajaxObj.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	ajaxObj.setRequestHeader("X-Requested-With","XMLHttpRequest");

	ajaxObj.onreadystatechange = function() {
		if (this.readyState == 4) {
			if (this.status == 200) {
				
			if(this.getResponseHeader("REDIRECT") == 'true'){
				   window.location.href = response.getResponseHeader("REDIRECT_PAGE");
			}
			else
			{
				var sessionExists = checkIfSessionExpired(this.responseText);
				if(sessionExists)
				{
					var obj = this.responseText;
					var	fieldObj= obj.toString();
					Ext.getCmp(ctEform+ "-" + fieldname + "-id").setValue(fieldObj);
				}
				else
				{
					 if(bcsMask)
					  bcsMask.hide();
					  Ext.Msg.alert({ 
							title    : '<font color="red"><b>Confirm Message</b></font>',
							msg      : "<b>Your Session has been Expired.Please Click Ok button to logout</b>",
							buttons	 : Ext.Msg.OK,
							closable : false,
							fn       : function (btn, text){
							if (btn == 'ok') 
							{
								 if(devStatus)
								 {
								 location.href = 'j_spring_security_logout?dev=true';
								 }
								else
								 {
								 location.href = 'j_spring_security_logout';
								 }
							}}
						});
					 return;
				}
			}

			}
		}
	};
	ajaxObj.send(param);
	
}

function gridColTotal(fieldname) {
	
	
	var obj = storages.grid;
	
	
	var mainobj= [] ;
   
    for (var key in obj) {
     

	 if (obj.hasOwnProperty(key)) {
                
		var val = obj[key];
        console.log(val);
		
		if(val[0].hasOwnProperty(fieldname))
		{
				  //get Value of video
				  
		     mainobj = val;
		     break;
				    
	    }
				
      }
  
  
  }
  
   var result = 0;
  
   for(var i =0 ; i < mainobj.length ; i++)
   {
	   
	   
	   result = result +  Number(mainobj[i][fieldname]);
	   
	 
   }
	
	
    return result;
	
	
	
	
	// var total = 0;
	// let tables_in_document = document.getElementsByTagName('table');
	// let table_db_id;
	// let table_id;
	// if(tables_in_document.length == 1){
		// table_db_id = tables_in_document[0]['dataset']['db'];
		// table_id = tables_in_document[0]['id'];
	// }
	// else{
		// let right_id;
		// for(let j=0;j<tables_in_document.length;j++){
			// let id = tables_in_document[j]['dataset']['db'];
			// var obj = document.getElementById(fieldname+'_'+id);
			// if(obj != undefined){
				// table_db_id = id;
				// table_id = tables_in_document[j]['id'];
			// }
		// }
	// }

	// var fieldVal ='';

	// var combObj = document.getElementById(fieldname+'_'+table_db_id);
	
	// if(combObj.length == 0){
		// combObj = undefined;
	// }
	
	
	// if(combObj){
		// let cellIndex = combObj['cellIndex'];
		// let table = document.getElementById(table_id);
		// let rows = table.getElementsByTagName('tbody')[0]['rows'];
		
		// for(let i=0;i<rows.length;i++){
			// let cells = rows[i]['cells'];
			// let value = cells[cellIndex]['dataset']['select_value']
			// total = total + Number(value);
		
		// }

	// }
	
	// return total;
	
	// ==================================================================
	
	
/*	if (fieldname) {
		fieldname = fieldname.toString().trim();
	}

	var total = 0;

	getGridObj(fieldname, null, "NV");

	var gridColTotalValidRow = "";

	var eformId = "";

	if (compObjName != null) {
		eformId = compObjName.split("-");

	} else {

		return 0;
	}

	if (postArray != null) {
		gridColTotalValidRow = eformId[0] + "-validrow" + compGframeNum;
		if (compStoreObj.data.length > 0) {

			for (kl = 0; kl < compStoreObj.data.length; kl++) {

				if (compStoreObj.data.items[kl].data[gridColTotalValidRow] != null
						&& (compStoreObj.data.items[kl].data[gridColTotalValidRow]
								.toLowerCase() == "t"
								|| compStoreObj.data.items[kl].data[gridColTotalValidRow]
										.toLowerCase() == "a"
								|| compStoreObj.data.items[kl].data[gridColTotalValidRow]
										.toLowerCase() == "b" || compStoreObj.data.items[kl].data[gridColTotalValidRow]
								.toLowerCase() == "c")) {

					total = total
							+ Number(compStoreObj.data.items[kl].data[compObjName]);
				}
			}

			return total;

		} else {
			return false;
		}

	} else {

		if (compGridObj.columns[1].editor != undefined) {

			gridColTotalValidRow = eformId[0] + "-validrow"
					+ compGridObj.columns[1].editor.gridslug;

		} else if (compGridObj.columns[1].field != undefined) {

			gridColTotalValidRow = eformId[0] + "-validrow"
					 + compGridObj.columns[1].field.gridslug;

		}

		if (compObjName != null) {

			if (compGridObj != null) {

				var decimal = Ext.getCmp(compObjName + "-id").config.decimalPrecision;

				for (kl = 0; kl < compGridObj.store.data.length; kl++) {

					if (compGridObj.store.data.items[kl].data[gridColTotalValidRow] != null
							&& (compGridObj.store.data.items[kl].data[gridColTotalValidRow]
									.toLowerCase() == "t"
									|| compGridObj.store.data.items[kl].data[gridColTotalValidRow]
											.toLowerCase() == "a"
									|| compGridObj.store.data.items[kl].data[gridColTotalValidRow]
											.toLowerCase() == "b" || compGridObj.store.data.items[kl].data[gridColTotalValidRow]
									.toLowerCase() == "c")) {

						if (decimal) {

							var val =  compGridObj.store.data.items[kl].data[compObjName];
							if(val.toString().indexOf(".") != -1 )
							{
									if(total == 0)
									{
										total = total
										+ Number(Number(compGridObj.store.data.items[kl].data[compObjName]).toFixed(decimal));

									}
									else
									{
											total = Number(total.toFixed(decimal))
											+ Number(Number(compGridObj.store.data.items[kl].data[compObjName]).toFixed(decimal));
									}
							}
							else
							{
								if(total == 0)
								{
									total = total
									+ Number(compGridObj.store.data.items[kl].data[compObjName]);

								}
								else
								{
								
									total = Number(total.toFixed(decimal))
										+ Number(compGridObj.store.data.items[kl].data[compObjName]);

								}
					
								
							}
						} else {
							total = total
									+ Number(compGridObj.store.data.items[kl].data[compObjName]);
						}
					}

				}

			}
			if (compStoreObj != null)

			{
				total = compStoreObj.sum(compObjName);
			}

			return total;

		} else {

			return false;
		}
	}*/


}

function getMin(fieldname) {
	
	var dataStore = null;
	getGridObj(fieldname,null,"NV");
	if (compObjName != null) {
		if(compGridObj != null)
		  {
		  dataStore = compGridObj.store;
		  }
		if(compStoreObj != null)
		  {
		  dataStore = compStoreObj;
		  }
	    if(dataStore != null)
	    {
			var items = dataStore.data.items;
			var rowIdx = getMinRowIndex(items, compObjName);
			return rowIdx;
	    }
	    else
	    {
	    	return -1;
	    }
	    
		
	} else {
		return -1;
	}
}

function getMax(fieldname) {

	getGridObj(fieldname,null,"NV");
    var dataStore = null;
	if (compObjName != null) {
        if(compGridObj != null)
		  {
		  dataStore = compGridObj.store;
		  }
		if(compStoreObj != null)
		   {
		   dataStore = compStoreObj;
		   }
		
		if(dataStore != null)
		{
			var items = dataStore.data.items;
			var rowIdx = getMaxRowIndex(items, compObjName);
			return rowIdx;
		}
		else
		{
			return -1;
			
		}
	} else {

		return -1;

	}

}

function getRowCount(fieldname) {

	getGridObj(fieldname,null,"NV");

	if (compObjName != null) {
		if(compGridObj != null)
		{
		rowCount = compGridObj.store.getCount() ;
		}
        if(compStoreObj != null)
        {
		rowCount = compStoreObj.getCount() ;
		}
		return rowCount;
	} else {

		return false;

	}

}

function GetValue(fieldname, fieldrow) {

	getGridObj(fieldname, null, "VG");
	var GValue = '';
	
	if (compObjName != null) {

		if (postArray) {

			var visited = false;
			var RowIndex = parseInt(fieldrow) - 1;

			if (RowIndex >= 0) {

				var val = ""
				for (var pa = 0; pa < postArray.length; pa++) {

					if (postArray[pa].FN == fieldname) {

						val = postArray[pa].FV;
						visited = true;

						break;
					}

				}

				if (!visited) {

					var RowIndex = parseInt(fieldrow) - 1;

					if (RowIndex >= 0) {

						if (compGridObj != null) {
							val = compGridObj.store.data.items[RowIndex].data[compObjName];
						}
						if (compStoreObj != null) {
							val = compStoreObj.data.items[RowIndex].data[compObjName];
						}

						return val;
					} else {

						return '';

					}

				}

				return val;

			} else {
				return '';
			}

		} else {

			var RowIndex = parseInt(fieldrow) - 1;

			if (RowIndex >= 0) {

				if (compGridObj != null) {
					GValue = compGridObj.store.data.items[RowIndex].data[compObjName];
				}
				if (compStoreObj != null) {
					GValue = compStoreObj.data.items[RowIndex].data[compObjName];
				}

				return GValue;
			} else {

				return '';

			}

		}

	}else {
		// if row no comes -1 or false 
		return '';
	}

}

function GetRow(fieldname, fieldvalue) {

	getGridObj(fieldname, null, "VG");
	var GetRowIndex = -1;
	var dataStore = null;

	if (compObjName != null) {

		if (compGridObj != null) {
			dataStore = compGridObj.store;
		}

		if (compStoreObj != null) {
			dataStore = compStoreObj;
		}

		if (dataStore != null) {
			var RowCount = dataStore.getCount();

			for (rc = 0; rc < RowCount; rc++) {
				if (dataStore.data.items[rc].data[compObjName] == fieldvalue) {

					GetRowIndex = rc + 1;

					break;

				}

			}
		}


		if (postArray) {
			if (compObjName) {

				if (compGridObj == null) {

					for (var pa = 0; pa < postArray.length; pa++) {

						if (postArray[pa].FN == fieldname) {

							val = postArray[pa].FV;

							if (val == fieldvalue) {

								GetRowIndex = postCurrentRow;
								break;
							}
						}

					}

					return GetRowIndex;

				}

			}

		}

		return GetRowIndex;

	}else {

		return false;

	}

}

function GridSum(fieldname, fieldvalue, actionfield) {

	if (fieldvalue == "") {
		return 0;
	}

	getGridObj(fieldname, actionfield, "NV");
	var dataStore = null;
	var TotalCount = 0;
	var gridColTotalValidRow = "";

	var eformId = "";

	if (compObjName != null) {
		eformId = compObjName.split("-");

	}

	if (compObjName != null) {
		if (compGridObj != null) {
			dataStore = compGridObj.store;
		}

		if (compStoreObj != null) {
			dataStore = compStoreObj;
		}

		if (postArray != null) {

			gridColTotalValidRow = eformId[0] + "-validrow" + postFrameNos;

		} else {
			if (compGridObj.columns[1].editor != undefined) {

				gridColTotalValidRow = eformId[0] + "-validrow"
						+ compGridObj.columns[1].editor.gridslug;

			} else if (compGridObj.columns[1].field != undefined) {

				gridColTotalValidRow = eformId[0] + "-validrow"
						+ compGridObj.columns[1].field.gridslug;

			}
		}

		if (dataStore != null) {
			var RowCount = dataStore.getCount();

			if (postArray != null) {

				for (var rc = 0; rc < RowCount; rc++) {

					if (dataStore.data.items[rc].data[compObjName] == fieldvalue) {

						var actionFieldVal = dataStore.data.items[rc].data[actionObjName];
						if (actionFieldVal == '') {
							actionFieldVal = 0;
						}

						if (Ext.isNumber(actionFieldVal)) {

							TotalCount = TotalCount + ToNumber(actionFieldVal);

						} else {

							TotalCount = TotalCount + ToNumber(actionFieldVal);

						}

					}

				}

			} else {

				for (var rc = 0; rc < RowCount; rc++) {

					if (dataStore.data.items[rc].data[gridColTotalValidRow] != null
							&& (dataStore.data.items[rc].data[gridColTotalValidRow]
									.toLowerCase() == "t"
									|| dataStore.data.items[rc].data[gridColTotalValidRow]
											.toLowerCase() == "a"
									|| dataStore.data.items[rc].data[gridColTotalValidRow]
											.toLowerCase() == "b" || dataStore.data.items[rc].data[gridColTotalValidRow]
									.toLowerCase() == "c")) {				
						if (dataStore.data.items[rc].data[compObjName] == fieldvalue) {

							var actionFieldVal = dataStore.data.items[rc].data[actionObjName];
							if (actionFieldVal == '') {
								actionFieldVal = 0;
							}

							if (Ext.isNumber(actionFieldVal)) {

								TotalCount = TotalCount
										+ ToNumber(actionFieldVal);

							} else {

								TotalCount = TotalCount
										+ ToNumber(actionFieldVal);

							}

						}

					}

				}
			}
		}

		return TotalCount;

	}

	else {

		return false;

	}

} 


function SumTill(fieldname, fieldvalue, actionfield, EndIndex) {

	getGridObj(fieldname, actionfield, "NV");

	var dataStore = null;

	var TotalCount = 0;

	if (compObjName != null) {

		if (compGridObj != null) {
			dataStore = compGridObj.store;
		}

		if (compStoreObj != null) {
			dataStore = compStoreObj;
		}

		if (dataStore != null) {

			var RowCount = dataStore.getCount();

			if (EndIndex == 0) {

				TotalCount = 0;
			}

			else if (EndIndex <= RowCount) {

				var RCNT = EndIndex;

			} else {

				var RCNT = RowCount;

			}

			for (var rc = 0; rc < RCNT; rc++) {
				if (dataStore.data.items[rc].data[compObjName].toLowerCase() == fieldvalue.toLowerCase()) {

					var actionVal = dataStore.data.items[rc].data[actionObjName];
					if (actionVal == '') {
						actionVal = 0;
					}
					TotalCount = TotalCount + ToNumber(actionVal);

				}

			}
		}

		return TotalCount;

	}

	else {

		return false;

	}

}

function getRoundOff(fieldName,fieldName2,rowIdx,rndOff){

  getGridObj(fieldName,fieldName2,"NV");

  var getTotal=0;

 for(i=0;i<rowIdx;i++){
      
	   if(compGridObj != null){ 
	   if(compGridObj.store.data.items[i].data[actionObjName]=="T"){
       
		var tot1 = compGridObj.store.data.items[i].data[compObjName];  
		
	   if(tot1 != 0)
	   {
       // getTotal=getTotal+((tot1)%parseInt(tot1));
		   getTotal=getTotal+ ToNumber(tot1);
	   
	   }   
	   else 
		 {
		 getTotal=getTotal;
		 }
	  }
	  }

  }

 var rnd=100/rndOff;
 var number1 = (Math.round(getTotal * rnd) / rnd).toFixed(2);
 return (number1-getTotal).toFixed(2);



}

function SetValue(fieldname, RowNo, fieldvalue) {
	var fieldVal ='';
    if(document.getElementById(fieldname).getAttribute('role') == "radiogroup"){
		var combObj = document.getElementsByName(fieldname)[0].children;
		for (var i=1;i<combObj.length;i++){
	    	if(combObj[i].firstChild.firstChild.firstChild.outerText == fieldvalue){
				combObj[i].firstChild.lastElementChild.firstChild.className = "radio-icon radio-checked";
			}
		}
	}
	else if(document.getElementsByName(fieldname)[0].tagName == "ION-INPUT"){
		// document.getElementsByName(fieldname)[1].value = fieldvalue;
		storages['preset_value'][fieldname] = fieldvalue;
	}
	else if(document.getElementsByName(fieldname)[0].tagName == "ION-DATETIME"){
		document.getElementsByName(fieldname)[0].textContent = fieldvalue;
	}
	else if(document.getElementById(fieldname).getAttribute('role') == "checkgroup")
	{	
		var combObj = document.getElementsByName(fieldname)[0].children;
		for (var i=1;i<combObj.length;i++){
			//console.log(combObj[i].lastChild.children[1].textContent.indexOf(fieldvalue));
			if (combObj[i].lastChild.children[1].textContent.indexOf(fieldvalue) == 0){
				combObj[i].lastChild.children[0].firstChild.className = "checkbox-icon checkbox-checked";
			}
				
		}
	}
	else if(document.getElementsByName(fieldname)[0].tagName == "ION-SELECT"){
		document.getElementsByName(fieldname)[0].children[0].innerHTML = fieldvalue;
		//document.getElementsByName(fieldname)[0].textContent = fieldvalue;
	}
	
}


function getCostRateWOLOC(itemid, docdate, qty, valmethod) {

    var ajaxObj = null;
    if (typeof XMLHttpRequest != 'undefined')
        {
		ajaxObj = new XMLHttpRequest();
		}
    else if (window.ActiveXObject) {
        var avers = [    "Microsoft.XmlHttp", "MSXML2.XmlHttp",
            "MSXML2.XmlHttp.3.0", "MSXML2.XmlHttp.4.0",
            "MSXML2.XmlHttp.5.0"];
        for (var i = avers.length - 1; i >= 0; i--) {
            try {
                ajaxObj = new ActiveXObject(avers[i]);
                break;
            } catch (e) {
            }
        }
    }


    if (!ajaxObj)

        {
		throw new Error('XMLHttp (AJAX) not supported');
		}

    var url = getURL() + "apps/einvstock/";

    ajaxObj.open("POST", url, false);

    ajaxObj.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    ajaxObj.setRequestHeader("X-Requested-With","XMLHttpRequest");
    var databaseFormat = globalMap.get("DB_FORMAT");
    var getAssociateExtjsFormat = supportDBFmt.get(databaseFormat);

    if (docdate instanceof Date) {
        docdate = Ext.Date.format(docdate, getAssociateExtjsFormat);

    }
    else {

        var databaseFormat = globalMap.get("DB_FORMAT");
        var getAssociateExtjsFormat = supportDBFmt.get(databaseFormat);
        var cdocdate = Ext.Date.parse(docdate, EXTJS_DATE_FORMAT_MAP.get(globalMap.get("DATEFORMAT")));
        docdate = Ext.Date.format(cdocdate, getAssociateExtjsFormat);
    }

    /****************This is For Logger****************/
    var param = "qty=" + qty + "&itemid=" + itemid + "&docdate=" + docdate + "&valmethod=" + valmethod + "&inFnName=GCRWOLOC" + "&fieldname=" + globalMap.get("CURRENTOBJ").split(":-:")[0] + "&projectid=" + globalMap.get("PROJECTNAME") + "&username=" + globalMap.get("USERNAME");


    ajaxObj.onreadystatechange = function () {

        if (ajaxObj.readyState == 4 && ajaxObj.status == 200) {

            if (ajaxObj.getResponseHeader("REDIRECT") == 'true') {

                window.location.href = response.getResponseHeader("REDIRECT_PAGE");

            }
            else 
			{
			 var sessionExists = checkIfSessionExpired(ajaxObj.responseText);
			 if(sessionExists)
			 {
                var responseValue = Ext.JSON.decode(ajaxObj.responseText);

                var ColObjName = globalMap.get("CURRENTOBJ").split(":-:")[0];

                var crntGridId = globalMap.get("CURRENTOBJ").split(":-:")[1];

                if (postArray != null && postTarget != null) {


                    if (globalMap.get("EPOSTCOMPTYPE") == "NG") {
                        if (responseValue != null) {

                            return  Number(responseValue).toFixed(2);

                        }
                        else {

                            return 0;
                        }


                    }
                    else {


                        var gridStore = Ext.getCmp(crntGridId + "-grid").store;

                        gridStore.data.items[activeRow].data[ColObjName] = Number(responseValue).toFixed(2);


                    }

                }
                else {

                    if(crntGridId == "NG"){


					   Ext.getCmp(globalMap.get("EFORMID")+"-"+globalMap.get("CURRENTOBJ").split(":-:")[0] + "-id").setValue(Number(responseValue).toFixed(2));
					   
					   }else{
					   var gridStore = Ext.getCmp(crntGridId + "-grid").store;

                       gridStore.data.items[activeRow].data[ColObjName] = Number(responseValue).toFixed(2);
					   
					   }
                }
			}
			else
			{
				 if(bcsMask)
				  bcsMask.hide();
				  Ext.Msg.alert({ 
							title    : '<font color="red"><b>Confirm Message</b></font>',
							msg      : "<b>Your Session has been Expired.Please Click Ok button to logout</b>",
							buttons	 : Ext.Msg.OK,
							closable : false,
							fn       : function (btn, text){
							if (btn == 'ok') 
							{
								 if(devStatus)
								 {
								 location.href = 'j_spring_security_logout?dev=true';
								 }
								else
								 {
								 location.href = 'j_spring_security_logout';
								 }
							}}
						});
				 return;
			}

         }

      }
   };

    ajaxObj.send(param);


    if (ajaxObj != null) {

        if (ajaxObj.readyState == 4 && ajaxObj.status == 200) {


            if (ajaxObj.getResponseHeader("REDIRECT") == 'true') {

                window.location.href = response.getResponseHeader("REDIRECT_PAGE");

            }
            else {

                var responseValue = Ext.JSON.decode(ajaxObj.responseText);

                var ColObjName = globalMap.get("CURRENTOBJ").split(":-:")[0];

                var crntGridId = globalMap.get("CURRENTOBJ").split(":-:")[1];

                if (postArray != null && postTarget != null) {


                    if (globalMap.get("EPOSTCOMPTYPE") == "NG") {
                        if (responseValue != null) {

                            return  Number(responseValue).toFixed(2);

                        }
                        else {

                            return 0;
                        }


                    }
                    else {


                        var gridStore = Ext.getCmp(crntGridId + "-grid").store;

                        gridStore.data.items[activeRow].data[ColObjName] = Number(responseValue).toFixed(2);


                    }

                }
                else {

                   if(crntGridId == "NG"){


					   Ext.getCmp(globalMap.get("EFORMID")+"-"+globalMap.get("CURRENTOBJ").split(":-:")[0] + "-id").setValue(Number(responseValue).toFixed(2));
					   
					   }else{
					   var gridStore = Ext.getCmp(crntGridId + "-grid").store;

                       gridStore.data.items[activeRow].data[ColObjName] = Number(responseValue).toFixed(2);
					   
					   }
                }

            }

        }


    }

    return false;
}
   
   
 function getCostRateWLOC(itemid,docdate,qty,valmethod,locationId){


       var ajaxObj = null;
       if (typeof XMLHttpRequest != 'undefined')
           {
		   ajaxObj = new XMLHttpRequest();
		   }
       else if (window.ActiveXObject) {
           var avers = [    "Microsoft.XmlHttp", "MSXML2.XmlHttp",
               "MSXML2.XmlHttp.3.0", "MSXML2.XmlHttp.4.0",
               "MSXML2.XmlHttp.5.0"];
           for (var i = avers.length - 1; i >= 0; i--) {
               try {
                   ajaxObj = new ActiveXObject(avers[i]);
                   break;
               } catch (e) {
               }
           }
       }


       if (!ajaxObj)

           {
		   throw new Error('XMLHttp (AJAX) not supported');
		   }

       var url = getURL() + "apps/einvstock/";

       ajaxObj.open("POST", url, false);

       ajaxObj.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
       ajaxObj.setRequestHeader("X-Requested-With","XMLHttpRequest");
       var databaseFormat = globalMap.get("DB_FORMAT");

       var databaseDateFmt = supportDBFmt.get(databaseFormat);

       if (docdate instanceof Date) {

           docdate = Ext.Date.format(docdate, databaseDateFmt);

       }
       else {
		    if(docdate.indexOf(",") != -1){
    		   //for fifo valuation method 20/09/2016,17.43 for this no need to format
    		  //  docdate=docdate;
    	   }else{

	           var cdocdate = Ext.Date.parse(docdate, EXTJS_DATE_FORMAT_MAP.get(globalMap.get("DATEFORMAT")));
		       docdate = Ext.Date.format(cdocdate, databaseDateFmt);
		   }

       }

       /****************This is For Logger****************/
       var param = "qty=" + qty + "&itemid=" + itemid + "&docdate=" + docdate + "&valmethod=" + valmethod + "&locationId=" + locationId + "&inFnName=GCRWLOC" + "&fieldname=" + globalMap.get("CURRENTOBJ").split(":-:")[0] + "&projectid=" + globalMap.get("PROJECTNAME") + "&username=" + globalMap.get("USERNAME");

       ajaxObj.onreadystatechange = function () {

           if (ajaxObj.readyState == 4 && ajaxObj.status == 200) {

               if (ajaxObj.getResponseHeader("REDIRECT") == 'true') {

                   window.location.href = response.getResponseHeader("REDIRECT_PAGE");

               } 
			   else 
			   {
				  var sessionExists = checkIfSessionExpired(ajaxObj.responseText);
				  if(sessionExists)
				  {
					   var responseValue = ajaxObj.responseText;

					   var ColObjName = globalMap.get("CURRENTOBJ").split(":-:")[0];

					   var crntGridId = globalMap.get("CURRENTOBJ").split(":-:")[1];

					   if (postArray != null && postTarget != null) {


                       if (globalMap.get("EPOSTCOMPTYPE") == "NG") {
                           if (responseValue != null) {

                               return  Number(responseValue).toFixed(2);

                           }
                           else {

                               return 0;
                           }


                       }
                       else {


                           var gridStore = Ext.getCmp(crntGridId + "-grid").store;

                           gridStore.data.items[activeRow].data[ColObjName] = Number(responseValue).toFixed(2);


                       }

                   }
                   else {

					   if(crntGridId == "NG"){


					   Ext.getCmp(globalMap.get("EFORMID")+"-"+globalMap.get("CURRENTOBJ").split(":-:")[0] + "-id").setValue(Number(responseValue).toFixed(2));
					   
					   }else{
					   var gridStore = Ext.getCmp(crntGridId + "-grid").store;

                       gridStore.data.items[activeRow].data[ColObjName] = Number(responseValue).toFixed(2);
					   
					   }

                       
                   }


                   if (globalMap.get('FROMESAVE') != 1) {


                   }
                   else {

                       globalMap.removeAtKey('FROMESAVE');

                   }
                   return responseValue;
				  }
				  else
				   {
					  if(bcsMask)
					  bcsMask.hide();
					  Ext.Msg.alert({ 
							title    : '<font color="red"><b>Confirm Message</b></font>',
							msg      : "<b>Your Session has been Expired.Please Click Ok button to logout</b>",
							buttons	 : Ext.Msg.OK,
							closable : false,
							fn       : function (btn, text){
							if (btn == 'ok') 
							{
								 if(devStatus)
								 {
								 location.href = 'j_spring_security_logout?dev=true';
								 }
								else
								 {
								 location.href = 'j_spring_security_logout';
								 }
							}}
						});
					 return;
				   }

               }

           }
       };

       ajaxObj.send(param);

       if (ajaxObj != null) {

           if (ajaxObj.readyState == 4 && ajaxObj.status == 200) {


               if (ajaxObj.getResponseHeader("REDIRECT") == 'true') {

                   window.location.href = response.getResponseHeader("REDIRECT_PAGE");

               } else {

                   var responseValue = ajaxObj.responseText;

                   var ColObjName = globalMap.get("CURRENTOBJ").split(":-:")[0];

                   var crntGridId = globalMap.get("CURRENTOBJ").split(":-:")[1];

                   if (postArray != null && postTarget != null) {


                       if (globalMap.get("EPOSTCOMPTYPE") == "NG") {
                           if (responseValue != null) {

                               return  Number(responseValue).toFixed(2);

                           }
                           else {

                               return 0;
                           }


                       }
                       else {


                           var gridStore = Ext.getCmp(crntGridId + "-grid").store;

                           gridStore.data.items[activeRow].data[ColObjName] = Number(responseValue).toFixed(2);


                       }

                   }
                   else {

                      if(crntGridId == "NG"){


					   Ext.getCmp(globalMap.get("EFORMID")+"-"+globalMap.get("CURRENTOBJ").split(":-:")[0] + "-id").setValue(Number(responseValue).toFixed(2));
					   
					   }else{
					   var gridStore = Ext.getCmp(crntGridId + "-grid").store;

                       gridStore.data.items[activeRow].data[ColObjName] = Number(responseValue).toFixed(2);
					   
					   }
                   }


                   if (globalMap.get('FROMESAVE') != 1) {


                   }
                   else {

                       globalMap.removeAtKey('FROMESAVE');

                   }

                   return responseValue;

               }

           }


       }

       return false;


   }

function getClosingStockWOLOC(itemid, docdate, valmethod) {

    globalMap.removeAtKey('OP_STOCKQTY');

    globalMap.removeAtKey('OP_STOCKVALUE');

    globalMap.removeAtKey('REC_STOCKQTY');

    globalMap.removeAtKey('REC_STOCKVALUE');

    globalMap.removeAtKey('ISS_STOCKQTY');

    globalMap.removeAtKey('ISS_STOCKVALUE');


    if(itemid == 0)
    {
        globalMap.add('OP_STOCKQTY', Number(0).toFixed(2));

        globalMap.add('OP_STOCKVALUE', Number(0).toFixed(2));

        globalMap.add('REC_STOCKQTY', Number(0).toFixed(2));

        globalMap.add('REC_STOCKVALUE', Number(0).toFixed(2));

        globalMap.add('ISS_STOCKQTY', Number(0).toFixed(2));

        globalMap.add('ISS_STOCKVALUE', Number(0).toFixed(2));
        return;
    }


    var ajaxObj = null;
    if (typeof XMLHttpRequest != 'undefined')
        {
		ajaxObj = new XMLHttpRequest();
		}
    else if (window.ActiveXObject) {
        var avers = [    "Microsoft.XmlHttp", "MSXML2.XmlHttp",
            "MSXML2.XmlHttp.3.0", "MSXML2.XmlHttp.4.0",
            "MSXML2.XmlHttp.5.0"];
        for (var i = avers.length - 1; i >= 0; i--) {
            try {
                ajaxObj = new ActiveXObject(avers[i]);
                break;
            } catch (e) {
            }
        }
    }


    if (!ajaxObj)

        {
		throw new Error('XMLHttp (AJAX) not supported');
		}

    var url = getURL() + "apps/einvstock/";

    ajaxObj.open("POST", url, false);

    ajaxObj.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	ajaxObj.setRequestHeader("X-Requested-With","XMLHttpRequest");

    var databaseFormat = globalMap.get("DB_FORMAT");

    var databaseDateFmt = supportDBFmt.get(databaseFormat);

    if (docdate instanceof Date) {
        docdate = Ext.Date.format(docdate, databaseDateFmt);

    }
    else {
        var cdocdate = Ext.Date.parse(docdate, EXTJS_DATE_FORMAT_MAP.get(globalMap.get("DATEFORMAT")));
        docdate = Ext.Date.format(cdocdate, databaseDateFmt);
    }

    /****************This is For Logger****************/
    var param = "itemid=" + itemid + "&docdate=" + docdate + "&valmethod=" + valmethod + "&inFnName=CLSTKWOL" + "&fieldname=" + globalMap.get("CURRENTOBJ").split(":-:")[0] + "&projectid=" + globalMap.get("PROJECTNAME") + "&username=" + globalMap.get("USERNAME");

    ajaxObj.onreadystatechange = function () {

        if (ajaxObj.readyState == 4 && ajaxObj.status == 200) {


            if (ajaxObj.getResponseHeader("REDIRECT") == 'true') {

                window.location.href = response.getResponseHeader("REDIRECT_PAGE");

            }

            else 
			{
				var sessionExists = checkIfSessionExpired(ajaxObj.responseText);
				if(sessionExists)
				{
					var responseValue = ajaxObj.responseText;

					var ColObjName = globalMap.get("CURRENTOBJ").split(":-:")[0];

					var crntGridId = globalMap.get("CURRENTOBJ").split(":-:")[1];

					globalStock = responseValue.split("^");

					globalMap.add('OP_STOCKQTY', Number(globalStock[0]).toFixed(6));

					globalMap.add('OP_STOCKVALUE', Number(globalStock[1]).toFixed(6));

					globalMap.add('REC_STOCKQTY', Number(globalStock[2]).toFixed(6));

					globalMap.add('REC_STOCKVALUE', Number(globalStock[3]).toFixed(6));

					globalMap.add('ISS_STOCKQTY', Number(globalStock[4]).toFixed(6));

					globalMap.add('ISS_STOCKVALUE', Number(globalStock[5]).toFixed(6));
				}
				else
				{
					 if(bcsMask)
					  bcsMask.hide();
					  Ext.Msg.alert({ 
							title    : '<font color="red"><b>Confirm Message</b></font>',
							msg      : "<b>Your Session has been Expired.Please Click Ok button to logout</b>",
							buttons	 : Ext.Msg.OK,
							closable : false,
							fn       : function (btn, text){
							if (btn == 'ok') 
							{
								 if(devStatus)
								 {
								 location.href = 'j_spring_security_logout?dev=true';
								 }
								else
								 {
								 location.href = 'j_spring_security_logout';
								 }
							}}
						});
					 return;
				}

            }

        }
    };

    ajaxObj.send(param);

    if (ajaxObj != null) {

        if (ajaxObj.readyState == 4 && ajaxObj.status == 200) {


            if (ajaxObj.getResponseHeader("REDIRECT") == 'true') {

                window.location.href = response.getResponseHeader("REDIRECT_PAGE");

            }

            else {

                var responseValue = ajaxObj.responseText;

                var ColObjName = globalMap.get("CURRENTOBJ").split(":-:")[0];

                var crntGridId = globalMap.get("CURRENTOBJ").split(":-:")[1];

                globalStock = responseValue.split("^");

                globalMap.add('OP_STOCKQTY', Number(globalStock[0]).toFixed(6));

                globalMap.add('OP_STOCKVALUE', Number(globalStock[1]).toFixed(6));

                globalMap.add('REC_STOCKQTY', Number(globalStock[2]).toFixed(6));

                globalMap.add('REC_STOCKVALUE', Number(globalStock[3]).toFixed(6));

                globalMap.add('ISS_STOCKQTY', Number(globalStock[4]).toFixed(6));

                globalMap.add('ISS_STOCKVALUE', Number(globalStock[5]).toFixed(6));

            }

        }


    }

    // return false;

}
	
	function getClosingStockWLOC(itemid,docdate,valmethod,locationId){		

		 globalMap.removeAtKey('OP_STOCKQTY');

		 globalMap.removeAtKey('OP_STOCKVALUE');

		 globalMap.removeAtKey('REC_STOCKQTY');

		 globalMap.removeAtKey('REC_STOCKVALUE');

		 globalMap.removeAtKey('ISS_STOCKQTY');

		 globalMap.removeAtKey('ISS_STOCKVALUE');
		
		 var ajaxObj=null;
			if (typeof XMLHttpRequest != 'undefined')
				{
				ajaxObj= new XMLHttpRequest();
				}
			else if (window.ActiveXObject) {
				var avers = [	"Microsoft.XmlHttp", "MSXML2.XmlHttp",
								"MSXML2.XmlHttp.3.0", "MSXML2.XmlHttp.4.0",
								"MSXML2.XmlHttp.5.0"];
				for (var i = avers.length -1; i >= 0; i--) {
					try {
						ajaxObj = new ActiveXObject(avers[i]);
						break;
					} catch(e) {}
				}
			}

	   

		if (!ajaxObj)

		{
		throw new Error('XMLHttp (AJAX) not supported');
		}

		var url = getURL() +"apps/einvstock/";

		ajaxObj.open("POST", url, false);

		ajaxObj.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		ajaxObj.setRequestHeader("X-Requested-With","XMLHttpRequest");

		var databaseFormat = globalMap.get("DB_FORMAT");

	    var databaseDateFmt = supportDBFmt.get(databaseFormat);

		if(docdate instanceof Date)
		{
			docdate= Ext.Date.format(docdate,databaseDateFmt);
			
		}
		else
		{
				var cdocdate= Ext.Date.parse(docdate, EXTJS_DATE_FORMAT_MAP.get(globalMap.get("DATEFORMAT")));
				docdate = Ext.Date.format(cdocdate,databaseDateFmt);	 	
		}
      
	    if(globalMap.get("CURRENTOBJ")!=undefined){

         var param = "itemid="+itemid+"&docdate="+docdate+"&valmethod="+valmethod+"&locationId="+locationId+"&inFnName=CLSTKWL"
		+"&fieldname="+globalMap.get("CURRENTOBJ").split(":-:")[0]+"&projectid="+globalMap.get("PROJECTNAME")+"&username="+globalMap.get("USERNAME");
		}
		else{

         var param = "itemid="+itemid+"&docdate="+docdate+"&valmethod="+valmethod+"&locationId="+locationId+"&inFnName=CLSTKWL"
		+"&projectid="+globalMap.get("PROJECTNAME")+"&username="+globalMap.get("USERNAME");

		}


	    ajaxObj.onreadystatechange = function() {
			if (ajaxObj.readyState == 4  && ajaxObj.status == 200 ) {
										
			 if(ajaxObj.getResponseHeader("REDIRECT") == 'true'){

			   window.location.href = response.getResponseHeader("REDIRECT_PAGE");

			  }
			 else
			 {
                var sessionExists = checkIfSessionExpired(ajaxObj.responseText);
				if(sessionExists)
				{           
					 var responseValue = ajaxObj.responseText;
					
					 globalStock=responseValue.split("^");

					 globalMap.add('OP_STOCKQTY',Number(globalStock[0]) > 0 ? Number(globalStock[0]).toFixed(6) : 0);

					 globalMap.add('OP_STOCKVALUE',Number(globalStock[1]) > 0 ?  Number(globalStock[1]).toFixed(6) : 0);

					 globalMap.add('REC_STOCKQTY',Number(globalStock[2]) > 0 ?  Number(globalStock[2]).toFixed(6) : 0);

					 globalMap.add('REC_STOCKVALUE',Number(globalStock[3]) > 0 ?  Number(globalStock[3]).toFixed(6) : 0);

					 globalMap.add('ISS_STOCKQTY',Number(globalStock[4]) > 0 ?  Number(globalStock[4]).toFixed(6) : 0);

					 globalMap.add('ISS_STOCKVALUE',Number(globalStock[5]) > 0 ?  Number(globalStock[5]).toFixed(6) : 0);


					try
					{	

						 var  crntGridId=globalMap.get("CURRENTOBJ").split(":-:")[1];

						 if(globalMap.get('FROMESAVE')!=1 || (Ext.getCmp(crntGridId)!=undefined && Ext.getCmp(crntGridId).getView().editingPlugin.activeEditor==null)){

						 var  ColObjName=globalMap.get("CURRENTOBJ").split(":-:")[0]; 

						 var  crntGridId=globalMap.get("CURRENTOBJ").split(":-:")[1]; 

						

						 

						 globalMap.add("ALLOWEMPTYFIRING",1);

						 globalMap.add("VALIDATEFIRING",1);

						 globalMap.add("KEYFIRING",1);
						 
						 
					 if(activeColumn != null)
					 {
										 
								// var items=Ext.getCmp(crntGridId+"-grid").getView().headerCt.items;
							 
								// var nextColIdx=getNextVisibleColIdx(items,activeColumn);
									
								// var pos={row:activeRow,column:nextColIdx};
	
								// Ext.getCmp(crntGridId+"-grid").getView().editingPlugin.startEditByPosition(pos);
	
								 var gridCrntObj=Ext.getCmp(crntGridId+"-grid").getView().editingPlugin.grid.columns[activeColumn].field;							 
								 
								 if(gridCrntObj.xtype=='bcscomboremote'){
	
								 gridCrntObj.collapse();
	
								 }
							 }

							 }
							 else{

							 globalMap.removeAtKey('FROMESAVE');

							 }
					
					}
					catch(err)
					{

					}
							 
					return "";
				}
				else
				 {
					 if(bcsMask)
					  bcsMask.hide();
					  Ext.Msg.alert({ 
							title    : '<font color="red"><b>Confirm Message</b></font>',
							msg      : "<b>Your Session has been Expired.Please Click Ok button to logout</b>",
							buttons	 : Ext.Msg.OK,
							closable : false,
							fn       : function (btn, text){
							if (btn == 'ok') 
							{
								 if(devStatus)
								 {
								 location.href = 'j_spring_security_logout?dev=true';
								 }
								else
								 {
								 location.href = 'j_spring_security_logout';
								 }
							}}
						});
					 return;
				 }
							 
			 }
				  
		}
	};

	    ajaxObj.send(param);	
	    
	    if(ajaxObj != null)
		{
	    	 if(ajaxObj.getResponseHeader("REDIRECT") == 'true'){

				   window.location.href = response.getResponseHeader("REDIRECT_PAGE");

				  }
				  else{
                     
						 var responseValue = ajaxObj.responseText;
						

						 globalStock=responseValue.split("^");

						 globalMap.add('OP_STOCKQTY',Number(globalStock[0]) > 0 ? Number(globalStock[0]).toFixed(6) : 0);

						 globalMap.add('OP_STOCKVALUE',Number(globalStock[1]) > 0 ?  Number(globalStock[1]).toFixed(6) : 0);

						 globalMap.add('REC_STOCKQTY',Number(globalStock[2]) > 0 ?  Number(globalStock[2]).toFixed(6) : 0);

						 globalMap.add('REC_STOCKVALUE',Number(globalStock[3]) > 0 ?  Number(globalStock[3]).toFixed(6) : 0);

						 globalMap.add('ISS_STOCKQTY',Number(globalStock[4]) > 0 ?  Number(globalStock[4]).toFixed(6) : 0);

						 globalMap.add('ISS_STOCKVALUE',Number(globalStock[5]) > 0 ?  Number(globalStock[5]).toFixed(6) : 0);

						
						 try
						 {
							
						
						 
						 
									 var  crntGridId=globalMap.get("CURRENTOBJ").split(":-:")[1];

									 if(globalMap.get('FROMESAVE')!=1 || (Ext.getCmp(crntGridId)!=undefined && Ext.getCmp(crntGridId).getView().editingPlugin.activeEditor==null)){

									 var  ColObjName=globalMap.get("CURRENTOBJ").split(":-:")[0]; 

									 var  crntGridId=globalMap.get("CURRENTOBJ").split(":-:")[1]; 

									

								 
									 globalMap.add("ALLOWEMPTYFIRING",1);

								   globalMap.add("VALIDATEFIRING",1);

								   globalMap.add("KEYFIRING",1);

								   
								   if(activeColumn != null)
								   {
									   
									 //  var items=Ext.getCmp(crntGridId+"-grid").getView().headerCt.items;
									   
									  // var nextColIdx=getNextVisibleColIdx(items,activeColumn);
										
									 //	 var pos={row:activeRow,column:nextColIdx};
				
									//	 Ext.getCmp(crntGridId+"-grid").getView().editingPlugin.startEditByPosition(pos);
				
										 var gridCrntObj=Ext.getCmp(crntGridId+"-grid").getView().editingPlugin.grid.columns[activeColumn].field;							 
										 
										 if(gridCrntObj.xtype=='bcscomboremote'){
				
									   gridCrntObj.collapse();
				
										 }
									 
									}

									 }
									 else{

								   globalMap.removeAtKey('FROMESAVE');

									 }


						 }
						 catch (err)
						 {


						 }
						 
                       return "";
						 
				   }
		}
	
	}

// To DO---AJAX
	function checkStockWOLOC(itemid,olditemid,docdate,olddocdate,plusorminus,qty,oldqty){

		 var ajaxObj=null;
			if (typeof XMLHttpRequest != 'undefined')
				{
				ajaxObj= new XMLHttpRequest();
				}
			else if (window.ActiveXObject) {
				var avers = [	"Microsoft.XmlHttp", "MSXML2.XmlHttp",
								"MSXML2.XmlHttp.3.0", "MSXML2.XmlHttp.4.0",
								"MSXML2.XmlHttp.5.0"];
				for (var i = avers.length -1; i >= 0; i--) {
					try {
						ajaxObj = new ActiveXObject(avers[i]);
						break;
					} catch(e) {}
				}
			}
			
			
			
    	if (!ajaxObj)

    	{
		throw new Error('XMLHttp (AJAX) not supported');
		}

    	var url = getURL() +"apps/einvstock/";

    	ajaxObj.open("POST", url, true);

    	ajaxObj.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        ajaxObj.setRequestHeader("X-Requested-With","XMLHttpRequest");
    	var databaseFormat = globalMap.get("DB_FORMAT");
		var getAssociateExtjsFormat = supportDBFmt.get(databaseFormat);

		if(docdate instanceof Date)
		{
			docdate= Ext.Date.format(docdate,getAssociateExtjsFormat);
			
		}
		else
		{
			
				var cdocdate= Ext.Date.parse(docdate, EXTJS_DATE_FORMAT_MAP.get(globalMap.get("DATEFORMAT")));
				docdate = Ext.Date.format(cdocdate,getAssociateExtjsFormat);	 	
		}

        /****************This is For Logger****************/
       var param = "qty="+qty+"&itemid="+itemid+"&docdate="+docdate+"&valmethod=w"+"&inFnName=CHKSTOCKWOL"
	    +"&oldqty="+oldqty+"&olditemid="+olditemid+"&olddocdate="+olddocdate+"&fieldname="+globalMap.get("CURRENTOBJ").split(":-:")[0]+"&projectid="+globalMap.get("PROJECTNAME")+"&username="+globalMap.get("USERNAME");


       ajaxObj.onreadystatechange = function(){

    		if(ajaxObj.readyState == 4  && ajaxObj.status == 200 ){
    				
			 if(ajaxObj.getResponseHeader("REDIRECT") == 'true'){

				 window.location.href = response.getResponseHeader("REDIRECT_PAGE");
			 }
			 else
			 {
    			var sessionExists = checkIfSessionExpired(ajaxObj.responseText);
				if(sessionExists)
				{	           
				 var responseValue = Ext.JSON.decode(ajaxObj.responseText);							

				 var  ColObjName=globalMap.get("CURRENTOBJ").split(":-:")[0]; 

				 var  crntGridId=globalMap.get("CURRENTOBJ").split(":-:")[1]; 

				 var gridStore=Ext.getCmp(crntGridId+"-grid").store;

				 getColObj=Ext.getCmp(ColObjName+"-id");
				 
				 var getNextColObj=Ext.getCmp(getColObj.NF+"-id");

				 if(responseValue=="T"){

					 if( globalMap.get("FILLGRID")!=1){

					 getColObj=Ext.getCmp(ColObjName+"-id");
					 
					 var getNextColObj=Ext.getCmp(getColObj.NF+"-id");

					 if (getNextColObj != undefined){

						if( getNextColObj.editor!=undefined)

							{
							var  getEditorObj=getNextColObj.editor;
							}
						
						else

							{
							var  getEditorObj=getNextColObj.field;
							}
						
						if(getEditorObj.hidden==true || getNextColObj.disable==true)

							{
							evaluateGridExpression(getEditorObj);
							}

								 }
							  
							  }
							  
							}
							else{
                               
							  alert("Stock Insufficient");	 		
					       					        
					          var pos={row:activeRow,column:activeColumn};

					          Ext.getCmp(crntGridId+"-grid").view.editingPlugin.startEditByPosition(pos);

					          Ext.getCmp(crntGridId+"-grid").view.editingPlugin.completeEdit();

					          return false;  														
    
						   }	
				}
				else
				 {
					 if(bcsMask)
					  bcsMask.hide();
					  Ext.Msg.alert({ 
							title    : '<font color="red"><b>Confirm Message</b></font>',
							msg      : "<b>Your Session has been Expired.Please Click Ok button to logout</b>",
							buttons	 : Ext.Msg.OK,
							closable : false,
							fn       : function (btn, text){
							if (btn == 'ok') 
							{
								 if(devStatus)
								 {
								 location.href = 'j_spring_security_logout?dev=true';
								 }
								else
								 {
								 location.href = 'j_spring_security_logout';
								 }
							}}
						});
					 return;
				 }
			}
    				 
    	 }
   };
    
       ajaxObj.send(param);
       
       
       if(ajaxObj != null)
       {
    	   
    	   if(ajaxObj.readyState == 4  && ajaxObj.status == 200 ){

				
				 if(ajaxObj.getResponseHeader("REDIRECT") == 'true'){

				     window.location.href = response.getResponseHeader("REDIRECT_PAGE");
				 }
				 else{
				           
                       var responseValue = Ext.JSON.decode(ajaxObj.responseText);							

						 var  ColObjName=globalMap.get("CURRENTOBJ").split(":-:")[0]; 

						 var  crntGridId=globalMap.get("CURRENTOBJ").split(":-:")[1]; 

						 var gridStore=Ext.getCmp(crntGridId+"-grid").store;

						 getColObj=Ext.getCmp(ColObjName+"-id");
						 
						 var getNextColObj=Ext.getCmp(getColObj.NF+"-id");

						 if(responseValue=="T"){

							 if( globalMap.get("FILLGRID")!=1){

							 getColObj=Ext.getCmp(ColObjName+"-id");
							 
							 var getNextColObj=Ext.getCmp(getColObj.NF+"-id");

							 if (getNextColObj != undefined){

								if( getNextColObj.editor!=undefined)

									{
									var  getEditorObj=getNextColObj.editor;
									}
								
								else

									{
									var  getEditorObj=getNextColObj.field;
									}
								
								if(getEditorObj.hidden==true || getNextColObj.disable==true)

									{
									evaluateGridExpression(getEditorObj);
									}

							 }
						  
						  }
						  
						}
						else{
                         
						  alert("Stock Insufficient");	 		
				       					        
				          var pos={row:activeRow,column:activeColumn};

				          Ext.getCmp(crntGridId+"-grid").view.editingPlugin.startEditByPosition(pos);

				          Ext.getCmp(crntGridId+"-grid").view.editingPlugin.completeEdit();

				          return false;  														

					   }						 
				    }
				 
		     }
    	   
    	   
    	   
    	   
       }

        return false;

	
	}
	
	function checkStockWLOC(itemid,olditemid,docdate,olddocdate,plusorminus,qty,oldqty,locationId)
	{

		 var ajaxObj=null;
			if (typeof XMLHttpRequest != 'undefined')
				{
				ajaxObj= new XMLHttpRequest();
				}
			else if (window.ActiveXObject) {
				var avers = [	"Microsoft.XmlHttp", "MSXML2.XmlHttp",
								"MSXML2.XmlHttp.3.0", "MSXML2.XmlHttp.4.0",
								"MSXML2.XmlHttp.5.0"];
				for (var i = avers.length -1; i >= 0; i--) {
					try {
						ajaxObj = new ActiveXObject(avers[i]);
						break;
					} catch(e) {}
				}
			}
			

    	if (!ajaxObj)

    	{
		throw new Error('XMLHttp (AJAX) not supported');
		}

    	var url = getURL() +"apps/einvstock/";

    	ajaxObj.open("POST", url, true);

    	ajaxObj.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		ajaxObj.setRequestHeader("X-Requested-With","XMLHttpRequest");

    	var databaseFormat = globalMap.get("DB_FORMAT");
		var getAssociateExtjsFormat = supportDBFmt.get(databaseFormat);

		if(docdate instanceof Date)
		{
			docdate= Ext.Date.format(docdate,getAssociateExtjsFormat);
			
		}
		else
		{
				
				var cdocdate= Ext.Date.parse(docdate, EXTJS_DATE_FORMAT_MAP.get(globalMap.get("DATEFORMAT")));
				docdate = Ext.Date.format(cdocdate,getAssociateExtjsFormat);	 	
		}

	    /****************This is For Logger****************/	
       var param = "qty="+qty+"&itemid="+itemid+"&docdate="+docdate+"&valmethod=w"+"&inFnName=CHKSTOCKWOL"
	    +"&oldqty="+oldqty+"&olditemid="+olditemid+"&olddocdate="+olddocdate+"&locationid="+locationId+"&fieldname="+globalMap.get("CURRENTOBJ").split(":-:")[0]+"&projectid="+globalMap.get("PROJECTNAME")+"&username="+globalMap.get("USERNAME");

		
       ajaxObj.onreadystatechange = function(){

    		if(ajaxObj.readyState == 4  && ajaxObj.status == 200  ){

    				
    				 if(ajaxObj.getResponseHeader("REDIRECT") == 'true'){

    				     window.location.href = response.getResponseHeader("REDIRECT_PAGE");
    				 }
					 else
					 {
					   var sessionExists = checkIfSessionExpired(ajaxObj.responseText);
					   if(sessionExists)
						{    
							 var responseValue = Ext.JSON.decode(ajaxObj.responseText);							

							 var  ColObjName=globalMap.get("CURRENTOBJ").split(":-:")[0]; 

							 var  crntGridId=globalMap.get("CURRENTOBJ").split(":-:")[1]; 

							 var gridStore=Ext.getCmp(crntGridId+"-grid").store;

							 getColObj=Ext.getCmp(ColObjName+"-id");
							 
							 var getNextColObj=Ext.getCmp(getColObj.NF+"-id");

							 if(responseValue=="T"){

								 if( globalMap.get("FILLGRID")!=1){

								 getColObj=Ext.getCmp(ColObjName+"-id");
								 
								 var getNextColObj=Ext.getCmp(getColObj.NF+"-id");

								 if (getNextColObj != undefined){

									if( getNextColObj.editor!=undefined)

										{
										var  getEditorObj=getNextColObj.editor;
										}
									
									else

										{
										var  getEditorObj=getNextColObj.field;
										}
									
									if(getEditorObj.hidden==true || getNextColObj.disable==true)

										{
										evaluateGridExpression(getEditorObj);
										}

								 }
							  
							   }					
							}
							else{
                               
							  alert("Stock Insufficient");	 		
					       					        
					          var pos={row:activeRow,column:activeColumn};

					          Ext.getCmp(crntGridId+"-grid").view.editingPlugin.startEditByPosition(pos);

					          Ext.getCmp(crntGridId+"-grid").view.editingPlugin.completeEdit();

					          return false;  														
    
						   }
						}
						else
						 {
							 if(bcsMask) 
								 bcsMask.hide();
							  Ext.Msg.alert({ 
									title    : '<font color="red"><b>Confirm Message</b></font>',
									msg      : "<b>Your Session has been Expired.Please Click Ok button to logout</b>",
									buttons	 : Ext.Msg.OK,
									closable : false,
									fn       : function (btn, text){
									if (btn == 'ok') 
									{
										 if(devStatus)
										 {
										 location.href = 'j_spring_security_logout?dev=true';
										 }
										else
										 {
										 location.href = 'j_spring_security_logout';
										 }
									}}
								});
							 return;
						 }
					 }
    				 
    		     }
    		 };
    
       ajaxObj.send(param);
       
       
       if(ajaxObj != null)
       {
    	   
    	   if(ajaxObj.readyState == 4  && ajaxObj.status == 200  ){

				
				 if(ajaxObj.getResponseHeader("REDIRECT") == 'true'){

				     window.location.href = response.getResponseHeader("REDIRECT_PAGE");
				 }
				 else{
				           
                       var responseValue = Ext.JSON.decode(ajaxObj.responseText);							

						 var  ColObjName=globalMap.get("CURRENTOBJ").split(":-:")[0]; 

						 var  crntGridId=globalMap.get("CURRENTOBJ").split(":-:")[1]; 

						 var gridStore=Ext.getCmp(crntGridId+"-grid").store;

						 getColObj=Ext.getCmp(ColObjName+"-id");
						 
						 var getNextColObj=Ext.getCmp(getColObj.NF+"-id");

						 if(responseValue=="T"){

							 if( globalMap.get("FILLGRID")!=1){

							 getColObj=Ext.getCmp(ColObjName+"-id");
							 
							 var getNextColObj=Ext.getCmp(getColObj.NF+"-id");

							 if (getNextColObj != undefined){

								if( getNextColObj.editor!=undefined)

									{
									var  getEditorObj=getNextColObj.editor;
									}
								
								else

									{
									var  getEditorObj=getNextColObj.field;
									}
								
								if(getEditorObj.hidden==true || getNextColObj.disable==true)

									{
									evaluateGridExpression(getEditorObj);
									}

							 }
						  
						   }					
						}
						else{
                         
						  alert("Stock Insufficient");	 		
				       					        
				          var pos={row:activeRow,column:activeColumn};

				          Ext.getCmp(crntGridId+"-grid").view.editingPlugin.startEditByPosition(pos);

				          Ext.getCmp(crntGridId+"-grid").view.editingPlugin.completeEdit();

				          return false;  														

					   }						 
				    }
				 
		     }

    	   
    	   
    	   
       }
    

        return false;
		
	}

	function getStockAge(Itemid, Date, PeriodStr){
		
		 var ajaxObj=null;
			if (typeof XMLHttpRequest != 'undefined')
				{
				ajaxObj= new XMLHttpRequest();
				}
			else if (window.ActiveXObject) {
				var avers = [	"Microsoft.XmlHttp", "MSXML2.XmlHttp",
								"MSXML2.XmlHttp.3.0", "MSXML2.XmlHttp.4.0",
								"MSXML2.XmlHttp.5.0"];
				for (var i = avers.length -1; i >= 0; i--) {
					try {
						ajaxObj = new ActiveXObject(avers[i]);
						break;
					} catch(e) {}
				}
			}
			

		if (!ajaxObj)

		{
		throw new Error('XMLHttp (AJAX) not supported');
		}

		var url = getURL() +"apps/einvstock/";

		ajaxObj.open("POST", url, true);

		ajaxObj.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		ajaxObj.setRequestHeader("X-Requested-With","XMLHttpRequest");

		var databaseFormat = globalMap.get("DB_FORMAT");
		var getAssociateExtjsFormat = supportDBFmt.get(databaseFormat);

		if(docdate instanceof Date)
		{
			docdate= Ext.Date.format(docdate,getAssociateExtjsFormat);
			
		}
		else
		{
				
				var cdocdate= Ext.Date.parse(docdate, EXTJS_DATE_FORMAT_MAP.get(globalMap.get("DATEFORMAT")));
				docdate = Ext.Date.format(cdocdate,getAssociateExtjsFormat);	 	
		}

		 /****************This is For Logger****************/
	    var param = "qty="+qty+"&itemid="+itemid+"&docdate="+docdate+"&valmethod="+valmethod+"&locationId="+locationId+"&inFnName=GCRWLOC"+"&fieldname="+globalMap.get("CURRENTOBJ").split(":-:")[0]+"&projectid="+globalMap.get("PROJECTNAME")+"&username="+globalMap.get("USERNAME");

		
	    ajaxObj.onreadystatechange = function() {
			
	    	if (ajaxObj.readyState == 4  &&  ajaxObj.status == 200 ) {


					
					 if(ajaxObj.getResponseHeader("REDIRECT") == 'true'){

					  window.location.href = response.getResponseHeader("REDIRECT_PAGE");

					   }
					   else
					   {
						var sessionExists = checkIfSessionExpired(ajaxObj.responseText);
						if(sessionExists)
						{
					        responseValue = Ext.JSON.decode(ajaxObj.responseText);

							 var  ColObjName=globalMap.get("CURRENTOBJ").split(":-:")[0]; 

							 var  crntGridId=globalMap.get("CURRENTOBJ").split(":-:")[1]; 

							 var gridStore=Ext.getCmp(crntGridId+"-grid").store;

							 gridStore.data.items[activeRow].data[ColObjName]=responseValue;

							 getColObj=Ext.getCmp(ColObjName+"-id");
							 
							 var getNextColObj=Ext.getCmp(getColObj.NF+"-id");

							 if (getNextColObj != undefined){

								if( getNextColObj.editor!=undefined)

									{
									var  getEditorObj=getNextColObj.editor;
									}
								
								else

									{
									var  getEditorObj=getNextColObj.field;
									}
								
								if(getEditorObj.hidden==true || getNextColObj.disable==true)

									{
									evaluateGridExpression(getEditorObj);
									}

							 }	
						}
						else
						   {
							 if(bcsMask)
							 bcsMask.hide();
							  Ext.Msg.alert({ 
									title    : '<font color="red"><b>Confirm Message</b></font>',
									msg      : "<b>Your Session has been Expired.Please Click Ok button to logout</b>",
									buttons	 : Ext.Msg.OK,
									closable : false,
									fn       : function (btn, text){
									if (btn == 'ok') 
									{
										 if(devStatus)
										 {
										 location.href = 'j_spring_security_logout?dev=true';
										 }
										else
										 {
										 location.href = 'j_spring_security_logout';
										 }
									}}
								});
							 return;
						   }
					}
					
			   }
		  };

	    ajaxObj.send(param);
	    
	    if(ajaxObj != null)
	    {
	    	
	    	if (ajaxObj.readyState == 4  &&  ajaxObj.status == 200 ) {


				
				 if(ajaxObj.getResponseHeader("REDIRECT") == 'true'){

				  window.location.href = response.getResponseHeader("REDIRECT_PAGE");

				   }
				   else{

				        responseValue = Ext.JSON.decode(ajaxObj.responseText);

						 var  ColObjName=globalMap.get("CURRENTOBJ").split(":-:")[0]; 

						 var  crntGridId=globalMap.get("CURRENTOBJ").split(":-:")[1]; 

						 var gridStore=Ext.getCmp(crntGridId+"-grid").store;

						 gridStore.data.items[activeRow].data[ColObjName]=responseValue;

						 getColObj=Ext.getCmp(ColObjName+"-id");
						 
						 var getNextColObj=Ext.getCmp(getColObj.NF+"-id");

						 if (getNextColObj != undefined){

							if( getNextColObj.editor!=undefined)

								{
								var  getEditorObj=getNextColObj.editor;
								}
							
							else

								{
								var  getEditorObj=getNextColObj.field;
								}
							
							if(getEditorObj.hidden==true || getNextColObj.disable==true)

								{
								evaluateGridExpression(getEditorObj);
								}

						 }					            
				    }
				
		   }
	    	
	    	
	    	
	    	
	    	
	    }

	      return false;
	}

	function getStockValueWOLOC(itemId,docdate,qty,valmethod){
       
		
		 var ajaxObj=null;
			if (typeof XMLHttpRequest != 'undefined')
				{
				ajaxObj= new XMLHttpRequest();
				}
			else if (window.ActiveXObject) {
				var avers = [	"Microsoft.XmlHttp", "MSXML2.XmlHttp",
								"MSXML2.XmlHttp.3.0", "MSXML2.XmlHttp.4.0",
								"MSXML2.XmlHttp.5.0"];
				for (var i = avers.length -1; i >= 0; i--) {
					try {
						ajaxObj = new ActiveXObject(avers[i]);
						break;
					} catch(e) {}
				}
			}

    	if (!ajaxObj)

    	{
		throw new Error('XMLHttp (AJAX) not supported');
		}

    	var url = getURL() +"apps/einvstock/";

    	ajaxObj.open("POST", url, true);

    	ajaxObj.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		ajaxObj.setRequestHeader("X-Requested-With","XMLHttpRequest");

    	var databaseFormat = globalMap.get("DB_FORMAT");
		var getAssociateExtjsFormat = supportDBFmt.get(databaseFormat);

		if(docdate instanceof Date)
		{
			docdate= Ext.Date.format(docdate,getAssociateExtjsFormat);
			
		}
		else
		{
				
				var cdocdate= Ext.Date.parse(docdate, EXTJS_DATE_FORMAT_MAP.get(globalMap.get("DATEFORMAT")));
				docdate = Ext.Date.format(cdocdate,getAssociateExtjsFormat);	 	
		}
    	
        var param = "qty="+qty+"&itemid="+itemId+"&docdate="+docdate+"&valmethod="+valmethod+"&inFnName=GSTOCKWOL"+"&fieldname="+globalMap.get("CURRENTOBJ").split(":-:")[0]+"&projectid="+globalMap.get("PROJECTNAME")+"&username="+globalMap.get("USERNAME");

		
        ajaxObj.onreadystatechange = function() {

    		if (ajaxObj.readyState == 4  && ajaxObj.status == 200 ) {

			 if(ajaxObj.getResponseHeader("REDIRECT") == 'true'){

			  window.location.href = response.getResponseHeader("REDIRECT_PAGE");

			  }  
			 else
			  {
				 var sessionExists = checkIfSessionExpired(ajaxObj.responseText);
				 if(sessionExists)
				 {
					 responseValue = Ext.JSON.decode(ajaxObj.responseText);

					 var  ColObjName=globalMap.get("CURRENTOBJ").split(":-:")[0]; 

					 var  crntGridId=globalMap.get("CURRENTOBJ").split(":-:")[1]; 

					 var gridStore=Ext.getCmp(crntGridId+"-grid").store;

					 gridStore.data.items[activeRow].data[ColObjName]=responseValue;

					 getColObj=Ext.getCmp(ColObjName+"-id");
					 
					 var getNextColObj=Ext.getCmp(getColObj.NF+"-id");

					 if (getNextColObj != undefined){

						if( getNextColObj.editor!=undefined)

							{
							var  getEditorObj=getNextColObj.editor;
							}
						
						else

							{
							var  getEditorObj=getNextColObj.field;
							}
						
						if(getEditorObj.hidden==true || getNextColObj.disable==true)

							{
							evaluateGridExpression(getEditorObj);
							}
					 }
				 }
				 else
				  {
					 if(bcsMask)
					 bcsMask.hide();
					  Ext.Msg.alert({ 
							title    : '<font color="red"><b>Confirm Message</b></font>',
							msg      : "<b>Your Session has been Expired.Please Click Ok button to logout</b>",
							buttons	 : Ext.Msg.OK,
							closable : false,
							fn       : function (btn, text){
							if (btn == 'ok') 
							{
								 if(devStatus)
								 {
								 location.href = 'j_spring_security_logout?dev=true';
								 }
								else
								{
								 location.href = 'j_spring_security_logout';
								}
							}}
						});
					 return;
				  }
    		 }
    			   
    	}
    };

        ajaxObj.send(param);
        
        if(ajaxObj != null)
        {
        	
        	if (ajaxObj.readyState == 4  && ajaxObj.status == 200 ) {



				
				 if(ajaxObj.getResponseHeader("REDIRECT") == 'true'){

				  window.location.href = response.getResponseHeader("REDIRECT_PAGE");

				  }
				  
				 else{
						 responseValue = Ext.JSON.decode(ajaxObj.responseText);

						 var  ColObjName=globalMap.get("CURRENTOBJ").split(":-:")[0]; 

						 var  crntGridId=globalMap.get("CURRENTOBJ").split(":-:")[1]; 

						 var gridStore=Ext.getCmp(crntGridId+"-grid").store;

						 gridStore.data.items[activeRow].data[ColObjName]=responseValue;

						 getColObj=Ext.getCmp(ColObjName+"-id");
						 
						 var getNextColObj=Ext.getCmp(getColObj.NF+"-id");

						 if (getNextColObj != undefined){

							if( getNextColObj.editor!=undefined)

								{
								var  getEditorObj=getNextColObj.editor;
								}
							
							else

								{
								var  getEditorObj=getNextColObj.field;
								}
							
							if(getEditorObj.hidden==true || getNextColObj.disable==true)

								{
								evaluateGridExpression(getEditorObj);
								}
					    }    				
				   }
			   
		   }
        	
        	
        	
        }
			
			return false;
	}
	
	function getStockValueWLOC(itemId,docdate,qty,valmethod,locationId){
		
		 var ajaxObj=null;
			if (typeof XMLHttpRequest != 'undefined')
				{
				ajaxObj= new XMLHttpRequest();
				}
			else if (window.ActiveXObject) {
				var avers = [	"Microsoft.XmlHttp", "MSXML2.XmlHttp",
								"MSXML2.XmlHttp.3.0", "MSXML2.XmlHttp.4.0",
								"MSXML2.XmlHttp.5.0"];
				for (var i = avers.length -1; i >= 0; i--) {
					try {
						ajaxObj = new ActiveXObject(avers[i]);
						break;
					} catch(e) {}
				}
			}

		if (!ajaxObj)

		{
		throw new Error('XMLHttp (AJAX) not supported');
		}

		var url = getURL() +"apps/einvstock/";

		ajaxObj.open("POST", url, true);

		ajaxObj.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		ajaxObj.setRequestHeader("X-Requested-With","XMLHttpRequest");

		var databaseFormat = globalMap.get("DB_FORMAT");

		var getAssociateExtjsFormat = supportDBFmt.get(databaseFormat);

		if(docdate instanceof Date)
		{
			docdate= Ext.Date.format(docdate,getAssociateExtjsFormat);
			
		}
		else
		{
				var databaseFormat = globalMap.get("DB_FORMAT");
				var getAssociateExtjsFormat = supportDBFmt.get(databaseFormat);
				var cdocdate= Ext.Date.parse(docdate, EXTJS_DATE_FORMAT_MAP.get(globalMap.get("DATEFORMAT")));
				docdate = Ext.Date.format(cdocdate,getAssociateExtjsFormat);	 	
		}

		/****************This is For Logger****************/
	    var param = "itemid="+itemId+"&docdate="+docdate+"&valmethod="+valmethod+"&locationId="+locationId+"&inFnName=GSTOCKWL"+"&qty="+qty+"&projectid="+globalMap.get("PROJECTNAME")+"&username="+globalMap.get("USERNAME");

	    
	    ajaxObj.onreadystatechange = function() {

			if (ajaxObj.readyState == 4  &&  ajaxObj.status == 200 ) {

				if(ajaxObj.getResponseHeader("REDIRECT") == 'true'){

				   window.location.href = response.getResponseHeader("REDIRECT_PAGE");
				}
				else
				{
				  var sessionExists = checkIfSessionExpired(ajaxObj.responseText);
				  if(sessionExists)
				  {
					 var responseValue = ajaxObj.responseText;

					 var  ColObjName=globalMap.get("CURRENTOBJ").split(":-:")[0]; 

					 var  crntGridId=globalMap.get("CURRENTOBJ").split(":-:")[1]; 

					 var gridStore=Ext.getCmp(crntGridId+"-grid").store;

					 gridStore.data.items[activeRow].data[ColObjName]=Number(responseValue).toFixed(2);

					  if(globalMap.get('FROMESAVE')!=1){

					 }
					 else{

					 globalMap.removeAtKey('FROMESAVE');

					 }
					 
					 return responseValue;
				  }
				  else
				  {
					  if(bcsMask)
					  bcsMask.hide();
					  Ext.Msg.alert({ 
								title    : '<font color="red"><b>Confirm Message</b></font>',
								msg      : "<b>Your Session has been Expired.Please Click Ok button to logout</b>",
								buttons	 : Ext.Msg.OK,
								closable : false,
								fn       : function (btn, text){
								if (btn == 'ok') 
								{
									 if(devStatus)
									 {
									 location.href = 'j_spring_security_logout?dev=true';
									 }
									else
									 {
									 location.href = 'j_spring_security_logout';
									 }
								}}
							});
					 return;
				  }
				}
			        
			}
		};

	    ajaxObj.send(param);
	    
	    if(ajaxObj != null)
	    {
	    	
	    	if (ajaxObj.readyState == 4  &&  ajaxObj.status == 200 ) {

				
				
				if(ajaxObj.getResponseHeader("REDIRECT") == 'true'){

				   window.location.href = response.getResponseHeader("REDIRECT_PAGE");
				}
				else{

						 var responseValue = ajaxObj.responseText;

						 var  ColObjName=globalMap.get("CURRENTOBJ").split(":-:")[0]; 

						 var  crntGridId=globalMap.get("CURRENTOBJ").split(":-:")[1]; 

						 var gridStore=Ext.getCmp(crntGridId+"-grid").store;

						 gridStore.data.items[activeRow].data[ColObjName]=Number(responseValue).toFixed(2);

						  if(globalMap.get('FROMESAVE')!=1){

						 }
						 else{

                         globalMap.removeAtKey('FROMESAVE');

						 }
						 
						 return responseValue;

				
				   }
		        
		   }
	    	
	    	
	    	
	    	
	    }

		return false;
	}
/** ************************************* */
function getMinRowIndex(records, field) {

	var recLen = records.length;
	var min, value;
	var rowI;
	if (recLen > 0) {
		min = records[0].data[field];
		if (min != null) {
			rowI = 0;
		} else {
			return -1;
		}

	}
	for (var i = 1; i < recLen; ++i) {
		value = records[i].data[field];
		if (min > value) {
			min = value;
			rowI = i;
		}
	}
	return rowI + 1;
}

function getMaxRowIndex(records, field) {
	var recLen = records.length;
	var min, value;
	var rowI;
	if (recLen > 0) {
		min = records[0].data[field];
		if (min != null) {
			rowI = 0;
		} else {
			return -1;
		}
	}
	for (var i = 1; i < recLen; ++i) {
		value = records[i].data[field];
		if (min < value) {
			min = value;
			rowI = i;
		}
	}
	return rowI + 1;
}

 function setPropertyForCtObj(compObj,property,value){

	
  
			if(property.toUpperCase() === "READONLY")
			{
				 try
				 {
				 
						 if (value.toUpperCase() === "F")
						 {
						 	if(compObj.xtype === "bcsradiobox" || compObj.xtype === "bcscheckbox" ){
						 		var getValue2 = compObj.items;
								for (var d = 0; d < getValue2.items.length; d++) {
										getValue2.items[d].enable(true);
										if(compObj.xtype === "bcsradiobox" && compObj.expression !== ""){
											GetExprForFirstVisibleFields(compObj);
											}else if (compObj.xtype === "bcsradiobox" && !compObj.allowEmpty){
											getValue2.items[0].setValue(true);
										}
									}

						 	}else{
								compObj.setFieldStyle('background-color: #FFFFFF; background-image: none;');
								compObj.setReadOnly(false);
						 	}
						 }
						 else
						 {
						 	if(compObj.xtype === "bcsradiobox" || compObj.xtype === "bcscheckbox" ){
						 		var getValue2 = compObj.items;
								for (var d = 0; d < getValue2.items.length; d++) {

										getValue2.items[d].setValue(false);
										getValue2.items[d].disable(true);
									}
							}else{
							compObj.setFieldStyle('background-color: #ddd; background-image: none;');
							compObj.setReadOnly(true);
						 	}
						 }
						 
				 }
				 catch(err)
				 {
					 
					 Ext.Msg.alert("<Font Color = 'red'><b>Warning</b></Font>","Cannot Set ReadOnly for Component Name" +"<b>" +compObj.name + "</b>" + "and Component Type is "+ "<b>"+compObj.xtype +"</b>");
					 return;
				 }
				
			}
			else if (property.toUpperCase() === "VISIBLE")
			{
				if(compObj.compName === "buttonGroup"){
					if(value.toUpperCase()=="F"){
					compObj.setVisible(false);
					compObj.hidden = true;
					}else{
						compObj.setVisible(true);
						compObj.hidden = false;
					}
				}else{
				
				if (value.toUpperCase()=="F")
				{
				  compObj.setVisible(false);

				  compObj.hidden = true;

				  globalMap.add(compObj.name,compObj.hidden);

				  Ext.getCmp(compObj.id).hidden = true;
				  
				}
				else
				{
				   compObj.setVisible(true);

				   compObj.hidden = false;

				   globalMap.add(compObj.name,compObj.hidden);

				   Ext.getCmp(compObj.id).hidden = false;
				  
				}
				}
			}
		  	else if (property.toUpperCase()=="SUGGESTIVE")
			{

				if (value.toUpperCase()=="F")
				{
					compObj.setSuggestive(false);
				}
				else
				{
					compObj.setSuggestive(true);
				}
			}
			else if (property.toUpperCase()=="EXPRESSION")
			{
				    compObj.setExpression(value);
			}
			else if(property.toUpperCase()=="VALIDATEEXPRESSION")
			{
				   compObj.setValidateExpression(value);
			}
			// for radiofield
			else if (property.toUpperCase() == "CHECKED") {
				var getInputValue = compObj.items;
				for (var a = 0; a < getInputValue.items.length; a++) {
					if (getInputValue.items[a].inputValue === value) {
						//getInputValue.items[a].focus();
						getInputValue.items[a].setValue(true);
					}
				}
			}
			// for radiofield
			else if (property.toUpperCase() == "UNCHECKED") {
				var getValue = compObj.items;
				for (var b = 0; b < getValue.items.length; b++) {
					if (getValue.items[b].inputValue === value) {
						//getValue.items[b].focus();
						getValue.items[b].setValue(false);
					}
				}
			}
			// for checkboxfield
			else if (property.toUpperCase() == "ISCHECKED") {
				var getInputValue1 = compObj.items;
				for (var c = 0; c < getInputValue1.items.length; c++) {
					if (getInputValue1.items[c].inputValue === value) {
						//getInputValue1.items[c].focus();
						getInputValue1.items[c].setValue(true);
					}
				}
			}
			// for checkboxfield
			else if (property.toUpperCase() == "ISUNCHECKED") {
				var getValue1 = compObj.items;
				for (var d = 0; d < getValue1.items.length; d++) {
					if (getValue1.items[d].inputValue === value) {
						//getValue1.items[d].focus();
						getValue1.items[d].setValue(false);
					}
				}
			}
			//for disable checkBox and radioBox Buttons
			else if (property.toUpperCase() == "DISABLE") {
				var getValue2 = compObj.items;
				for (var d = 0; d < getValue2.items.length; d++) {

					if (getValue2.items[d].inputValue === value.toString()) {
						
						getValue2.items[d].setValue(false);
						getValue2.items[d].disable(true);
					}else{
						getValue2.items[d].enable(true);
					}
				}
			}

		checkForFirstVisibleFieldInOnformLoad(compObj,property,value);	
			   
   }
   
   
   function setPropertyGridField(compObj,property,value,editorOrField){

	     
         var activeGridObj=Ext.getCmp(editorOrField.gridId+"-grid");
			 var gridColumns=activeGridObj.columns;

			 for (var c=0;c < gridColumns.length ; c++ )
			 {
				  if(gridColumns[c].initialConfig.header==compObj.initialConfig.header){
					  break;
				  }

			 } 

		 if (property.toUpperCase()=="VISIBLE")
			{
				if (value.toUpperCase()=="T")
				{
					activeGridObj.columns[c].show();

					activeGridObj.columns[c].getEditor().hidden = false;
				}
				else if(value.toUpperCase()=="F")
				{
				   activeGridObj.columns[c].hide();

				   activeGridObj.columns[c].getEditor().hidden = true;

				}

			}
         else if(property.toUpperCase()=="READONLY"){

            if(value.toUpperCase()=="T")
			{
                 activeGridObj.columns[c]['disable']=true;

             activeGridObj.columns[c].getEditor().setReadOnly(true);
			 activeGridObj.on('beforeedit', function(editor, e) {
					
					 if(e.colIdx==c){
					 
					   e.column.getEditor().setReadOnly(true);
					 }
					});
			 }
			 else if(value.toUpperCase()=="F"){

			    activeGridObj.columns[c]['disable']=false;
				 activeGridObj.columns[c].getEditor().setReadOnly(false);
				 activeGridObj.on('beforeedit', function(editor, e) {
				 if(e.colIdx==c){
					 
					   e.column.getEditor().setReadOnly(false);
					 }
					});

			 }
		 
		 
		 }

		 var gridCompObj = activeGridObj.columns[c].getEditor();
				  
		checkForFirstVisibleFieldInOnformLoad(gridCompObj,property,value);		 
            
   }
   
   
function doAllowFrameChange(dc, allow) {

	// When true make readOnly false  owise readOnly true
	
	var dcItemsLen = dc.items.items.length;
	var gridColItems = dc.items.items[0].columns;
	if (gridColItems != undefined) {

		var colLen = gridColItems.length;
		var storeObj = dc.items.items[0].store;
		var rowCount = storeObj.getCount();
		for (row = 0; row < rowCount; row++) {

			if (allow.toUpperCase() == "T") {
				storeObj.getAt(row).set("readonly", false);

			} else if (allow.toUpperCase() == "F") {

				storeObj.getAt(row).set("readonly", true);

			} else {
				return false;
			}

		}

		return true;

	} else {
		for (var c = 0; c < dcItemsLen; c++) {
			if (allow.toUpperCase() == "T") {
                if(!Ext.getCmp(dc.items.items[c].name+"-id").hidden && !Ext.getCmp(dc.items.items[c].name+"-id").readOnly )
				{
				if(Ext.getCmp(dc.items.items[c].name+"-id").setReadOnly)
					{
					Ext.getCmp(dc.items.items[c].name+"-id").setReadOnly(false);
					}
				}
			} else if (allow.toUpperCase() == "F") {
				if(Ext.getCmp(dc.items.items[c].name+"-id").setReadOnly)
					{
					Ext.getCmp(dc.items.items[c].name+"-id").setReadOnly(true);
					}

			} else {
				return false;
			}
		}

		return true;
	}

}

function gridRecalculate(targetGridID, frameno, ctEform) {

	var targetGridstore = Ext.getCmp(targetGridID).store;
	var gridFields = targetGridstore.model.getFields();
	var columnLength = gridFields.length;
	var storeCount = targetGridstore.count();
	var totalAmount = 0;

	for (var rw = 0; rw < storeCount; rw++) {
		var factiveRow = rw;
		ActiveRow = factiveRow + 1;
		globalMap.add("ACTIVEROW", ActiveRow);
		for (var cl = 0; cl < columnLength; cl++) {
            
			var getColObj =  null;
			activeColumn = null;

			var vrow = "validrow" + frameno;

			var gvvalue = targetGridstore.data.items[factiveRow].data[ctEform + "-" + vrow];

				if (gvvalue === null || gvvalue === "A" || gvvalue === "B" || gvvalue === "C") {
					gvvalue = "T";

				}

				if (Ext.getCmp(ctEform + "-" + vrow + '-id')) {
					if (!gvvalue) {
						var vobj = Ext.getCmp(ctEform + "-" + vrow + '-id');
							gvvalue = GridExprRow(vobj.getEditor(), factiveRow);
					}

				}

				if (gvvalue === "T") {
					var columnName = gridFields[cl].name;
					var columnObj = Ext.getCmp(columnName + "-id");
					if (columnObj) {
						if (columnObj.editor)
							{
							  getColObj = columnObj.editor;
							}
						else if (columnObj.field)
							{
							  getColObj = columnObj.field;
							}

						var Hdn = getColObj.hidden;
						var Expr = getColObj.expression;
						var drOnly = getColObj.readOnly;
						var dtype = getColObj.dataType;
						var gridStore = targetGridstore;
						var SQL = getColObj.sql;
						var Suggestive = getColObj.suggestive;
						var dmoe = getColObj.modeOfEntry;
						globalMap.add("CURRENTOBJ", getColObj.name + ":-:" + getColObj.gridId);

						if (Expr !== '') {

							if (dmoe === 'From' && Suggestive === true)
								{
								continue;
								}

							if (dmoe === 'FL')
								{
								continue;
								}

							if (dmoe === 'TBE' && Suggestive === true)
								{
								continue;
								}
								

							if (!SQL) {
								if (dmoe === 'TBE' && Suggestive === false)
									{
									continue;
									}

								var GridValid = GridExprRow(getColObj, factiveRow);
								console.log(columnObj.text);
								console.log(GridValid);
								if (dtype == 'D') {
									var databaseFormat = globalMap.get("DB_FORMAT");
									var getAssociateExtjsFormat = supportDBFmt
										.get(databaseFormat);

									if (GridValid instanceof Date)

										{
										gridStore.data.items[factiveRow].data[getColObj.name] = Ext.Date.format(GridValid, "d/m/Y");
										}
									else
										{
										gridStore.data.items[factiveRow].data[getColObj.name] = GridValid;
										}

								} else {

									gridStore.data.items[factiveRow].data[getColObj.name] = GridValid;
								}

								try {
									Ext.getCmp(targetGridID).getView().refreshNode(factiveRow);
								} catch (e) {}
							} else {}
						}
					}
				} else {
					break;
				}

				if (getColObj && getColObj.xtype === "bcsnumberfield") {
					if (!gridStore.data.items[factiveRow].data[getColObj.name]) {
						gridStore.data.items[factiveRow].set(columnName, 0);
					} else {
						totalAmount = parseFloat(gridStore.data.items[factiveRow].data[getColObj.name]);
						gridStore.data.items[factiveRow].set(columnName, totalAmount);
					}
				}
		}

	}

}

/** ************************************************************************** */

function addtodate(val, toBeAdd) {
    
	if(val != null  && val != "")
	{
		var gvnDate = new Date(val);
		var date = new Date(new Date(gvnDate).setDate(gvnDate.getDate()+toBeAdd)).toISOString();
		return date;	
	}	
}

function addtomonth(val, toBeAdd) {
	if(val != null  && val != "")
	{
		var gvnDate = new Date(val);
		var date = new Date(new Date(gvnDate).setMonth(gvnDate.getMonth()+toBeAdd)).toISOString();
		return date;	
	}
	
	
}

function YearOfDate(val) {

 if(val != null  && val != "")
 {
	var gvnDate = new Date(val);
	return gvnDate.getFullYear();
 }
	
}

function LastDayOfMonth(val) {
	var lastDayOfMonth = new Date(val.getFullYear(), val.getMonth() + 1, 0);
	return lastDayOfMonth;
}

function MonthOfDate(val) {
	var gvnDate =  new Date(val);
	return gvnDate.getMonth()+1;

}

function DaysElapsed(fdate, tdate) {

	//return Ext.Date.dateAndTimeFn.getDaysElaspsed(fdate, tdate);
	var fromDate = new Date(fdate);
	var toDate = new Date(tdate);
	var elapsedSeconds = new Date();
	elapsedSeconds = toDate - fromDate; //in Seconds
	var elapsedDate = Math.ceil(elapsedSeconds/(1000*3600*24));
	return elapsedDate;
}

function SDayofDate(givenDate) {

	if (givenDate != null) {

		return Ext.Date.dateAndTimeFn.getDayName(givenDate);

	}

}

function DayofDate(givenDate) {

	if (givenDate != null)
	{
		var val = new Date(givenDate);
		return val.getDay();
	}
	else
	{
		return null;
	}

}

function AddtoTime(time, timeToAdd) {

	if (time != null && timeToAdd != null) {

		return Ext.Date.dateAndTimeFn.getAddToTime(time, timeToAdd);

	}

	return null;
}

function timeElaspsed(ftime, ttime) {
	if (ftime != null && ttime != null) {
		return Ext.Date.dateAndTimeFn.getTimeElaspsed(ftime, ttime);
	}
	return null;

}

function isEmptyValue(value, dataType) {

	var number;

	if (dataType.toUpperCase() == "C"  || dataType.toUpperCase() == "D" ) {

		    number = value;
		    
		    if(number == null)
		      {
			  number ="";
			  }
		 
			if((number != null && number.length == 0) || number ==""  || number == "null")
			{
               return "T";

			}else
			{
			   return "F";
			}
	}

	else if (dataType.toUpperCase() == "N") {

		/*
		 * if (value != null) {
		 * 
		 * if (value > 0) {
		 * 
		 * number = value.toString(); } } else {
		 * 
		 * number = ""; }
		 */
		if(value ==0 || value > 0){
		
		   return "F";

		}else{
		  
		    return "T";
		
		}
	}

	/*
	 * GetBoolean = (!number || 0 === number.length)
	 * 
	 * if (GetBoolean == true) {
	 * 
	 * return "T";
	 *  } else { return "F";
	 *  }
	 */

}

function isEmpty(value) {

	/*
	 * GetBoolean = (!value || 0 === value.length)
	 * 
	 * if (GetBoolean == true) {
	 * 
	 * return "T";
	 *  } else { return "F";
	 *  }
	 */

	if (value == null || value == "" || value.length == 0)
	{

        return "T";

	}else{

	    return "F";
	
	}

}

function ValidEncodeDate(GnYear, GnMonth, GnDate) {

	return Ext.Date.dateAndTimeFn.getValidEncodeDate(GnYear, GnMonth, GnDate);

}

function formattedDate(val, fmtVal) {

	if (val != null && fmtVal != null)
		{
		return Ext.Date.format(val, fmtVal);
		}
	else
		{
		return null;
		}
}

function cMonthYear(val) {
	var gvnDate = new Date(val);
	var monthInt = gvnDate.getMonth();
	return MONTH_NAMES[monthInt];
}

function MakeDate(month, date, year) {
	//var universalFormat = "MM/DD/YYYY";
	//var dtFormat = EXTJS_DATE_FORMAT_MAP.get(universalFormat);
	if (date <= 31 && month <= 12) {
		if (date > 0 && month > 0 && year > 0) {
			var dateString = month + "/" + date + "/" + year;
			// var dateString = 11/17/2017";
			// var myDate = new Date(dateString);
			// return Ext.Date.format(myDate, dtFormat);
			return dateString;
		}
	}
    else
    {
	        alert("Invalid Date");

    }
	return null;
}
function MandY(val) {

	var gvndate = new Date(val);
	var mm = gvndate.getMonth();
	var yyyy = gvndate.getFullYear();
	var mm_yyyy = (mm+1)+"_"+yyyy
	return mm_yyyy;
}

function YandM(val) {
	var gvndate = new Date(val);
	var mm = gvndate.getMonth();
	var yyyy = gvndate.getFullYear();
	var yyyy_mm = yyyy+"_"+(mm+1);
	return yyyy_mm;
}
function DTOC(val) {
	

    // This need to be changed

    if(val !=null && val != "" ){

    return Ext.Date.dateAndTimeFn.getDTOC(val);

    }
    else
    {
        return "";
    }
}


function formatDate(date) {
		
		
		if(date.toString().indexOf("/") > 0)
		{
			
			var spval = date.toString().split("/");
			
			var dateObject = new Date(parseInt(spval[2]),parseInt(spval[1]),parseInt(spval[0])); 
			
			date = dateObject;
			
			return date
			
		}
		
		return date;
		
		
}

function CTOD(val) {
	
	
	val = formatDate(val);

	
	return new Date(Date.parse(val));

	/*if(val !=null && val != "" ){
	   
	   if(val instanceof Date){

		    return val;
	   
	   }else{

		   var convertedValue = convertDBFormatToUniversalFormat(val);

		   if(convertedValue.length != 0)
	
	       {
		   return Ext.Date.dateAndTimeFn.getCTOD(convertedValue);
		   }

		   else
       
		   {
		   return Ext.Date.dateAndTimeFn.getCTOD(val);
		   }

	   }
	}else{
        return "";
	}*/
}

function weekNo(gvndate){

	var d=new Date(gvndate);
	d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
	var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
	var weekno = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
	return weekno;

}
function formatDateTime(f, d) {

	var universalFormat = globalMap.get("DATEFORMAT");
	var dtFormat = EXTJS_DATE_FORMAT_MAP.get(universalFormat);

    var dt = new Date(d);
    

	if (typeof d=="string")
	{
        dt=Ext.Date.parse(d,dtFormat);
        var extFt = Ext.Date.dateAndTimeFn.getFormatDate(f);
		return extFt != null ? Ext.Date.format(dt, extFt) : null;

	}
  
    else if(d instanceof Date){
	
	    var extFt = Ext.Date.dateAndTimeFn.getFormatDate(f);
		return extFt != null ? Ext.Date.format(d, extFt) : null;
	}

	if(dt == "Invalid Date"){
		
		 var d = Ext.Date.parse(d,dtFormat);
		 var extFt = Ext.Date.dateAndTimeFn.getFormatDate(f);

		 return extFt != null ? Ext.Date.format(d, extFt) : null;
	}else{

		var extFt = Ext.Date.dateAndTimeFn.getFormatDate(f);
		return extFt != null ? Ext.Date.format(dt, extFt) : null;
	}

}

// ------------------------------------------------------------------
// Utility functions for parsing in getDateFromFormat()
// ------------------------------------------------------------------
function _isInteger(val) {
	var digits = "1234567890";
	for (var i = 0; i < val.length; i++) {
		if (digits.indexOf(val.charAt(i)) == -1) {
			return false;
		}
	}
	return true;
}
function _getInt(str, i, minlength, maxlength) {
	for (var x = maxlength; x >= minlength; x--) {
		var token = str.substring(i, i + x);
		if (token.length < minlength) {
			return null;
		}
		if (_isInteger(token)) {
			return token;
		}
	}
	return null;
}

// ------------------------------------------------------------------
// getDateFromFormat( date_string , format_string )
//
// This function takes a date string and a format string. It matches
// If the date string matches the format string, it returns the
// getTime() of the date. If it does not match, it returns 0.
// ------------------------------------------------------------------
function getDateFromFormat(val, format) {
	val = val + "";
	format = format + "";
	var i_val = 0;
	var i_format = 0;
	var c = "";
	var token = "";
	var x = 0, y = 0;
	var dt = "";

	while (i_format < format.length) {
		// Get next token from format string
		c = format.charAt(i_format);
		token = "";
		while ((format.charAt(i_format) == c) && (i_format < format.length)) {
			token += format.charAt(i_format++);
		}

		// Extract contents of value based on format token
		if (token == "yyyy" || token == "yy" || token == "y") {
			if (token == "yyyy") {
				x = 4;
				y = 4;
			}
			if (token == "yy") {
				x = 2;
				y = 2;
			}
			if (token == "y") {
				x = 2;
				y = 4;
			}
			year = _getInt(val, i_val, x, y);

			if (year == null) {
				return 0;
			}
			i_val += year.length;
			if (year.length == 2) {
				if (year > 70) {
					year = 1900 + (year - 0);
				} else {
					year = 2000 + (year - 0);
				}
			}
		} else if (token == "MMM" || token == "NNN") {
			month = 0;
			for (var i = 0; i < MONTH_NAMES.length; i++) {
				var month_name = MONTH_NAMES[i];
				if (val.substring(i_val, i_val + month_name.length)
						.toLowerCase() == month_name.toLowerCase()) {
					if (token == "MMM" || (token == "NNN" && i > 11)) {
						month = i + 1;
						if (month > 12) {
							month -= 12;
						}
						i_val += month_name.length;
						break;
					}
				}
			}
			if ((month < 1) || (month > 12)) {
				return 0;
			}
		} else if (token == "MM" || token == "M") {
			month = _getInt(val, i_val, token.length, 2);
			if (month == null || (month < 1) || (month > 12)) {
				return 0;
			}
			i_val += month.length;
		} else if (token == "dd" || token == "d") {
			date = _getInt(val, i_val, token.length, 2);
			if (date == null || (date < 1) || (date > 31)) {
				return 0;
			}
			i_val += date.length;
		} else if (token == "mm" || token == "m") {
			mm = _getInt(val, i_val, token.length, 2);
			if (mm == null || (mm < 0) || (mm > 59)) {
				return 0;
			}
			i_val += mm.length;
		} else {
			if (val.substring(i_val, i_val + token.length) != token) {
				return 0;
			} else {
				i_val += token.length;
			}
		}
	}
	// If there are any trailing characters left in the value, it doesn't match
	if (i_val != val.length) {
		return 0;
	}
	// Is date valid for month?
	if (month == 2) {
		// Check for leap year
		if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) { // leap
																			// year
			if (date > 29) {
				return 0;
			}
		} else {
			if (date > 28) {
				return 0;
			}
		}
	}
	if ((month == 4) || (month == 6) || (month == 9) || (month == 11)) {
		if (date > 30) {
			return 0;
		}
	}

	if (date != "" && month != "" && year != "") {
		dt += date + "/";
		dt += month + "/";
		dt += year;

	}

	return dt;

}

// ------------------------------------------------------------------
// parseDate( date_string [, prefer_euro_format] )
//
// This function takes a date string and tries to match it to a
// number of possible date formats to get the value. It will try to
// match against the following international formats, in this order:
// y-M-d MMM d, y MMM d,y y-MMM-d d-MMM-y MMM d
// M/d/y M-d-y M.d.y MMM-d M/d M-d
// d/M/y d-M-y d.M.y d-MMM d/M d-M
// A second argument may be passed to instruct the method to search
// for formats like d/M/y (european format) before M/d/y (American).
// Returns a Date object or null if no patterns match.
// ------------------------------------------------------------------
function isDate(val, dtFormat) {

	var dtFmt = dtFormat;
	var dtVal = val;

	if (isSupportedDateFormat(dtFmt)) {
		d = getDateFromFormat(dtVal, dtFmt);
		if (d == "") {
			return false;
		}
		return true;
	} else
		{
		return false;
		}
}

function isSupportedDateFormat(dtFormat) {

	var strArg = dtFormat;

	for (idx = 0; idx < SUPPORTED_DATE_FORMATS.length; idx++) {
		if (strArg == SUPPORTED_DATE_FORMATS[idx])
			{
			return true;
			}
	}
	return false;
}

function globalFormatDate(date, mnth, year, dateFormat) {
	var format = dateFormat + "";
	var result = "";
	var i_format = 0;
	var c = "";
	var token = "";
	var y = year + "";
	var M = Number(mnth);
	var d = Number(date);

	var yyyy, yy, MMM, MM, dd, hh, h, mm, ss, ampm, HH, H, KK, K, kk, k;
	// Convert real date parts into formatted versions
	var value = new Object();
	if (y.length < 4) {
		y = "" + (y - 0 + 1900);
	}
	value["y"] = "" + y;
	value["yyyy"] = y;
	value["yy"] = y.substring(2, 4);
	value["M"] = M;
	value["MM"] = LZ(M);
	value["MMM"] = MONTH_NAMES[M - 1];
	value["NNN"] = MONTH_NAMES[M + 11];
	value["d"] = d;
	value["dd"] = LZ(d);

	while (i_format < format.length) {
		c = format.charAt(i_format);
		token = "";
		while ((format.charAt(i_format) == c) && (i_format < format.length)) {
			token += format.charAt(i_format++);
		}
		if (value[token] != null) {
			result = result + value[token];
		} else {
			result = result + token;
		}
	}
	return result;
}

function globalFormatTime(hours, mins, sec) {
	var H = hours;
	var format = timeFormat + "";
	var m = mins;
	var s = sec;
	var result = "";
	var i_format = 0;
	var c = "";
	var token = "";
	var value = new Object();
	value["H"] = H;
	value["HH"] = LZ(H);
	if (H == 0) {
		value["h"] = 12;
	} else if (H > 12) {
		value["h"] = H - 12;
	} else {
		value["h"] = H;
	}
	value["hh"] = LZ(value["h"]);
	if (H > 11) {
		value["K"] = H - 12;
	} else {
		value["K"] = H;
	}
	value["k"] = H + 1;
	value["KK"] = LZ(value["K"]);
	value["kk"] = LZ(value["k"]);
	if (H > 11) {
		value["a"] = "PM";
	} else {
		value["a"] = "AM";
	}
	value["m"] = m;
	value["mm"] = LZ(m);
	value["s"] = s;
	value["ss"] = LZ(s);

	while (i_format < format.length) {
		c = format.charAt(i_format);
		token = "";
		while ((format.charAt(i_format) == c) && (i_format < format.length)) {
			token += format.charAt(i_format++);
		}
		if (value[token] != null) {
			result = result + value[token];
		} else {
			result = result + token;
		}
	}
	return result;

}

/*******************************************************************************
 * BCS_Evaluator.js
 ******************************************************************************/
var th = ['', 'thousand', 'million', 'billion', 'trillion'];
var dg = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven',
		'eight', 'nine'];
var tn = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen',
		'sixteen', 'seventeen', 'eighteen', 'nineteen'];
var tw = ['twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty',
		'ninety'];
var UNARY_NEG = "�";
var ARG_TERMINAL = "?%";
var DEBUG_ON = false;

function Expression(pstrExp) {
	var strInFix = null;
	var arrVars = null;
	var arrTokens = null;
	var arrPostFix = null;
	var strEform = null;
	GetparseObj = null;

	// this.DateFormat = SetDateFormat;
	this.Expression = SetExpression;
	this.Parse = ParseExpression;
	this.Evaluate = EvaluateExpression;

	// this.AddVariable = AddNewVariable;
	// this.Reset = ClearAll;

	function SetExpression(pstrExp,stValues, GEfromId, getObj) {

		//commenting        exprMap.add("currentExpr",pstrExp);

		strInFix = pstrExp;
		storages = stValues;

		var patt = /eval\(/gi;

		var result = patt.exec(pstrExp.replace(/\s+/gm, ""));

		if (result != null) {

			result = result.toString();

			result = result.toUpperCase();

		}

		if (result == "EVAL(") {

			var getField = strInFix.substring(5, strInFix.length - 1);

			if (getField != '') {

				var tokanizeField = Tokanize(strInFix);

				var expressionSet = InFixToPostFix(tokanizeField);

				reAssembled = '';

				for (l = 0; l < tokanizeField.length; l++) {

					var j = l + 1;

					splitField = tokanizeField.slice(l, j);

					if (splitField != ',') {

					reAssembled += evaluateVariable(splitField.toString(),GEfromId, 1);
						
					} else {

						reAssembled += splitField;

					}

				}

				strInFix = reAssembled;

			} else {

				strInFix = "eval(0)";

			}

		}
		
		var patt1 = /evalstring\(/gi;

		var result1 = patt1.exec(pstrExp.replace(/\s+/gm, ""));

		if (result1 != null) {

			result = result1[0].toString();

			result = result1[0].toUpperCase();

		}
		
		if (result == "EVALSTRING(") {

			var getField = strInFix.substring(11, strInFix.length - 1);

			if (getField != '') {

				var tokanizeField = Tokanize(strInFix);

				var expressionSet = InFixToPostFix(tokanizeField);

				reAssembled = '';

				for (l = 0; l < tokanizeField.length; l++) {

					var j = l + 1;

					splitField = tokanizeField.slice(l, j);

					if (splitField != ',') {

					reAssembled += evaluateVariable(splitField.toString(),GEfromId, 1);
						
					} else {

						reAssembled += splitField;

					}

				}

				strInFix = reAssembled;

			} else {

				strInFix = "evalstring(0)";

			}

		}

		strEform = GEfromId;

		GetparseObj = getObj;

	}

	function ParseExpression() {

		var exprStatus = "";

		var patt = /eval\(/gi;

		arrPostFix = new Array();

        expressionSet = new Array();

		var result = patt.exec(strInFix.replace(/\s+/gm, ""));

		if (result != null) {

			result = result.toString();

			result = result.toUpperCase();

		}

		if(GetparseObj == null || GetparseObj == "" || result == 'EVAL(' || result == 'EVALSTRING('){

		arrTokens = Tokanize(strInFix, strEform);

		if (arrTokens == null || arrTokens == undefined)
		{
		  
			  // throw "Unable to tokanize the expression!";
			  console.log("This"+exprMap.get("currentExpr")+"Unable to tokanize the expression!");
			  return;
		}
			

		if (arrTokens.length <= 0){
		   // throw "Unable to tokanize the expression!";
		     console.log("This"+exprMap.get("currentExpr")+"Unable to tokanize the expression!");
			 return;
		
		}


			

		arrPostFix = InFixToPostFix(arrTokens);

		expressionSet = InFixToPostFix(arrTokens);

		}
		
		else if(GetparseObj['PE'] == null || GetparseObj['PVE'] == null){
		
			arrTokens = Tokanize(strInFix, strEform);

		if (arrTokens == null || arrTokens == undefined)
		{
		  
			  // throw "Unable to tokanize the expression!";
			  console.log("This"+exprMap.get("currentExpr")+"Unable to tokanize the expression!");
			  return;
		}
			

		if (arrTokens.length <= 0){
		   // throw "Unable to tokanize the expression!";
		     console.log("This"+exprMap.get("currentExpr")+"Unable to tokanize the expression!");
			 return;
		
		}

		arrPostFix = InFixToPostFix(arrTokens);

		expressionSet = InFixToPostFix(arrTokens);

		}	
		else{

        exprStatus = checkIfExpressionOrValidateExpression(GetparseObj,strInFix);
		
		if(GetparseObj != null && exprStatus == "expression"){

        if(GetparseObj['PE'] == null){
		
		 Ext.Msg.alert("Info","please migrate this transaction and related tgen maps !!!!!!");
		
		}

        var parsedExprArrayList = JSON.parse(JSON.stringify(GetparseObj['PE']));

		arrPostFix = parsedExprArrayList;

		expressionSet = parsedExprArrayList;

		}else if(GetparseObj != null && exprStatus == "validateExpression"){

        if(GetparseObj['PVE'] == null){
		
		Ext.Msg.alert("Info","please migrate this transaction and related tgen maps !!!!!!");
		
		}
		
		var parsedValidateExprArrayList = JSON.parse(JSON.stringify(GetparseObj['PVE']));

		arrPostFix = parsedValidateExprArrayList;

		expressionSet = parsedValidateExprArrayList;
			
		}
			
	 }


		for (var rps = 0; rps < arrPostFix.length; rps++) {


            LObjId = "";
			arrPostFix[rps] = evaluateVariable(Trim(arrPostFix[rps]),storages,strEform, 0);

		}

		if (arrPostFix == null || arrPostFix == undefined){
		
          // throw "Unable to convert the expression to postfix form!";
		  console.log("This"+exprMap.get("currentExpr")+"Unable to convert the expression to postfix form!");
		  return;
		}
			
		if (arrPostFix.length <= 0){
		
		 // throw "Unable to convert the expression to postfix form!";
          console.log("This"+exprMap.get("currentExpr")+"Unable to convert the expression to postfix form!");
		  return;
		}
			
  
		return arrPostFix.toString();

	}

	// postfix function evaluator
	function EvaluateExpression(contextData) {
		var intIndex;
		var myStack;
		var strTok, strOp;
		var objOp1, objOp2, objTmp1, objTmp2;
		var dblNo, dblVal1, dblVal2;
		var parrExp;

		if (arrPostFix == null || arrPostFix == undefined)
			{
			ParseExpression();
			}
		if(arrPostFix != null && arrPostFix != undefined)
		{
		if (arrPostFix.length == 0) {
			// throw "Unable to parse the expression!";
			return false;
		}
		}

		parrExp = arrPostFix;

		if (parrExp == null || parrExp == undefined) {
			// throw "Invalid postfix expression!";
			return false;
			return;
		}
		if (parrExp.length == 0) {
			// throw "Invalid postfix expression!";
			return false;
			return;
		}

		intIndex = 0;
		myStack = new Stack();
		while (intIndex < parrExp.length) {
			strTok = parrExp[intIndex];

			switch (strTok) {
				case ARG_TERMINAL :
					myStack.Push(strTok);
					break;
				case UNARY_NEG :
					if (myStack.IsEmpty())
						// throw "No operand to negate!";
						{
						return false;
						}

					objOp1 = null;
					objOp2 = null;
					objOp1 = myStack.Pop();

					dblNo = ToNumber(objOp1);
					if (isNaN(dblNo))
						// throw "Not a numaric value!";
						{
						return false;
						}
					else {
						dblNo = (0 - dblNo);
						myStack.Push(dblNo);
					}
					break;
				case "!" :
					if (myStack.IsEmpty())
						// throw "No operand on stack!";
						{
						return false;
						}

					objOp1 = null;
					objOp2 = null;
					objOp1 = myStack.Pop();
					objOp1 = ToBoolean(objOp1);
					if (objOp1 == null)
						// throw "Not a boolean value!";
						{
						return false;
						}
					else
						{
						myStack.Push(!objOp1);
						}
					break;
				case "*" :
				case "/" :
				case "%" :
				case "^" :
					if (myStack.IsEmpty() || myStack.Size() < 2)
						// throw "Stack is empty, can not perform [" + strTok +
						// "]";
				        {
						return false;
						}
						
					objOp1 = null;
					objOp2 = null;
					objTmp = null;
					objOp2 = myStack.Pop();
					objOp1 = myStack.Pop();

					dblVal1 = ToNumber(objOp1);
					dblVal2 = ToNumber(objOp2);
					if (isNaN(dblVal1) || isNaN(dblVal2))
						/*
						 * throw "Either one of the operand is not a number can
						 * not perform [" + strTok + "]";
						 */
						{
						return false;
						}
					if (strTok == "^")
						{
						myStack.Push(Math.pow(dblVal1, dblVal2));
						}
					else if (strTok == "*")
						{
						myStack.Push((dblVal1 * dblVal2));
						}
					else if (strTok == "/"){

						      if(dblVal1==0||dblVal2==0){
							  
							   myStack.Push(0);
							  
							  }else{
						         myStack.Push((dblVal1 / dblVal2));
							  }
					}
					else {
						debugAssert(dblVal1 + " - " + dblVal2);
						myStack.Push((dblVal1 % dblVal2));
					}
					break;
				case "+" :
				case "-" :
					if (myStack.IsEmpty() || myStack.Size() < 2)
						// throw "Stack is empty, can not perform [" + strTok +
						// "]";
						{
						return false;
						}
					objOp1 = null;
					objOp2 = null;
					objTmp1 = null;
					objTmp2 = null;
					strOp = ((strTok == "+") ? "Addition" : "Substraction");
					objOp2 = myStack.Pop();
					objOp1 = myStack.Pop();

					if (IsBoolean(objOp1) || IsBoolean(objOp2)){
					// throw "Can not perform " + strOp
								+ " with boolean values!";
					console.log("UnCaught Exception:Can not perform " + strOp+ " with boolean values!");
					return;
					}
					else if (IsNumber(objOp1) && IsNumber(objOp2)) {
						//To find out max decimal points of two numbers. written by raja.i on 30-5-2013 
						var dblVal1DecLength	= 0;
						var dblVal2DecLength	= 0;
						var finelDecPoints		= 0;

						if(objOp1 != null)
						{
						if(objOp1.toString().split(".")[1] != "undefined" && objOp1.toString().split(".")[1] != null)
							{
							dblVal1DecLength	= objOp1.toString().split(".")[1].length;
							}
						}
						if(objOp2 != null)
						{
						if(objOp2.toString().split(".")[1] != "undefined" && objOp2.toString().split(".")[1] != null)
							{
							dblVal2DecLength	= objOp2.toString().split(".")[1].length;
							}
						}
						if(dblVal1DecLength > dblVal2DecLength)
							{
							finelDecPoints	= dblVal1DecLength;
							}
						else
							{
							finelDecPoints	= dblVal2DecLength;
							}
				
						dblVal1 = ToNumber(objOp1);
						dblVal2 = ToNumber(objOp2);
						
						if (strTok == "+")
							{
							myStack.Push((dblVal1 + dblVal2).toFixed(finelDecPoints));
							}
						else
							{
							myStack.Push((dblVal1 - dblVal2).toFixed(finelDecPoints));
							}
					}
					else if (typeof(objOp1) == "object"
							|| typeof(objOp1) == "object"){
					// throw strOp + " of two objects not supported!";
					console.log("UnCaught Exception:"+strOp + " of two objects not supported!")	;
					return;
					}
						
					else if (typeof(objOp1) == "undefined"
							|| typeof(objOp1) == "undefined"){
						// throw strOp + " of two undefined not supported!";
						console.log(strOp + " of two undefined not supported!");
						return;
					}
						
					else if (typeof(objOp1) == "string"
							&& typeof(objOp2) == "string") {

						/*
						 * if(isNaN(objOp1) && isNaN(objOp2))
						 * 
						 * throw "strings Not supported";
						 * 
						 * else
						 * 
						 */

						myStack.Push(objOp1 + objOp2);

					} else {
						if (strTok == "+")
							{
							myStack.Push((objOp1 + objOp2));
							}
						else{
						// throw strOp + " not supported for strings!"
						console.log( strOp + " not supported for strings!");
					    return;
						}
							
					}
					break;
				case "=" :
				case "<" :
				case ">" :
				case "<>" :
				case "<=" :
				case ">=" :
					if (myStack.IsEmpty() || myStack.Size() < 2){
				      // throw "Stack is empty, can not perform [" + strTok
								// + "]";
					  console.log("Stack is empty, can not perform [" + strTok+ "]");
				}
						
					objOp1 = null;
					objOp2 = null;
					objTmp1 = null;
					objTmp2 = null;
					objOp2 = myStack.Pop();
					objOp1 = myStack.Pop();

					if (IsNumber(objOp1) && IsNumber(objOp2)) {
						dblVal1 = ToNumber(objOp1);
						dblVal2 = ToNumber(objOp2);
						if (strTok == "=")
							{
							myStack.Push((dblVal1 == dblVal2));
							}
						else if (strTok == "<>")
							{
							myStack.Push((dblVal1 != dblVal2));
							}
						else if (strTok == ">")
							{
							myStack.Push((dblVal1 > dblVal2));
							}
						else if (strTok == "<")
							{
							myStack.Push((dblVal1 < dblVal2));
							}
						else if (strTok == "<=")
							{
							myStack.Push((dblVal1 <= dblVal2));
							}
						else if (strTok == ">=")
							{
							myStack.Push((dblVal1 >= dblVal2));
							}
					} else if (IsBoolean(objOp1) && IsBoolean(objOp2)
							&& (strTok == "=" || strTok == "<>")) {
						objTmp1 = ToBoolean(objOp1);
						objTmp2 = ToBoolean(objOp2);
						if (strTok == "=")
							{
							myStack.Push((objTmp1 == objTmp2));
							}
						else if (strTok == "<>")
							{
							myStack.Push((objTmp1 != objTmp2));
							}
					} else if ((typeof(objOp1) == "string" && typeof(objOp2) == "string")
							&& (strTok == "=" || strTok == "<>")) {
						if (strTok == "=")
							{
							myStack.Push((objOp1 == objOp2));
							}
						else if (strTok == "<>")
							{
							myStack.Push((objOp1 != objOp2));
							}
					}
                   	else if (IsNumber(objOp1) &&  typeof(objOp2) == "string")
					{
						myStack.Push(false);
						
					}

					else if (typeof(objOp1) == "string" && IsNumber(objOp2))
					{
						myStack.Push(false);
						
					}
					else if(typeof(objOp1) == "undefined" || typeof(objOp2) == "undefined" )
					{
						
						myStack.Push(true);
					}
					else	
						/*
						 * throw "For " + strTok + " operator LHS & RHS should
						 * be of same data type!";
						 */
						{
						return false;
						}
					break;
				case "&" :
				case "|" :
					if (myStack.IsEmpty() || myStack.Size() < 2)
						// throw "Stack is empty, can not perform [" + strTok +
						// "]";
						{
						return false;
						}
					objOp1 = null;
					objOp2 = null;
					objTmp1 = null;
					objTmp2 = null;
					objOp2 = myStack.Pop();
					objOp1 = myStack.Pop();

					if (IsBoolean(objOp1) && IsBoolean(objOp2)) {
						objTmp1 = ToBoolean(objOp1);
						objTmp2 = ToBoolean(objOp2);
						if (strTok == "&")
							{
							myStack.Push((objTmp1 && objTmp2));
							}
						else if (strTok == "|")
							{
							myStack.Push((objTmp1 || objTmp2));
							}
					} else
						// throw "Logical operator requires LHS & RHS of boolean
						// type!";
						{
						return false;
						}
					break;
				default :
					// Handle functions and operands
					if (IsNumber(strTok)
							|| IsBoolean(strTok)
							|| typeof(strTok) == "number"
							|| typeof(strTok) == "boolean"
							|| typeof(strTok) == "object"
							|| (typeof(strTok) == "string" && (!IsFunction(strTok)))) {
						myStack.Push(strTok);
						break;
					} else{

						HandleFunctions(strTok, myStack, dtFormat, arrVars ,contextData );

					}
			}
			intIndex++;
		}
		if (myStack.IsEmpty() || myStack.Size() > 1)
			// throw "Unable to evaluate expression!";
			{
			return false;
			}
		else
			{
			return myStack.Pop();
			}
	}

	/*------------------------------------------------------------------------------
	 * NAME       : InFixToPostFix
	 * PURPOSE    : Convert an Infix expression into a postfix (RPN) equivalent
	 * PARAMETERS : Infix expression element array
	 * RETURNS    : array containing postfix expression element tokens
	 *----------------------------------------------------------------------------*/
	function InFixToPostFix(arrToks) {
		var myStack;
		var intCntr, intIndex;
		var strTok, strTop, strNext, strPrev;
		var blnStart;

		blnStart = false;
		intIndex = 0;
		arrPFix = new Array();
		myStack = new Stack();

		// Infix to postfix converter
		for (intCntr = 0; intCntr < arrToks.length; intCntr++) {
			strTok = arrToks[intCntr];
			debugAssert("Processing token [" + strTok + "]");
			switch (strTok) {
				case "(" :
					if (myStack.Size() > 0 && IsFunction(myStack.Get(0))) {
						arrPFix[intIndex] = ARG_TERMINAL;
						intIndex++;
					}
					myStack.Push(strTok);
					break;
				case ")" :
					blnStart = true;
					debugAssert("Stack.Pop [" + myStack.toString());
					while (!myStack.IsEmpty()) {
						strTok = myStack.Pop();
						if (strTok != "(") {
							arrPFix[intIndex] = strTok;
							intIndex++;
						} else {
							blnStart = false;
							break;
						}
					}
					if (myStack.IsEmpty() && blnStart){
					// throw "Unbalanced parenthesis!";
					console.log("This expression "+exprMap.get("currentExpr")+"Unbalanced parenthesis!");
					break;
					}
						
					break;
				case "," :
					if (myStack.IsEmpty())
						{
						break;
						}
					debugAssert("Pop stack till opening bracket found!");
					while (!myStack.IsEmpty()) {
						strTok = myStack.Get(0);
						if (strTok == "(")
							{
							break;
							}
						arrPFix[intIndex] = myStack.Pop();
						intIndex++;
					}
					break;
				case "!" :
				case "-" :
					// check for unary negative operator.
					if (strTok == "-") {
						strPrev = null;
						if (intCntr > 0)
							{
							strPrev = arrToks[intCntr - 1];
							}
						strNext = arrToks[intCntr + 1];
						if (strPrev == null || IsOperator(strPrev)
								|| strPrev == "(") {
							debugAssert("Unary negation!");
							strTok = UNARY_NEG;
						}
					}
				case "^" :
				case "*" :
				case "/" :
				case "%" :
				case "+" :
					// check for unary + addition operator, we need to ignore
					// this.
					if (strTok == "+") {
						strPrev = null;
						if (intCntr > 0)
							{
							strPrev = arrToks[intCntr - 1];
							}
						strNext = arrToks[intCntr + 1];
						if (strPrev == null || IsOperator(strPrev)
								|| strPrev == "(") {
							debugAssert("Unary add, Skipping");
							break;
						}
					}
				case "&" :
				case "|" :
				case ">" :
				case "<" :
				case "=" :
				case ">=" :
				case "<=" :
				case "<>" :
					strTop = "";
					if (!myStack.IsEmpty())
						{
						strTop = myStack.Get(0);
						}
					if (myStack.IsEmpty()
							|| (!myStack.IsEmpty() && strTop == "(")) {
						debugAssert("Empty stack pushing operator [" + strTok
								+ "]");
						myStack.Push(strTok);
					} else if (Precedence(strTok) > Precedence(strTop)) {
						debugAssert("[" + strTok
								+ "] has higher precedence over [" + strTop
								+ "]");
						myStack.Push(strTok);
					} else {
						// Pop operators with precedence >= operator strTok
						while (!myStack.IsEmpty()) {
							strTop = myStack.Get(0);
							if (strTop == "("
									|| Precedence(strTop) < Precedence(strTok)) {
								debugAssert("[" + strTop
										+ "] has lesser precedence over ["
										+ strTok + "]");
								break;
							} else {
								arrPFix[intIndex] = myStack.Pop();
								intIndex++;
							}
						}
						myStack.Push(strTok);
					}
					break;
				default :
					if (!IsFunction(strTok)) {
						debugAssert("Token [" + strTok
								+ "] is a variable/number!");
						// Token is an operand
						if (IsNumber(strTok))
							{
							strTok;
							}
						// strTok = ToNumber(strTok);
						else if (IsBoolean(strTok))
							{
							strTok = ToBoolean(strTok);
							}
						/*
						 * else if (isDate(strTok, dtFormat)) strTok =
						 * getDateFromFormat(strTok, dtFormat);
						 */
						arrPFix[intIndex] = strTok;
						intIndex++;
						break;
					} else {
						strTop = "";
						if (!myStack.IsEmpty())
							{
							strTop = myStack.Get(0);
							}
						if (myStack.IsEmpty()
								|| (!myStack.IsEmpty() && strTop == "(")) {
							debugAssert("Empty stack pushing operator ["
									+ strTok + "]");
							myStack.Push(strTok);
						} else if (Precedence(strTok) > Precedence(strTop)) {
							debugAssert("[" + strTok
									+ "] has higher precedence over [" + strTop
									+ "]");
							myStack.Push(strTok);
						} else {
							// Pop operators with precedence >= operator in
							// strTok
							while (!myStack.IsEmpty()) {
								strTop = myStack.Get(0);
								if (strTop == "("
										|| Precedence(strTop) < Precedence(strTok)) {
									debugAssert("[" + strTop
											+ "] has lesser precedence over ["
											+ strTok + "]");
									break;
								} else {
									arrPFix[intIndex] = myStack.Pop();
									intIndex++;
								}
							}
							myStack.Push(strTok);
						}
					}
					break;
			}
			debugAssert("Stack   : " + myStack.toString() + "\n" + "RPN Exp : "
					+ arrPFix.toString());

		}

		// Pop remaining operators from stack.
		while (!myStack.IsEmpty()) {
			arrPFix[intIndex] = myStack.Pop();
			intIndex++;
		}
		return arrPFix;
	}
}

/*------------------------------------------------------------------------------
 * NAME       : HandleFunctions
 * PURPOSE    : Execute built-in functions
 * PARAMETERS : pstrTok - The current function name
 *              pStack - Operand stack
 * RETURNS    : Nothing, the result is pushed back onto the stack.
 *----------------------------------------------------------------------------*/

var HOUR_FORMAT_24 = 'H:i:s';
var HOUR_FORMAT_12 = 'h:i:s';

function HandleFunctions(pstrTok, pStack, pdtFormat, parrVars, contextData) {
	var varTmp, varTerm, objTmp, objTmp1;
	var objOp1, objOp2, objOp3, objOp4, objOp5;
	var arrArgs;
	var intCntr;

	if (!IsFunction(pstrTok)){
	throw "Unsupported function token [" + pstrTok + "]";
	console.log("Unsupporeted function token ["+pstrTok+"]");
	return;
	}
		

	varTmp = pstrTok.toString().toUpperCase();
	arrArgs = new Array();
	while (!pStack.IsEmpty()) {
		varTerm = ARG_TERMINAL;
		varTerm = pStack.Pop();
		if (varTerm != ARG_TERMINAL)
			{
			arrArgs[arrArgs.length] = varTerm;
			}
		else
			{
			break;
			}
	}

	switch (varTmp) {
		case "TIME" :
			var now = new Date().toISOString();
			pStack.Push(now);
			break;
		case "DATE" :
			var today =  new Date().toISOString();
			pStack.Push(today);
			break;

		case "RESETACTIVECOMP" :
			var reset = new BCSDate();
			pStack.Push(reset.resetActiveComp());
			break;

		case "REFRESHVIEW":

			var rview=new BCSDate();
			pStack.Push(rview.refreshview());
			break;
		//function for button file upload
		case "FILEATTACHMENT":

			pStack.Push(fileattachment());
			break;	
			
		case "FORCEVOUCHERADJUSTMENTBEFORESAVE":
		pStack.Push(forcevoucheradjustmentbeforesave());
			break;

		case "DATETIME":

			pStack.Push(getServerDateTime());
			break;

		case "BCSSERVERDATE":
			var serverDateTime = getServerDateTime();
			var serverDate = serverDateTime.split(" ")[0];
			pStack.Push(serverDate);
			break;

		case "BCSSERVERTIME":

			var serverDateTime = getServerDateTime();
			var serverTime = serverDateTime.split(" ")[1];
			pStack.Push(serverTime);
			break;
		case "GETLATITUDE":

			var latitude = new BCSDate();
			pStack.Push(latitude.getLatitude());
			break;
		case "GETLONGITUDE":

			var longitude = new BCSDate();
			pStack.Push(longitude.getLongitude());
			break;


		case "ABS" :
		case "STR" :
		case "GETINTEGER" :
		case "SENDSMS" :
		case "SENDMAIL" :
		case "STRLENGTH" :

			if (arrArgs.length < 1){
			    console.log(varTmp+":Exception caught:requires atleast one argument!");
				return '';
			}
			else if (arrArgs.length > 1)
		    {
				console.log(varTmp+":Exception caught:requires only one argument!");
				return '';
			}
			varTerm = arrArgs[0];
			
			if (varTmp === "ABS")
			{
				if (!IsNumber(varTerm)){
				console.log(varTmp+":Exception caught: operates on numeric operands only!");
				return '';
				}
				objTmp = ToNumber(varTerm);
				pStack.Push(Math.abs(objTmp));
			}
			else if (varTmp === "STR") {

				ObjStr = ""+ varTerm;
				pStack.Push(ObjStr.toString());
			}
			else if (varTmp === "GETINTEGER")
			{
				if (!IsNumber(varTerm)){
			
				console.log(varTmp+":Exception caught: operates on numeric operands only!");
				return '';
				}
				pStack.Push(parseInt(varTerm));
			}
			else if (varTmp === "SENDSMS") {
				pStack.Push(sendSMS(varTerm));
			} 
			else if (varTmp === "SENDMAIL") {
				pStack.Push(sendMail(varTerm));
			} 
			else if (varTmp === "STRLENGTH") {
			/*	if (!IsNumber(varTerm)){
				
			console.log(varTmp+":Exception caught: operates on numeric operands only!");
 				return '';
 				}*/
				pStack.Push(strLength(varTerm.toString()));

			} 
			
		break;
		case "LCASE" :
		case "LOWER" :
		case "UCASE" :
		case "UPPER" :
		case "REVERSESTRING" :
		case "GETLENGTH" :
		case "TRIMVAL" :
        case "ISVALIDDROP":

			if (arrArgs.length < 1){
				// throw varTmp + " requires atleast one argument!";
			    console.log(varTmp+":Exception caught: requires atleast one argument!");
			    return '';
			}
			else if (arrArgs.length > 1)
		    {
				// throw varTmp + " requires only one argument!";
				console.log(varTmp+":Exception caught: requires only one argument!");
			    return '';
			}

			varTerm = arrArgs[0];
			if (varTerm == '') {

				varTerm = '';

			}

            if(varTerm.toString().length > 0 )
			{
			varTerm = ToNumber(varTerm);
			}
			
				
			
				if (varTmp == "LCASE" || varTmp == "LOWER")
					{
					pStack.Push(varTerm.toString().toLowerCase());
					}
				else if (varTmp == "ISVALIDDROP" ){
				    
					isValidDrop(arrArgs);
				}	
				else if (varTmp == "UCASE" || varTmp == "UPPER")
					{
					pStack.Push(varTerm.toString().toUpperCase());
					}
				else if (varTmp == "REVERSESTRING") {
					objTmp = varTerm.toString().split("");
					objOp1 = objTmp.reverse();
					pStack.Push(objOp1.join(''));
				} else if (varTmp == "GETLENGTH")
					{
					pStack.Push(varTerm.toString().length);
					}
				else if (varTmp == "TRIMVAL")
				{
					pStack.Push(varTerm.toString().replace(/^\s+|\s+$/g, ""));
				}
			break;
		case "SQLREGVAR" :
			if (arrArgs.length < 1) {
				// throw varTmp + " requires atleast one argument!";
				console.log(varTmp+":Exception caught:requires atleast one argument!");
			    return '';
			} else if (arrArgs.length > 1) {
				// throw varTmp + " requires Only one argument!";
				console.log(varTmp+":Exception caught:requires Only one argument!");
			    return '';
			} else {
				objOp1 = arrArgs[0];
				var getClass = new BCSDate();
				pStack.Push(getClass.SQLRegVar(objOp1));

			}
			break;

		case "TRIM" :

			if (arrArgs.length < 1){
				// throw varTmp + " requires atleast one argument!";
                console.log(varTmp+":Exception caught:requires atleast one argument!");
				return '';
			}
			else if (arrArgs.length > 1){
				// throw varTmp + " requires only one argument!";
				console.log(varTmp+":Exception caught:requires only one argument!");
				return '';
			}

			varTerm = arrArgs[0];
			// varTerm=ToNumber(varTerm);

			// pStack.Push(varTerm.replace(/^\(@|#|\$|%|\^|&|\*|\(|\)|\)+\s+|\s+/g,
			// ""));
			pStack.Push(Trim(varTerm));

			break;
		case "VAL" :
			if (arrArgs.length < 1){
   		        // throw varTmp + " requires atleast one argument!";
				console.log(varTmp+":Exception caught:requires atleast one argument!");
				return '';
		     }
				
			else if (arrArgs.length > 1){
			    // throw varTmp + " requires only one argument!";
			    console.log(varTmp+":Exception caught: requires only one argument!");
				return '';
			}
				

			if (!isNaN(arrArgs[0]))
			{
				varTerm = Number(arrArgs[0]);
			}
			if (varTmp == "VAL")
			{   
			if (typeof(varTerm) == "string"){
			       // throw varTmp + "operates on numeric operands only";
				    console.log(varTmp+":Exception caught:operates on numeric operands only!");
				    return '';
				
			    }	
				else{
					pStack.Push(Number(varTerm));
			  }
            }
			break;
		case "EVAL" :
			if(arrArgs instanceof Array){
				pStack.Push(eval(arrArgs[0]));
			}else{
				pStack.Push(eval(arrArgs));
			}
			break;

		case "EVALSTRING" :
			if(arrArgs instanceof Array ){
				pStack.Push(eval("'"+arrArgs[0]+"'"));
			}else{
				pStack.Push(eval("'"+arrArgs+"'"));
			}
			break;
		
		case "AMTWORD" :
			varTerm = arrArgs[0];
			varTerm = varTerm.toString();
			varTerm = varTerm.replace(/[\, ]/g, '');
			pStack.Push(amtInWord(varTerm));

			break;
		case "CURRAMTWORD" :
		case "GETCOSTRATEWLOC":
		case "GETSTOCKVALUEWLOC":
		case "SETPROPERTYBYCONDITION":
		
			if (arrArgs.length < 5)
			{
	
			// throw varTmp + " requires atleast Five argument!";
		        console.log(varTmp+":Exception caught:requires atleast Five argument!");
				return '';
	        }
			else if (arrArgs.length > 5){
			    // throw varTmp + " requires only Five argument!";
				console.log(varTmp+":Exception caught:requires only Five argument!");
				return '';
			}
			if(varTmp=="CURRAMTWORD"){
			varTerm = arrArgs[4];
			objOp1 = arrArgs[3];
			objOp2 = arrArgs[2];
			objOp3 = arrArgs[1];
			objOp4 = arrArgs[0];
			var ctAmtWord = amtInWord(varTerm, objOp1,
					objOp2, objOp3, objOp4);
			pStack.Push(ctAmtWord);
			}else if(varTmp=="GETCOSTRATEWLOC"){
				
				var callFN=new BCSDate();
				varTerm = arrArgs[4];
				objOp1 = arrArgs[3];
				objOp2 = arrArgs[2];
				objOp3 = arrArgs[1];
				objOp4 = arrArgs[0];
				pStack.Push(callFN.getCostRateWLOC(varTerm, objOp1,objOp2, objOp3, objOp4));
			}else if(varTmp=="GETSTOCKVALUEWLOC"){
				
				var callFN=new BCSDate();
				varTerm = arrArgs[4];
				objOp1 = arrArgs[3];
				objOp2 = arrArgs[2];
				objOp3 = arrArgs[1];
				objOp4 = arrArgs[0];
				pStack.Push(callFN.getStockValueWLOC(varTerm, objOp1,objOp2, objOp3, objOp4)); 
			}
			else if (varTmp === "SETPROPERTYBYCONDITION"){
                var _dateVal=new BCSDate();
				varTerm = arrArgs[4];
				objOp1 = arrArgs[3];
				objOp2 = arrArgs[2];
				objOp3 = arrArgs[1];
				objOp4 = arrArgs[0];

				pStack.Push(_dateVal.setPropertyByCondition(varTerm, objOp1,objOp2, objOp3, objOp4));
			}
			break;
		case "SETCOLUMNVALUE":
		case "SETCELLFONT":
		case "POSTRECORD":
		case "SETDECIMALTONUMBER":
		case "APPENDNUMBER":
		case "HIDECOLUMNREPORT":
        case "REMAINDER":
        case "CONTAINS":
		case "CACHESQLGET":
		case "GETSQLLIST":
		case "OPENPAGE":
		case "VALIDATELATLNG":
		case "CHKFORREGEXPR":
		case "OPENEREPORT":

			if (arrArgs.length < 2){
		       // throw varTmp + " requires atleast two argument!";
		       console.log(varTmp+":Exception caught:requires atleast two argument!");
			   return '';
		    }
				
			else if (arrArgs.length > 2){
			   // throw varTmp + " requires only two argument!";
			   console.log(varTmp+":Exception caught: requires only two argument!");
			   return '';
			}else{

				 if(varTmp=="SETCOLUMNVALUE"){
                     objOp1=arrArgs[1];
			         objOp2=arrArgs[0];
				     var date_Class = new BCSDate();
					 pStack.Push(date_Class.setColumnValue(objOp1,objOp2));
				 }else if(varTmp=="SETCELLFONT"){
				     
                     objOp1=arrArgs[1];
			         objOp2=arrArgs[0];
				     var date_Class = new BCSDate();
					 pStack.Push(date_Class.setCellFont(objOp1,objOp2));
					 
				 }else if(varTmp=="POSTRECORD")
				 {
					 
					 objOp1=arrArgs[1];
			         objOp2=arrArgs[0];
				     var date_Class = new BCSDate();
					 pStack.Push(date_Class.postRecord(objOp1,objOp2));
				 }
				 else if(varTmp=="SETDECIMALTONUMBER")
				 {
					 
					 objOp1=arrArgs[1];
			         objOp2=arrArgs[0];
				     var date_Class = new BCSDate();
					 pStack.Push(date_Class.setDecimalToNumber(objOp1,objOp2));
				 }
				 else if(varTmp=="APPENDNUMBER")
				 {
					 
					 objOp1=arrArgs[1];
			         objOp2=arrArgs[0];
				     var date_Class = new BCSDate();
					 pStack.Push(date_Class.appendNumber(objOp1,objOp2));
				 }
                 else if(varTmp=="REMAINDER")
                 {

                     objOp1=arrArgs[1];
                     objOp2=arrArgs[0];
                     var date_Class = new BCSDate();
                     pStack.Push(date_Class.remainder(objOp1,objOp2));
                 }
				 else if (varTmp=="HIDECOLUMNREPORT")
				 { 
				     objOp1=arrArgs[1];
			         objOp2=arrArgs[0];
				     var date_Class = new BCSDate();
					 pStack.Push(date_Class.hideColumnReport(objOp1,objOp2));
				 }
				 else if(varTmp=="CONTAINS"){
					
					 objOp1=arrArgs[1];
			         objOp2=arrArgs[0];
				      var date_Class = new BCSDate();
				     pStack.Push(date_Class.contains(objOp1,objOp2));
				 
				 } else if(varTmp === "CACHESQLGET"){
					
					objOp1=arrArgs[1];
			        objOp2=arrArgs[0];
					
					pStack.Push(bcs.app.cacheSqlGet(objOp1,objOp2));		
				 } else if(varTmp === "GETSQLLIST"){
				 
					objOp1=arrArgs[1];
			        objOp2=arrArgs[0];
					pStack.Push(bcs.app.processGetSqlList(objOp1,objOp2));
				 }else if(varTmp==="OPENEREPORT"){
					 
				 	 objOp1=arrArgs[1];
			         objOp2=arrArgs[0];
				      var date_Class = new BCSDate();
				      pStack.Push(date_Class.openEreport(objOp1,objOp2));
				 }
				 else if(varTmp =="OPENPAGE")
				 {
					objOp1=arrArgs[1];
			         objOp2=arrArgs[0];
					var date_Class = new BCSDate();
				    pStack.Push(date_Class.openPage(objOp1,objOp2));
				 }else if(varTmp == "VALIDATELATLNG"){
					 objOp1=arrArgs[1];
			         objOp2=arrArgs[0];
					 var date_Class = new BCSDate();
					 pStack.Push(date_Class.validateLatLng(objOp2,objOp1));
				 }else  if(varTmp == "CHKFORREGEXPR"){
					 objOp1=arrArgs[1];
			         objOp2=arrArgs[0];
					 var date_Class = new BCSDate();
					 pStack.Push(date_Class.checkForRegExpr(objOp1,objOp2));
				 }
					 
			}
			break;
			  
		case "RND" :
		case "ROUND" :
		case "POWER" :
		case "GETMOD" :
        

			if (arrArgs.length < 2){
		       // throw varTmp + " requires atleast two argument!";
		       console.log(varTmp+":Exception caught:requires atleast two argument!");
			   return '';
		    }
				
			else if (arrArgs.length > 2){
			   // throw varTmp + " requires only two argument!";
			   console.log(varTmp+":Exception caught: requires only two argument!");
			   return '';
			}
				

			objOp1 = ToNumber(arrArgs[1]);
			objOp2 = ToNumber(arrArgs[0]);

			if (typeof(objOp1) != "number" || typeof(objOp1) == "string"
					|| typeof(objOp2) != "number" || typeof(objOp2) == "string"){
					 // throw varTmp + " requires a numeric type operand!";
					 console.log(varTmp+":Exception caught: requires a numeric type operand!");
			         return '';
					}
				
			else {
				if (varTmp == "RND") {

					var res = Math.round(objOp1);
					pStack.Push(Number(res));
					/*var mid = 0;
					var str = "";
					var len = 0;
					var intVar = 0;
					var precisionVar = 0;
					var decimalVar = 0;
					var num = 0;
					mid = (objOp2) / (10 * 2);
					str = objOp1.toString();
					len = str.indexOf('.');
					intVar = str.substring(0, len);
					precisionVar = str.substring(len + 1, str.length);
					floatVar = 0;
					decimalVar = precisionVar.split("");
					for (i = decimalVar.length; i > 1; i--) {
						if (decimalVar[i - 1] >= 5) {
							if (decimalVar[i - 2] != 9)
								decimalVar[i - 2] = ++decimalVar[i - 2];
							decimalVar.pop();
						} else {
							decimalVar.pop();
						}
					}
					floatVar = decimalVar.toString();
					if (Number(floatVar) >= mid
							&& ((isFloat(objOp1)) && (isInt(objOp2)))) {
						if (objOp2 == 100)
							pStack.Push(Number(++intVar));// Writing on
															// 09.12.2011
						else {
							num = intVar + "." + objOp2.toString();
							pStack.Push(Number(num));
						}
					} else if (isFloat(objOp2)) {
						pStack.Push(Number(str));
					} else if (isInt(objOp1)) {
						pStack.Push(Number(str));
					}
					

					else {
						pStack.Push(Number(intVar));
					}*/

				} else if (varTmp == "POWER")
				{
					pStack.Push(Math.pow(objOp1, objOp2));
				}
				else if (varTmp == "ROUND") {

					var result = Math.round(objOp1 * Math.pow(10, objOp2))
							/ Math.pow(10, objOp2);

					pStack.Push(result);

				} else if (varTmp == "GETMOD")
				{
					pStack.Push(objOp1 % objOp2);
				}
			}
			break;
			
		case "ADDICON" :
			
			 varTerm = "{" + arrArgs[0]+ "}";//to convert String to Json Object
			 
			 objOp1 = arrArgs[1];
			 pStack.Push(bcs.app.addIcon(objOp1,varTerm));
			break;
			
		case "SUBSTR" :
		case "INSTR" :
		case "PAD" :
		case "LEFTPAD" :
		case "STUFF" :
		case "IIF" :
		case "FINDANDREPLACE" :
		case "REGVAR" :
		case "SETPROPERTY" :
		case "EDITCOLUMN":
		case "GETCLOSINGSTOCKWOLOC":
		case "GETCELL":
		case "DIRECTPRINTFORMAT":
		case "SETTOTALVALUE":
		case "CHKVALUEWITHDB":
		case "FIRESQLCACHEFORNONGRID":
		case "SQLGET" :
	 
			if (arrArgs.length < 3){

		            // throw varTmp + " requires atleast three argument!";
					 console.log(varTmp+":Exception caught: requires atleast three argument!");
			         return '';
		
		   }
			else if (arrArgs.length > 3){
			    // throw varTmp + " requires only three argument!";
				 console.log(varTmp+":Exception caught: requires only three argument!");
			     return '';
			}
				
			varTerm = arrArgs[2];
			objOp1 = arrArgs[1];
			objOp2 = arrArgs[0];
			
			if(varTmp === "FIRESQLCACHEFORNONGRID"){
			
				pStack.Push(bcs.app.fireSqlCacheForNonGrid(varTerm,objOp1,objOp2));
				
			} 
			else if (varTmp === "SQLGET") {
				var dt = new BCSDate();
				pStack.Push(dt.sqlGet(varTerm,objOp1,objOp2));

			}
			else if (varTmp == "INSTR") {
				var len_substr = 0;
				var strSearch = "";
				var len = 0;
				if (IsNumber(objOp2))
				{
					objOp2 = ToNumber(objOp2);
				}
				if (typeof varTerm != "string" || typeof objOp1 != "string"){
				 // throw varTmp + "arguments type did not match";
				 console.log(varTmp+":Exception caught: arguments type did not match !");
			     return '';
				}
					
				if (objOp2 > 0) {
					var inc = -1;
				} else {
					var inc = +1;
				}
				strSearch = varTerm.substring(objOp2 + (inc), varTerm.length);
				len_substr = varTerm.length - strSearch.length;
				len = strSearch.indexOf(objOp1);
				if (objOp2 < 0) {
					var objOp2 = 1;
				}
				if (len < 0) {
					var strPos = varTerm.indexOf(objOp1) + 1;
					pStack.Push(strPos);

				} else {

					pStack.Push(objOp2 + len);

				}

			} 
			else if (varTmp == "SUBSTR") {
				varTerm = ToNumber(varTerm);
				objOp1 = ToNumber(arrArgs[1]);
				objOp2 = ToNumber(arrArgs[0]);
				if(typeof objOp1 == 'number' && typeof objOp2 == 'number'){
			    varTerm=varTerm.toString();
				pStack.Push(varTerm.substring(objOp1 - 1, objOp2 + objOp1-1));
				}else{
				
				 console.log(varTmp+":Exception caught: args type did not match!");
			     return '';
				}

			} else if (varTmp == "PAD") {
				var strLen = 0;
				var charLen = objOp2.length;
				objOp1 = ToNumber(objOp1);
				if (typeof varTerm == 'string' && typeof objOp1 == 'number'
						&& isInt(objOp1) && charLen > 0) {
					strLen = varTerm.length;
					for (; strLen < objOp1;) {
						varTerm += objOp2;
						strLen = strLen + charLen;
					}
					pStack.Push(varTerm.substring(0, objOp1));
				}else
				{
				    // alert("Check The Type of Arguments");
					console.log(varTmp+":Exception caught: Check The Type of Arguments");
			        return '';
				}
					
			} else if (varTmp == "LEFTPAD") {
				var lpad_strLen = 0;
				var lpad_charLen = objOp2.length;
				var lpad_lpadStr = "";
				var lpad_str = "";
				objOp1 = ToNumber(objOp1);
				varTerm = ToNumber(varTerm);
				objOp2 = ToNumber(objOp2);
				if (typeof varTerm == 'string' && typeof objOp1 == 'number'
						&& isInt(objOp1) && lpad_charLen > 0) {
					pStack.Push(Ext.String.leftPad(varTerm, objOp1, objOp2));
				} else
				{
					Ext.Msg.alert("Info","Check The Type of Arguments");
				}
			} else if (varTmp == "STUFF") {
				var STUFF_strlen = 0;
				var STUFF_len = 0;
				var STUFF_constr1 = "";
				var STUFF_constr2 = "";
				varTerm = ToNumber(varTerm);
				objOp1 = ToNumber(objOp1);
				objOp2 = ToNumber(objOp2);

				if (typeof varTerm != 'string'
						|| (typeof objOp1 != 'string' && objOp1 != '')
						|| !isInt(objOp2)){
						
				console.log(varTmp+":Exception caught:arguments type did not match!");
			    return '';
					// throw "arguments type did not match";
						
				}
					

				STUFF_len = objOp2 - 1;
				STUFF_strlen = varTerm.length;
				STUFF_constr1 = varTerm.substring(0, STUFF_len);
				STUFF_constr2 = varTerm.substring(STUFF_len, STUFF_strlen);
				if (objOp1 != "")
				{
					pStack.Push(STUFF_constr1.concat(objOp1, STUFF_constr2));
				}
				else {
					var RemChar = STUFF_constr2.substring(1,
							STUFF_constr2.length);

					var TotalChar = STUFF_constr1 + RemChar;

					pStack.Push(TotalChar);

				}

			} else if (varTmp == "REGVAR") {

				var date_Class = new BCSDate();
				varTerm = arrArgs[2];
				objOp1 = arrArgs[1];
				objOp2 = arrArgs[0];
				pStack.Push(date_Class.regVar(varTerm, objOp1, objOp2));

			} else if (varTmp == "SETPROPERTY") {
				var date_Class = new BCSDate();
				varTerm = arrArgs[2];
				objOp1 = arrArgs[1];
				objOp2 = arrArgs[0];
				pStack.Push(date_Class.setProperty(varTerm, objOp1, objOp2));

			} else if(varTmp=="GETCLOSINGSTOCKWOLOC"){
				
				var date_Class = new BCSDate();
				varTerm = arrArgs[2];
				objOp1 = arrArgs[1];
				objOp2 = arrArgs[0];
				pStack.Push(date_Class.getClosingStockWOLOC(varTerm, objOp1, objOp2));
				
				
				
			}else if(varTmp=="GETSTOCKAGE"){
				
				var date_Class = new BCSDate();
				varTerm = arrArgs[2];
				objOp1 = arrArgs[1];
				objOp2 = arrArgs[0];
				pStack.Push(date_Class.getStockAge(varTerm, objOp1, objOp2));
				
			}else if (varTmp == "IIF") {

				if (!IsBoolean(varTerm)){
				 // throw varTmp + " operator requires boolean condition!";
				 console.log(varTmp+":Exception caught:operator requires boolean condition !");
			     return '';
				
				}
					
				varTerm = ToBoolean(arrArgs[2]);
				objOp1 = arrArgs[1];
				objOp2 = arrArgs[0];
				if (varTerm)
				{
					pStack.Push(objOp1);
				}
				else
				{
					pStack.Push(objOp2);
				}
			} else if (varTmp == "FINDANDREPLACE") {
				varTerm = varTerm;
				objOp1 = objOp1;
				objOp2 = objOp2;
			/*	if (typeof varTerm != "string" || typeof objOp1 != "string"
						|| typeof objOp2 != "string"){
						
				 // throw "Requires a String type operand";
			     console.log(varTmp+":Exception caught:Requires a String type operand !");
			     return '';			
				}*/
				
				if(typeof varTerm != "string" )
				{
					pStack.Push(varTerm);
					
				}
				else{

				    var splChar=specialCharMap.get(objOp1.toUpperCase());
					if(splChar)
					{
				     pStack.Push(replaceAll(varTerm,splChar,objOp2));

					}
					else
					{
					 pStack.Push(varTerm.replace(objOp1, objOp2));
					}

				}

			}
			else if(varTmp=="EDITCOLUMN"){
				var date_Class = new BCSDate();
				varTerm = arrArgs[2];
				objOp1 = arrArgs[1];
				objOp2 = arrArgs[0];
				pStack.Push(date_Class.editColumn(varTerm, objOp1, objOp2));
			}else if(varTmp=="GETCELL"){

				var date_Class = new BCSDate();
				varTerm = arrArgs[2];
				objOp1 = arrArgs[1];
				objOp2 = arrArgs[0];
				pStack.Push(date_Class.getCell(varTerm, objOp1, objOp2));
			
			}	else if(varTmp=="DIRECTPRINTFORMAT"){
				var date_Class = new BCSDate();
				varTerm = arrArgs[2];
				objOp1 = arrArgs[1];
				objOp2 = arrArgs[0];
				pStack.Push(date_Class.directPrintFormat(varTerm, objOp1, objOp2));
			}

			else if (varTmp == "SETTOTALVALUE") {
				var date_Class = new BCSDate();
				varTerm = arrArgs[2];
				objOp1 = arrArgs[1];
				objOp2 = arrArgs[0];
				pStack.Push(date_Class.SetTotalValue(varTerm, objOp1, objOp2));
			}
			else if (varTmp == "CHKVALUEWITHDB") {
				varTerm = arrArgs[2];
				objOp1 = arrArgs[1];
				objOp2 = arrArgs[0];
				pStack.Push(chkValueWithDB(varTerm, objOp1, objOp2));
			}
			break;
			case "GETROUNDOFF" :
			case "GETCLOSINGSTOCKWLOC":
			case "GETSTOCKVALUEWOLOC":
			case "GETVALUEFROMDB":
			case "EFORMPOPUP":
			if (arrArgs.length < 4){
			    // throw varTmp + " requires atleast Four argument!";
		         console.log(varTmp+":Exception caught:requires atleast Four argument!");
			     return '';
		     }   
			else if (arrArgs.length > 4){
			     // throw varTmp + " requires only Four argument!";
			     console.log(varTmp+":Exception caught: requires only Four argument!");
			     return '';
			}
				
			varTerm = arrArgs[3];
			objOp1 = arrArgs[2];
			objOp2 = arrArgs[1];
			objOp3 = arrArgs[0];
			if (varTmp == "GETROUNDOFF") {		
				pStack.Push(getRoundOff(varTerm,objOp1,objOp2,objOp3));
			}
			else if(varTmp=="GETCLOSINGSTOCKWLOC"){
				
				 
			   pStack.Push(getClosingStockWLOC(varTerm,objOp1,objOp2,objOp3));
				
			}else if(varTmp=="GETVALUEFROMDB"){

				pStack.Push(getValueFromDB(varTerm,objOp1,objOp2,objOp3));
			   
			}
			else if(varTmp=="GETSTOCKVALUEWOLOC"){

				 pStack.Push(getStockValueWOLOC(varTerm,objOp1,objOp2,objOp3));

			}else if (varTmp === "EFORMPOPUP"){
				pStack.Push(bcs.app.eformPopup(varTerm, objOp1,objOp2, objOp3));
			}
			break;
		case "FORMATVALUE" :
		case "GETCOSTRATEWOLOC":
		case "GENERATEREDIRECTURL":
		case "GETSTOCKVALUE":
			if (arrArgs.length < 4){
			    // throw varTmp + " requires atleast Four argument!";
		         console.log(varTmp+":Exception caught:requires atleast Four argument!");
			     return '';
		     }   
			else if (arrArgs.length > 4){
			     // throw varTmp + " requires only Four argument!";
			     console.log(varTmp+":Exception caught: requires only Four argument!");
			     return '';
			}
				
			varTerm = arrArgs[3];
			objOp1 = arrArgs[2];
			objOp2 = arrArgs[1];
			objOp3 = arrArgs[0];
			var accessFn = new BCSDate();
			if (varTmp == "FORMATVALUE") {
				if (IsNumber(varTerm))
				{
					varTerm = ToNumber(varTerm);
				}
				if (IsNumber(objOp1))
				{
					objOp1 = ToNumber(objOp1);
				}
				var convert = formatGivenValue(varTerm, objOp1,
						objOp2, objOp3);
				pStack.Push(convert);
			}else if(varTmp=="GETCOSTRATEWOLOC"){
				    
				pStack.Push(accessFn.getCostRateWOLOC(varTerm, objOp1,
						objOp2, objOp3));
				
			}else if(varTmp=="GETSTOCKVALUE"){
				
				   pStack.Push(accessFn.getStockValue(varTerm, objOp1,
						objOp2, objOp3));
			}else if(varTmp=="GENERATEREDIRECTURL"){
				
				   pStack.Push(accessFn.generateRedirectURL(varTerm, objOp1,
						objOp2, objOp3));
			}
			break;

		case "FORMATAMOUNT" :
		case "FORMATACCAMOUNT" :
		case "GETHOURS":
		case "FIRESQL" :
			if (arrArgs.length < 6){
			    // throw varTmp + " requires atleast Six argument!";
				 console.log(varTmp+":Exception caught: requires atleast Six argument!");
			     return '';
		     }
			
			else if (arrArgs.length > 6){
			      // throw varTmp + " requires only Six argument!";
				  console.log(varTmp+":Exception caught: requires only Six argument!");
			      return '';
			}
				
			varTerm = arrArgs[5];
			objOp1 = arrArgs[4];
			objOp2 = arrArgs[3];
			objOp3 = arrArgs[2];
			objOp4 = arrArgs[1];
			objOp5 = arrArgs[0];
			if (varTmp === "FIRESQL"){
                var _dateVal=new BCSDate();
				pStack.Push(_dateVal.fireSQL(varTerm, objOp1,objOp2, objOp3, objOp4,objOp5));
			}
			if (varTmp == "FORMATAMOUNT") {
				if (IsNumber(varTerm))
				{
					varTerm = ToNumber(varTerm);
				}
				if (IsNumber(objOp1))
				{
					objOp1 = ToNumber(objOp1);
				}
				var convertFormat = formatGivenValue(varTerm,
						objOp1, objOp2, objOp3, objOp4, objOp5);
				pStack.Push(convertFormat);
			}
			
			if(varTmp === "GETHOURS"){
				var getHrs = getHours(varTerm,objOp1, objOp2, objOp3, objOp4, objOp5);
				pStack.Push(ToNumber(getHrs));
				//pStack.Push(getHours);
			}
			if (varTmp == "FORMATACCAMOUNT") {
				if (IsNumber(varTerm))
				{
					varTerm = ToNumber(varTerm);
				}
				if (IsNumber(objOp1))
				{
					objOp1 = ToNumber(objOp1);
				}
			 /*	if (typeof varTerm != "number" || typeof objOp1 != "number"
						|| typeof objOp2 != "string"
						|| typeof objOp3 != "string"
						|| typeof objOp4 != "string"
						|| typeof objOp5 != "string"){
					//throw "arguments type did not match";
					console.log(varTmp+":Exception caught: arguments type did not match!");
			        return '';
						} */
				    varTerm = arrArgs[5];
					objOp1 = arrArgs[4];
					objOp2 = arrArgs[3];
					objOp3 = arrArgs[2];
					objOp4 = arrArgs[1];
					objOp5 = arrArgs[0];

			        var num=0; var num1=0;	


			        var refField = Ext.getCmp(globalMap.get("EFORMID")+'-'+objOp1.toLowerCase()+"-id");	
					var currencyDetails = Ext.JSON.decode(globalMap.get("CURRENCYDETAILS"));
			        if(objOp1 && refField && currencyDetails)
			        {						
						var fldVal = refField.getValue();
						var curCurrency = currencyDetails[fldVal][0];
						objOp1 = curCurrency['CURDECIMAL'];		        
			        }

                    if(objOp3 && refField && currencyDetails)
			        {
						var currCurrency = currencyDetails[fldVal][0];	
			        	objOp3 = currCurrency[objOp3.toUpperCase()];
			        }

                     var getAmount = 0;

                    if(IsNumber(varTerm))
                    {
                                       
			            getAmount=Math.abs(varTerm).toFixed(objOp1);

                    }



					getAmount += '';

					splitAmt = getAmount.split('.');

					x1 =splitAmt[0];

					x2 = splitAmt.length > 1 ? '.' + splitAmt[1] : '';	
					

					if((objOp2=="T" && objOp3=="T") || (objOp2=="T" && objOp3=="F" && getAmount.length <=4) ){ 

						var rgx = /(\d+)(\d{3})/;
						
						while (rgx.test(x1)) {

						x1 = x1.replace(rgx, '$1' + ',' + '$2');

					   }

				  }
				else if(objOp2=="T" && objOp3=="F" && x1.length>3){
           		        				  
				  var rgx = /(\d+)(\d{2})/;

				  var getStrlen=parseInt(x1.length)-3;

				  var firstset=x1.substring(0,getStrlen);

				  var secondset=x1.substring(x1.length,getStrlen);
					                  
                  while (rgx.test(firstset)) {

					firstset = firstset.replace(rgx, '$1' + ',' + '$2');

					}

				  	x1=firstset+","+secondset;                

				 }
                   					
					convertFormat= x1 + x2;
                      				
					if(varTerm < 0 && objOp4!='' && (objOp4.toUpperCase() =="A" || objOp4.toUpperCase() =="E")){
                   
				     convertFormat="("+convertFormat+")";

					}
					else if(varTerm > 0 && objOp4!=''  && (objOp4.toUpperCase() =="L" || objOp4.toUpperCase() =="I")){

                      convertFormat="("+convertFormat+")";

					}
					pStack.Push(convertFormat);
			}
			break;
		case "YEAROFDATE" :
		case "LASTDAYOFMONTH" :
		case "MONTHOFDATE" :
		case "MANDY" :
		case "YANDM" :
		case "DTOC" :
		case "CTOD" :
		case "WEEKNO":
		case "CMONTHYEAR" :
		case "DAYOFDATE" :
		case "ISEMPTY" :
		case "OPENTRANSFORM":
		case "EXECUTEOPTION":
		case "GETAGE":
		case "GETDAYS":
		case "GETAGEANDDAYS":

			if (arrArgs.length < 1){
			    // throw varTmp + " requires atleast two argument!";
				console.log(varTmp+":Exception caught: requires atleast two argument!");
				return '';
			}
				
			else if (arrArgs.length > 1){
			    // throw varTmp + " requires only two argument!";
			    console.log(varTmp+":Exception caught: requires only two argument!!");
				return '';
			
			}
				
			varTerm = arrArgs[0];
			var _date = new BCSDate();

			if (varTmp == "YEAROFDATE")
		    {
				pStack.Push(_date.yearofdate(varTerm));
			}
			else if (varTmp == "LASTDAYOFMONTH")
		    {
				pStack.Push(_date.lastdayofmonth(varTerm));
			}
			else if (varTmp == "MONTHOFDATE")
		    {
				pStack.Push(_date.monthofdate(varTerm));
			}
			else if (varTmp == "MANDY")
		    {
				pStack.Push(_date.mthandyr(varTerm));
			}
			else if (varTmp == "YANDM")
		    {
				pStack.Push(_date.yrandmth(varTerm));
			}
			else if (varTmp == "DTOC")
		    {
				pStack.Push(_date.datetochar(varTerm));
			}
			else if (varTmp == "CTOD")
		    {
				pStack.Push(_date.chartodate(varTerm));
			}
			else if (varTmp=="WEEKNO")
		    {
				pStack.Push(_date.weekNo(varTerm));
			}
			else if (varTmp == "CMONTHYEAR")
		    {
				pStack.Push(_date.cmonthyear(varTerm));
			}
			else if (varTmp == "DAYOFDATE") {
				pStack.Push(_date.dayofdate(varTerm));
			} else if (varTmp == "ISEMPTY")
		    {
				pStack.Push(_date.isempty(varTerm));
			}
			else if(varTmp =="OPENTRANSFORM")
		    {
				pStack.Push(_date.OpenTransform(varTerm));
			}
			else if(varTmp =="EXECUTEOPTION")
		    {
				pStack.Push(_date.executeOption(varTerm)); 
			}else if(varTmp=="GETAGE"){
			    pStack.Push(_date.getAge(varTerm)); 
			}else if(varTmp=="GETDAYS"){
			    pStack.Push(_date.getDays(varTerm)); 
			}else if(varTmp=="GETAGEANDDAYS"){
			   pStack.Push(_date.getAgeAndDays(varTerm)); 
			}


			break;

		case "ADDTODATE" :
		case "ADDTOMONTH" :
		case "DAYSELAPSED" :
		case "TIMEELAPSED" :
		case "ADDTOTIME" :
		case "ISEMPTYVALUE" :
		case "FORMATDATETIME" :
		case "CELL" :
		case "GETSUBTOTAL" :
		case "GETID" :
		case "GETOLD" :
		case "FIELDCHANGED":
		case "FIELDCHANGEDBOOLEAN":
		case "SETSEQUENCE":
		case "GETRCELL":
		case "TRANSPOSETOEFORM":
		case "SEARCHUTILITY":
		case "SETBACKGROUND":

			if (arrArgs.length < 2){
               // throw varTmp + " requires atleast two argument!";
			    console.log(varTmp+":Exception caught:  requires atleast two argument!");
				return '';
			
			}
				
			else if (arrArgs.length > 2){
			    console.log(varTmp+":Exception caught:requires only two argument!");
				return '';
			    // throw varTmp + " requires only two argument!";
			}
				
			objOp1 = arrArgs[1];
			objOp2 = ToNumber(arrArgs[0]);

			var dt = new BCSDate();
			if (varTmp == "ADDTODATE") {
				// alert("DATE FORMAT" + objOp1);
				pStack.Push(dt.addtodate(objOp1, objOp2));
			} 
			else if (varTmp == "ADDTOMONTH")
		    {
				pStack.Push(dt.addtomonth(objOp1, objOp2));
			}
			else if (varTmp == "DAYSELAPSED")
		    {
				pStack.Push(dt.daysElapsed(objOp1, objOp2));
			}

			else if (varTmp == "TIMEELAPSED") {
				pStack.Push(dt.timeElaspsed(objOp1, objOp2));
			} else if (varTmp == "ADDTOTIME")
		    {
				pStack.Push(dt.addtotime(objOp1, objOp2));
			}
			else if (varTmp == "ISEMPTYVALUE")
		    {
				pStack.Push(dt.isemptyvalue(objOp1, objOp2));
			}
			else if (varTmp == "FORMATDATETIME")
				// alert("MIN--"+objOp2);
		{
			pStack.Push(dt.formatdatetime(objOp1, objOp2));
		}
			else if (varTmp == "CELL") {

				pStack.Push(dt.cell(objOp1, objOp2));

			} else if (varTmp == "GETSUBTOTAL") {

				pStack.Push(dt.getSubTotal(objOp1, objOp2));

			} else if (varTmp == "GETID") {

				pStack.Push(dt.getID(objOp1, objOp2));

			} else if (varTmp == "GETOLD") {

				pStack.Push(dt.getOld(objOp1, objOp2));

			}else if (varTmp=="FIELDCHANGED"){

				pStack.Push(dt.fieldChanged(arrArgs[1], arrArgs[0]));
			}
			else if (varTmp=="FIELDCHANGEDBOOLEAN")
			{

				pStack.Push(dt.fieldChangedBoolean(arrArgs[1], arrArgs[0]));
			}
			
			else if(varTmp=="SETSEQUENCE"){

				pStack.Push(dt.setSequence(arrArgs[1], arrArgs[0]));
			
			
			}else if (varTmp=="GETRCELL")
			{
				pStack.Push(dt.getRCell(arrArgs[1],arrArgs[0]));
			}else if (varTmp=="SEARCHUTILITY")
			{
				pStack.Push(dt.searchUtility(arrArgs[1],arrArgs[0]));
			}else if (varTmp=="TRANSPOSETOEFORM")
			{
				pStack.Push(dt.transposetoeform(arrArgs[1],arrArgs[0]));
			}
			else if (varTmp=="SETBACKGROUND")
			{
				pStack.Push(dt.setBackground(arrArgs[1],arrArgs[0]));
			}

			break;

		case "MAKEDATE" :
		case "VALIDENCODEDATE" :
		case "SUM" :
		case "SETVALUE" :
		case "FINDRECORD" :
		case "LINKFORMTRANS":
			if (arrArgs.length < 3)
			{
				// throw varTmp + " requires atleast three argument!";
				console.log(varTmp+":Exception caught: requires atleast three argument!");
				return '';
			}
			else if (arrArgs.length > 3)
			{
				// throw varTmp + " requires only three argument!";
				console.log(varTmp+":Exception caught: requires only three argument!");
				return '';

			}
			objOp1 = arrArgs[1];
			objOp2 = arrArgs[0];
			objOp3 = arrArgs[2];

			var _dateVal = new BCSDate();
			if (varTmp == "MAKEDATE")
		    {
				pStack.Push(_dateVal.mkDate(objOp3, objOp1, objOp2));
			}
			else if (varTmp == "VALIDENCODEDATE")
		    {
				pStack.Push(_dateVal.validencodedate(objOp3, objOp1, objOp2));
			}
			else if (varTmp == "SUM")
		    {
				pStack.Push(_dateVal.gridsum(objOp3, objOp1, objOp2));
			}
			else if (varTmp == "SETVALUE")
		    {
				pStack.Push(_dateVal.setvalue(objOp3, objOp1, objOp2));
			}
			else if (varTmp == "FINDRECORD")
		    {
				pStack.Push(_dateVal.findRecord(objOp3, objOp1, objOp2));
			}
			else if(varTmp =="LINKFORMTRANS")
		    {
				pStack.Push(linkFormTrans(objOp3, objOp1, objOp2));
			}

			break;
	/** This Cases Accept only one parameter**/
		case "TOTAL" :
		case "GETMIN" :
		case "GETMAX" :
		case "GETROWCOUNT" :
		case "REFRESHFRAME" :
		case "REFRESHFIELD" :
		case "FORCEREFRESHFIELD" :
		case "VIEWTRANSACTION" :
		case "OPENURL" :
		case "OPENHELPURL" :
		case "ADDCONTEXTMENU" :
		case "INITGRID" :
		case "XRUN" :
		case "HIDECOLUMN":
		case "UNHIDECOLUMN":
		case "ADDOPTION":
		case "LOADDATA":
		case "CEIL":
	    case "FIRESQLARRAY":
		case "CURRENTDAYOFWEEK":
		case "GETFIRSTDATEOFMONTH":
		case "REMAININGDAYSOFMONTH":
		case "GETDAYSINMONTH":
        case "MENUITEM":
        case "FILEARCHIVEBEFORESAVE":
        case "FILEARCHIVEEXISTS":
		case "SETFILLGRIDNAME" :
		case "SHOWALERT" :
		case "FIRESQLCACHEFORGRID":
		case "CLOSEEFORM":
		case "IMMEDIATECLOSEEFORM":
		case "SHOWDIALOG":
		case "FLOOR":
		
				
			if (arrArgs.length < 1){
			
                // throw varTmp + " requires atleast One argument!";
				console.log(varTmp+":Exception caught: requires atleast One argument!");
				return '';
			}
				
			else if (arrArgs.length > 1){
				// throw varTmp + " requires atleast One argument!";
			    console.log(varTmp+":Exception caught: requires atleast One argument!");
				return '';
			}
			
			objOp1 = arrArgs[0];
			var _dateVal = new BCSDate();
			if (varTmp == "TOTAL")
		    {
				pStack.Push(_dateVal.gridcoltotal(objOp1));
			}
			else if (varTmp == "GETMIN")
		    {
				pStack.Push(_dateVal.getmin(objOp1));
			}
			else if (varTmp == "GETMAX")
		    {
				pStack.Push(_dateVal.getmax(objOp1));
			}
			else if (varTmp == "GETROWCOUNT")
		    {
				pStack.Push(_dateVal.getrowcount(objOp1));
			}
			else if (varTmp == "REFRESHFRAME")
		    {
				pStack.Push(_dateVal.refreshFrame(objOp1));
			}
			else if (varTmp == "INITGRID")
		    {
				pStack.Push(_dateVal.initGrid(objOp1));
			}
			else if (varTmp == "REFRESHFIELD")
		    {
				pStack.Push(_dateVal.refreshField(objOp1));
			}
			else if (varTmp == "XRUN")
		    {
				pStack.Push(_dateVal.xrun(objOp1));
			}
			else if (varTmp == "HIDECOLUMN")
		    {
				pStack.Push(_dateVal.hideColumn(objOp1));
			}
			else if(varTmp=="UNHIDECOLUMN")
		    {
				pStack.Push(_dateVal.unHideColumn(objOp1));
			}
			else if (varTmp == "ADDOPTION")
		    {
				pStack.Push(_dateVal.addOption(objOp1));
			}
			else if(varTmp=="LOADDATA")
		    {
				pStack.Push(_dateVal.loadData(objOp1));
			}
			else if(varTmp=="CEIL")
		    {
				pStack.Push(_dateVal.ceil(objOp1));
			}
			else if(varTmp === "FIRESQLARRAY")
		    {
				pStack.Push(_dateVal.fireSqlArray(objOp1));
			}
			//Newly Introduced Function, For getting dayname in client side only.
			else if(varTmp=="CURRENTDAYOFWEEK")
		    {
				pStack.Push(_dateVal.currentDayOfWeek(objOp1));
			}
			else if(varTmp == "GETFIRSTDATEOFMONTH"){
				 pStack.Push(_dateVal.getFirstDateOfMonth(objOp1));
			}
			else if(varTmp=="REMAININGDAYSOFMONTH")
		    {
				pStack.Push(_dateVal.remainingDaysOfMonth(objOp1));
			}
			else if(varTmp=="GETDAYSINMONTH")
		    {
				pStack.Push(_dateVal.getDaysInMonth(objOp1));
			}
			else if(varTmp=="VIEWTRANSACTION")
		    {
				pStack.Push(bcs.app.contextmenu.viewTransaction(objOp1,contextData));
			}
			else if(varTmp=="OPENURL")
		    {
				pStack.Push(bcs.app.contextmenu.openUrl(objOp1));
			}else if(varTmp=="OPENHELPURL")
		    {
				pStack.Push(openHelpUrl(objOp1));
			}
			else if(varTmp=="ADDCONTEXTMENU")
		    {
				pStack.Push(bcs.app.contextmenu.addContextMenu(objOp1));
			}
            else if(varTmp=="MENUITEM")
		    {
				pStack.Push(bcs.app.actions.makeActionMenuForPortlet(objOp1));
			}
			else if (varTmp == "FORCEREFRESHFIELD")
		    {
				pStack.Push(bcs.app.forceRefreshField(objOp1));
			}
			else if (varTmp == "FILEARCHIVEBEFORESAVE")
		    {
				pStack.Push(_dateVal.fileArchiveBeforeSave(objOp1));
			}
			else if (varTmp == "FILEARCHIVEEXISTS")
		    {
				pStack.Push(_dateVal.fileArchiveExists(objOp1));
			}
			else if (varTmp == "SETFILLGRIDNAME")
		    {
				pStack.Push( bcs.app.setFillGridName(objOp1));
			}
			else if(varTmp === "SHOWALERT"){
			
				pStack.Push(bcs.app.showAlert(objOp1));
			}
			else if (varTmp === "FIRESQLCACHEFORGRID"){
			
				pStack.Push(bcs.app.fireSqlCacheForGrid(objOp1));
			}
			else if (varTmp === "CLOSEEFORM"){
			
				pStack.Push(bcs.app.closeEForm(objOp1));
			}else if (varTmp === "IMMEDIATECLOSEEFORM"){
			
				pStack.Push(bcs.app.immediateCloseEForm(objOp1));
			}
			else if (varTmp === "SHOWDIALOG"){
			
				pStack.Push(bcs.app.showDialog(objOp1));
			}
			else if(varTmp=="FLOOR")
		    {
			    pStack.Push(_dateVal.floor(objOp1));
			}
			break;

   /** This Case accept only two parameters.**/
		case "GETVALUE" :
		case "GETROW" :
		case "HIDEFRAME" :
		case "ACTIVATEFIELD" :
		case "ENABLEBUTTON" :
		case "SHOWHIDEBUTTON" :
		case "ALLOWFRAMECHANGE" :
		case "SETSYSTEMVAR" :
		case "PRINTPREVIEW":
     	case "MULTIPRINTPREVIEW":
		case "VIEWREPORT" :
		case "LOADTSTRUCT":
		case "SETPREVIEWSTATUS" :
        case "TRUNC":
		case "LOADDATANEW":
		
			if (arrArgs.length < 2){
				// throw varTmp + " requires atleast Two argument!";
			    console.log(varTmp+":Exception caught:  requires atleast Two argument!");
				return '';
			}
				
			else if (arrArgs.length > 2){
				// throw varTmp + " requires only Two argument!";
			    console.log(varTmp+":Exception caught:  requires atleast Two argument!");
				return '';
			}
				
			objOp1 = arrArgs[0];
			objOp2 = arrArgs[1];
			var _dateVal = new BCSDate();
			if (varTmp == "GETVALUE")
		    {
				pStack.Push(_dateVal.getvalue(objOp2, objOp1));
			}
			else if (varTmp == "GETROW")
		    {
				pStack.Push(_dateVal.getrow(objOp2, objOp1));
			}
			else if (varTmp == "HIDEFRAME")
		    {
				pStack.Push(_dateVal.hideFrame(objOp2, objOp1));
			}
			else if (varTmp == "ENABLEBUTTON")
		    {
				pStack.Push(_dateVal.enableButton(objOp2, objOp1));
			}else if (varTmp == "SHOWHIDEBUTTON")
		    {
				pStack.Push(_dateVal.showHideButton(objOp2, objOp1));
			}
			else if (varTmp == "ACTIVATEFIELD")
		    {
				return _dateVal.activateField(objOp2, objOp1);
			}
			else if (varTmp == "ALLOWFRAMECHANGE")
		    {
				pStack.Push(_dateVal.allowFrameChange(objOp2, objOp1));
			}
			else if (varTmp == "SETSYSTEMVAR")
		    {
				pStack.Push(_dateVal.setSystemVar(objOp2, objOp1));
			}
			else if(varTmp == "PRINTPREVIEW")
		    {
				pStack.Push(_dateVal.printPreview(objOp2, objOp1));
			}
		    else if(varTmp == "MULTIPRINTPREVIEW")
		    {
				pStack.Push(_dateVal.multiprintPreview(objOp2, objOp1));
			}
			else if(varTmp== "VIEWREPORT")
		    {
				pStack.Push(bcs.app.contextmenu.viewReport(objOp2, objOp1));
			}
			else if(varTmp== "LOADTSTRUCT")
		    {
				pStack.Push(loadTstructNew(objOp2, objOp1));
			}
			else if(varTmp== "LOADDATANEW")
		    {
				pStack.Push(loadDataNew(objOp2, objOp1));
			}
			else if (varTmp === "SETPREVIEWSTATUS") {
				pStack.Push(bcs.app.showJasperReport(objOp2, objOp1));
			}
			else if (varTmp === "TRUNC") {
				pStack.Push(_dateVal.trunc(objOp2, objOp1));
			}
		
		
			break;

   /** This Block Case require Three Arguments**/
		case "DRAWHTMLTABLE":

			if(arrArgs.length < 3){
				
				console.log(varTmp+":Exception caught:  requires atleast three argument!");
				return '';
			}
			else if (arrArgs.length > 3){
				console.log(varTmp+":Exception caught:  requires only three argument!");
				return '';			    
			}

			objOp1 = arrArgs[0];
			objOp2 = arrArgs[1];
			objOp3 = arrArgs[2];
			var _dateVal = new BCSDate();
			
			if (varTmp == "DRAWHTMLTABLE")
		    {
				pStack.Push(_dateVal.drawHtmlTable(objOp3,objOp2, objOp1));
			}

			break;

    /** This Case All Function require Four parameters **/
		case "SUMTILL" :

			if (arrArgs.length < 4){

			    // throw varTmp + " requires atleast three argument!";
			    console.log(varTmp+":Exception caught:  requires atleast three argument!");
				return '';
			}
				
			else if (arrArgs.length > 4){
				console.log(varTmp+":Exception caught:  requires only three argument!");
				return '';
			    // throw varTmp + " requires only three argument!";
			}
			
			objOp1 = arrArgs[0];
			objOp2 = arrArgs[1];
			objOp3 = arrArgs[2];
			objOp4 = arrArgs[3];
			var _dateVal = new BCSDate();
			if (varTmp == "SUMTILL")
		    {
				pStack.Push(_dateVal.sumtill(objOp4, objOp3, objOp2, objOp1));
			}

			break;
			
		case "GRIDCOLCONCAT" :

			if (arrArgs.length < 4){

			    // throw varTmp + " requires atleast three argument!";
			    console.log(varTmp+":Exception caught:  requires atleast three argument!");
				return '';
			}
				
			else if (arrArgs.length > 4){
				console.log(varTmp+":Exception caught:  requires only three argument!");
				return '';
			    // throw varTmp + " requires only three argument!";
			}
			
			objOp1 = arrArgs[0];
			objOp2 = arrArgs[1];
			objOp3 = arrArgs[2];
			objOp4 = arrArgs[3];
			var _dateVal = new BCSDate();
			if (varTmp == "GRIDCOLCONCAT")
		    {
				pStack.Push(bcs.app.gridColConcat(objOp4, objOp3, objOp2, objOp1));
			}

		 break;	
			 
		case "GEN_ID" :

			if (arrArgs.length < 2){
				// throw varTmp + " requires atleast two argument!";
			    console.log(varTmp+":Exception caught:  requires atleast three argument!");
				return '';
			
			}	
			else if (arrArgs.length > 2){
			    // throw varTmp + " requires only two argument ! "
			    console.log(varTmp+":Exception caught:  requires atleast three argument!");
				return '';
			}
				
			objOp1 = arrArgs[1];
			objOp2 = arrArgs[0];
			var callFn = new BCSDate();
			if (varTmp == "GEN_ID")
		    {
				pStack.Push(callFn.gen_id(objOp1, objOp2));
			}
			break;
   
      /** This Cases used for Seven parameters.**/
		case "CHECKSTOCKWOLOC":
			
			if(arrArgs.length > 7){
				
				console.log(varTmp+":Exception caught:  requires atleast seven argument!");
				return false;
				
			}else if(arrArgs.length < 7){
				console.log(varTmp+":Exception caught:  requires atleast seven argument!");
				return false;
				
			}
				varTerm=arrArgs[6];
				objOp1 = arrArgs[5];
				objOp2 = arrArgs[4];
				objOp3 = arrArgs[3];
				objOp4 = arrArgs[2];
				objOp5 = arrArgs[1];
				objOp6 = arrArgs[0];
			var callFn = new BCSDate();
			if (varTmp == "CHECKSTOCKWOLOC")
		    {
				pStack.Push(callFn.checkStockWOLOC(varTerm, objOp1,objOp2,objOp3,objOp4,objOp5,objOp6));
			}
			
			break;
		case "CHECKSTOCKWLOC":
			
		if(arrArgs.length > 8){
				
				console.log(varTmp+":Exception caught:  requires Only seven argument!");
				return false;
				
			}else if(arrArgs.length < 8){
				console.log(varTmp+":Exception caught:  requires atleast seven argument!");
				return false;
				
			}

				varTerm=arrArgs[7];
				objOp1 = arrArgs[6];
				objOp2 = arrArgs[5];
				objOp3 = arrArgs[4];
				objOp4 = arrArgs[3];
				objOp5 = arrArgs[2];
				objOp6 = arrArgs[1];
				objOp7 = arrArgs[0];
				
			var callFn = new BCSDate();
			if (varTmp == "CHECKSTOCKWLOC")
		    {
				pStack.Push(callFn.checkStockWLOC(varTerm, objOp1,objOp2,objOp3,objOp4,objOp5,objOp6,objOp7));
			}
			
			break;
	}
}

/*------------------------------------------------------------------------------
 * NAME       : IsNumber
 * PURPOSE    : Checks whether the specified parameter is a number.
 * RETURNS    : True - If supplied parameter can be succesfully converted to a number
 *              False - Otherwise
 *----------------------------------------------------------------------------*/
function IsNumber(pstrVal) {
	var dblNo = Number.NaN;
    
	if(pstrVal === " "){
	      dblNo = Number.NaN;
	}else{
	dblNo = new Number(pstrVal);
	}
	if (isNaN(dblNo))
	{
		return false;
	}
	return true;
}

/*------------------------------------------------------------------------------
 * NAME       : IsBoolean
 * PURPOSE    : Checks whether the specified parameter is a boolean value.
 * PARAMETERS : pstrVal - The string to be checked.
 * RETURNS    : True - If supplied parameter is a boolean constant
 *              False - Otherwise
 *----------------------------------------------------------------------------*/
function IsBoolean(pstrVal) {
	var varType = typeof(pstrVal);
	var strTmp = null;

	if (varType == "boolean")
	{
		return true;
	}
	if (varType == "number" || varType == "function" || varType == undefined)
	{
		return false;
	}
	if (IsNumber(pstrVal))
	{
		return false;
	}
	if (varType == "object") {
		strTmp = pstrVal.toString();
		if (strTmp.toUpperCase() == "TRUE" || strTmp.toUpperCase() == "FALSE")
		{
			return true;
		}
	}
	if (pstrVal == null || typeof(pstrVal) != 'string') {

		return true;

	}
	if (pstrVal.toUpperCase() == "TRUE" || pstrVal.toUpperCase() == "FALSE")
	{
		return true;
	}
	return false;
}

/*------------------------------------------------------------------------------
 * NAME       : ToNumber
 * PURPOSE    : Converts the supplied parameter to numaric type.
 * PARAMETERS : pobjVal - The string to be converted to equvalent number.
 * RETURNS    : numeric value if string represents a number
 * THROWS     : Exception if string can not be converted 
 *----------------------------------------------------------------------------*/
function ToNumber(pobjVal) {
	var dblRet = Number.NaN;

	if (typeof(pobjVal) == "number")
	{
		return pobjVal;
	}
	else {
		dblRet = new Number(pobjVal);
		if (isNaN(dblRet.valueOf()))
		{
			return pobjVal;
		}
		else
		{
			return dblRet.valueOf();
		}
	}
}

/*------------------------------------------------------------------------------
 * NAME       : ToBoolean
 * PURPOSE    : Converts the supplied parameter to boolean value
 * PARAMETERS : pobjVal - The parameter to be converted.
 * RETURNS    : Boolean value
 *----------------------------------------------------------------------------*/
function ToBoolean(pobjVal) {
	var dblNo = Number.NaN;
	var strTmp = null;

	if (pobjVal == null || pobjVal == undefined)
	{
		throw "Boolean value is not defined!";
	}
	else if (typeof(pobjVal) == "boolean")
	{
		return pobjVal;
	}
	else if (typeof(pobjVal) == "number")
	{
		return (pobjval > 0);
	}
	else if (IsNumber(pobjVal)) {
		dblNo = ToNumber(pobjVal);
		if (isNaN(dblNo))
		{
			return null;
		}
		else
		{
			return (dblNo > 0);
		}
	} else if (typeof(pobjVal) == "object") {
		strTmp = pobjVal.toString();
		if (strTmp.toUpperCase() == "TRUE")
		{
			return true;
		}
		else if (strTmp.toUpperCase() == "FALSE")
		{
			return false;
		}
		else
		{
			return null;
		}
	} else if (typeof(pobjVal) == "string") {
		if (pobjVal.toUpperCase() == "TRUE")
		{
			return true;
		}
		else if (pobjVal.toUpperCase() == "FALSE")
		{
			return false;
		}
		else
		{
			return null;
		}
	} else
	{
		return null;
	}
}
/*------------------------------------------------------------------------------
 * NAME       : isFloat
 * PURPOSE    : To check whether the given number is Float or Not
 * PARAMETERS : num-Number
 * RETURNS    : Boolean
 *----------------------------------------------------------------------------*/
function isFloat(num) {
	if (IsNumber(num)) {
		var str = num.toString();

		if (str.indexOf('.') != -1) {
			return true;
		} else {
			return false;
		}
	}
	return false;
}

/*------------------------------------------------------------------------------
 * NAME       : isInt
 * PURPOSE    : To check whether the given number is integer or Not
 * PARAMETERS : num-Number
 * RETURNS    : Boolean
 *----------------------------------------------------------------------------*/
function isInt(num) {
	if (IsNumber(num)) {
		var str = num.toString();

		if (str.indexOf('.') == -1) {
			return true;
		} else {
			return false;
		}
	}
	return false;
}

/*------------------------------------------------------------------------------
 * NAME       : Precedence
 * PURPOSE    : Returns the precedence of a given operator
 * PARAMETERS : pstrTok - The operator token whose precedence is to be returned.
 * RETURNS    : Integer
 *----------------------------------------------------------------------------*/
function Precedence(pstrTok) {
	var intRet = 0;

	switch (pstrTok) {
		case "+" :
		case "-" :
			intRet = 5;
			break;
		case "*" :
		case "/" :
		case "%" :
			intRet = 6;
			break;
		case "^" :
			intRet = 7;
			break;
		case UNARY_NEG :
		case "!" :
			intRet = 10;
			break;
		case "(" :
			intRet = 99;
			break;
		case "&" :
		case "|" :
			intRet = 3;
			break;
		case ">" :
		case ">=" :
		case "<" :
		case "<=" :
		case "=" :
		case "<>" :
			intRet = 4;
			break;
		default :
			if (IsFunction(pstrTok))
		{
			intRet = 9;
		}
			else
		    {
				intRet = 0;
			}
			break;
	}
	debugAssert("Precedence of " + pstrTok + " is " + intRet);
	return intRet;
}

/*------------------------------------------------------------------------------
 * NAME       : debugAssert
 * PURPOSE    : Shows a messagebox displaying supplied message
 * PARAMETERS : pObject - The object whose string representation is to be displayed.
 * RETURNS    : Nothing
 *----------------------------------------------------------------------------*/
function debugAssert(pObject) {
	if (DEBUG_ON)
	{
		alert(pObject.toString());
	}
}

/*******************************************************************************
 * BCS_Stack.js
 ******************************************************************************/

function Stack() {
	this.arrStack = new Array();
	this.intIndex = 0;

	this.Size = getSize;
	this.IsEmpty = isStackEmpty;
	this.Push = pushElement;
	this.Pop = popElement;
	this.Get = getElement;
	this.toString = dumpStack;
}

// Converts stack contents into a comma seperated string
function dumpStack() {
	var intCntr = 0;
	var strRet = "";
	if (this.intIndex == 0)
	{
		return null;
	}
	for (intCntr = 0; intCntr < this.intIndex; intCntr++) {
		if (strRet.length == 0)
		{
			strRet += this.arrStack[intCntr];
		}
		else
		{
			strRet += "," + this.arrStack[intCntr];
		}
	}
	return strRet;
}

// Returns size of stack
function getSize() {
	return this.intIndex;
}

// This method tells us if this Stack object is empty
function isStackEmpty() {
	if (this.intIndex == 0)
	{
		return true;
	}
	else
	{
		return false;
	}
}

// This method pushes a new element onto the top of the stack
function pushElement(newData) {
	// Assign our new element to the top
	debugAssert("Pushing " + newData);
	this.arrStack[this.intIndex] = newData;
	this.intIndex++;
}

// This method pops the top element off of the stack
function popElement() {
	var retVal;

	retVal = null;
	if (this.intIndex > 0) {
		// Assign our new element to the top
		this.intIndex--;
		retVal = this.arrStack[this.intIndex];
	}
	return retVal;
}

// Gets an element at a particular offset from top of the stack
function getElement(intPos) {
	var retVal;

	// alert ("Size : " + this.intIndex + ", Index " + intPos);
	if (intPos >= 0 && intPos < this.intIndex)
	{
		retVal = this.arrStack[this.intIndex - intPos - 1];
	}
	return retVal;
}
/*******************************************************************************
 * BCS_Tokaniser.js
 * 
 ******************************************************************************/

var lstAlpha = "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,uv,w,x,y,z";
var lstDigits = "0,1,2,3,4,5,6,7,8,9";
var lstArithOps = "^,*,/,%,+,-";
var lstLogicOps = "!,&,|";
var lstCompaOps = "<,<=,>,>=,<>,=";
var lstFuncOps = ["ABS", "DATE", "UCASE", "LCASE", "LOWER", "TIME", "ROUND",
		"STR", "EVAL","EVALSTRING","AMTWORD", "CURRAMTWORD", "RND", "POWER", "SUBSTR",
		"REVERSESTRING", "GETLENGTH", "PAD", "LEFTPAD", "GETMOD", "TRIMVAL",
		"TRIM", "VAL", "STUFF", "IIF", "ISEMPTYVALUE", "FINDANDREPLACE",
		"FORMATVALUE", "FORMATAMOUNT", "FORMATACCAMOUNT", "INSTR", "ADDTODATE",
		"ADDTOMONTH", "YEAROFDATE", "LASTDAYOFMONTH", "MONTHOFDATE",
		"CMONTHYEAR", "MAKEDATE", "MANDY", "YANDM", "DTOC", "CTOD","WEEKNO",
		"DAYSELAPSED", "DAYOFDATE", "TIMEELAPSED", "ADDTOTIME", "ISEMPTYVALUE",
		"ISEMPTY", "GETINTEGER", "UPPER", "VALIDENCODEDATE", "TOTAL", "GETMIN",
		"GETMAX", "GETROWCOUNT", "GETVALUE", "GETROW", "SUM", "SUMTILL",
		"SETVALUE", "REFRESHFIELD","FORCEREFRESHFIELD","VIEWTRANSACTION","OPENURL","OPENHELPURL","ADDCONTEXTMENU","VIEWREPORT","ADDICON", "FORMATDATETIME", "CELL", "GETSUBTOTAL",
		"GETID", "GETOLD", "SQLREGVAR", "REGVAR", "SETPROPERTY", "FIRESQL",
		"SQLGET", "GEN_ID", "FINDRECORD", "HIDEFRAME", "REFRESHFRAME","LOADDATA","GRIDCOLCONCAT",
		"INITGRID", "ACTIVATEFIELD", "ENABLEBUTTON","SHOWHIDEBUTTON", "ALLOWFRAMECHANGE",
		"SETSYSTEMVAR", "RESETACTIVECOMP","OPENTRANSFORM","EXECUTEOPTION","FIELDCHANGED","FIELDCHANGEDBOOLEAN","SETSEQUENCE","GETROUNDOFF",
		"GETCOSTRATEWOLOC","GETCOSTRATEWLOC","GETCLOSINGSTOCKWOLOC","GETCLOSINGSTOCKWLOC","CHECKSTOCKWOLOC","CHECKSTOCKWLOC",
		"GETSTOCKAGE","GETSTOCKVALUEWLOC","GETSTOCKVALUEWOLOC","HIDECOLUMN","UNHIDECOLUMN","ADDOPTION","REFRESHVIEW","FILEATTACHMENT","FORCEVOUCHERADJUSTMENTBEFORESAVE","EDITCOLUMN","SETCOLUMNVALUE",
		"SETCELLFONT","ISVALIDDROP","CEIL","POSTRECORD","GETCELL","SETDECIMALTONUMBER","APPENDNUMBER","DIRECTPRINTFORMAT","GETRCELL","DRAWHTMLTABLE",
		"FIRESQLARRAY","PRINTPREVIEW","SEARCHUTILITY","CURRENTDAYOFWEEK","HIDECOLUMNREPORT","SENDSMS","SENDMAIL",
		"DATETIME","STRLENGTH","BCSSERVERDATE","BCSSERVERTIME","REMAININGDAYSOFMONTH",
		"GETDAYSINMONTH","SETTOTALVALUE","MULTIPRINTPREVIEW","MENUITEM","REMAINDER","GETVALUEFROMDB","SETPROPERTYBYCONDITION"
		,"FILEARCHIVEBEFORESAVE","FILEARCHIVEEXISTS","SETPREVIEWSTATUS","SETFILLGRIDNAME","CONTAINS","SHOWALERT","FIRESQLCACHEFORNONGRID","FIRESQLCACHEFORGRID","CLOSEEFORM","IMMEDIATECLOSEEFORM","CACHESQLGET","GETFIRSTDATEOFMONTH","TRANSPOSETOEFORM","GETSQLLIST","OPENEREPORT","SHOWDIALOG","EFORMPOPUP","LINKFORMTRANS","GETHOURS","OPENPAGE","GETAGE","GETDAYS","GETAGEANDDAYS","FLOOR","TRUNC","GETLATITUDE","GETLONGITUDE","VALIDATELATLNG","CHKFORREGEXPR","LOADTSTRUCT","LOADDATANEW","GENERATEREDIRECTURL","CHKVALUEWITHDB"];
		  

/*------------------------------------------------------------------------------
 * NAME       : Tokanize
 * PURPOSE    : Breaks the string into a token array. It also checks whether the
 *              parenthesis, single quotes and double quotes are balanced or not.
 * PARAMETERS : inputExpression - The string from which token array is to be 
 *              constructed.
 * RETURNS    : An array of tokens.
 * THROWS     : Unterminated string constant - Single/Double quotes are not 
 *                                             properly terminated
 *              Unbalanced parenthesis - Opening/closing braces are not balanced
 *----------------------------------------------------------------------------*/
function Tokanize(inputExpression)// Here V pass the Expression To be
									// Evaluated
{
	var intCntr, intBraces;
	var arrTokens;
	var intIndex, intPos;
	var chrChar, chrNext;
	var strToken, prevToken;

	intCntr = 0;
	intBraces = 0;
	intIndex = 0;
	strToken = "";
	arrTokens = new Array();
	pstrExpression = Trim(inputExpression);
	while (intCntr < pstrExpression.length) {
		prevToken = "";
		chrChar = pstrExpression.substr(intCntr, 1);
		/*
		 * if (window) if (window.status) window.status = "Processing " +
		 * chrChar;
		 */
		switch (chrChar) {
			case " " :
				if (strToken.length > 0) {
					arrTokens[intIndex] = strToken;
					intIndex++;
					strToken = "";
				}
				break;
			case "(" :
				intBraces++;
				if (strToken.length > 0) {
					arrTokens[intIndex] = strToken;
					intIndex++;
					strToken = "";
				}
				arrTokens[intIndex] = chrChar;
				intIndex++;
				break;
			case ")" :
				intBraces--;
				if (strToken.length > 0) {
					arrTokens[intIndex] = strToken;
					intIndex++;
					strToken = "";
				}
				arrTokens[intIndex] = chrChar;
				intIndex++;
				break;
			case "^" :
				if (strToken.length > 0) {
					arrTokens[intIndex] = strToken;
					intIndex++;
					strToken = "";
				}
				arrTokens[intIndex] = chrChar;
				intIndex++;
				break;
			case "*" :
				if (strToken.length > 0) {
					arrTokens[intIndex] = strToken;
					intIndex++;
					strToken = "";
				}
				arrTokens[intIndex] = chrChar;
				intIndex++;
				break;
			case "/" :
				if (strToken.length > 0) {
					arrTokens[intIndex] = strToken;
					intIndex++;
					strToken = "";
				}
				arrTokens[intIndex] = chrChar;
				intIndex++;
				break;
			case "%" :
				if (strToken.length > 0) {
					arrTokens[intIndex] = strToken;
					intIndex++;
					strToken = "";
				}
				arrTokens[intIndex] = chrChar;
				intIndex++;
				break;
			case "&" :
				if (strToken.length > 0) {
					arrTokens[intIndex] = strToken;
					intIndex++;
					strToken = "";
				}
				arrTokens[intIndex] = chrChar;
				intIndex++;
				break;
			case "|" :
				if (strToken.length > 0) {
					arrTokens[intIndex] = strToken;
					intIndex++;
					strToken = "";
				}
				arrTokens[intIndex] = chrChar;
				intIndex++;
				break;
			case "," :
				if (strToken.length > 0) {
					arrTokens[intIndex] = strToken;
					intIndex++;
					strToken = "";
				}
				arrTokens[intIndex] = chrChar;
				intIndex++;
				break;
			case "-" :
				if (strToken.length > 0) {
					arrTokens[intIndex] = strToken;
					intIndex++;
					strToken = "";
				}
				chrNext = pstrExpression.substr(intCntr + 1, 1);
				if (arrTokens.length > 0)
			    {
					prevToken = arrTokens[intIndex - 1];
				}
				if (intCntr == 0
						|| ((IsOperator(prevToken) || prevToken == "(" || prevToken == ",") && (IsDigit(chrNext) || chrNext == "("))) {
					// Negative Number
					strToken += chrChar;
				} else {
					arrTokens[intIndex] = chrChar;
					intIndex++;
					strToken = "";
				}
				break;
			case "+" :
				if (strToken.length > 0) {
					arrTokens[intIndex] = strToken;
					intIndex++;
					strToken = "";
				}
				chrNext = pstrExpression.substr(intCntr + 1, 1);
				if (arrTokens.length > 0)
			    {
					prevToken = arrTokens[intIndex - 1];
				}
				if (intCntr == 0
						|| ((IsOperator(prevToken) || prevToken == "(" || prevToken == ",") && (IsDigit(chrNext) || chrNext == "("))) {
					// positive Number
					strToken += chrChar;
				} else {
					arrTokens[intIndex] = chrChar;
					intIndex++;
					strToken = "";
				}
				break;
			case "<" :
				chrNext = pstrExpression.substr(intCntr + 1, 1);
				if (strToken.length > 0) {
					arrTokens[intIndex] = strToken;
					intIndex++;
					strToken = "";
				}
				if (chrNext == "=") {
					arrTokens[intIndex] = chrChar + "=";
					intIndex++;
					intCntr++;
				} else if (chrNext == ">") {
					arrTokens[intIndex] = chrChar + ">";
					intIndex++;
					intCntr++;
				} else {
					arrTokens[intIndex] = chrChar;
					intIndex++;
				}
				break;
			case ">" :
				chrNext = pstrExpression.substr(intCntr + 1, 1);
				if (strToken.length > 0) {
					arrTokens[intIndex] = strToken;
					intIndex++;
					strToken = "";
				}
				if (chrNext == "=") {
					arrTokens[intIndex] = chrChar + "=";
					intIndex++;
					intCntr++;
				} else {
					arrTokens[intIndex] = chrChar;
					intIndex++;
				}
				break;
			case "=" :
				if (strToken.length > 0) {
					arrTokens[intIndex] = strToken;
					intIndex++;
					strToken = "";
				}
				arrTokens[intIndex] = chrChar;
				intIndex++;
				break;
			case "'" :
				if (strToken.length > 0) {
					arrTokens[intIndex] = strToken;
					intIndex++;
					strToken = "";
				}

				intPos = pstrExpression.indexOf(chrChar, intCntr + 1);
				if (intPos < 0){
					// throw "Unterminated string constant";
				    console.log("uncaught exception:Unterminated string constant");
		            return;
				}
				else {
					strToken += pstrExpression.substring(intCntr + 1, intPos);
					arrTokens[intIndex] = strToken;
					intIndex++;
					strToken = "";
					intCntr = intPos;
				}
				break;
			case "{" :

				if (strToken.length > 0) {

					arrTokens[intIndex] = "{}" + strToken;
					intIndex++;
					strToken = "";
				}

				intPos = pstrExpression.indexOf("}", intCntr + 1);	
				
  
				if (intPos < 0) {
					// throw "Unterminated string constant";
					console.log("uncaught exception:Unterminated string constant!");
		            return;
				}
				else{
					strToken += pstrExpression.substring(intCntr + 1, intPos);						
					strToken=strToken.replace("{","{}");
					var matchedPattern = strToken.match(/{}/g);
					if(matchedPattern!=null){
                    var i=1;
					strToken="";
					while(i<=matchedPattern.length){					                         						 
						 intPos = pstrExpression.indexOf("}", intPos+1);
						 i++;
						 }
				    strToken += pstrExpression.substring(intCntr + 1, intPos);
					}				    
					strToken=strToken.replace("{}","{");
					arrTokens[intIndex] = "{}" + strToken;
					intIndex++;
					strToken = "";
					intCntr = intPos;
				}

				break;
			default :
				strToken += chrChar;
				break;
		}
		intCntr++;
	}
	if (intBraces > 0){

		
		// throw "Unbalanced parenthesis!";
		console.log("This expression "+exprMap.get("currentExpr")+" Unbalanced parenthesis!");
		return false;
	}

	if (strToken.trim().length > 0)
	{
		arrTokens[intIndex] = strToken;
	}
	return arrTokens;
}

/*------------------------------------------------------------------------------
 * NAME       : IsDigit
 * PURPOSE    : Checks whether the character specified by chrArg is a numeric 
 *              character.
 * PARAMETERS : chrArg - The character to be checked
 * RETURNS    : False - If chrArg is not a numeric character
 *              True - Otherwise 
 *----------------------------------------------------------------------------*/
function IsDigit(chrArg) {
	if (lstDigits.indexOf(chrArg) >= 0)
	{
		return true;
	}
	return false;
}

/*------------------------------------------------------------------------------
 * NAME       : IsAlpha
 * PURPOSE    : Checks whether the character specified by chrArg is a alphabet 
 * PARAMETERS : chrArg - The character to be checked
 * RETURNS    : False - If chrArg is not a alphabet
 *              True - Otherwise 
 *----------------------------------------------------------------------------*/
function IsAlpha(chrArg) {
	if (lstAlpha.indexOf(chrArg) >= 0
			|| lstAlpha.toUpperCase().indexOf(chrArg) >= 0)
	{
		return true;
	}
	return false;
}

/*------------------------------------------------------------------------------
 * NAME       : IsOperator
 * PURPOSE    : Checks whether the string specified by strArg is an operator
 * PARAMETERS : strArg - The string to be checked
 * RETURNS    : False - If strArg is not an operator symbol
 *              True - Otherwise 
 *----------------------------------------------------------------------------*/
function IsOperator(strArg) {
	if (lstArithOps.indexOf(strArg) >= 0 || lstCompaOps.indexOf(strArg) >= 0)
	{
		return true;
	}
	return false;
}

/*------------------------------------------------------------------------------
 * NAME       : IsFunction
 * PURPOSE    : Checks whether the string specified by strArg is a function name
 * PARAMETERS : strArg - The string to be checked
 * RETURNS    : False - If strArg is not a valid built-in function name.
 *              True - Otherwise 
 *----------------------------------------------------------------------------*/
function IsFunction(strArg) {
	var idx = 0;

	strArg = strArg.toUpperCase();
	for (idx = 0; idx < lstFuncOps.length; idx++) {
		if (strArg == lstFuncOps[idx])
		{
			return true;
		}
	}
	return false;
}

/*------------------------------------------------------------------------------
 * NAME       : Trim
 * PURPOSE    : Removes trailing and leading spaces from a string.
 * PARAMETERS : pstrVal - The string from which leading and trailing spaces are 
 *              to be removed.
 * RETURNS    : A string with leading and trailing spaces removed.
 *----------------------------------------------------------------------------*/
function Trim(pstrVal) {
	
   if(typeof pstrVal ==  "string" ){
	if(pstrVal.substr(0,2)=='{}'){
		return pstrVal;
	}
   }
   
	if(typeof pstrVal == "number")
	{
		return pstrVal;
	}
	
	if(pstrVal !=null || pstrVal != undefined){
	if (pstrVal.length < 1)
	{
		return "";
	}

	pstrVal = RTrim(pstrVal);
	pstrVal = LTrim(pstrVal);
	if (pstrVal == "")
	{
		return "";
	}
	else
	{
		return pstrVal;
	}
  }      

}

/*------------------------------------------------------------------------------
 * NAME       : RTrim
 * PURPOSE    : Removes trailing spaces from a string.
 * PARAMETERS : pstrValue - The string from which trailing spaces are to be removed.
 * RETURNS    : A string with trailing spaces removed.
 *----------------------------------------------------------------------------*/
function RTrim(pstrValue) {

	if(pstrValue != null || pstrValue != undefined){
	var w_space = String.fromCharCode(32);
	var v_length = pstrValue.length;
	var strTemp = "";
	if (v_length < 0) {
		return "";
	}
	var iTemp = v_length - 1;

	while (iTemp > -1) {
		if (pstrValue.charAt(iTemp) == w_space) {
		} else {
			strTemp = pstrValue.substring(0, iTemp + 1);
			break;
		}
		iTemp = iTemp - 1;
	}
	return strTemp;
	}
}

/*------------------------------------------------------------------------------
 * NAME       : LTrim
 * PURPOSE    : Removes leading spaces from a string.
 * PARAMETERS : pstrValue - The string from which leading spaces are to be removed.
 * RETURNS    : A string with leading spaces removed.
 *----------------------------------------------------------------------------*/
function LTrim(pstrValue) {

	if(pstrValue != null || pstrValue != undefined){
	var w_space = String.fromCharCode(32);
	if (v_length < 1) {
		return "";
	}
	var v_length = pstrValue.length;
	var strTemp = "";
	var iTemp = 0;

	while (iTemp < v_length) {
		if (pstrValue.charAt(iTemp) == w_space) {
		} else {
			strTemp = pstrValue.substring(iTemp, v_length);
			break;
		}
		iTemp = iTemp + 1;
	}
	return strTemp;
	}
}
/*******************************************************************************
 * expression.js
 ******************************************************************************/

var ctExprMap = {};

function nextGetExpr(GetObj){

	var CrntObj = new Array();

	CrntObj.getExp = GetObj.expression;

    ctExprMap.add("expr",CrntObj.getExp);

	CrntObj.getId = GetObj.id;

	var GetEform = CrntObj.getId.split("-");

	ExprObj = new Expression("");

	var basicId=GetEform[0]+"TOGETBASICID";

	ExprObj.Expression(CrntObj.getExp,basicId, GetObj);

	var result = ExprObj.Evaluate();

	$eTracker.add(basicId+":=="+GetObj.expression,result);

	return result;

}

function getReportExpr(GetObj){

	var CrntObj = new Array();
	CrntObj.getExp = GetObj.expression;
    ctExprMap.add("expr",CrntObj.getExp);
	CrntObj.getId = GetObj.id;
	var GetEform = CrntObj.getId.split("-");
	ExprObj = new Expression("");
	ExprObj.Expression(CrntObj.getExp, GetEform[0], GetObj);
	var GetVal = ExprObj.Evaluate();
	$eTracker.add(GetEform[0]+":=="+GetObj.expression,GetVal);
	return GetVal;

}
function GetExpr(GetObj){
	//This line is for field changed.written by raja.i
	globalMap.add("fieldChangedExp","");

	var CrntObj = new Array();

	CrntObj.getExp = GetObj.expression;

    ctExprMap.add("expr",CrntObj.getExp);

	CrntObj.getId = GetObj.id;

	var GetEform = CrntObj.getId.split("-");

	ExprObj = new Expression("");

	ExprObj.Expression(CrntObj.getExp, GetEform[0], GetObj);

	var GetVal = ExprObj.Evaluate();

	$eTracker.add(GetEform[0]+":=="+GetObj.expression,GetVal);
	
	//This line is for field changed.written by raja.i
	if(GetVal != false && globalMap.get("fieldChangedExp") != "" && globalMap.get("fieldChangedExp") != null && GetVal.toLowerCase() != 't')
	{
		var fieldId = globalMap.get("fieldChangedExp");
		Ext.getCmp(fieldId).setValue(Ext.getCmp(fieldId).previousValue);
	}

	if (GetVal != false){

		if(GetObj.dataType=="N"){

           if(IsNumber(GetVal))
           {

            if(GetObj.decimalPrecision)

			   {
				   GetVal = Number(GetVal).toFixed(GetObj.decimalPrecision);
			   }

            else if(GetObj.decimals)
			{
				GetVal= Number(GetVal).toFixed(GetObj.decimals);
			}
            else if(GetObj.decimal)
			{
				GetVal= Number(GetVal).toFixed(GetObj.decimal);
			}

           }
           else
           {
               GetVal = 0;
           }

		}

		Ext.getCmp(CrntObj.getId).setValue(GetVal);

		Ext.getCmp(CrntObj.getId).value = GetVal;

	}
	else{

		if (GetObj.dataType == "N") {

			Ext.getCmp(CrntObj.getId).setValue(0);

			Ext.getCmp(CrntObj.getId).value = 0;

		}

		else {

			Ext.getCmp(CrntObj.getId).setValue('');

			Ext.getCmp(CrntObj.getId).value = '';

		}

	}

/*	var secondSiblingObj=Ext.getCmp(GetObj.NF+"-id");

			 if(secondSiblingObj!=undefined){	

				if(secondSiblingObj.hidden==true || secondSiblingObj.readOnly==true)
				{                       
				 
				reFireNonGridExpression(secondSiblingObj);
				}
				else
				{

				return ;

				}

			}

	
*/
}

var postArray = null;
var postTarget = null;
var postFrameNos = 0;
var postCurrentRow = 0;

function setExpr(GetObj, targetPrototype, eformID, frameArray,currentFrameNos,tr) {

	var value = "";
	var CrntObj = new Array();
	CrntObj.getExp = GetObj.expression;
	CrntObj.getId = GetObj.id;
	ExprObj = new Expression("");
	postArray = frameArray;
	postTarget = targetPrototype;
    postFrameNos=currentFrameNos;
    postCurrentRow = tr;
	ctExprMap.add("expr",CrntObj.getExp);
	ExprObj.Expression(CrntObj.getExp, eformID, GetObj);
	var GetVal = ExprObj.Evaluate();

	$eTracker.add(eformID+":=="+GetObj.expression,GetVal);

	if (GetVal != false) {

	   if(GetObj.dataType=="N"){

       if(IsNumber(GetVal))
       {

        if(GetObj.decimalPrecision!=undefined)

		   {
			   GetObj.value=Number(GetVal).toFixed(GetObj.decimalPrecision);
		   }

		else  if(GetObj.decimals!=undefined)

		   {
			   GetObj.value=Number(GetVal).toFixed(GetObj.decimals);
		   }
		else  if(GetObj.decimal != undefined)

		   {
			   GetObj.value=Number(GetVal).toFixed(GetObj.decimal);
		   }

        }
        else
        {
            GetVal = 0;
        }

	   }
	   else

		{
			GetObj.value=GetVal;
		}


	} else {

		if (GetObj.dataType == "N") {
			GetObj.value = 0;
		} else {
			GetObj.value = '';
		}

	}
	postArray = null;
	postTarget = null;
	postFrameNos = 0;
	postCurrentRow = 0;

}


function GetValidExpr(GetObj) {
	//This line is for field changed.written by raja.i
	globalMap.add("fieldChangedExp","");

	var ValidObj = new Array();

	ValidObj.getExp = GetObj.validateExpression;

	ctExprMap.add("expr",ValidObj.getExp);

	ValidObj.name = GetObj.name;

	var GetEform = ValidObj.name.split("-");

	ExprObj = new Expression("");

	ExprObj.Expression(ValidObj.getExp, GetEform[0], GetObj);

	var GetVal = ExprObj.Evaluate();
	
	//This line is for field changed.written by raja.i
	if(GetVal != false && globalMap.get("fieldChangedExp") != "" && globalMap.get("fieldChangedExp") != null && GetVal.toLowerCase() != 't')
	{
		var fieldId = globalMap.get("fieldChangedExp");
		Ext.getCmp(fieldId).setValue(Ext.getCmp(fieldId).previousValue);
	}

	$veTracker.add(GetEform[0]+":=="+GetObj.validateExpression,GetVal);
	return GetVal;

}

function GetValidExpr(GetObj,frameArray,targetPrototype,currentFrameNos,tr) {
	
	//This line is for field changed.written by raja.i
	globalMap.add("fieldChangedExp","");
	
	postArray = frameArray;
	postTarget = targetPrototype;
    postFrameNos=currentFrameNos;
    postCurrentRow =  tr;
	var ValidObj = new Array();

	ValidObj.getExp = GetObj.validateExpression;

	ctExprMap.add("expr",ValidObj.getExp);

	ValidObj.name = GetObj.name;

	var GetEform = ValidObj.name.split("-");

	ExprObj = new Expression("");

	ExprObj.Expression(ValidObj.getExp, GetEform[0], GetObj);

	var GetVal = ExprObj.Evaluate();
	
	//This line is for field changed.written by raja.i
	if(GetVal != false && globalMap.get("fieldChangedExp") != "" && globalMap.get("fieldChangedExp") != null && GetVal.toLowerCase() != 't')
	{
		var fieldId = globalMap.get("fieldChangedExp");
		Ext.getCmp(fieldId).setValue(Ext.getCmp(fieldId).previousValue);
	}

	$veTracker.add(GetEform[0]+":=="+GetObj.validateExpression,GetVal);

	postArray = null;
	postTarget = null;
	postFrameNos = 0;
	postCurrentRow =  0;
	return GetVal;

}
function GetValidExprForReport(GetObj) {

	var ValidObj = new Array();
 
	ValidObj.getExp = GetObj.validateExpression;

	ctExprMap.add("expr",ValidObj.getExp);

	ValidObj.id = GetObj.id;

	var GetEform = ValidObj.id.split("-");

	ExprObj = new Expression("");

	ExprObj.Expression(ValidObj.getExp, GetEform[0], GetObj);
     
    var GetVal = ExprObj.Evaluate();

	$veTracker.add(GetEform[0]+":=="+GetObj.validateExpression,GetVal);


	/*  if(GetVal!="T"){
	  
	     alert(GetVal);
         Ext.getCmp(GetObj.id).focus();
	
	  }
	  else if(GetVal=="T"){
	  
	  
	  }
	  else{
	  
	     alert("ERR--"+GetVal)
	  }*/


	return GetVal;

}
function GetHiddenExpr(getHdnObj) {

	var getExp = getHdnObj.expression;

	ctExprMap.add("expr",getExp);

	var getId = getHdnObj.id;

	var GetEform = getId.split("-");

	ExprObj = new Expression("");

	ExprObj.Expression(getExp, GetEform[0], getHdnObj);

	var getResult = ExprObj.Evaluate();

    $eTracker.add(GetEform[0]+":=="+getHdnObj.expression,getResult);

    if(getResult == 0 || getResult == "0"){

       Ext.getCmp(getId).setValue(getResult);	
	
	}

	if (getResult != false){

		if(getHdnObj.dataType=="N"){

        if(IsNumber(getResult))
        {

          if(getHdnObj.decimalPrecision!=undefined)
		 
			{
				getResult= Number(getResult).toFixed(getHdnObj.decimalPrecision);
			}

		  else if(getHdnObj.decimals!=undefined)

			{
				getResult= Number(getResult).toFixed(getHdnObj.decimals);
			}
          
		  else if(getHdnObj.decimal != undefined)

			{
				getResult= Number(getResult).toFixed(getHdnObj.decimal);
			}

        }
        else
        {

            getResult = 0;


        }

		}

		Ext.getCmp(getId).setValue(getResult);

	}

	else {

		if (getHdnObj.dataType == "N")

		{
			Ext.getCmp(getId).setValue(0);
		}

		else

		{
			Ext.getCmp(getId).setValue("");
		}

	}

	validateHiddenExpr(getHdnObj);

/*	var secondSiblingObj=Ext.getCmp(getHdnObj.NF+"-id");

			 if(secondSiblingObj!=undefined){	

				if(secondSiblingObj.hidden==true || secondSiblingObj.readOnly==true)
				{                       
				 
				 reFireNonGridExpression(secondSiblingObj);	                     

				}
				else
				{

				return ;

				}

			}
  */
}


function GridValidExpr(GridCrntObj){

	var getExp = GridCrntObj.validateExpression;

	ctExprMap.add("expr",getExp);

	var getName = GridCrntObj.name;

	var GetEform = getName.split("-");

	ExprObj = new Expression("");

	ExprObj.Expression(getExp, GetEform[0], GridCrntObj);

	var GetVal = ExprObj.Evaluate();

	$veTracker.add(GetEform[0]+":=="+getExp,GetVal);

	return GetVal;

}

function GridValidExpr(GetObj,frameArray,targetPrototype,currentFrameNos,tr) {


    postArray = frameArray;
    postTarget = targetPrototype;
    postFrameNos=currentFrameNos;
    postCurrentRow =  tr;
    var ValidObj = new Array();

    ValidObj.getExp = GetObj.validateExpression;

    ctExprMap.add("expr",ValidObj.getExp);

    ValidObj.name = GetObj.name;

    var GetEform = ValidObj.name.split("-");

    ExprObj = new Expression("");

    ExprObj.Expression(ValidObj.getExp, GetEform[0], GetObj);

    var GetVal = ExprObj.Evaluate();

    $veTracker.add(GetEform[0]+":=="+GetObj.validateExpression,GetVal);

    postArray = null;
    postTarget = null;
    postFrameNos = 0;
    postCurrentRow =  0;
    return GetVal;

}



function GetExprUIValidation(GetObj) {

	var ValidObj = new Array();

	ValidObj.getExp = GetObj.expression;

	ctExprMap.add("expr",ValidObj.getExp);

	ValidObj.name = GetObj.name;

	var GetEform = ValidObj.name.split("-");

	ExprObj = new Expression("");

	ExprObj.Expression(ValidObj.getExp, GetEform[0], GetObj);

	var GetVal = ExprObj.Evaluate();

	$eTracker.add(GetEform[0]+":=="+ GetObj.expression,GetVal);

	if (GetVal != false){

		if(GetObj.dataType=="N"){

         if(IsNumber(GetVal))
         {
		
            if(GetObj.decimalPrecision!=undefined)

			 {
				 GetVal=Number(GetVal).toFixed(GetObj.decimalPrecision);
			 }

            else if(GetObj.decimals !=undefined)

			 {
				 GetVal=Number(GetVal).toFixed(GetObj.decimals);
			 }

            else if(GetObj.decimal !=undefined)

			 {
				 GetVal=Number(GetVal).toFixed(GetObj.decimal);
			 }
         }
         else
         {

             GetVal = 0;

         }

		}

		return GetVal;
	}
	else

    {
		return GetVal;
	}

}


function GetCacheExprUIValidation(GetObj) {

	var ValidObj = new Array();

	ValidObj.getExp = GetObj.gridExp;

	ctExprMap.add("expr",ValidObj.getExp);

	ValidObj.name = GetObj.name;

	var GetEform = ValidObj.name.split("-");

	ExprObj = new Expression("");

	ExprObj.Expression(ValidObj.getExp, GetEform[0], GetObj);

	var GetVal = ExprObj.Evaluate();

	$eTracker.add(GetEform[0]+":=="+ GetObj.expression,GetVal);

	if (GetVal != false){

		if(GetObj.dataType=="N"){

         if(IsNumber(GetVal))
         {
		
            if(GetObj.decimalPrecision!=undefined)

			 {
				 GetVal=Number(GetVal).toFixed(GetObj.decimalPrecision);
			 }

            else if(GetObj.decimals !=undefined)

			 {
				 GetVal=Number(GetVal).toFixed(GetObj.decimals);
			 }

            else if(GetObj.decimal !=undefined)

			 {
				 GetVal=Number(GetVal).toFixed(GetObj.decimal);
			 }
         }
         else
         {

             GetVal = 0;

         }

		}

		return GetVal;
	}
	else

    {
		return GetVal;
	}

}

function GridHiddenExpr(getColObj, Expr){

	gridColname = getColObj.expression;

	ctExprMap.add("expr",gridColname);

	gridColname = getColObj.name;

	var GetEform = gridColname.split("-");

	ExprObj = new Expression("");

	ExprObj.Expression(Expr, GetEform[0], getColObj);

	var getResult = ExprObj.Evaluate();
	
	$eTracker.add(GetEform[0]+":=="+ getColObj.expression,getResult);

	if (getResult != false){

		if(getColObj.dataType=="N"){

       if(IsNumber(getResult))
       {
 
        if(getColObj.decimalPrecision!=undefined)
						
		   {
			   getResult=Number(getResult).toFixed(getColObj.decimalPrecision);
		   }

		else if(getColObj.decimals !=undefined)

		   {
			   getResult=Number(getResult).toFixed(getColObj.decimals);
		   }
        
		else if(getColObj.decimal !=undefined)

		   {
			   getResult=Number(getResult).toFixed(getColObj.decimal);
		   }

       }
       else
       {

           getResult =0;

       }


		}

		return getResult;
	}

	else {

		if (getColObj.dataType == "N")

		{
			return 0;
		}

		else

		{
			return '';
		}

	}


}

function GridExpr(GridCrntObj){

	var getExp = GridCrntObj.expression;

    ctExprMap.add("expr",getExp);

	var getName = GridCrntObj.name;

	var GetEform = getName.split("-");

	ExprObj = new Expression("");

	ExprObj.Expression(getExp, GetEform[0], GridCrntObj);

	var getResult = ExprObj.Evaluate();

    $eTracker.add(GetEform[0]+":=="+ getExp,getResult);

	if (getResult != false){

		if(GridCrntObj.dataType=="N"){

      if(IsNumber(getResult))
      {
        if(GridCrntObj.decimalPrecision!=undefined)
        
		  {
			  getResult=Number(getResult).toFixed(GridCrntObj.decimalPrecision);
		  }

		else  if(GridCrntObj.decimals !=undefined)

		  {
			  getResult=Number(getResult).toFixed(GridCrntObj.decimals);
		  }
        
		else  if(GridCrntObj.decimal != undefined)

		  {
			  getResult=Number(getResult).toFixed(GridCrntObj.decimal);
		  }
      }
      else
      {
          getResult = 0;
      }

		}

		return getResult;

	}
	else{

		if (GridCrntObj.dataType == "N")

		{
			return 0;
		}

		else

		{
			return '';
		}

	}

}


function GridExprRow(GridCrntObj,rowNos){

	var getExp = GridCrntObj.expression;

    ctExprMap.add("expr",getExp);
    
    if(rowNos != null)
    {
    	//pgActivRow = rowNos;
    	activeRow = rowNos;
    }
	var getName = GridCrntObj.name;

	var GetEform = getName.split("-");

	ExprObj = new Expression("");

	ExprObj.Expression(getExp, GetEform[0], GridCrntObj);

	var getResult = ExprObj.Evaluate();
	 $eTracker.add(GetEform[0]+":=="+ getExp,getResult);

	if (getResult != false){

		if(GridCrntObj.dataType=="N"){

      if(IsNumber(getResult))
      {
            if(GridCrntObj.decimalPrecision!=undefined)

		  {
			  getResult=Number(getResult).toFixed(GridCrntObj.decimalPrecision);
		  }

            else if(GridCrntObj.decimals !=undefined)

		  {
			  getResult=Number(getResult).toFixed(GridCrntObj.decimals);
		  }

            else if(GridCrntObj.decimal != undefined)

		  {
			  getResult=Number(getResult).toFixed(GridCrntObj.decimal);
		  }
       }
       else
       {

           getResult = 0;

       }
	  }

		return getResult;

	}
	else{

		if (GridCrntObj.dataType == "N")

		{
			return 0;
		}

		else

		{
			return '';
		}

	}

}

function GridCacheExprRow(GridCrntObj,rowNos){

	var getExp = GridCrntObj.gridExp;

    ctExprMap.add("expr",getExp);
    
    if(rowNos != null)
    {
    	//pgActivRow = rowNos;
    	activeRow = rowNos;
    }
	var getName = GridCrntObj.name;

	var GetEform = getName.split("-");

	ExprObj = new Expression("");

	ExprObj.Expression(getExp, GetEform[0], GridCrntObj);

	var getResult = ExprObj.Evaluate();
	 $eTracker.add(GetEform[0]+":=="+ getExp,getResult);

	if (getResult != false){

		if(GridCrntObj.dataType=="N"){

      if(IsNumber(getResult))
      {
            if(GridCrntObj.decimalPrecision!=undefined)

		  {
			  getResult=Number(getResult).toFixed(GridCrntObj.decimalPrecision);
		  }

            else if(GridCrntObj.decimals !=undefined)

		  {
			  getResult=Number(getResult).toFixed(GridCrntObj.decimals);
		  }

            else if(GridCrntObj.decimal != undefined)

		  {
			  getResult=Number(getResult).toFixed(GridCrntObj.decimal);
		  }
       }
       else
       {

           getResult = 0;

       }
	  }

		return getResult;

	}
	else{

		if (GridCrntObj.dataType == "N")

		{
			return 0;
		}

		else

		{
			return '';
		}

	}

}


function GridValidExprRow(GridCrntObj,rowNos){

    var getExp = GridCrntObj.validateExpression;

    ctExprMap.add("expr",getExp);

    if(rowNos != null)
    {
        //pgActivRow = rowNos;
        activeRow = rowNos;
    }
    var getName = GridCrntObj.name;

    var GetEform = getName.split("-");

    ExprObj = new Expression("");

    ExprObj.Expression(getExp, GetEform[0], GridCrntObj);

    var getResult = ExprObj.Evaluate();
    $eTracker.add(GetEform[0]+":=="+ getExp,getResult);

  
    return getResult;
}

function getSubgridControlExprn(sfExprn,eid){

ExprObj=new Expression("");

ExprObj.Expression(sfExprn,eid);

var getResult=ExprObj.Evaluate();

$eTracker.add(eid+":=SG="+ sfExprn,getResult);

if(getResult =='T' || getResult == 't'){

return true;

}
else
{

return false;

}

console.log(getResult);


}


function getSubgridValidateExprn(sfExprn,eid){

ExprObj=new Expression("");

ExprObj.Expression(sfExprn,eid);

var getResult=ExprObj.Evaluate();
$veTracker.add(eid+":=SG="+ sfExprn,getResult);
return getResult;

}

function reportEvaluateVariable(field,expressionSet){
         
		

		  var getFieldval = "";

		  var patt = /{}/g;

		  var result = patt.exec(field);

		  if (result == "{}") {

            getFieldval = (expressionSet == 0) ?  field.substring(2, field.length) : "{" + field.substring(2, field.length)+ "}";

		  }else if(IsDigit(field)){

		       getFieldval=field;
		  }
          else if(IsFunction(field))
		  {
			  getFieldval=field;
		  }
	        else if(IsOperator(field) || field =="&")
		  {
			  getFieldval=field;
		  }
		  else if (ARG_TERMINAL==field)
		  {
			  getFieldval=field;
		  }
          else
		  {
			  var colValues=reportCtStatus.get("colExprVal");
			  var iParamValues=reportCtStatus.get("inputParamVal");
			  
			  
			  var mainAppPanel = Ext.getCmp('doc-body');
		      var grid = mainAppPanel.getActiveTab().items.items[0];
			  
			  if(grid &&  grid.model){
			     //new implemented
			     var modelMap = grid.model;
			     var currentRow = modelMap.get("current_record");
			     var userInput = modelMap.get("user_input_values");

			     var config = grid.config;
			     var iViewVariables = config.dataModel.getIViewVariables();

			     if (globalMap.get(field.toUpperCase())) {
			     	getFieldval = globalMap.get(field.toUpperCase());

			     } else if (_.has(iViewVariables, field.toLowerCase())) {

			     	getFieldval = iViewVariables[field.toLowerCase()];

			     }else if (currentRow && currentRow.data && currentRow.data[field.toLowerCase()]!=undefined) { 
				 //else if (currentRow && currentRow.data && currentRow.data[field.toLowerCase()]) {
                    //if(currentRow.data[field.toLowerCase()]){
			     	getFieldval = currentRow.data[field.toLowerCase()].toString();
					//}
			     } else if (userInput && userInput[field.toLowerCase()] != undefined) {
			     	getFieldval = userInput[field.toLowerCase()];

			     } else {

			     	getFieldval = field;
			     }
				 
				    var str = getFieldval;

					if (str != null && str != 0 && str != ''){

						var str = getFieldval.toString();
						var patt1 = /\D/g;
						pattern_match = str.match(patt1);
						if (pattern_match == null || pattern_match == "."){
							if(str=="."){
							getFieldval = getFieldval;
						    }else{
							getFieldval = Number(getFieldval);
							}
						}
					}
				 return getFieldval;
				 
		     }
			  

			  else {

			  var queryMasterID=reportCtStatus.get('QID');

              if(globalMap.get(field.toUpperCase())!= undefined)
			  {
                   getFieldval=globalMap.get(field.toUpperCase());
			  }
			  else if(queryMasterID != undefined && reportEventVarMap.containsKey(queryMasterID.concat(':-:').concat(field.toLowerCase())))
			  {

			         getFieldval=reportEventVarMap.get(queryMasterID.concat(':-:').concat(field.toLowerCase()));
			    
			  }
			  else if(colValues&&colValues[field.toLowerCase()] != undefined){

			         getFieldval=colValues[field.toLowerCase()];

			  }
			  else if(field.toLowerCase().substring(0,3) == "sum"){
				    var records=reportCtStatus.get("store");
					var index=field.toLowerCase().substring(3);
					getFieldval=sumByField(records,index);
			  }
			  else if(colValues && colValues[field.toLowerCase().substring(3)] != undefined && field.toLowerCase().substring(0,3) == "tot"){
				    var records=reportCtStatus.get("store");
					var index=field.toLowerCase().substring(3);
					getFieldval=sumByField(records,index);
			  }
			  
			  else if(colValues&&colValues[field.toLowerCase().substring(4)] != undefined){

				      /*---Closing Balance Calculation----*/

					  getFieldval=colValues[field.toLowerCase().substring(4)];

					  /*----Closing Balance Calculation---*/
					 
			  }

			   else if(colValues&&colValues[field.toLowerCase().substring(3)] != undefined){

				      /*---Closing Balance Calculation----*/

					  getFieldval=colValues[field.toLowerCase().substring(3)];

					  /*----Closing Balance Calculation---*/
					 
			  }
			  
			  else if(iParamValues&&iParamValues[field.toLowerCase()] != undefined)
			  {
                    getFieldval=iParamValues[field.toLowerCase()];

			  }
			  else{
			  
			       getFieldval=field;
			  }

					var str = getFieldval;

					if (str != null && str != 0 && str != ''){

						var str = getFieldval.toString();
						var patt1 = /\D/g;
						pattern_match = str.match(patt1);
						if (pattern_match == null || pattern_match == "."){
							if(str=="."){
							getFieldval = getFieldval;
						    }else{
							getFieldval = Number(getFieldval);
							}
						}
					}

		  }

		

}
return getFieldval;
}

function reportParamEvaluateVariable(field,expressionSet){

          var getFieldval = "";

		  var patt = /{}/g;

		  var result = patt.exec(field);

		  if (result == "{}") {

            getFieldval = (expressionSet == 0) ?  field.substring(2, field.length) : "{" + field.substring(2, field.length)+ "}";

		  }else if(IsDigit(field)){

		       getFieldval=field;
		  }
          else if(IsFunction(field))
		  {
			  getFieldval=field;
		  }
	      else if(IsOperator(field))
		  {
			  getFieldval=field;
		  }
		  else if (ARG_TERMINAL==field)
		  {
			  getFieldval=field;

		  }
		  else if(globalMap.get(field)){
		   
		    getFieldval=globalMap.get(field);
		  
		  }
		  else{
		  
		      var comp=getExtjsReportComp(field);

			  if(comp.hasOwnProperty('xtype')){

				  if(comp.xtype=='textfield'){

                     getFieldval=comp.getValue();
				     
				  }
				  else if (comp.xtype=='datefield')
				  {
                        getFieldval=comp.getValue();
				  }
				  else if (comp.xtype=='combo')
				  {
                          
						  var masterid;
						  if(comp.metadata.value_field){
							masterid=comp.metadata.value_field.toLowerCase();
						  }
						  else{
						    masterid = comp.metadata.store.fields[0];
						  }
						  
						  if(comp.displayTplData[0] != 'undefined')
						  {
						  	  getFieldval=comp.displayTplData[0][masterid];
                              if(getFieldval ==  undefined)
                              {


                                  var storeid = comp.store.storeId;
                                  var listIndex = Ext.data.StoreManager.lookup(comp.store.storeId).find(comp.displayField, comp.getValue() , 0, false, false,true);
                                  if(listIndex >= 0 )
                                  {

                                      getFieldval = Ext.data.StoreManager.lookup(storeid).getAt(listIndex).get(masterid);
                                  }
                              }

						  }

				  }

			  }else{
			  
			    getFieldval=field;
			  
			  }

			  
		  
		  }
		  return getFieldval;

}

function getExtjsReportComp(field){

       
       //return Ext.getCmp("report-"+field.toLowerCase()+"-id");
	    var obj =  Ext.getCmp(GetparseObj.report.replaceAll("-","")+"-"+field.toLowerCase()+"-id");
	   if(!obj){
	   		obj =Ext.getCmp(GetparseObj.report.replaceAll("-","")+"-"+field.toLowerCase()+"-id"+GetparseObj.queryMasterID);
	   }

       
       return obj;



}

function evaluateVariable(getField,storages,getEform, expressionSet) {

     
    
	console.log("evaluate variable");
	
    getField = getField;

    if(getEform=="REPORTEXPR"){
         
         return reportEvaluateVariable(getField,expressionSet);
	  
	}
    else if(getEform=="reportTOGETBASICID"){
	  
	    return reportParamEvaluateVariable(getField,expressionSet);
	
    }

	

	else{
	if (postArray != null && postTarget != null) {

		LObjId = getField.toLowerCase();

        if("?%" == LObjId  )
        {
            getFieldval = LObjId;
            return getFieldval;

        }
        if("+" == LObjId)
        {
            getFieldval = LObjId;
            return getFieldval;

        }
        else if("-" == LObjId)
        {

            getFieldval = LObjId;
            return getFieldval;

        }
        else if("*" == LObjId)
        {

            getFieldval = LObjId;
            return getFieldval;

        }
        else if("/" == LObjId)
        {

            getFieldval = LObjId;
            return getFieldval;

        }
        else if("%" == LObjId)
        {

            getFieldval = LObjId;
            return getFieldval;

        }
        else if("^" == LObjId)
        {

            getFieldval = LObjId;
            return getFieldval;

        }
        else if ("(" == LObjId)
        {

            getFieldval = LObjId;
            return getFieldval;

        }
        else if("&" == LObjId)
        {

            getFieldval = LObjId;
            return getFieldval;

        }
        else if ("|" == LObjId)
        {

            getFieldval = LObjId;
            return getFieldval;

        }
        else if(">" == LObjId)
        {

            getFieldval = LObjId;
            return getFieldval;

        }
        else if(">=" == LObjId)
        {

            getFieldval = LObjId;
            return getFieldval;

        }
        else if("<" == LObjId)
        {

            getFieldval = LObjId;
            return getFieldval;

        }
        else if("<=" == LObjId)
        {

            getFieldval = LObjId;
            return getFieldval;

        }
        else if("=" == LObjId)
        {

            getFieldval = LObjId;
            return getFieldval;

        }
        else if("<>"== LObjId)
        {

            getFieldval = LObjId;
            return getFieldval;
        }
        var globalVar = getField.toUpperCase();
		// if("RECORDID" == globalVar)
		// {
		// 	globalVar = getEform+"-"+getField.toLowerCase()+"-id";
		// 	getFieldval = globalMap.get(globalVar);
        //     $fieldvalue.add(globalVar,getFieldval);//---field value tracking
		// 	return getFieldval;
		// }
		
		if("ACTIVEROW"  == globalVar )
		{
			getFieldval = globalMap.get(globalVar);
			$fieldvalue.add(globalVar,getFieldval);//---field value tracking
			return getFieldval;
			
		}
		var getFieldval = "";
		var visited = true;
		var patt = /{}/g;
		pj = 0;
		var result = patt.exec(getField);


		for (pa = 0; pa < postArray.length; pa++) {

			if (LObjId == postArray[pa].FN) {
				
				if(postArray[pa].DT == "C")
				{
				
				if(postArray[pa].DV != null && postArray[pa].DV.length > 0)
				{
					getFieldval = postArray[pa].DV;
				}
		        	else
					{
						getFieldval = postArray[pa].FV;
					}
				  pj = 1;
				  visited=false;
				 break;
				}
				else if(postArray[pa].DT == "D")
				{
					
					if(postArray[pa].DV != null && postArray[pa].DV.length > 0)
					{
						getFieldval = convertDBFormatToUniversalFormat(postArray[pa].DV);
					}
			        	else
					    {
							getFieldval = convertDBFormatToUniversalFormat(postArray[pa].FV);
						}
					  pj = 1;
					  visited=false;
					 break;
					


				}
				else
				{
					
					if(postArray[pa].ME == "From")
					{
                        if(postArray[pa].SK)
                        {

                            getFieldval = postArray[pa].DV;

                        }
                        else
                        {

                            if(postArray[pa].DV != null && postArray[pa].DV.length > 0  )
							{
								getFieldval = postArray[pa].DV;
							}
                            else
							{
								getFieldval = postArray[pa].FV;
							}
                        }
						
					}
					else
					{
					
					if(postArray[pa].DV > 0)
					{
						getFieldval = postArray[pa].DV;
					}
				        	else
						    {
								getFieldval = postArray[pa].FV;
							}
					}
						  pj = 1;
						  visited=false;
						 break;
					
					
				}
				
				
			}
		}


	   if(visited)
	   {

        for(var container=0 ; container < postTarget.LAYERS.length ; container++ )
		{

			  var fieldArray = postTarget.LAYERS[container];


             if(fieldArray.fieldvalues instanceof Array)
			 {
            
				
				for (pa = 0; pa < fieldArray.fieldvalues.length; pa++) {

						if (LObjId == fieldArray.fieldvalues[pa].FN) {

							if(fieldArray.fieldvalues[pa].DT == "C")
							{

							if(fieldArray.fieldvalues[pa].DV != null && fieldArray.fieldvalues[pa].DV.length > 0)
							{
								getFieldval = fieldArray.fieldvalues[pa].DV;
							}
							else
							{
								getFieldval = fieldArray.fieldvalues[pa].FV;
							}
							pj = 1;
							visited=false;
							break;
						}
						else if(fieldArray.fieldvalues[pa].DT == "D")
						{

							if(fieldArray.fieldvalues[pa].DV != null && fieldArray.fieldvalues[pa].DV.length > 0)
							{
								getFieldval = convertDBFormatToUniversalFormat(fieldArray.fieldvalues[pa].DV);
							}
							else
							{
								getFieldval = convertDBFormatToUniversalFormat(fieldArray.fieldvalues[pa].FV);
							}
							pj = 1;
							visited=false;
							break;



						}
						else
						{

							if(fieldArray.fieldvalues[pa].ME == "From")
							{
								if(fieldArray.fieldvalues[pa].SK)
								{

									getFieldval = fieldArray.fieldvalues[pa].DV;

								}
								else
								{

									if(fieldArray.fieldvalues[pa].DV != null && fieldArray.fieldvalues[pa].DV.length > 0  )
									{
										getFieldval = fieldArray.fieldvalues[pa].DV;
									}
									else
									{
										getFieldval = fieldArray.fieldvalues[pa].FV;
									}
								}

							}
							else
							{

								if(fieldArray.fieldvalues[pa].DV > 0)
								{
									getFieldval = fieldArray.fieldvalues[pa].DV;
								}
								else
								{
									getFieldval = fieldArray.fieldvalues[pa].FV;
								}
							}
							pj = 1;
							visited=false;
							break;


						}


					}
			}// internal for

		
		  }
		  else
		  {

                   var status = false
				   var obj = fieldArray.fieldvalues;

				   for (var key in obj) {

					 for (fa = 0; fa < obj[key].length; fa++) {
							
								status=true;
								objMap= obj[key][fa].GN; 
								break;
					 }

					 if(status)
					   break;



					}

					
            		if(postCurrentRow > 0  )
            		{
	            			var grdObj  = Ext.data.StoreManager.lookup(objMap);

                            if(grdObj.data.length >= postCurrentRow)
                            {

                                var grdVal  = grdObj.data.items[postCurrentRow-1].data[getEform+"-"+LObjId];
                                if(grdVal != null)
                                {
                                    getFieldval = grdVal;
                                }
                            }
            		}



					
				   

		  }
		
		}// end for


	  }
		

		///ending
		

/*	 if(visited)
	 {
		
		for (pt =0 ; pt < postTarget["NOSOFLAYERS"]; pt++)
        {
            	var tlayObj = postTarget["FRAMES"][pt];
            	
            	var ASGRID = postTarget["ASGRID"][pt];
            	var objMap = globalGenMap.get(getEform+"-"+tlayObj);

            	if(objMap != null)
            	{
            		if(ASGRID == "F")
            		{
                        var tstatus = false;
                        for (tlay =0 ; tlay < objMap.length; tlay++)
	            		{

	            			if(objMap[tlay].FN === LObjId)
	            			 {
	            				 tstatus = true;
	            				 
	            				if(objMap[tlay].DT == "C")
	            				{
	            				 
			            				if(objMap[tlay].DV != null && objMap[tlay].DV.length > 0)
									    {
											getFieldval  = objMap[tlay].DV;
										}
						        		else
									    {
											getFieldval  = objMap[tlay].FV;
										}

	            			    }
	            				else if(objMap[tlay].DT == "D")
	            				{
		            				 
		            				if(objMap[tlay].DV != null && objMap[tlay].DV.length > 0)
					        		{
										getFieldval  = convertDBFormatToUniversalFormat(objMap[tlay].DV);
									}
					        		else
					        		{
										getFieldval  = convertDBFormatToUniversalFormat(objMap[tlay].FV);
									}

	            				}
	            				else
	            				{
	            					if(objMap[tlay].ME == "From")
	            					{
                                        if(objMap[tlay].SK)
                                        {

                                            getFieldval = objMap[tlay].DV;

                                        }
                                        else
                                        {
                                            if(objMap[tlay].DV != null && objMap[tlay].DV.length > 0)
											{
												getFieldval  = objMap[tlay].DV;
											}
                                                else
											    {
													getFieldval  = objMap[tlay].FV;
												}
                                        }
	            						
	            					}
	            					else
	            					{
	            						if(objMap[tlay].DV > 0)
						        		{
											getFieldval  = objMap[tlay].DV;
										}
						        		else
						        		{
											getFieldval  = objMap[tlay].FV;
										}
	            						
	            					}

	            					
	            				}


                             }
	            			 if(tstatus)
							{
								 break;
							}
	            		}


                        if(tstatus)
						{
							break;
						}
            		}
            		else
            		{
            			if(postCurrentRow > 0  )
            			{
	            			var grdObj  = Ext.data.StoreManager.lookup(objMap);

                            if(grdObj.data.length >= postCurrentRow)
                            {

                                var grdVal  = grdObj.data.items[postCurrentRow-1].data[getEform+"-"+LObjId];
                                if(grdVal != null)
                                {
                                    getFieldval = grdVal;
                                }
                            }
            			}
            			// alert("Grid Element");
            			
            		}
            		
            	}         		
          }
		
	 }

	 */
		
		
	 if (pj == 0) {
			if (result == "{}") {
				var dataType = '';
				if (expressionSet == 0) {
					getFieldval = getField.substring(2, getField.length);
				} else {
					getFieldval = "{" + getField.substring(2, getField.length)
							+ "}";
				}
			}

			else if (globalMap.get(globalVar)) {

				
				if(getFieldval === "" || getFieldval === null  )
				{
					dataType = '';
					getFieldval = globalMap.get(globalVar);
					$fieldvalue.add(globalVar,getFieldval);//---field value tracking
				}

			} else if (eformVarMap.get(LObjId)) {

				if(getFieldval === "" || getFieldval === null  )
				{
				
					dataType = '';
					getFieldval = eformVarMap.get(LObjId).split(":-:")[1];
					$fieldvalue.add(LObjId,getFieldval);//---field value tracking
				}

			}

			else {
				dataType = '';
				if(getFieldval.length > 0 || getFieldval > 0){
				      
					  getFieldval = getFieldval;

				}
				else{

				   if(!getFieldval)
				   {
        			  getFieldval = globalMap.get(globalVar);
					  if(!getFieldval)
						   getFieldval = getField;
    			   }
    			   else
    			   { 
				  	  getFieldval = getField;
    			   }

				}
			}

			if (dataType == 'N' && getFieldval == '') {

				getFieldval = 0;

			} else if (dataType == 'C' && getFieldval == '') {
				getFieldval = null;
			}

			var str = getFieldval;

			if (str != null && str != 0 && str != '') {
				var str = getFieldval.toString();

				var patt1 = /\D/g;

				pattern_match = str.match(patt1);

				if (pattern_match == null || pattern_match == "."){
							if(str=="."){
							getFieldval = getFieldval;
						    }else{
							getFieldval = Number(getFieldval);
							}
						}

			}
		}

		 if(!getFieldval)
		 {
        	 getFieldval = globalMap.get(globalVar);
    	 }

	} else {

		LObjId = getEform  +'-'+getField.toLowerCase();
         if(storages['pagetype'] == 'txview'){
		combObj = document.getElementById(getField.toLowerCase());
		
		console.log("Component Created"+combObj);
		 }
		else if(storages['pagetype'] == 'displayreport'){
			 let index = storages['item_index'];
			 try
			 {
		       let des_json = null;
			   combObj = null;
			   
			 
			   des_json = storages['desc_json']['comp'];
			   
			 }
			 catch(e)
			 {
				 des_json = null;
				 
			 }
			 
			if(des_json)
			{
				const jsonComp = des_json.filter((item) => {
					console.log(item);console.log(item['id']);return (item['id'] == getField);
				});
				if(jsonComp.length>0)
				{
					combObj = document.getElementById("activerow-"+index);
				}
				else
				{
					combObj = document.getElementById(getField);
				}
			}
		 }
		else{
		 combObj = document.getElementById(getField);
		 console.log("Component Created"+combObj);
		}
		
		
		if(combObj == null){
			combObj = undefined;
		}
		if(!combObj){
			if(GetparseObj&&GetparseObj.queryMasterID){
				combObj = Ext.getCmp(LObjId + "-id"+GetparseObj.queryMasterID);
			}
		}
		//For New Builder
		if(!combObj){
				
			if(GetparseObj &&GetparseObj.report){
				LObjId = GetparseObj.report.replaceAll("-","")+"-"+getField.toLowerCase()+"-id";
				combObj = Ext.getCmp(LObjId);
			
			}	
		
		}
		
        var getFieldval = "";

        if("?%" == LObjId  )
        {
            getFieldval = LObjId;
            return getFieldval;

        }
        if("+" == LObjId)
        {
            getFieldval = LObjId;
            return getFieldval;

        }
        else if("-" == LObjId)
        {

            getFieldval = LObjId;
            return getFieldval;

        }
        else if("*" == LObjId)
        {

            getFieldval = LObjId;
            return getFieldval;

        }
        else if("/" == LObjId)
        {

            getFieldval = LObjId;
            return getFieldval;

        }
        else if("%" == LObjId)
        {

            getFieldval = LObjId;
            return getFieldval;

        }
        else if("^" == LObjId)
        {

            getFieldval = LObjId;
            return getFieldval;

        }
        else if ("(" == LObjId)
        {

            getFieldval = LObjId;
            return getFieldval;

        }
        else if("&" == LObjId)
        {

            getFieldval = LObjId;
            return getFieldval;

        }
        else if ("|" == LObjId)
        {

            getFieldval = LObjId;
            return getFieldval;

        }
        else if(">" == LObjId)
        {

            getFieldval = LObjId;
            return getFieldval;

        }
        else if(">=" == LObjId)
        {

            getFieldval = LObjId;
            return getFieldval;

        }
        else if("<" == LObjId)
        {

            getFieldval = LObjId;
            return getFieldval;

        }
        else if("<=" == LObjId)
        {

            getFieldval = LObjId;
            return getFieldval;

        }
        else if("=" == LObjId)
        {

            getFieldval = LObjId;
            return getFieldval;

        }
        else if("<>"== LObjId)
        {

            getFieldval = LObjId;
            return getFieldval;
        }
		/*
		 * if(combObj){
		 * 
		 * if(getEform=="reportTOGETBASICID"){
		 * 
		 * if (combObj.xtype=='bcscomboremote') { var masterid=combObj.mastID;
		 * getFieldval=combObj.displayTplData[0][masterid]; console.log("combo
		 * report hidden-------"+getFieldval); return getFieldval; }
		 *  } }
		 */
		 
		

		var globalVar = getField.toUpperCase();
	    
		 console.log("globalVar Created"+globalVar);
		
		// if("RECORDID" == globalVar)
		// {
		// 	globalVar = getEform+"-"+getField.toLowerCase()+"-id";
			
		// }

		// var getFieldval = "";

		var patt = /{}/g;

		var result = patt.exec(getField);

		if (result == "{}") {

			var dataType = '';

			if (expressionSet == 0)

			{
				getFieldval = getField.substring(2, getField.length);
			}

			else

			{
				getFieldval = "{" + getField.substring(2, getField.length)
									+ "}";
			}
		}

		else if (combObj != undefined && !IsNumber(getField)) {
			
			
			if(storages['pagetype'] == 'txview'){	
			
			 console.log("Component Created"+combObj);
				if (combObj.tagName == "ION-INPUT"){
					
					if(storages['preset_value'][getField.toLowerCase()+"-displayname"])
					{
						 getFieldval = storages['preset_value'][getField.toLowerCase()+"-displayname"]

					}
					else
					{
					    getFieldval = storages['preset_value'][getField.toLowerCase()]?storages['preset_value'][getField.toLowerCase()].toString():storages['preset_value'][getField.toLowerCase()];
					
					}
                 
					if(getFieldval != null && getFieldval.length == 0)
					{
					   if(storages[globalVar] != undefined){
						   
							getFieldval =storages[globalVar];			
				      	}
					}
					
					if(getFieldval == undefined)
					{
						  if(storages[globalVar] != undefined){
						   
							getFieldval =storages[globalVar];			
				      	}
						
						
					}
				}
				else if (combObj.tagName == "ION-LIST"){
					let radioId = combObj.id;	
					getFieldval = selectedValue;
				}
				else if (combObj.tagName == "ION-DATETIME" || combObj.tagName == "ION-TEXTAREA" || combObj.tagName == "ION-SELECT"){
					if( storages['preset_value'][getField.toLowerCase()] != undefined){
						getFieldval = storages['preset_value'][getField.toLowerCase()];
					}
				}
			}
			else if(storages['pagetype'] == 'displayreport'){
				let index = storages['item_index'];
				let des_json =  null;
				try
				{
				
					des_json=storages['desc_json']['comp'];
						
				}
				catch(e)
				{
					 des_json = null;
				}
				
				try{
					
					if(des_json)
					{
						const jsonComp = des_json.filter((item) => {
							console.log(item);console.log(item['id']);return (item['id'] == getField);
						});
						console.log(jsonComp)
						if(jsonComp.length >0){
							if(jsonComp[0]['type'] == 'text'){
								let id  = "input-"+index+"-"+getField;
								document.getElementById(id).setAttribute('name',id);
								let input = document.getElementsByName(id);
								getFieldval =  input[0]['children'][0]['value'];
							}
							else if(jsonComp[0]['type'] == 'select'){
								let id  = "select-"+index+"-"+getField;
								document.getElementById(id).setAttribute('name',id);
								let select = document.getElementsByName(id);
								getFieldval =  select[0]['textContent'];
							}	
						}
					}
				}
				catch(err){
				console.log(err);
				}
				
			}
		}
		else if(IsNumber(combObj)){
			getFieldval = Number(combObj);
		}
		else if(storages[globalVar] != undefined){
			getFieldval =storages[globalVar];		
            console.log("Global Created"+getFieldval);			
		}
		else if(currentRowObj && currentRowObj.hasOwnProperty(getField)){
			getFieldval = currentRowObj[getField];
			dataType = fieldDataTypes[getField]
		}
		else if (storages[LObjId] != undefined) {
			dataType = '';
			getFieldval = eformVarMap[LObjId].split(":-:")[1];
			//$fieldvalue.add(LObjId,getFieldval);//---field value tracking
		}
		else if (eformVarMap[LObjId] != undefined) {
			dataType = '';
			getFieldval = eformVarMap[LObjId].split(":-:")[1];
			//$fieldvalue.add(LObjId,getFieldval);//---field value tracking
		}
		
		else {
			dataType = '';
			getFieldval = getField;
			//$fieldvalue.add(LObjId,getFieldval);//---field value tracking
		}

		

		var str = getFieldval;

		if (str != null && str != 0 && str != ''){
			var str = getFieldval.toString();

			var patt1 = /\D/g;

			pattern_match = str.match(patt1);

				if (pattern_match == null || pattern_match == "."){
							if(str=="."){
							getFieldval = getFieldval;
						    }else{
								if(dataType != 'C')
								{
									getFieldval = Number(getFieldval);
								}
								else
								{
									getFieldval = getFieldval;
								}
							}
						}

		}

       

	}
	
	if (dataType == 'N' && getFieldval == '') {

		getFieldval = 0;



	} else if (dataType == 'C' && getFieldval == '') {

		getFieldval = null;




	}else if(dataType ==='D'){
		if(getFieldval instanceof Date){
			getFieldval = getFieldval;
		}else{
			getFieldval = new Date(Date.parse(getFieldval));

		}
		//getFieldval = Ext.Date.format(getFieldval, "d/m/Y");
	
	}
	

	if(getFieldval==null){

	//$fieldvalue.add(LObjId,"");//---field value tracking


	  return "";
	}
	else{

	 //$fieldvalue.add(LObjId.split('-')[1],getFieldval);//---field value tracking
       console.log("getFieldval"+ getFieldval);   
	   return getFieldval;
	   
	}

}

}

/*******************************************************************************
 * 
 * Event
 * 
 ******************************************************************************/

// function eventHandler(eventSubFn, eformId, contextData) {


function eventHandler(pstrExp,stValues, GEfromId) {	

	var findComment =/[/]/g,
	validExpr,
	hasVariable,
	ctEform,
	cache,
	resultSet;
	
	validExpr = pstrExp.substring(0, 2).match(findComment);
	if (!validExpr) {
		hasVariable = pstrExp.split(":=");
		//ctEform = globalMap.get("EFORMID");
		ctEform = GEfromId;

		if (hasVariable.length === 1) {
		
			return interfaceToExpr(hasVariable[0],stValues, GEfromId);

		} else {
			cache = hasVariable[0].replace(/^\s*/, "").replace(/\s*$/, "");
			resultSet = interfaceToExpr(hasVariable[1],stValues, GEfromId);
			if (cache !== null && resultSet !== null) {
				// eformVarMap.add(ctEform + "-" + cache.toLowerCase(), " " + ":-:" + resultSet);
				storages[ctEform + "-" + cache.toLowerCase()] = " " + ":-:"+resultSet;
				eformVarMap[ctEform + "-" + cache.toLowerCase()] =  " " + ":-:"+resultSet;

			} else {
				return null;
			}
		}
	}
}

function interfaceToExpr(passFn,stValues, GEfromId) {
	
	var ctEform,
	result;

	if (passFn.indexOf("FIRESQLARRAY") != -1) {
		for (var loop = 0; loop < passFn.length; loop++) {
			if (passFn[loop].indexOf("[") != -1 || passFn[loop].indexOf("]") != -1) {
				passFn = passFn.replace("[", "|_");
				passFn = passFn.replace("]", "_|");
			}

		}

	}

	// if (modifyStatus) {
	// 	if (globalMap.get("SEARCHTYPE") !== "NORMAL") {
	// 		if (passFn.toLowerCase().indexOf("executeoption") === 0) {
	// 			return "";
	// 		}
	// 	}

	// }
	// ctExprMap.add("expr", passFn);
	//ctEform = globalMap.get("EFORMID");
	ctEform = ""
	ExprObj = new Expression("");
	ExprObj.Expression(passFn, stValues, GEfromId, '');

	result = ExprObj.Evaluate();

	return result;
}

function checkEditor(Objname){

var getObject=Ext.getCmp(Objname+"-id");

if(getObject!=null && getObject!=undefined){

if(getObject.editor!=undefined){

 return getObject.editor;

}
else if(getObject.field!=undefined){

 return getObject.field;

}

else

	{
		return null;
	}

}

else{


return null;


}


}



function GetExprForFirstVisibleFields(GetObj){

	var CrntObj = new Array();

	CrntObj.getExp = GetObj.expression;

    ctExprMap.add("expr",CrntObj.getExp);

	CrntObj.getId = GetObj.id;

	var GetEform = CrntObj.getId.split("-");

	ExprObj = new Expression("");

	ExprObj.Expression(CrntObj.getExp, GetEform[0], GetObj);

	var GetVal = ExprObj.Evaluate();

	$eTracker.add(GetEform[0]+":=="+ GetObj.expression,GetVal);

	if (GetVal !== false){

		if(GetObj.dataType=="N"){

         if(IsNumber(GetVal))
         {
            if(GetObj.decimalPrecision)

			 {
				 GetVal==Number(GetVal).toFixed(GetObj.decimalPrecision);
			 }

            else  if(GetObj.decimals)

			 {
				 GetVal==Number(GetVal).toFixed(GetObj.decimals);
			 }

            else  if(GetObj.decimal)

			 {
				 GetVal==Number(GetVal).toFixed(GetObj.decimal);
			 }

         }
         else
         {
             GetVal = 0;
         }


		}
		
		if(GetObj.xtype === "bcsdatefield" && GetObj.plugins && GetObj.plugins !== ""){
			Ext.getCmp(CrntObj.getId).setRawValue(GetVal);
		}else if(GetObj.xtype !== "bcsradiobox" && GetObj.xtype !== "bcscheckbox"){
			var currComp = Ext.getCmp(CrntObj.getId);
			if(currComp.sourceKey){
				var indx = currComp.getStore().find(Ext.getCmp(CrntObj.getId).displayField,GetVal);
				if(indx > -1){
					var rcrd = currComp.getStore().getAt(indx);
					Ext.getCmp(CrntObj.getId).setValue(rcrd.data[currComp.valueField]);
					Ext.getCmp(CrntObj.getId).value = rcrd.data[currComp.valueField];
				}
			}else{
				Ext.getCmp(CrntObj.getId).setValue(GetVal);
				Ext.getCmp(CrntObj.getId).value = GetVal;
			}
			
			
		}

		if(GetObj.xtype === "bcstimefield" && GetVal){
			var splitVal = GetVal.split(':');
			var thistime;
			var hours = splitVal[0];
			var minutes = splitVal[1];
			if(GetObj.timeFormat === "12-hr"){
			 thistime = (hours > 12) ? (hours-12 + ':' + minutes +' PM') : (hours + ':' + minutes +' AM');
			 Ext.getCmp(CrntObj.getId).setValue(hours+':'+minutes);
			 Ext.getCmp(CrntObj.getId).value = hours+':'+minutes;
			}else{
				Ext.getCmp(CrntObj.getId).setValue(GetVal);
				Ext.getCmp(CrntObj.getId).value = GetVal;	
			}
		}

		if(GetObj.xtype === "bcsradiobox"){
			var getInputValue = Ext.getCmp(CrntObj.getId).items;
			for(var val=0; val<getInputValue.items.length; val++){
				if(GetVal && getInputValue.items[val].inputValue.toString() === GetVal.toString()){
					getInputValue.items[val].setValue(true);
				}
			}
			//getInputValue.items[0].focus();
		}
		
		// before change contact shiv Or jaikar.
		if (GetObj.xtype === "bcscheckbox") {
			var getInputValue = Ext.getCmp(CrntObj.getId).items;

			if (GetVal && GetVal instanceof Array) {
				var curFieldName = CrntObj.getId.split("-")[1];
				for (var val = 0; val < getInputValue.items.length; val++) {

					for (var sel = 0; sel < GetVal.length; sel++) {

						if (GetVal[sel][curFieldName] && getInputValue.items[val].inputValue.toString() === GetVal[sel][curFieldName].toString()) {
							getInputValue.items[val].setValue(true);
						}
					}
				}
			} else {
				for (var val = 0; val < getInputValue.items.length; val++) {
					if (GetVal && getInputValue.items[val].inputValue.toString() === GetVal.toString()) {
						getInputValue.items[val].setValue(true);
					}
				}
			}
			//getInputValue.items[0].focus();
		}

	}
	else{

		if (GetObj.dataType == "N") {
            
			if(Ext.getCmp(CrntObj.getId).getValue() != GetVal){
                
			if(GetObj.dataType=="N"){

            if(IsNumber(GetVal))
            {

            if(GetObj.decimalPrecision)

				{
					GetVal==Number(GetVal).toFixed(GetObj.decimalPrecision);
				}

			else  if(GetObj.decimals)

				{
					GetVal==Number(GetVal).toFixed(GetObj.decimals);
				}
			
			else  if(GetObj.decimal)

				{
					GetVal==Number(GetVal).toFixed(GetObj.decimal);
				}


            }
            else
            {

                GetVal = 0;

            }

		    }

		   Ext.getCmp(CrntObj.getId).setValue(GetVal);

		   Ext.getCmp(CrntObj.getId).value = GetVal;

			}  
			
			if(Ext.getCmp(CrntObj.getId).getValue() == null  || (Ext.getCmp(CrntObj.getId).getValue() != null &&   Ext.getCmp(CrntObj.getId).getValue() == ''))
			{
				Ext.getCmp(CrntObj.getId).setValue(0);
	
				Ext.getCmp(CrntObj.getId).value = 0;
			}

		}

		else {
			
			if(Ext.getCmp(CrntObj.getId).getValue() == null  || (Ext.getCmp(CrntObj.getId).getValue() != null &&   Ext.getCmp(CrntObj.getId).getValue() == ''))
			{	

				Ext.getCmp(CrntObj.getId).setValue('');
	
				Ext.getCmp(CrntObj.getId).value = '';
			}

		}

	}

	
	
	
	
}


function isValidDrop(fieldArr){

	app_uniq_mv_Arr = new Array();

	var splited_Str = fieldArr[0].split(',');

	for(var mv_arr = 0;  mv_arr < splited_Str.length;mv_arr++){

	app_uniq_mv_Arr.push(splited_Str[mv_arr].toLowerCase());

	}
	
}


/*
 *   Before Using this method Please whether object is instanceOf Date
 *
 */

function getDateDBFormat(value)
{
	 var databaseFormat = globalMap.get("DB_FORMAT");
	  var getAssociateExtjsFormat = supportDBFmt
				.get(databaseFormat);
	  return  Ext.Date.format(value,
				getAssociateExtjsFormat);

}



function convertStringToDateObject(value)
{

	  var universalFormat = globalMap.get("DATEFORMAT");
	  var dtFormat = EXTJS_DATE_FORMAT_MAP.get(universalFormat);
	  return  Ext.Date.parse(value, dtFormat);
}


function convertStringToDBFormat(value)
{
	  var databaseFormat = globalMap.get("DB_FORMAT");
	  var getAssociateExtjsFormat = supportDBFmt.get(databaseFormat);
	  var universalFormat = globalMap.get("DATEFORMAT");
	  var dtFormat = EXTJS_DATE_FORMAT_MAP.get(universalFormat);
	
     
	var currentDate =  Ext.Date.format(Ext.Date.parse(value, dtFormat),getAssociateExtjsFormat);
	if(currentDate == "")
	{
		return value;
	}
	else
	{
		return currentDate;
	}


}

function convertStringToDBFormatForReport(value)
{
	  var databaseFormat = globalMap.get("DB_FORMAT");
	  var getAssociateExtjsFormat = supportDBFmtReport.get(databaseFormat);
	  var universalFormat = globalMap.get("DATEFORMAT");
	  var dtFormat = EXTJS_DATE_FORMAT_MAP.get(universalFormat);
	
     
	var currentDate =  Ext.Date.format(Ext.Date.parse(value, dtFormat),getAssociateExtjsFormat);
	if(currentDate == "")
	{
		return value;
	}
	else
	{
		return currentDate;
	}


}



function convertDBFormatToUniversalFormat(value)
{
	
	if(value != null)
	{
		var databaseFormat = globalMap.get("DB_FORMAT");
		  var getAssociateExtjsFormat = supportDBFmt
					.get(databaseFormat);
		  var universalFormat = globalMap.get("DATEFORMAT");
		  var dtFormat = EXTJS_DATE_FORMAT_MAP.get(universalFormat);
		  return  Ext.Date.format(Ext.Date.parse(value,getAssociateExtjsFormat ),
				  dtFormat);
	}
	else
	{
		
		  value = "";
		
	}



}

function loadTargetTransaction(targetFormId){
	var node = Ext.getCmp('api-tree').getStore().getNodeById(targetFormId);
    var href = "";var title =  "";var nodeId =  "";
	if(node){
		href = node.data.href;
		title =  node.data.text;
	    nodeId =  node.data.id;
	}else{
		var node = {
						data :{
							text :"Title"
						}
					}
		var href = 'apps/etemplate/';
		var nodeId = targetFormId;
		var title = "";


	}
	
	if(title.length  > 13)
	{
	
		if(href != "apps/ereport/")
		{
		title = title.substring(0, 13)+"..";
		}
	}
	
	var bodyTabPanel	= Ext.getCmp('doc-body');
	if(bodyTabPanel.getComponent('docs-'+targetFormId)){
		   bodyTabPanel.getComponent('docs-'+targetFormId).close();
	}

	bodyTabPanel.loadClass(node,href,nodeId,title);

}

function getTransactionMappingFields(sourceFormId) {

	var url;
	url = getURL() + "apps/transactionlinkform/";

	//urlType = "transactionlinkform";
	param = "eformid=" + sourceFormId;
	bcs.app.ajaxhelper.doXhr(url, param, false, function (data) {
		var response = Ext.JSON.decode(data);
		eformMap.add("translinkformmapping",response);
	});
  //return response;
}

function trasactionLinkMapping(sourceEFormIdObj,targertFormIdObj,mappingObject,sourceFormId,targetFormId,linkFlag){
           var dataJson =sourceEFormIdObj;
		   var eformObj=targertFormIdObj;
		   var linkformFields = mappingObject;
		   var valueData={};
		   
		   
if (linkformFields) {		   
for (var i = 0; i < linkformFields.length; i++) {
   	//if (targetFormId === linkformFields[i].targeteformid) {	
   				var srcComponentSlugMap = globalMap.get(sourceFormId+"COMPONENTSSLUG");
				var targetComponentSlugMap = globalMap.get(targetFormId+"COMPONENTSSLUG");
   				var srcField = srcComponentSlugMap[linkformFields[i].ui_source_component];
				var targetField = targetComponentSlugMap[linkformFields[i].ui_target_component];
   				var srcFieldObj = Ext.getCmp(sourceFormId+ '-' + srcField+ '-id');
   				var tgtFieldObj = Ext.getCmp(targetFormId + '-' + targetField+ '-id');
   				if (srcFieldObj && tgtFieldObj) {
				    var fieldname=tgtFieldObj.name;
   					if(srcFieldObj.compName === "datefield"){
   						var universalFormat = globalMap.get("DATEFORMAT");
						var dtFormat 		= EXTJS_DATE_FORMAT_MAP.get(universalFormat);
						var fieldValue 		= Ext.Date.format(srcFieldObj.getValue(), dtFormat);
						tgtFieldObj.setValue(fieldValue);
						tgtFieldObj.inputEl.dom.value = fieldValue;
						//tgtFieldObj.value=fieldValue;
						//Ext.get(tgtFieldObj.name).dom.value = fieldValue;
   						//Ext.getCmp(tgtFieldObj.id).value = fieldValue;
   					}else{
   					//Ext.get(tgtFieldObj.name).dom.value = srcFieldObj.getValue();
   					//Ext.getCmp(tgtFieldObj.id).value = srcFieldObj.getValue();
					//tgtFieldObj.value=srcFieldObj.getValue();
					var fieldValue = srcFieldObj.getValue();
					tgtFieldObj.setValue(fieldValue);
					tgtFieldObj.inputEl.dom.value = fieldValue;
   					}
   					
   				}
   			}
   	//}

   }

		/*    lform_curr_FrameNo = 0;
		   lform_curr_FieldLoc = 0;
		   lform_curr_Row = 0;
		   lform_location_Map = {};
		   for (var i = 0; i < linkformFields.length; i++) {
			if (targetFormId === linkformFields[i].targeteformid) {
				if (linkformFields) {

					map_Sdata_To_Tdata(linkformFields[i], targetFormId, dataJson, lform_curr_FrameNo, lform_curr_FieldLoc, lform_curr_Row, lform_location_Map, eformObj, valueData);

				}
			}
		   } */
   
   
   
   
   
  /* for (var i = 0; i < linkformFields.length; i++) {
   	if (targetFormId === linkformFields[i].targeteformid) {	
   			if (linkformFields) {
   				var srcFieldObj = Ext.getCmp(sourceEFormIdObj.EFORMID + '-' + linkformFields[i].sourcefield + '-id');
   				var tgtFieldObj = Ext.getCmp(targetFormId + '-' + linkformFields[i].targetfield + '-id');
   				if (srcFieldObj && tgtFieldObj) {
   					if(srcFieldObj.compName === "datefield"){
   						var universalFormat = globalMap.get("DATEFORMAT");
						var dtFormat 		= EXTJS_DATE_FORMAT_MAP.get(universalFormat);
						var fieldValue 		= Ext.Date.format(srcFieldObj.getValue(), dtFormat);
						Ext.get(tgtFieldObj.name).dom.value = fieldValue;
   						Ext.getCmp(tgtFieldObj.id).value = fieldValue;
   					}else{
   					Ext.get(tgtFieldObj.name).dom.value = srcFieldObj.getValue();
   					Ext.getCmp(tgtFieldObj.id).value = srcFieldObj.getValue();
   					}
   					
   				}
   			}
   	}

   }*/
   if (linkFlag.toLowerCase() !== "epopup") {
		//var eformMetadata = targertFormIdObj.containers[0];
		//eformMetadata.children.sort(function(a, b) {
		//	return parseFloat(a.display_order) - parseFloat(b.display_order);
		//});
		//getFirstVisibleField([Ext.getCmp(globalMap.get("EFORMID")+'-'+eformMetadata.children[0].slug+'-id')], 'navigation', 1);
   }
}

function linkFormTrans(sourceFormId,targetFormId,linkFlag,mappingInfoArray){
    var sourceEFormIdObj = eformMap.get(sourceFormId);
    var id = sourceFormId+'-recid-id';
	var recid = 0;
	if(linkFlag.toLowerCase() !== "epopup"){
    loadTargetTransaction(targetFormId);
	}
    var targertFormIdObj = eformMap.get(targetFormId);
    //getTransactionMappingFields(sourceFormId);
	
	var mappingObject = eformMap.get('translinkformmapping');
	
	//trasactionLinkMapping(sourceEFormIdObj,targertFormIdObj,mappingObject,sourceFormId,targetFormId);
    

	bcsAjax();
	
	var reportGridId,reportData;
	var eformObj = eformMap.get(targetFormId);

	var urlType			= "";
	var postReturnobj	= "";

	urlType = "esearch/emodify";
	
	
	param = "basicid=" + recid + "&eformid=" + sourceFormId
			+ "&type=M" +'&username='+globalMap.get("USERNAME")+"&"+"projectName="+globalMap.get("PROJECTNAME");

	if (!bcsAjaxObj)

	{
		throw new Error('XMLHttp (AJAX) not supported');
	}

	var url = getURL() + "apps/" + urlType + "/";

	bcsAjaxObj.open("POST", url, false);

	bcsAjaxObj.setRequestHeader("Content-Type",
			"application/x-www-form-urlencoded;charset=utf-8");

	bcsAjaxObj.onreadystatechange = function() {
		if (this.readyState == 4) {

			if (this.status == 200) {
				if (this.getResponseHeader("REDIRECT") == 'true') {
					window.location.href = response
							.getResponseHeader("REDIRECT_PAGE");
				} 
				else 
				{
					var sessionExists = checkIfSessionExpired(this.responseText);
					if(sessionExists)
					{
						Ext.getBody().mask('Please wait...');
						var obj	= "";
						//parsingLinkFormData(obj,sourceFormId,targetFormId,reportGridId,reportData);
						trasactionLinkMapping(obj,targertFormIdObj,mappingObject,sourceFormId,targetFormId,linkFlag);
						Ext.getBody().unmask();
						
						}
						
						else{
						Ext.getBody().unmask();
						  Ext.Msg.alert({ 
								title    : '<font color="red"><b>Confirm Message</b></font>',
								msg      : "<b>Your Session has been Expired.Please Click Ok button to logout</b>",
								buttons	 : Ext.Msg.OK,
								closable : false,
								fn       : function (btn, text){
								if (btn == 'ok') 
								{
									 if(devStatus)
									 {
										 location.href = 'j_spring_security_logout?dev=true';
									 }
									else
									{
										location.href = 'j_spring_security_logout';
									}
								}}
							});
						 return;
						
						
						}
						}}
						}
						};
						bcsAjaxObj.send(param);


	
 

}


function gettingLinkFormData(reportData,getFirstHidval,sourceFormId,targetFormId,reportGridId,rptMappingFields){


bcsAjax();

	var urlType			= "";
	var postReturnobj	= "";

	urlType = "esearch/emodify";
	
	/****************This is For Logger****************/
	param = "basicid=" + getFirstHidval + "&eformid=" + sourceFormId
			+ "&type=M" +'&username='+globalMap.get("USERNAME")+"&"+"projectName="+globalMap.get("PROJECTNAME");

	if (!bcsAjaxObj)

	{
		throw new Error('XMLHttp (AJAX) not supported');
	}

	var url = getURL() + "apps/" + urlType + "/";

	bcsAjaxObj.open("POST", url, false);

	bcsAjaxObj.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	bcsAjaxObj.setRequestHeader("X-Requested-With","XMLHttpRequest");

	bcsAjaxObj.onreadystatechange = function() {
		if (this.readyState == 4) {

			if (this.status == 200) {
				if (this.getResponseHeader("REDIRECT") == 'true') {
					window.location.href = response
							.getResponseHeader("REDIRECT_PAGE");
				} 
				else 
				{
					var sessionExists = checkIfSessionExpired(this.responseText);
					if(sessionExists)
					{
						Ext.getBody().mask('Please wait...');
						var obj	= Ext.JSON.decode(this.responseText);
						try{
						parsingLinkFormData(obj,sourceFormId,targetFormId,[],reportData,rptMappingFields);
						Ext.getBody().unmask();
						activeColumn=0;activeRow=0;ActiveRow=0;globalMap.add("ACTIVEROW",0);	
						}catch(err){

							console.log("Error Caused during LinkForm-->"+err);
							lform_curr_FrameNo = 0 ;
							lform_curr_FieldLoc = 0;
							lform_curr_Row = 0;
							lform_location_Map = {};
							activeColumn=0;
							activeRow=0;ActiveRow=0;globalMap.add("ACTIVEROW",0);	
							Ext.getBody().unmask();
						}
					}
					else
					{
						  if(bcsMask)
						  bcsMask.hide();
						  Ext.Msg.alert({ 
								title    : '<font color="red"><b>Confirm Message</b></font>',
								msg      : "<b>Your Session has been Expired.Please Click Ok button to logout</b>",
								buttons	 : Ext.Msg.OK,
								closable : false,
								fn       : function (btn, text){
								if (btn == 'ok') 
								{
									 if(devStatus)
									 {
										 location.href = 'j_spring_security_logout?dev=true';
									 }
									else
									{
										location.href = 'j_spring_security_logout';
									}
								}}
							});
						 return;
					}
				}
			}
		}
	};
	bcsAjaxObj.send(param);

	
}



function parsingLinkFormData(dataJson,sFormId,tFormId,repGridId,reportData,rptMappingFields){

	lform_curr_FrameNo = 0 ; lform_curr_FieldLoc = 0; lform_curr_Row = 0; lform_location_Map = {};lForm_nGridtoGrid_Assoc = new Array();
    var lform_ReportMapping;

    if(repGridId instanceof String ){
	lform_ReportMapping= hashMap_reportEvent.map[repGridId].mappingfields;
	}else{
	lform_ReportMapping= rptMappingFields;
	}

	var eformObj = eformMap.get(tFormId);

	for(var i = 0 ; i < lform_ReportMapping.length ; i++){
		map_Sdata_To_Tdata(lform_ReportMapping[i],tFormId,dataJson,lform_curr_FrameNo,lform_curr_FieldLoc,lform_curr_Row,lform_location_Map,eformObj,reportData);
				/* if(lform_ReportMapping[i][tFormId] != undefined){

					var lform_MappingFlds = lform_ReportMapping[i][tFormId];

                    for(var j = 0 ; j < lform_MappingFlds.length ; j++){

                       
						map_Sdata_To_Tdata(lform_MappingFlds[j],tFormId,dataJson,lform_curr_FrameNo,lform_curr_FieldLoc,lform_curr_Row,lform_location_Map,eformObj,reportData);


					    }

						getFirstVisibleField(eformObj);
					
					} */


				}

	}






function map_Sdata_To_Tdata(mappingFldObj,tFormId,dataJson,curr_FrameNo,curr_FieldLoc,curr_Row,location_Map,eformObj,reportData){
        
		
        var sValue;
		
		var dValue;
		
		var sourceField;
		
		var sFldType;
		
		var tFldType;
		
		if(mappingFldObj["source_report_field"]){
			sourceField = mappingFldObj["source_report_field"].toString().toLowerCase();
		}
        else{
			if(mappingFldObj["ui_source_component"]){
				sourceField = mappingFldObj["ui_source_component"].toString().toLowerCase();
        	}else{
        		sourceField ="";
        	}
		}
		
		var sFld = sourceField;//mappingFldObj["source_report_field"].toString().toLowerCase();

		var tFld = mappingFldObj["ui_target_component"].toString().toLowerCase();
		
		var from_source_transaction = mappingFldObj.from_source_transaction;
		
		var is_target_grid_component = mappingFldObj.is_target_grid_component;
		
		var is_source_grid_component = mappingFldObj.is_source_grid_component;
		
		
		if(from_source_transaction && !is_source_grid_component){
		
			sFldType = 1;
		
		}
		
		else if(is_source_grid_component){
		     sFldType = 0;  
		}
		else if(!from_source_transaction){
			 sFldType = 2;
		}
		
		
	
		//var sFldType =2;

		var tFldType = 1;

        var cnstValue = mappingFldObj["static_target_component_value"];

		var tFldObj = Ext.getCmp(eformObj.slug+'-'+tFld.toLowerCase()+'-id').config;
		
		// getTargetFieldObj(tFld.toLowerCase(),eformObj);

		if(sFld.length > 0 && (cnstValue == null || cnstValue.length == 0)){

		if(sFldType == 1){

					var locationMap = findFieldInFrame(dataJson,sFld,sFldType,curr_FrameNo,curr_FieldLoc,curr_Row,location_Map,eformObj);

					  gettingHierarchyOfValue(locationMap);


				
				}else if(sFldType == 2){
				  

                                 gettingDataFromReportCols(reportData,sFld,tFldType,tFld,eformObj,tFldObj);
				
				                 return;
				
				}else{

					var locationMap = findFieldInFrame(dataJson,sFld,sFldType,curr_FrameNo,curr_FieldLoc,curr_Row,location_Map,eformObj,0);

					 gettingHierarchyOfValue(locationMap) ;
				
				
				}

				if(sFldType == 1 && tFldType == 1){
				
				   if(dataJson.NG){
						
						sValue = dataJson.NG[sFld.toLowerCase()];
						
				   }
				   if(!dataJson.NG){

						sValue = sValue = reportData[tFldObj.name];
				 }
				
                   				  
					if (tFldObj.filter && tFldObj.filterLength > 0) {
                        if(reportData){
						dValue = reportData[tFld];
						}
						if (dValue == null) {
						    if(reportData){
							dValue = reportData[tFldObj.displayField];
							}
						}
						if (dValue != null && dValue.toString().length > 0) {

							setValueForTargetObj(tFldObj, sValue, null, null, 0, dValue);
							
						} 
						if(!sValue&&!reportData){
						   sfid = mappingFldObj.translinkformdocid+'-'+sFld+'-id';
						   sValue = Ext.getCmp(sfid).getValue();
						   
						   setValueForTargetObj(tFldObj, sValue, null, null, 0,sValue);
						}
						else {
							return;
						}

					}
					else {
					    if(sValue ==""&&sValue.length==0){
						    sValue = reportData[tFldObj.name];
						}
						setValueForTargetObj(tFldObj, sValue, null, null, 0);
					}
				}else if(sFldType == 1 && tFldType == 0){

					var gridFldObj = tFldObj.editor;
	
					var lForm_GridObj = Ext.getCmp(gridFldObj.gridId+"-grid"); var lForm_GridStore = lForm_GridObj.getStore();
					var lForm_editingPlugin = lForm_GridObj.getSelectionModel();

					sValue = dataJson["LAYERS"][lform_curr_FrameNo][sFld.toLowerCase()];

					lForm_nGridtoGrid_Assoc.push(tFldObj.dataIndex);


					for(var f= 0; f < lForm_GridStore.getCount() ; f++){

						activeColumn=lform_curr_FieldLoc;

	                    activeRow=f;ActiveRow=activeRow+1;globalMap.add("ACTIVEROW",ActiveRow);	

						if(f==0){

					         setValueForTargetObj(tFldObj,sValue,lForm_GridObj,lForm_GridStore,f);

						}else{
						
						  if(f == lForm_GridStore.getCount()){

						         lForm_GridStore.insert(f, lForm_GridStore.defalutTemplate);

                          }
						  setValueForTargetObj(tFldObj,sValue,lForm_GridObj,lForm_GridStore,f);
						
						}
				
				    }

                    lForm_GridObj.getView().refresh();
				
				
				}else if(sFldType == 0 && tFldType == 1){
              
                      var report_val = reportData[sFld];
					  if(report_val != undefined && report_val != null && report_val != ""){
				   

					  for(var val=0;val < dataJson["LAYERS"][lform_curr_FrameNo].length;val++){

							   var matchValue = dataJson["LAYERS"][lform_curr_FrameNo][val][sFld.toLowerCase()];

							   var lForm_Combo_Obj = Ext.getCmp(tFldObj.id);
				                
								if(tFldObj.sourceKey){
							     
								  var lForm_comboValue = getModifyComboData(lForm_Combo_Obj,matchValue);

								  if(lForm_comboValue == "")
								  {
									  lForm_comboValue = null;
								  }
								  
								  if(lForm_comboValue != null)
								  { 
								   
								   lForm_comboValue =  lForm_comboValue.data[tFldObj.sourceField];

								  }
								  else
								  {
                                     continue;

								  }

								}else{
																 
								 var lForm_comboValue = matchValue;

								}

							   if(lForm_comboValue == reportData[sFld]){
									
										lform_curr_Row =   val;
										break;
							   }
					   }

					  }
					
                    sValue = dataJson["LAYERS"][lform_curr_FrameNo][lform_curr_Row][sFld.toLowerCase()];
					
					setValueForTargetObj(tFldObj,sValue,null,null,0);
				
				}else{

					var gridFldObj = tFldObj.editor;
	
					var lForm_GridObj = Ext.getCmp(gridFldObj.gridId+"-grid"); var lForm_GridStore = lForm_GridObj.getStore();
					var lForm_editingPlugin = lForm_GridObj.getSelectionModel();

					

					for(var e= 0; e < dataJson["LAYERS"][lform_curr_FrameNo].length ; e++){

						activeColumn=lform_curr_FieldLoc;

	                    activeRow=e;ActiveRow=activeRow+1;globalMap.add("ACTIVEROW",ActiveRow);	

						if(e==0){

					         sValue = dataJson["LAYERS"][lform_curr_FrameNo][lform_curr_Row][sFld.toLowerCase()];

							 setValueForTargetObj(tFldObj,sValue,lForm_GridObj,lForm_GridStore,e);

						}else{
						
						  var locationMap = findFieldInFrame(dataJson,sFld,sFldType,curr_FrameNo,curr_FieldLoc,curr_Row,location_Map,eformObj,e);

						  gettingHierarchyOfValue(locationMap);

						  sValue = dataJson["LAYERS"][lform_curr_FrameNo][lform_curr_Row][sFld.toLowerCase()];
                         
						  if(e == lForm_GridStore.getCount()){

						         lForm_GridStore.insert(e, lForm_GridStore.defalutTemplate);

								 for(var g=0 ; g < lForm_nGridtoGrid_Assoc.length ; g++){

									      var tValue = lForm_GridStore.getAt(e-1).data[lForm_nGridtoGrid_Assoc[g]];
					                       
										  lForm_GridStore.getAt(e).data[lForm_nGridtoGrid_Assoc[g]] = tValue;
					          
					             }

                          }
						  setValueForTargetObj(tFldObj,sValue,lForm_GridObj,lForm_GridStore,e);
						
						}
				
				    }

                    lForm_GridObj.getView().refresh();
				
				}

        }else if(sFld.length == 0 && cnstValue.length > 0){
		
		    sValue = cnstValue;

			setValueForTargetObj(tFldObj,sValue,null,null,0);

		}else{
		setValueForTargetObj(tFldObj,null,null,null,0);
		
		}


}


function gettingHierarchyOfValue(locationMap) {

	if (locationMap) {
		lform_curr_FrameNo = locationMap.get("cFrame");
		lform_curr_Row = locationMap.get("cRow");
	}

}


function findFieldInFrame(dataJson,sFld,sFldType,curr_FrameNo,curr_FieldLoc,curr_Row,location_Map,eformObj,rowCnt){

        

for(var k=0 ; k < dataJson["NOOFLAYERS"] ; k++){

	   var frameObject = dataJson.LAYERS[k];

	   //var asGrid = eformObj["ASGRID"][k];

	   if(sFldType == 1){

		 //  for(var m=0 ; m < frameObject.length ;m++){
	   
			//  var fldName = frameObject[m]["FN"];
			if(frameObject){
			  if(frameObject[sFld.toLowerCase()]){

				  location_Map.add('cFrame',k);
				  //location_Map.add('cField',m);
				  location_Map.add('cRow',0);
						 
			  return location_Map;
				   
			  }
			}
			  
		
	   //}
	   
	   
	   
	   }else if(sFldType == 0){

             
		      

			  var rowCount = frameObject.length;

			   for(var n=rowCnt ; n<rowCount ; n++){

				   var cRowObj = frameObject[n];

				   for(var lnth =0 ; lnth < cRowObj.length ; lnth++ ){


					var fldName = cRowObj[lnth]["FN"];

					 if(sFld.toLowerCase() === fldName){

						  location_Map.add('cFrame',k);
						  location_Map.add('cField',lnth);
						  location_Map.add('cRow',n);
						 
						   return location_Map;
					 
					 
					 }
				   
				   }
			   
			   
			   }
		   
	  
	   }

}


}

function getTargetFieldObj(tFld,eformObj){
    
var tObj = null;




for (var a=0; a < eformObj["NOSOFLAYERS"] ; a++ )
{

if(eformObj["LAYERS"][a]["xtype"] == 'panel'){


if(eformObj["LAYERS"][a]["grid"]){


var frameObj =  eformObj["LAYERS"][a];

tObj = getGridObject(frameObj,tFld);

if(tObj != undefined   && tObj != null){

return tObj;
}

}else{

var frameObj =  eformObj["LAYERS"][a];

tObj = getNonGridObject(frameObj,tFld);

if(tObj != undefined   && tObj != null){
return tObj;
}
}

}else{

var tabPanelObj = eformObj["LAYERS"][a]["items"];

for(var d = 0 ; d < tabPanelObj.length ; d++){

 if(tabPanelObj[d]["grid"]){

	 var frameObj = eformObj["LAYERS"][a]["items"][d];
 
	 tObj = getGridObject(frameObj,tFld);
	 if(tObj != undefined   && tObj != null){
	 return tObj;

	 }
 
 }else{

	 var frameObj = eformObj["LAYERS"][a]["items"][d];

	 tObj = getNonGridObject(frameObj,tFld);
	 if(tObj != undefined   && tObj != null){
	 return tObj;
	 }	 
 }


}

}


}

}


function getNonGridObject(eformObj,tFld){


var frameObj =eformObj["items"];

for(var b = 0 ; b < frameObj.length ; b++){

	var fldObj = frameObj[b]['name'].split('-');

	if(fldObj[1] == tFld){
		
		var ng_Obj = frameObj[b];

		return ng_Obj;
		
	}

}

}


function getGridObject(eformObj,tFld){


var columnObj = eformObj["items"][0]["columns"];

for(var c= 0 ; c < columnObj.length ; c++){

 var fldObj = columnObj[c]['dataIndex'].split('-');

 if(fldObj[1] == tFld){

	var gObj = columnObj[c];

	 return gObj;
 
 
 }

}

}



function setValueForTargetObj(tFldObj,sValue,lForm_GridObj,lForm_GridStore,aRow,dValue){

	    
      

	    if(tFldObj["compType"] == 'NG'){

          var ObjFrmTrans = Ext.getCmp(tFldObj.id);
		if(tFldObj['modeOfEntry'] == "TBE"){

			 if(tFldObj.sql){
			     getTextFieldDataForFirstVisibleFields(ObjFrmTrans);
				 return;
			 }else if(tFldObj.expression != ""){
                       if(ObjFrmTrans.getValue() == null || ObjFrmTrans.getValue() == "")
				       {
						   GetExprForFirstVisibleFields(tFldObj);
					   }
			           return;  
			 }
 	         
			Ext.getCmp(tFldObj.id).setValue(sValue);

		}else if(tFldObj['modeOfEntry'] == "From"){

			if(tFldObj.sourceKey){

				var lForm_Combo_Obj = Ext.getCmp(tFldObj.id);
				
				if (lForm_Combo_Obj.filter) {

					if (dValue) {
						dValue = dValue.substring(0, lForm_Combo_Obj.filterLength);

					}

				}
           
			var lForm_comboValue = getModifyComboData(lForm_Combo_Obj,sValue,dValue);
			
			Ext.getCmp(tFldObj.id).setValue(lForm_comboValue);

			if(tFldObj.targetReference.length > 0){

				 for(var trl=0;trl<tFldObj.targetReference.length;trl++)
				   {

							var  referenceComp = Ext.getCmp(tFldObj.targetReference[trl]+"-id");
									
							if(referenceComp && (referenceComp.readOnly || referenceComp.hidden))
							{
								setSrcFieldValueNG(referenceComp,1);
							}
							else
							{
								 if(referenceComp && referenceComp.suggestive != true)
								 {
									 setSrcFieldValueNG(referenceComp,1);
								 }
									
							}

				   }

			
			}


			}


		}else if(tFldObj['modeOfEntry'] == "FL"){

			 if(tFldObj.sql){

				    var lForm_Combo_FL_Obj = Ext.getCmp(tFldObj.id);

				    
					getVisibleComboDataForFirstVisibleFields(lForm_Combo_FL_Obj);

					 Ext.getCmp(tFldObj.id).setValue(sValue);
             }else{
			 Ext.getCmp(tFldObj.id).setValue(sValue);
			 }


		}else if(tFldObj['modeOfEntry'] == "TBC"){

			if(sValue != null){
		 	Ext.getCmp(tFldObj.id).setValue(sValue);
		    }else{
			 GetExprForFirstVisibleFields(tFldObj);
			}
		}
		
		
   }else{

	   var lForm_gridObj = tFldObj.editor;


	  if(lForm_gridObj['modeOfEntry'] == "TBE"){

		       if(lForm_gridObj['sql']){
			   
			   }
	  
	          lForm_GridStore.getAt(aRow).data[tFldObj.dataIndex]=sValue;
	  
	  }else if(lForm_gridObj['modeOfEntry'] == "From"){

		 var modifyComboValue = getModifyComboData(
										lForm_gridObj, sValue);

		 if (modifyComboValue != null
									&& modifyComboValue != "") {

		      lForm_GridStore.getAt(aRow).data[tFldObj.dataIndex] = modifyComboValue.data[lForm_gridObj.displayField];

			  if(lForm_gridObj.sourceKey){

					  for ( var targetRefLoop = 0; targetRefLoop < lForm_gridObj.targetReference.length; targetRefLoop++) {

							  var referenceComp = Ext.getCmp(lForm_gridObj.targetReference[targetRefLoop]+ "-id");

							  var lForm_gStoreId = referenceComp.editor.gridId+ "-store";
							  
							  setModifySrcFieldValueGrid(referenceComp.editor,lForm_gStoreId,aRow);
					  
					  
					  }

			  }
		 }
	  
	 
	  
	  }else if(lForm_gridObj['modeOfEntry'] == "FL"){

		  if(lForm_gridObj['sql']){
		  
		        var lForm_comboValue = getModifyComboData(lForm_gridObj,sValue);

				lForm_GridStore.getAt(aRow).data[tFldObj.dataIndex] = lForm_comboValue.data[lForm_gridObj.displayField];
		  
		  }
	  
	  
	  }else if(lForm_gridObj['modeOfEntry'] == "TBC"){

		  lForm_GridStore.getAt(aRow).data[tFldObj.dataIndex]=sValue;
	  
	  
	  }
   
   
   
   
   
   }


}



function gettingDataFromReportCols(reportData,sFld,tFldType,tFld,eformObj,tFldObj){


if(tFldType == 1){

var reportVal = reportData[sFld];
tFldObj = Ext.getCmp(eformObj.slug+'-'+tFld+'-id');

setReportValueForTargetObj(tFldObj,reportVal,null,null,0);
				
}
else {

var reportVal = reportData[sFld];


var gridFldObj = tFldObj.editor;
	
					var lForm_GridObj = Ext.getCmp(gridFldObj.gridId+"-grid"); var lForm_GridStore = lForm_GridObj.getStore();
					var lForm_editingPlugin = lForm_GridObj.getSelectionModel();

					


					for(var f= 0; f < lForm_GridStore.getCount() ; f++){

						activeColumn=lform_curr_FieldLoc;

	                    activeRow=f;ActiveRow=activeRow+1;globalMap.add("ACTIVEROW",ActiveRow);	

						if(f==0){

					         setReportValueForTargetObj(tFldObj,reportVal,lForm_GridObj,lForm_GridStore,f);

						}else{
						
						  if(f == lForm_GridStore.getCount()){

						         lForm_GridStore.insert(f, lForm_GridStore.defalutTemplate);

                          }
						  setReportValueForTargetObj(tFldObj,reportVal,lForm_GridObj,lForm_GridStore,f);
						
						}
				
				    }

                    lForm_GridObj.getView().refresh();
				
				
				}
}


function setReportValueForTargetObj(tFldObj,reportValue,lForm_GridObj,lForm_GridStore,aRow,dValue){

	    
      

	    if(tFldObj["compType"] == 'NG'){

          var ObjFrmTrans = Ext.getCmp(tFldObj.id);
		if(tFldObj['modeOfEntry'] == "TBE"){

			 if(tFldObj.sql){
			     getTextFieldDataForFirstVisibleFields(ObjFrmTrans);
				
			 }
 	         
			Ext.getCmp(tFldObj.id).setValue(reportValue);

		}else if(tFldObj['modeOfEntry'] == "From"){

			if(tFldObj.sourceKey){

				var lForm_Combo_Obj = Ext.getCmp(tFldObj.id);
				
				if (lForm_Combo_Obj.filter) {

					if (reportValue) {

						dValue = reportValue.substring(0, lForm_Combo_Obj.filterLength);

					} else {

						dValue = dValue.substring(0, lForm_Combo_Obj.filterLength);

					}

				}
				           
			var lForm_comboValue = getModifyComboData(lForm_Combo_Obj,reportValue,dValue);
			
			Ext.getCmp(tFldObj.id).setValue(lForm_comboValue);

			if(tFldObj.targetReference.length > 0){

				 for(var trl=0;trl<tFldObj.targetReference.length;trl++)
				   {

							var  referenceComp = Ext.getCmp(tFldObj.targetReference[trl]+"-id");
									
							if(referenceComp.readOnly || referenceComp.hidden)
							{
								setSrcFieldValueNG(referenceComp,1);
							}
							else
							{
								 if(referenceComp.suggestive != true)
								 {
									 setSrcFieldValueNG(referenceComp,1);
								 }
									
							}

				   }

			
			}


			}
             else if(reportValue){
            	Ext.getCmp(tFldObj.id).setValue(reportValue);
            }

		}else if(tFldObj['modeOfEntry'] == "FL"){

			 if(tFldObj.sql){

				    var lForm_Combo_FL_Obj = Ext.getCmp(tFldObj.id);

				    
					getVisibleComboDataForFirstVisibleFields(lForm_Combo_FL_Obj);

					 Ext.getCmp(tFldObj.id).setValue(reportValue);
             }else{
				Ext.getCmp(tFldObj.id).setValue(reportValue);
			 }


		}else if(tFldObj['modeOfEntry'] == "TBC"){

			
		 	Ext.getCmp(tFldObj.id).setValue(reportValue);
		   
		}
		
		
   }else{

	   var lForm_gridObj = tFldObj.editor;


	  if(lForm_gridObj['modeOfEntry'] == "TBE"){

		       if(lForm_gridObj['sql']){
			   
			   }
	  
	          lForm_GridStore.getAt(aRow).data[tFldObj.dataIndex]=reportValue;
	  
	  }else if(lForm_gridObj['modeOfEntry'] == "From"){

		 var modifyComboValue = getModifyComboData(
										lForm_gridObj, reportValue);

		 if (modifyComboValue != null
									&& modifyComboValue != "") {

		      lForm_GridStore.getAt(aRow).data[tFldObj.dataIndex] = modifyComboValue.data[lForm_gridObj.displayField];

			  if(lForm_gridObj.sourceKey){

					  for ( var targetRefLoop = 0; targetRefLoop < lForm_gridObj.targetReference.length; targetRefLoop++) {

							  var referenceComp = Ext.getCmp(lForm_gridObj.targetReference[targetRefLoop]+ "-id");

							  var lForm_gStoreId = referenceComp.editor.gridId+ "-store";
							  
							  setModifySrcFieldValueGrid(referenceComp.editor,lForm_gStoreId,aRow);
					  
					  
					  }

			  }
		 }
	  
	 
	  
	  }else if(lForm_gridObj['modeOfEntry'] == "FL"){

		  if(lForm_gridObj['sql']){
		  
		        var lForm_comboValue = getModifyComboData(lForm_gridObj,reportValue);

				lForm_GridStore.getAt(aRow).data[tFldObj.dataIndex] = lForm_comboValue.data[lForm_gridObj.displayField];
		  
		  }
	  
	  
	  }else if(lForm_gridObj['modeOfEntry'] == "TBC"){

		  lForm_GridStore.getAt(aRow).data[tFldObj.dataIndex]=reportValue;
	  
	  
	  }
   
   }


}



function checkForFirstVisibleFieldInOnformLoad(compObj, property, value) {

	if (property.toLowerCase() === "readonly" && value.toUpperCase() === "F") {
		if (compObj.firstVisiblePreNext === -1) {
			Ext.getCmp(compObj.id).firstVisibleField = true;
			Ext.getCmp(compObj.id).firstVisiblePreNext = 0;

			if (Ext.getCmp(compObj.NF + "-id")) {
				setFirstVisibleFieldToFalse(Ext.getCmp(compObj.NF + "-id"));
			}
		}

	} else if (property.toLowerCase() === "visible" && value.toUpperCase() === "F") {
		if (compObj.firstVisibleField == true && compObj.hidden == true) {

			setFirstVisibleFieldAttributeForOnFormLoad(compObj);
		}
	} else if (property.toLowerCase() === "visible" && value.toUpperCase() === "T" && compObj.firstVisiblePreNext === -1) {
		Ext.getCmp(compObj.id).firstVisibleField = true;
		Ext.getCmp(compObj.id).firstVisiblePreNext = 0;

		if (Ext.getCmp(compObj.NF + "-id")) {
			setFirstVisibleFieldToFalse(Ext.getCmp(compObj.NF + "-id"));
		}
	}

}

function setFirstVisibleFieldToFalse(compObj)
{	
	if(compObj != null && compObj != "")
	{
		if(compObj.firstVisibleField !== true)
		{
			Ext.getCmp(compObj.id).firstVisibleField	= false;
			Ext.getCmp(compObj.id).firstVisiblePreNext	= 1;

			var nextField	= Ext.getCmp(compObj.NF+"-id");
			setFirstVisibleFieldToFalse(nextField);
		}
		else
		{
			Ext.getCmp(compObj.id).firstVisibleField	= false;
			Ext.getCmp(compObj.id).firstVisiblePreNext	= 1;
		}
	}
}

function setFirstVisibleFieldAttributeForOnFormLoad(compObj){


  	 Ext.getCmp(compObj.id).firstVisibleField	= false;
	 Ext.getCmp(compObj.id).firstVisiblePreNext = -1;

	 if(Ext.getCmp(compObj.NF+"-id") != null){
	 
	   var nextField = Ext.getCmp(compObj.NF+"-id");
	   if(nextField.hidden == false){
	    
		 nextField.firstVisibleField	= true;   
		 nextField.firstVisiblePreNext	= 0;
	   
	   }else{
	   
	         setFirstVisibleFieldAttributeForOnFormLoad(nextField);
	      }   
	 
	 }

}


/*******************This Is For Send Message********************/

function sendSMS(messageInfoID){

	bcs.app.actions.sendSMS(messageInfoID);
}



/**************************This is The end of Send Msg***************************/


/*************************Start of Send Mail***********************************/

function sendMail(mailInfoID){
 
     bcs.app.actions.sendMail(mailInfoID);
}



function fileUploadPanel(){

	  var uploadFormPanel=upLoadFile();

	   var fileArchive=Ext.create('Ext.tab.Panel', {
					width: 300,
					height: 200,
					forceFit : true,
					layout:'fit',
					items: [{
						title: 'Upload',
						layout:'fit',
						id:'pplus-upload',
						items:[uploadFormPanel]
					}]
				 });
	return fileArchive;


}



function upLoadFile() {
    var attachfile = Ext.create('Ext.form.Panel', {
			    title: '',
				bodyPadding: 10,
				frame: true,
				id:'pplus-file-upload',
			items: [{
				xtype     : 'filefield',
				name      : 'file',
				msgTarget : 'side',
				margin    : '20 0 0 0',
				allowBlank: false,
				width     : 280,
				x:10,
				y:10,
				buttonText: '<b>Select File</b>'
			}],

    buttons: [{
        text   : '<b>Upload</b>',
		margin : '0 95 80 0',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url:  'file-upload.php',
                    waitMsg: 'Uploading your file...',
                    success: function(fp, o) {
                        Ext.Msg.alert('<Font Color="green">Success', '<b>Your file "' + o.result.file + '" has been uploaded.</b>');
                    }
                });
            }
        }
    }]
});
	return attachfile;
}




function getServerDateTime() {

	bcsAjax();

	var response = "";

	if (!bcsAjaxObj)
	{
		throw new Error('XMLHttp (AJAX) not supported');
	}

	var url = getURL() + "apps/ereport/eGetServerTime/";

	bcsAjaxObj.open("POST", url, false);

	bcsAjaxObj.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");

	bcsAjaxObj.onreadystatechange = function() {

		if (bcsAjaxObj.readyState == 4 ) {

			if(bcsAjaxObj.status == 200)
			{
				var sessionExists = checkIfSessionExpired(bcsAjaxObj.responseText);
				if(sessionExists)
				{	
					response = bcsAjaxObj.responseText;
				}
				else
				{
					 if(bcsMask) 
					 bcsMask.hide();
					  Ext.Msg.alert({ 
							title    : '<font color="red"><b>Confirm Message</b></font>',
							msg      : "<b>Your Session has been Expired.Please Click Ok button to logout</b>",
							buttons	 : Ext.Msg.OK,
							closable : false,
							fn       : function (btn, text){
							if (btn == 'ok') 
							{
								 if(devStatus)
								 {
									 location.href = 'j_spring_security_logout?dev=true';
								 }
								else
								{
									location.href = 'j_spring_security_logout';
								}
							}}
						});
					 return;
				}
			}
		}

	};


	bcsAjaxObj.send();

	  return response;
}

function strLength(value) {

	var strLength = 0;

    if(value ===  0)
    {
    	
    	strLength =  0;
    }
    else if(value != null )
	 {
		 strLength = value.toString().length;
	 }

	return strLength;
}

function replaceAll(word,character,replaceChar){

    

    while(word.indexOf(character) != -1)
	{
		word = word.replace(character,replaceChar);
	}

    return word;
}


function checkIfExpressionOrValidateExpression(GetparseObj,strInFix){

 var expr = GetparseObj.expression;
 var validateExpr = GetparseObj.validateExpression;
 var currExpr = exprMap.get("currentExpr");
 var gridExpr = GetparseObj.gridExp;
 
 
 if(gridExpr != null && gridExpr != "" && gridExpr == currExpr){
	 
	  return "expression";
	 
 }

 if(expr != null && expr != "" && expr == currExpr){
 
  return "expression";
 
 }

  if(validateExpr != null && validateExpr != "" && validateExpr == currExpr){
 
  return "validateExpression";
 
 }

}	




function dateConversionForSMS(parameter){

   var monthNames=["/01/","/02/", "/03/","/04/", "/05/","/06/","/07/","/08/","/09/","/10/","/11/","/12/"];

	 var currentTextMessage = parameter;
	 for(var m = 0; monthNames.length > m; m++)
	 {
		 if( parameter.indexOf(monthNames[m]) != -1)
		  {
			 var startOfDate = parameter.indexOf(monthNames[m]);
			 var dateValue = parameter.substring(startOfDate-2,startOfDate+10);
			 var date = Ext.Date.parse(dateValue, "d/m/Y");  
			 var formattedDate=Ext.Date.format(date,"d-m-Y"); 
			 currentTextMessage = currentTextMessage.replace(dateValue,formattedDate);
		  }
	 }
   return currentTextMessage;

}


function dateConversionForDashboard(parameter){

   var monthNames=["-Jan-","-Feb-", "-Mar-","-Apr-", "-May-","-Jun-","-Jul-","-Aug-","-Sep-", "-Oct-","-Nov-","-Dec-"];

	 var currentDate = parameter;
	 for(var m = 0; monthNames.length > m; m++)
	 {
		 if( parameter.indexOf(monthNames[m]) != -1)
		  {
			 var startOfDate = parameter.indexOf(monthNames[m]);
			 var dateValue = parameter.substring(startOfDate-2,startOfDate+10);
			 var date = Ext.Date.parse(dateValue, "d-M-Y");  
			 currentDate = Ext.Date.format(date,"d/m/Y");
		  }
	 }
   return currentDate;

}

function dateConversionForEupdate(parameter){

   var monthNames=["/01/","/02/", "/03/","/04/", "/05/","/06/","/07/","/08/","/09/","/10/","/11/","/12/"];

	 var currentDate = parameter;
	 for(var m = 0; monthNames.length > m; m++)
	 {
		 if( parameter.indexOf(monthNames[m]) != -1)
		  {
			 var startOfDate = parameter.indexOf(monthNames[m]);
			 var dateValue = parameter.substring(startOfDate-2,startOfDate+10);
			 var date = Ext.Date.parse(dateValue, "d/m/Y");  
			 var formattedDate=Ext.Date.format(date,"d-M-Y"); 
			 currentDate = currentDate.replace(dateValue,formattedDate);
		  }
	 }
   return currentDate;

}



function setBackground(fieldName, color) {
	var ctEform = globalMap.get("EFORMID");
	
	if(fieldName != null){
	  
	   var compObj = Ext.getCmp(ctEform+'-'+fieldName+'-id');
        
	   if(compObj){
	      
		  compObj.setFieldStyle('background-color:'+color+';background-image:none;');
		}
         
		}
}


//This method to load eform details from context menu for single field in screen
bcs.app.contextmenu.viewTransaction	= function(eformId, contextData){

	//Get corresponding context field.
	var fieldObj	= contextData["contextField"];
	var href		= "apps/etemplate/";

	//Check this eform is already opened or not in tabpanel.
	if(Ext.getCmp('docs-' + eformId))
	{//If yes
		// Contact Shiv
		Ext.getCmp('docs-' + eformId).close();
		
	}

	globalMap.add("CONTEXTREADONLY",true);
	
	var basicIdOfSingleField;
	if(contextData["contextGridFieldBasicId"])
	{
		basicIdOfSingleField = contextData["contextGridFieldBasicId"];
	}
	else
	{
		if(fieldObj.sourceKey)
		{
			//basicIdOfSingleField	= Ext.getCmp(fieldObj.id).displayTplData[0][Ext.getCmp(fieldObj.id).valueField.toLowerCase()];
			
			var storeid = fieldObj.store.storeId
			var recordIndex = Ext.data.StoreManager.lookup(storeid).find(
				fieldObj.valueField, fieldObj.value, 0, false, false, true);

			if (recordIndex === -1) {
				basicIdOfSingleField = '';
			} else {

				var id = fieldObj.sourceTable.toLowerCase() + 'id';
				basicIdOfSingleField = Ext.data.StoreManager.lookup(storeid).getAt(
						recordIndex).get(id);
			}

		}
		else
		{
			basicIdOfSingleField	= Ext.getCmp(fieldObj.id).getValue();
		}
	}
	
	viewStatus = true;
	//Get component for eform to draw.
	compObjOfContext = getEformLayoutForContect(href,eformId);
	
	var eformObjCxt = eformMap.get(eformId);
	if(globalMap.get("DEV") && globalMap.get("DEV") == "true")
	{
		createDebugMap(eformId,eformObjCxt);
	}
	var headerField;
	if (Ext.getCmp(fieldObj.id)) {
		if (Ext.getCmp(fieldObj.id).fieldLabel) {
			headerField = Ext.getCmp(fieldObj.id).fieldLabel;
		} else {
			headerField = Ext.getCmp(fieldObj.id).displayField;
		}
	}
	var headerName = 'EForm For - <font color="red"><b>'+headerField+'</b></font>';
	Ext.create('Ext.window.Window', {
		title		: headerName,
		height		: "90%",
		id			: globalMap.add("EFORMID")+"-conetxtMenuPopupWindow",
		width		: "85%",
		modal		: true,
		items		: compObjOfContext,
		autoScroll:true,
		parentEform	: fieldObj.id.split('-')[0],
		listeners	: {
			beforeclose : function(windowObj){
				globalMap.add('EFORMID',windowObj.parentEform);
			}
		}
	}).show();
	
	//Get search data to load into screen.
	searchResultForLoadTstuct(basicIdOfSingleField,"V",eformId);
	globalMap.add("CONTEXTREADONLY",false);
	
};

//This method is to create Conterxt menu report.
bcs.app.contextmenu.viewReport = function (reportName, paramsArray) {
	var eformId = globalMap.get("EFORMID");

	//Params string to array.
	if (!paramsArray) {
		paramsArray = [];
	} else {
		paramsArray = paramsArray.split(",");
	}

	if (activeRow === 'undefined' || activeRow === -1) {
		activeRow = 0;
	}
	var param1 = "eformid=" + eformId;
	var param2 = "fieldName=" + reportName;
	var sqlParam = paramsArray;
	var databaseFormat = globalMap.get("DB_FORMAT");
	var dateFormat = supportDBFmt.get(databaseFormat);
	var refQueryArray = new Array();

	var val = "";
	var addParams = '';
	var param = "";
	if (sqlParam.length > 0) {
		for (i = 0; i < sqlParam.length; i++) {
			val = eformId + "-" + sqlParam[i].toLowerCase() + "-id";
			var compVal = "";

			if (Ext.getCmp(val) && Ext.getCmp(val).compType && Ext.getCmp(val).compType === 'NG') {
				var vof = Ext.getCmp(val).getValue();
				if (Ext.getCmp(val).dataType === "D") {
					if (vof instanceof Date) {
						vof = Ext.Date.format(vof, dateFormat);
					} else {
						var cvof = Ext.Date.parse(vof, EXTJS_DATE_FORMAT_MAP.get(globalMap.get("DATEFORMAT")));
						vof = Ext.Date.format(cvof, dateFormat);
					}
				}

				compVal = vof;

				if ((!compVal) && !Ext.getCmp(val).hidden) {
					Ext.Msg.alert('<font color="red">Warning</font>', "<b>" + Ext.getCmp(val).fieldLabel + "</b> is Required for Report !.", function (btn, text) {
						if (btn === 'ok') {
							var obj = eformMap.get(eformId);
							getFirstVisibleField(obj, '', '');
						}
					});
					return;
				}
			}

			if (Ext.getCmp(val).editor) {
				combo = Ext.getCmp(val).editor;
				var gridStore = Ext.data.StoreManager.lookup(Ext.getCmp(val).editor.gridId + "-store");
				isParamValueChanged = true;
				var vof = gridStore.getAt(activeRow).data[Ext.getCmp(val).editor.name];

				if (Ext.getCmp(val).editor.dataType === "D") {
					if (vof instanceof Date) {
						vof = Ext.Date.format(vof, dateFormat);
					} else {

						var cvof = Ext.Date.parse(vof, EXTJS_DATE_FORMAT_MAP.get(globalMap.get("DATEFORMAT")));
						vof = Ext.Date.format(cvof, dateFormat);
					}
				}
				compVal = vof;

				if (!compVal) {
					Ext.Msg.alert('<font color="red">Warning</font>', "<b>" + val.split("-")[1] + "</b> is Required for Report !", function (btn, text) {
						if (btn === 'ok') {
							var obj = eformMap.get(eformId);
							getFirstVisibleField(obj, '', '');
						}
					});
					return;
				}
			} else if (Ext.getCmp(val).field) {
				combo = Ext.getCmp(val).field;
				var gridStore = Ext.data.StoreManager.lookup(Ext.getCmp(val).field.gridId + "-store");
				isParamValueChanged = true;
				var vof = gridStore.getAt(activeRow).data[Ext.getCmp(val).field.name];

				if (Ext.getCmp(val).field.dataType === "D") {
					if (vof instanceof Date) {
						vof = Ext.Date.format(vof, dateFormat);

					} else {
						var cvof = Ext.Date.parse(vof, EXTJS_DATE_FORMAT_MAP.get(globalMap.get("DATEFORMAT")));
						vof = Ext.Date.format(cvof, dateFormat);
					}
				}
				compVal = vof;
			}

			if (compVal) {
				refQueryArray.push(sqlParam[i].toLowerCase() + "=" + compVal);
			}

			if (Ext.getCmp(val) && Ext.getCmp(val).hidden) {
				if ((!compVal) && !Ext.getCmp(val).hidden) {
					Ext.Msg.alert('<font color="red">Warning</font>', "<b>" + val.split("-")[1] + "</b> is Required Report !");
					return;
				}
			}

			addParams = addParams + "&" + sqlParam[i] + "=" + encodeURIComponent(compVal);
		}
	}
	param = param1 + "&" + param2 + "&" + addParams;

	if ((sqlParam.length > 0 & refQueryArray.length > 0 & (sqlParam.length == refQueryArray.length)) || (sqlParam.length === 0 & refQueryArray.length >= 0)) {
		
		param = param + "&CONTEXTMENUREPORT=true";
		displayRefQueryData(param, reportName, eformId);
		
	} else {
		Ext.Msg.alert('<font color="red">Warning</font>', "<b>" + Ext.getCmp(val).fieldLabel + "</b> is Required for Report !");
		return;
	}
};

bcs.app.contextmenu.addContextMenu = function(contextButtons){
	return contextButtons;
};

bcs.app.contextmenu.openUrl =  function(url){
	window.open('http://'+url, '_blank');
};
function openHelpUrl(fileName){
	var path = "http://"+window.location.host+"/"+fileName+".html";
	Ext.create('Ext.window.Window', {
		modal : true,
		resizable : false,
		width:'60%',
		border:true,
		items : [{
			width:'100%',
			html:'<iframe src="'+path+'"  width="100%" height="400"></iframe>'
		}]
	}).show();
}

//This function to refresh field forcefully with out seeing suggestive and sourekey value.
bcs.app.forceRefreshField	= function(fieldname) {
	
	var currentTransEformId	= globalMap.get("EFORMID");
    var refreshField		= Ext.getCmp(currentTransEformId + "-" + fieldname.toLowerCase() + "-id");

    if(refreshField )
	{
		var sql			= refreshField.SQL;
        var suggestive	= refreshField.suggestive;
        var moe			= refreshField.modeOfEntry;
		var expression	= refreshField.expression;
		
		//This is for nongrid.
		if(refreshField.compType === "NG") {
			if(sql )
			{
				if(refreshField.compName === 'comboremotefield')
				{
					refreshField.store.removeAll();
					if(refreshField.hidden == true)
					{
						getHiddenComboDataForFirstVisibleFields(refreshField,true);
					}
					else
					{
						getVisibleComboDataForFirstVisibleFields(refreshField,true);
					}
				}
				else
				{
					getTextFieldDataForFirstVisibleFields(refreshField,null,true);
				}
			}
			
			//This is for source field.
			if(refreshField.linkField && refreshField.sourceField )
			{			  
				if (refreshField.linkField.length != 0 && refreshField.sourceField.length != 0)
				{
					if(! refreshField.getValue() ) {
						setSrcFieldValueNG(refreshField,0);											
					}
				}
			}
			
			
			if(expression)
			{
				 var result = GetExprUIValidation(refreshField);
				 Ext.getCmp(refreshField.id).setValue(result);
			
			}
		}
		else//This is for grid.
		{
			var fieldEditor	= null;
			var columnField	= refreshField;

			if (columnField.getEditor() ) {
				fieldEditor	= columnField.getEditor();
			}
			else {
				fieldEditor	= columnField.field;
			}
			
			var dataStore	= Ext.getCmp(fieldEditor.gridId + "-grid").store;
			var sql			= fieldEditor.SQL;
			var expression	= fieldEditor.expression;
			
			if(dataStore ) 
			{
				for (var ds = 0, len=dataStore.getCount(); ds < len; ds += 1) 
				{
					var dactiveRow = ds;
					globalMap.add("ACTIVEROW", dactiveRow + 1);
					
					//This is for Sql
					if(sql )
					{
						if(fieldEditor.cacheName || fieldEditor.gridSqlId)
						{
							
							if(fieldEditor.gridSqlId)
							{
								if(!fieldEditor.filter)
								{
									
								}
							}
							else
							{
								if(!fieldEditor.filter)
								{
									
									
								}
								
							}
							
						}
						else
						{
							if(!fieldEditor.filter)
							{
								fieldEditor.store.removeAll();
								getGridHiddenComboData(fieldEditor);
							}
						}
					}
					
					
					if(expression)
					{

						   var res = GridExprRow(fieldEditor, dactiveRow);
                        	
							if(fieldEditor.dataType == "N")
							{
								dataStore.data.items[ds].set(currentTransEformId + "-" + fieldname.toLowerCase(),parseFloat(res));
							}
							else
							{
								dataStore.data.items[ds].set(currentTransEformId + "-" + fieldname.toLowerCase(),res);
							}

						
					}
					
					
					//This is for validateExpression
					if (fieldEditor.validateExpression != null && fieldEditor.validateExpression.length > 0) 
					{
						var validExpr = GridValidExprRow(fieldEditor, dactiveRow);

						if (validExpr  && validExpr.indexOf("_") < 0) {

							if (validExpr != false && validExpr.toLowerCase() != 't') {
								if(bcsMask)
								bcsMask.hide();
								Ext.Msg.alert("Warning","Vaildation Expression Fails for field "+columnField.text+" = "+"<b>"+ validExpr.toLowerCase()+"</b>" );
								globalMap.add('SAVECOMP', false);
								return false;
							}
						}
					}
					
					//This is for sourche field.
					if (fieldEditor.sourceField != "") {
						setSrcEFieldValueGrid(fieldEditor, dataStore, dactiveRow, 1);
					}
				}
			}
		}
	}
}


bcs.app.addIcon = function (title, params) {

	var toolBar,
	key;

	if (title && title.toLowerCase() === "vd") {

		if(Ext.getCmp(globalMap.get("EFORMID")+'-report-icons')){
			toolBar = Ext.getCmp(globalMap.get("EFORMID")+'-report-icons')
		}else{
			toolBar = Ext.getCmp("toolBarBottom-2");
		}
		toolBar.add({
			xtype : 'tbspacer',
			width : 4
		}, {
			xtype:'button',
			text:'Archive',
			cls : 'buttonInline',
			icon : 'images/archive.png',
			iconCls : 'iconcursor',
			id : 'toolbarViewDocument ',
			tooltip : 'View Document',
			title : 'view',
			handler : function () {

				key = Ext.JSON.decode(params);
				reportStatus = true;
				mongoViewDocuments(key.title, key.EFORMID,reportStatus);
			}
		});

	} else if (title && title.toLowerCase() === "gd") {

		if(Ext.getCmp(globalMap.get("EFORMID")+'-report-icons')){
			toolBar = Ext.getCmp(globalMap.get("EFORMID")+'-report-icons')
		}else{
			toolBar = Ext.getCmp("toolBarBottom-2");
		}
		toolBar.add({
			xtype : 'tbspacer',
			width : 4
		}, {
			xtype:'button',
			text:'View',
			cls : 'buttonInline',
			icon : 'images/link.png',
			iconCls : 'iconcursor',
			id : 'gridViewDocument ',
			tooltip : 'View Document',
			title : 'GridView',
			handler : function () {

				//alert("Hi");
				key = Ext.JSON.decode(params);
				mongoGridViewDocuments(key.title, key.eformid);
			}
		});

	} else if (title && title.toLowerCase() === "linkform") {
		var mainAppPanel = Ext.getCmp('doc-body');
		if(Ext.getCmp(mainAppPanel.getActiveTab().id+'inlinebuttons')){
			toolBar = Ext.getCmp(mainAppPanel.getActiveTab().id+'inlinebuttons');
		}else{
			toolBar = Ext.getCmp("toolBarBottom-2");
		}
		toolBar.add({
			text:'Link Form',
			cls : 'buttonInline',
			icon : 'images/link.png',
			iconCls : 'iconcursor',
			id : 'linkFormOperation',
			tooltip : 'Link Form',
			handler : function () {
				key = Ext.JSON.decode(params);
				bcs.app.mappingReportRecordsToEform(key.TARGETEFORMID);
			}
		});

	} else if (title && title.toLowerCase() === "exportxml") {

		if(Ext.getCmp(globalMap.get("EFORMID")+'-report-icons')){
			toolBar = Ext.getCmp(globalMap.get("EFORMID")+'-report-icons')
		}else{
			toolBar = Ext.getCmp("toolBarBottom-2");
		}
		toolBar.add({
			xtype : 'tbspacer',
			width : 10
		}, {
			xtype:'button',
			text:'Export',
			cls : 'buttonInline',
			icon : 'images/export.png',
			iconCls : 'iconcursor',
			id : 'exportXmlId',
			tooltip : 'Export Xml',
			title : 'Export XML',
			handler : function () {
				
				key = Ext.JSON.decode(params);
				reportExportXml(key.BASICID,key.XMLFORMATNAME);
			}
		});
	}
}

bcs.app.showJasperReport = function (edocTableId, status) {

	return {
		docid : edocTableId,
		status : status
	};

}

bcs.app.setFillGridName = function (fillgridname) {

	return fillgridname;

}

bcs.app.gridColConcat = function (fieldname, fieldvalue, actionfield, delimeter) {

  	if (fieldvalue == "") {
  		return "";
  	}

  	if (delimeter.trim() == "")
  		delimeter = ",";

  	getGridObj(fieldname, actionfield, "NV");
  	var dataStore = null;
  	var AppendVal = "";

  	if (compObjName != null) {
  		if (compGridObj != null) {
  			dataStore = compGridObj.store;
  		}
  		if (compStoreObj != null) {
  			dataStore = compStoreObj;
  		}
  		if (dataStore != null) {
  			var RowCount = dataStore.getCount();

  			for (var rc = 0; rc < RowCount; rc++) {

  				if (dataStore.data.items[rc].data[compObjName] == fieldvalue) {

  					var actionFieldVal = dataStore.data.items[rc].data[actionObjName];

  					if ((RowCount - 1) == rc)
  						AppendVal = AppendVal + actionFieldVal;
  					else
  						AppendVal = AppendVal + actionFieldVal + delimeter;

  				}
  			}			
			var lastChar = AppendVal.charAt(AppendVal.length - 1);
			if (lastChar === ",") {
				AppendVal = AppendVal.slice(0, AppendVal.length - 1);
			}

  		}

  	}
  	return AppendVal;
  }
  
bcs.app.showAlert = function(msg) {
 	if (msg) {
 		Ext.Msg.alert("<Font color = 'green'>Info</Font>", msg);
 	}
 }

bcs.app.fireSqlCacheForNonGrid = function (storeName, fireSqlId, params) {

	processFireSqlCacheForNonGrid(storeName, fireSqlId, params);
}

bcs.app.fireSqlCacheForGrid = function(storeName){
	
	processFireSqlCacheForGrid(storeName);
}

bcs.app.closeEForm = function(eformId){
	
	drildownEformCloseMap.add(eformId.toLowerCase(),true)
}
bcs.app.immediateCloseEForm = function(eformId){
	Ext.getCmp('doc-body').getActiveTab().close();	
}
bcs.app.showDialog = function(alert){
	
	Ext.Msg.alert("Warning",alert);
	return;
}
bcs.app.eformPopup = function(eformId,referenceField,height,width){	
	createEformPopup(eformId,referenceField,height,width);
}



bcs.app.cacheSqlGet = function(storeName,columnName) {

	return processCacheSqlGet(storeName,columnName);
}

bcs.app.processGetSqlList = function (fieldName, requiredFieldValue) {

	var eformid, obj, compType, objStore, rec, gridObj;

	if (postArray != null) {

		    var eformid = postTarget['EFORMID']

	        var rowNos = postCurrentRow
	        
	        value = genLinkField.get(rowNos+":-:"+eformid+"-"+fieldName)

			if(value)
			{
				if(value instanceof Object)

				   return value[requiredFieldValue];
				
				else

				   return value[0][requiredFieldValue];

			}
			else
			{
				
				return "";
			}


	} else {

		try {

			eformid = globalMap.get("EFORMID");

			try {
				obj = Ext.getCmp(eformid + "-" + fieldName.toLowerCase()
						+ "-id");

				reqObj = Ext.getCmp(eformid + "-"
						+ requiredFieldValue.toLowerCase() + "-id");

				if (obj.getEditor()) {
					compType = "G";
				} else {
					compType = "NG";
				}
			} catch (ex) {
				compType = "NG";
			}

			if (compType === "G") {
				// handling grid fields
				gridObj = obj.getEditor();
				rec = gridObj.getStore().findRecord(gridObj.valueField,
						gridObj.getValue(), 0, false, false, true);

				if (reqObj) {
					if (reqObj.getEditor().dataType == "D") {
						try {

							value = rec.data[requiredFieldValue];

							var databaseFormat = globalMap.get("DATEFORMAT");
							var getAssociateExtjsFormat = EXTJS_DATE_FORMAT_MAP
									.get(databaseFormat);
							value = Ext.Date.parse(value,
									getAssociateExtjsFormat);
							value = Ext.Date.format(value,
									getAssociateExtjsFormat);

							reqObj.getEditor().setValue(value);

							return value;

						} catch (err) {

							return "";
						}

					} else if (reqObj.getEditor().dataType == "N") {

						return parseFloat(rec.data[requiredFieldValue]);
					} else {
						return rec.data[requiredFieldValue];

					}
				} else {

					return rec.data[requiredFieldValue];
				}

			} else {
				// handling non grid fields
				rec = obj.getStore().findRecord(obj.valueField, obj.getValue(),
						0, false, false, true);

				if (reqObj) {

					if (reqObj.dataType == "D") {
						try {

							value = rec.data[requiredFieldValue];

							var databaseFormat = globalMap.get("DATEFORMAT");
							var getAssociateExtjsFormat = EXTJS_DATE_FORMAT_MAP
									.get(databaseFormat);

							value = Ext.Date.parse(value,
									getAssociateExtjsFormat);

							value = Ext.Date.format(value,
									getAssociateExtjsFormat);

							reqObj.setValue(value);

							return value;

						} catch (err) {

							return "";
						}

					} else if (reqObj.dataType == "N") {

						return parseFloat(rec.data[requiredFieldValue]);
					} else {
						return rec.data[requiredFieldValue];

					}
				} else {

					return rec.data[requiredFieldValue];
				}
			}

		} catch (err) {

			return "";
		}

	}
			

}

function getExprForcheckBox(GetObj){

	var CrntObj = new Array();

	CrntObj.getExp = GetObj.expression;

    ctExprMap.add("expr",CrntObj.getExp);

	CrntObj.getId = GetObj.id;

	var GetEform = CrntObj.getId.split("-");

	ExprObj = new Expression("");

	ExprObj.Expression(CrntObj.getExp, GetEform[0], GetObj);

	var GetVal = ExprObj.Evaluate();
	
	return GetVal;

}

function getHours(fromDate,fromTime,toDate,toTime,dateFormat,timeFormat){

	fromTime=fromTime.replace(" ", ":");
	toTime=toTime.replace(" ", ":");
	fromDate.setHours(fromTime.split(':')[0]);
	fromDate.setMinutes(fromTime.split(':')[1]);
	toDate.setHours(toTime.split(':')[0]);
	toDate.setMinutes(toTime.split(':')[1]);

	var diff = toDate.valueOf() - fromDate.valueOf();
	var diffInHours = diff/1000/60/60;

	return diffInHours;
}

function createEformPopup(eformId,referenceField,width,height,basicId,actionType) {
	getEformPopup(eformId,referenceField,width,height,basicId,actionType);			
}

function validateLatLng(latField,longitudeField){
	var latitude = Ext.getCmp(globalMap.get('EFORMID')+"-"+latField.toLowerCase()+"-id").getValue();
	var longitude = Ext.getCmp(globalMap.get('EFORMID')+"-"+longitudeField.toLowerCase()+"-id").getValue();
	var url = getURL() + "apps/geolocation/validateLatLng";
	var param = "latitude="+latitude+"&longitude="+longitude+"loginId="+globalMap.get("USERNAME");
	var response = "F";
	bcs.app.ajaxhelper.doXhr(url, param, false, function (data) {
			if(data){
				var resp = Ext.JSON.decode(data);
				if(resp.result == "success"){
					response =  "T";
				}
			}
					
	});
	
	return response;
}

function getLatitude(){
	return geoplugin_latitude();
}

function getLongitude(){
	return geoplugin_longitude();
}


function loadTstructNew(basicIdField,eformId){
//	if(type === "E"){
		href = "apps/etemplate/";
	    
		var mainAppPanel = Ext.getCmp('doc-body');
		var grid = mainAppPanel.getActiveTab().items.items[0];
		var modelMap = grid.model;
		var currentRow="";
		var userInput ="";
		if(modelMap){
		 currentRow = modelMap.get("current_record").data;
		 userInput = modelMap.get("user_input_values");
		}
		 else{
		   currentRow =  globalMap.get("dashboardWidgetREcord").data;
		   
		 }
		 
	  // var basicIdField = grid.columns[0].dataIndex;
	   var basicid=currentRow[basicIdField];
	   var transactionId = currentRow[eformId];
		loadTargetTransaction(transactionId);
	    searchResultForLoadTstuct(basicid, "M", transactionId);
	//}
}

function generateRedirectURL(field1,field2,field3,field4){
	var txview = Ext.getCmp(globalMap.get('EFORMID')+'-'+field1+'-id');
	var txtype = Ext.getCmp(globalMap.get('EFORMID')+'-'+field2+'-id');
	var txtitle = Ext.getCmp(globalMap.get('EFORMID')+'-'+field3+'-id');
	var userid = Ext.getCmp(globalMap.get('EFORMID')+'-'+field4+'-id');
	var urlValue = "";
	var txview1 ="",txtype1 = "",txtitle1 = "",userid1 = "" ;
	
	if(txview){
		txview1 = txview.getValue();
	}else{
		txview1 = field1;
	}
	if(txtype){
		txtype1 = txtype.getValue();
	}else{
		txtype1 = field2;
	}
	if(txtitle){
		txtitle1 = txtitle.getValue();
	}else{
		txtitle1 = field3;
	}
	if(userid){
		userid1 = userid.getValue();
	}else{
		userid1 = field4;
	}
	
	var jsonUrl = {
		"tx":txview1,
		"type":txtype1,
		"title":txtitle1,
		"userid":userid1
	}
	if(jsonUrl){
		urlValue = JSON.stringify(jsonUrl);
	}
	return getURL()+"apps/redirect/forward?info="+encodeURI(urlValue);
}

function chkValueWithDB(tablename,fieldname,fieldvalue){
	var collection = lokidb.getCollection(tablename);
	var filter = {};
	 filter[fieldname] = {'$contains': fieldvalue};
	var results = collection.find(filter);
	if(results instanceof Array && results.length > 0){
		return 'T'
	}else{
		return 'F';
	}
}

function getValueFromDB(tablename,matchingfield,matchingvalue,getfieldname){
	var collection = lokidb.getCollection(tablename);
	var filter = {};
	 filter[matchingfield] = {'$eq': matchingvalue};
	var results = collection.find(filter);
	if(results instanceof Array && results.length > 0){
		if(results.length == 1){
			return results[0][getfieldname];
		}else{
			console.log('Matching query return more than one');
			return '';
		}
	}else{
		console.log('invalid matching query');
		return '';
	}
}

function checkForRegExpr(fieldvalue,regexpr){
	debugger;
	var regexp = new RegExp(regexpr);
	if(fieldvalue.match(regexp)){
		return 'T';
		
	}else{
		return 'F';
	}
}

function getAutoGeneratedExpressionValue(hdnReadOnlyObj){
	var ValidObj = new Array();

	ValidObj.getExp = hdnReadOnlyObj.expression;

	ctExprMap.add("expr",hdnReadOnlyObj.expression);

	ValidObj.name = hdnReadOnlyObj.name;

	var GetEform = ValidObj.name.split("-");

	ExprObj = new Expression("");

	ExprObj.Expression(ValidObj.getExp, GetEform[0], hdnReadOnlyObj);

	var GetVal = ExprObj.Evaluate();
	
	//This line is for field changed.written by raja.i
	if(GetVal != false && globalMap.get("fieldChangedExp") != "" && globalMap.get("fieldChangedExp") != null && GetVal.toLowerCase() != 't')
	{
		var fieldId = globalMap.get("fieldChangedExp");
		Ext.getCmp(fieldId).setValue(Ext.getCmp(fieldId).previousValue);
	}

	$veTracker.add(GetEform[0]+":=="+hdnReadOnlyObj.expression,GetVal);
	
	return GetVal;
}

function convertTime24to12(time24){
	var tmpArr = time24.split(':'), time12;
	if(+tmpArr[0] == 12) {
		time12 = tmpArr[0] + ':' + tmpArr[1] + ' pm';
	} else {
		if(+tmpArr[0] == 00) {
			time12 = '12:' + tmpArr[1] + ' am';
		} else {
			if(+tmpArr[0] > 12) {
				if(tmpArr[0]-12 <10){
					time12 = '0'+(+tmpArr[0]-12) + ':' + tmpArr[1] + ' pm';
				}
				else{
				time12 = (+tmpArr[0]-12) + ':' + tmpArr[1] + ' pm';
				}
			} else {
				time12 = (tmpArr[0]) + ':' + tmpArr[1] + ' am';
			}
		}
	}
	return time12;
}

function format(inputDate) {
	var date = new Date(inputDate);
	if (!isNaN(d.getTime())) {
		// Months use 0 index.
		return date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear();
	}
}

//FireSql.js
function executeFireSQL(storeName, EformId, firesqlid, namedParam, sqltype, grid,selectedRecords) {
	var param,responseString;
	param = "firesqlid=" + firesqlid + "&storeName="+storeName + "&eformid=" + EformId + "&crud=" + sqltype + "&username=" + storages["USERNAME"] + "&projectid=" + storages["PROJECTID"] + "&projectname=" +storages["PROJECTNAME"] + "&ISMULTITENANT=" + storages["ISMULTITENANT"] + "&type=" + grid;
	if (grid.toUpperCase() === 'R') {

		param = param + constructFireSQLParam(storeName, firesqlid, namedParam, sqltype,EformId);

	} else {

		var	trimNamedParam,
		paramArr,
		paramObj,
	
		trimNamedParam = namedParam.replace(/\s/g, "");
		paramArr = trimNamedParam.split(";");		
		
		if (trimNamedParam) {

			paramArr = trimNamedParam.split(";");
			if(grid.toUpperCase() === 'N'){
				
				paramField = storages["recordId"];
				param = param + "&" + paramArr[0].toLowerCase() + "=" + encodeURIComponent(paramField);
			
			}else if(grid.toUpperCase() === 'T') {
				
				for (var i = 0; i < paramArr.length; i++) {

					// paramObj = paramArr[i].toLowerCase();
					// if (paramObj) {					
					// 	//get from preset or DOM
					// 	paramField = paramObj.getValue();
					// 	param = param + "&" + paramArr[i].toLowerCase() + "=" + encodeURIComponent(paramField);
					// }
					
					paramField = storages.preset_value[paramArr[i].toLowerCase()]

					if (paramField) {
						param = param + "&" + paramArr[i].toLowerCase() + "=" + encodeURIComponent(paramField);
					}

				}

			}

		}
	}

	var ajaxObj = null;
	if (typeof XMLHttpRequest != 'undefined') {
		ajaxObj = new XMLHttpRequest();
	} else if (window.ActiveXObject) {
		var avers = ["Microsoft.XmlHttp", "MSXML2.XmlHttp",
			"MSXML2.XmlHttp.3.0", "MSXML2.XmlHttp.4.0",
			"MSXML2.XmlHttp.5.0"];
		for (var i = avers.length - 1; i >= 0; i--) {
			try {
				ajaxObj = new ActiveXObject(avers[i]);
				break;
			} catch (e) {}
		}
	}

	if (!ajaxObj) {

		throw new Error('XMLHttp (AJAX) not supported');
	}

	var url = storages["RESTURL"]+"mobileserviceapi/firesql/";

	ajaxObj.open("POST", url, false);

	ajaxObj.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	//ajaxObj.setRequestHeader("X-Requested-With","XMLHttpRequest");

	ajaxObj.onreadystatechange = function () {
		if (ajaxObj.readyState == 4 && ajaxObj.status == 200) {

			var obj = ajaxObj.responseText;
			try {
				var jsonObj = JSON.parse(this.responseText);
				storages[EformId + "-" + storeName.toLowerCase()] = jsonObj;
				
			} catch (err) {
				storages[EformId + "-" + storeName.toLowerCase()] = "";
			}

			eformVarMap[EformId + "-" + storeName.toLowerCase()] =  responseString;
			return true;
		}
	}
	ajaxObj.send(param);
}

function constructFireSQLParam(storeName, firesqlid, namedParam, sqltype,EFormId) {

	var paramObj = "";

	var keyVal = stringSplitFn(namedParam, ';');

	for (var k = 0; k < keyVal.length; k++) {
		if(keyVal[k] in storages){
			paramObj = paramObj+"&"+ keyVal[k].toLowerCase()+"="+encodeURIComponent(storages[keyVal[k]]);
			
		}else if(keyVal[k] in storages.preset_value){
			paramObj = paramObj+"&"+ keyVal[k].toLowerCase()+"="+encodeURIComponent(storages.preset_value[keyVal[k]]);
		}
		else if((storages['eformid']+"-"+keyVal[k]) in storages){
			paramObj = paramObj+"&"+ keyVal[k].toLowerCase()+"="+encodeURIComponent(storages[(storages['eformid']+"-"+keyVal[k])]);
		}
		else{
			paramObj = paramObj+"&"+ keyVal[k].toLowerCase()+"="+encodeURIComponent("");
		}
	}

	return paramObj;

}

function executeFireSqlArray(fireSqlArray) {

	var fireArray = [],
	fireObj = {},
	paramObj = "",
	param,
	url,
	arr;
	
	while (fireSqlArray.indexOf("|_") !== -1 || fireSqlArray.indexOf("_|") !== -1) {
		fireSqlArray = fireSqlArray.replace("|_", "{");
		fireSqlArray = fireSqlArray.replace("_|", "}");
	}

	fireSqlArray = "[" + fireSqlArray + "]";

	arr = Ext.JSON.decode(fireSqlArray);
	if (arr.length > 0 && arr !== null) {

		for (var firei = 0; firei < arr.length; firei++) {

			var storeName = arr[firei].SN;
			var firesqlid = arr[firei].ID;
			var sqlType = arr[firei].ST;
			var compType = arr[firei].GD;
			var params = arr[firei].PM;

			if (compType === "R") {
				fireObj = {

					"storeName" : storeName,
					"firesqlid" : firesqlid,
					"eformid" : "REPFISQL",
					"params" : params

				};

				paramObj = getFireSqlArrayParamListForReport(fireObj, sqlType);
				fireArray.push(paramObj);
			} else {
				fireObj = {

					"storeName" : storeName,
					"firesqlid" : firesqlid,
					"eformid" : globalMap.get("EFORMID"),
					"params" : params

				};
				paramObj = getFireSqlArrayParamListForTrans(fireObj, sqlType);
				fireArray.push(paramObj);
			}
		}

		var obj = null;
		url = getURL() + "apps/fireSql/fireSqlArray";
		param = "FIRESQLARRAY=" + Ext.JSON.encode(fireArray) + "&username=" + globalMap.get("USERNAME") + "&projectid=" + globalMap.get("PROJECTNAME") + "&BCSCompType=FIRESQLARRAY";

		bcs.app.ajaxhelper.doXhr(url, param, false, function (data) {

			if (data) {
				obj = Ext.JSON.decode(data);
				for (var fire = 0; fire < obj.length; fire++) {
					if (obj[fire].toString() !== "success") {
						var fireSQLResult = eval("(" + obj[fire].toString() + ')');
						for (var sName in fireSQLResult) {
							eformVarMap.add("report-" + sName.toLowerCase(), fireSQLResult);
						}
					}
				}
			}

			return true;

		});

	}

}

function getFireSqlArrayParamListForReport(fireObj, sqlType) {

	var params = fireObj['params'];
	var paramObj = {};
	var keyVal = stringSplitFn(params, ',');
	var EFormId	= globalMap.get("EFORMID").split('-')[1]
	for (var k = 0; k < keyVal.length; k++) {

		//var queryMasterId = reportCtStatus.get("QID");
		var queryMasterId =EFormId;

		if (keyVal[k] !== null && keyVal[k].length > 0) {

			var key = queryMasterId + ":-:" + keyVal[k].toLowerCase();
			var val = reportEventVarMap.get(key);

			if (val) {
				paramObj[keyVal[k].toUpperCase()] = val;

			} else {

				var mainPanel = Ext.getCmp('doc-body');
				var reportGrid = mainPanel.getActiveTab().items.items[0];
				var currentRecord = reportCtStatus.get('ctRecord');

				if (currentRecord) {
					var columnsList = reportGrid.columns;
					if (columnsList) {

						var column = getColumnIndex(columnsList, keyVal[k].toLowerCase());
						if (currentRecord && currentRecord.get(keyVal[k].toLowerCase())) {
							if (column.dataType === "D") {
								var value = currentRecord.get(keyVal[k].toLowerCase());
								var dataValue = convertStringToDBFormat(value);
								paramObj[keyVal[k].toLowerCase()] = dataValue;

							} else {
								paramObj[keyVal[k].toLowerCase()] = currentRecord.get(keyVal[k].toLowerCase());
							}
						}

					}
				}

				var reportInputParam = reportCtStatus.get("REPORT_INPUTPARAM");

				if (reportInputParam[keyVal[k].toLowerCase()]) {
					var data = convertStringToDBFormat(reportInputParam[keyVal[k].toLowerCase()]);

					if (data.length === 0) {
						paramObj[keyVal[k].toLowerCase()] = reportInputParam[keyVal[k].toLowerCase()];
					} else {
						paramObj[keyVal[k].toLowerCase()] = data;
					}

				}
			}

		}

	}

	paramObj["CRUD"] = sqlType;
	fireObj['params'] = paramObj;

	return fireObj;

}

function getFireSqlArrayParamListForTrans(fireObj, sqlType) {

	var params = fireObj['params'];
	var eformId = fireObj['eformid'];
	var paramObj = {};
	var paramValues = "";
	var dataType = "";

	if (params === "" || params === null) {

		paramObj["CRUD"] = sqlType;
		fireObj['params'] = paramObj;
		return fireObj;

	} else {
		var keyVal = stringSplitFn(params, ',');

		if (keyVal !== null && keyVal.length > 0) {
			for (var i = 0; i < keyVal.length; i++) {
				dataType = Ext.getCmp(eformId + "-" + keyVal[i].toLowerCase() + "-id").dataType;
				if (dtype === 'D') {

					var databaseFormat = globalMap.get("DB_FORMAT");
					var getAssociateExtjsFormat = supportDBFmt
						.get(databaseFormat);

					var val = Ext.Date
						.format(
							Ext.getCmp(eformId + '-'
								 + keyVal[i].toLowerCase()
								 + '-id').value,
							getAssociateExtjsFormat);

					paramValues = val;
				} else {
					paramValues = Ext.getCmp(eformId + '-'
							 + keyVal[i].toLowerCase() + '-id').value;
				}
				paramObj[keyVal[i].toUpperCase()] = paramValues;
			}
		}
	}
	paramObj["CRUD"] = sqlType;
	fireObj['params'] = paramObj;

	return fireObj;

}

function constructFireSQLrecord(grid_object, paramArr, ctEform) {

	var record = [];

	var grid_store_data = grid_object.store.data;

	for (var s = 0; s < grid_store_data.items.length; s++) {

		var fieldJson = {};

		for (var i = 0; i < paramArr.length; i++) {

			var paramField = Ext.getCmp(ctEform + "-" + paramArr[i].toLowerCase() + "-id");
			if (paramField.compType === "NG") {

				var ng_value = paramField.getValue();

				if (ng_value instanceof Date) {

					var databaseFormat = globalMap.get("DB_FORMAT");
					var extjsDBFormat = supportDBFmt.get(databaseFormat);
					var ng_date_value = Ext.Date.format(ng_value, extjsDBFormat);
					fieldJson[paramArr[i].toLowerCase()] = ng_date_value;
				} else {

					fieldJson[paramArr[i].toLowerCase()] = ng_value;

				}

			} else if (Ext.getCmp(ctEform + "-" + paramArr[i].toLowerCase() + "-id").getEditor().compType === "G") {

				fieldJson[paramArr[i].toLowerCase()] = grid_store_data.items[s].data[ctEform + "-" + paramArr[i].toLowerCase()];

			}
		}

		record.push(fieldJson);

	}

	return Ext.JSON.encode(record);

}

function processSqlGet(eformid,store, column) {

	var ctEform,
	resultSet,
	resultSetJson,
	getRowArray;

	ctEform = eformid;

	if (!isNaN(ctEform)) {
		ctEform = "report";
	}

	resultSetJson =  storages[ctEform + "-" + store.toLowerCase()];
	if(!resultSetJson){
		resultSetJson = storages["report" + "-" + store.toLowerCase()];
	}
	resultSet = JSON.parse(resultSet.data);
	if (resultSet) {
		if (resultSet[store] !== null) {

			getRowArray = JSON.parse(resultSet[store]);

			if (getRowArray && getRowArray.length !== 0) {
				
				// before change contact shiv or jaikar
				if(getRowArray && getRowArray.length === 1) {
					return getRowArray[0][column.toLowerCase()];
				}else{
					return getRowArray;
				}

			} else {

				return null;
			}

		} else {
		
			return resultSet;
		}
	} else {
		return null;
	}
}

function processFireSqlCacheForNonGrid(storeName, fireSqlId, params) {

	var eformId,
	dbFormat,
	requiredFormat,
	paramList,
	paramAry,
	paramObj = {},
	dataType,
	paramName,
	paramValue,
	dtValue,
	dateValue,
	url;

	dbFormat = globalMap.get("DB_FORMAT");
	requiredFormat = supportDBFmt.get(dbFormat);

	eformId = globalMap.get("EFORMID");

	paramList = params.replace(/\s/g, "");
	paramAry = paramList.split(",");

	paramObj.storename = storeName;
	paramObj.firesqlid = fireSqlId;
	if(eformId == "Mast"){
		paramObj.eformid = "accounts_tree_txview";
	}else{
		paramObj.eformid = eformId;
	}
	paramObj.projectid = globalMap.get("PROJECTNAME");
	paramObj.username = globalMap.get("USERNAME");
	paramObj.CRUD = "S";

	if (paramAry) {

		for (var i = 0; i < paramAry.length; i++) {

			paramName = paramAry[i].toLowerCase();
			dataType = Ext.getCmp(eformId + "-" + paramName + "-id").dataType;

			if (dataType === "D") {

				dtValue = Ext.getCmp(eformId + '-' + paramName + '-id').getValue();
				dateValue = Ext.Date.format(dtValue, requiredFormat);

				paramValue = dateValue;
				paramObj[paramName] = paramValue;

			} else {

				paramValue = Ext.getCmp(eformId + '-' + paramName + '-id').getValue();
				paramObj[paramName] = paramValue;

			}

		}
	}

	url = getURL() + "apps/fireSql/";
	bcs.app.ajaxhelper.doXhr(url, Ext.Object.toQueryString(paramObj), false, function (data) {

		if (data) {
			var response = Ext.JSON.decode(data);

			if (response) {
				eformVarMap.add(eformId + "-" + storeName.toLowerCase(), response);
			}
		}
	});

}

// fieldName is nothing but storename.
function processFireSqlCacheForGrid(fieldName) {

	var eformId,
	metaData,
	fireSqlGridCache,
	curStoreNameMetaData;

	eformId = globalMap.get("EFORMID");
	metaData = eformMap.get(eformId);

	if (metaData && metaData.FIRESQLGRIDCACHE) {
		fireSqlGridCache = metaData.FIRESQLGRIDCACHE;
		
		for (var i = 0, iLen = fireSqlGridCache.length; i < iLen; i += 1) {

			if (fireSqlGridCache[i].name.toLowerCase() === fieldName.toLowerCase()+"-fire") {
				curStoreNameMetaData = fireSqlGridCache[i];
				break;
			}
		}
		if (curStoreNameMetaData) {

			fetchFireSqlGridCacheForTextfield(curStoreNameMetaData, activeRow, eformId);

		}

	}

}

var fetchFireSqlGridCacheForTextfield = function (obj, activeRow, eformid) {

	var fieldName,
	params,
	gridFilterFields,
	storeId,
	filterFields,
	gridStore,
	fieldObj;
		
	
	fieldName = obj.name.split("-");
	params = getParamValues(obj, activeRow);
	gridFilterFields = obj.gridFilterFields;
	
	fieldObjData = Ext.getCmp(eformid + "-" + fieldName[0].toLowerCase() + "-id");

	if (fieldObjData.editor) {
		fieldObj = fieldObjData.editor;
	} else {
		fieldObj = fieldObjData.field;
	}
	

	storeId = fieldObj.gridId + "-store";
	gridStore = Ext.data.StoreManager.lookup(storeId);
	params['fieldName'] = fieldName[0];
	params['eformid'] = eformid;

	filterFields = getFilterFields(gridFilterFields, gridStore, activeRow);

	bcs.app.cachemanager.fetchGridCacheForCombo(obj, activeRow, "", "", params, filterFields, "", gridStore, eformid, function (storeData) {});

};

function processCacheSqlGet(storeName, columnName) {

	var eformId,
	metaData,
	fireSqlGridCache,
	obj,
	filterFields,
	gridStore,
	storeId,
	fieldObj,
	fieldObjData,
	currentFieldValue;

	if (storeName && columnName) {
		
		eformId	= globalMap.get("EFORMID");
		metaData = eformMap.get(eformId);
		fireSqlGridCache = metaData.FIRESQLGRIDCACHE;
		
		if (fireSqlGridCache) {
			for (var i = 0, iLen = fireSqlGridCache.length; i < iLen; i++) {

				if (fireSqlGridCache[i].name.toLowerCase() === storeName.toLowerCase() + "-fire") {

					obj = fireSqlGridCache[i];
					break;
				}
			}

			if (obj) {

				fieldName = obj.name.split("-");

				fieldObjData = Ext.getCmp(eformId + "-" + fieldName[0].toLowerCase() + "-id");

				if (fieldObjData.editor) {
					fieldObj = fieldObjData.editor;
				} else {
					fieldObj = fieldObjData.field;
				}
				storeId = fieldObj.gridId + "-store";
				gridStore = Ext.data.StoreManager.lookup(storeId);

				gridFilterFields = obj.gridFilterFields;
				filterFields = getFilterFields(gridFilterFields, gridStore, activeRow);

				getDataForFireSqlCache(obj, filterFields, "", "", "", gridStore, eformId, function (storeData) {

					if (storeData && storeData.length === 1) {

						currentFieldValue = storeData[0][columnName];

					} else {
						if (obj.dataType == "N") {

							currentFieldValue = 0;
						} else {
							currentFieldValue = "";

						}
					}

					if (obj.gridExp) {

						var exprval = GridCacheExprRow(obj, activeRow);

						if (obj.dataType === "N") {
							if (exprval) {
								currentFieldValue = parseFloat(exprval);
							} else {
								currentFieldValue = parseFloat(0);
							}
						}

					}

				});

				return currentFieldValue;
			}
		}
	} else {

		console.log("Error: please pass storename and columnname into cachesqlget !");
	}
}


	var getDataForFireSqlCache = function (obj,gridFilterFields, filterValue, saveValue,valueFld,gridStore,eformid,callback) {
	
		var storeData = "";
		var cacheDB = "";
		if (bcs.app.cachemanager.doesGridCacheExists(obj.gridSqlId)) {
			cacheDB = loki.getCollection(obj.gridSqlId);
			var lokiObj = bcs.app.cachemanager.buildDynamicFilterCriteria(gridFilterFields,valueFld,gridStore,eformid);
			var filterObj = buildApplyFilterCriteriaForFireSqlCache( filterValue, saveValue,valueFld,obj);
			if(!isEmptyCache(lokiObj) && !isEmptyCache(filterObj))
			{
				storeData = cacheDB.chain().find(lokiObj).copy().find(filterObj).data();			
			}
			else if(isEmptyCache(lokiObj) && !isEmptyCache(filterObj))
			{			
				storeData = cacheDB.chain().find(filterObj).simplesort(valueFld,false).data();
				if(saveValue)
				{				
				   if (storeData.length == 0)
				   {
				      storeData=cacheDB.data;
				   }
				}
				
			}
			else if(!isEmptyCache(lokiObj) && isEmptyCache(filterObj))
			{					
				storeData = cacheDB.chain().find(lokiObj).simplesort(valueFld,false).data();
                if(saveValue)
				{				
				   if (storeData.length == 0)
				   {
				      storeData=cacheDB.data;
				   }
				}
         				
			}
			else if(isEmptyCache(lokiObj) && isEmptyCache(filterObj))
			{				
							
				storeData=cacheDB.data;
			}
			
			if (callback) {
				callback(storeData);
			}
		}
	}
	
	var buildApplyFilterCriteriaForFireSqlCache = function(filterValue, saveValue,valueField,obj)
	{
		var filtercriteria = {};

		if(obj.filterLength)
		{
			var filterObj = {
			       '$contains' : filterValue
			};
			filtercriteria[valueField] = filterObj;

		}
		else
		{
			if (filterValue && !saveValue) {

				var filterObj = {
					'$contains' : filterValue
				};
				filtercriteria[valueField] = filterObj;
			} else if (saveValue) {
				
				if(filterValue)
				{
					var saveObj = {
						'$eq' : filterValue
					};
					filtercriteria[valueField] = saveObj;
				}
			}
		}
		return filtercriteria;
	}
	
	var isEmptyCache = function (obj) {				
		var empty = true;
		
		for(var key in obj) {
		
			
			if(key && obj.hasOwnProperty(key))
				empty = false;
		}
		return empty;
	}
	
	
	function constructFireSQLParamMultiRecord(storeName, firesqlid, namedParam, sqltype,selectedRecords){
		var paramObj = {};
		var EFormId	= globalMap.get("EFORMID").split('-')[1];
		if(!EFormId){
			EFormId	= globalMap.get("EFORMID");
		}
		paramObj['firesqlid'] = firesqlid;
		paramObj['storeName'] = storeName;
		paramObj['eformid'] = 'REPFISQL';
		paramObj['crud'] = sqltype;
		paramObj['reportid'] =EFormId
		
		var keyVal = stringSplitFn(namedParam, ',');
		
		for (var k = 0; k < keyVal.length; k++) {
		//var queryMasterId = reportCtStatus.get("QID");
		var queryMasterId = EFormId;
		if (keyVal[k] !== null && keyVal[k].length > 0) {
			var key = queryMasterId + ":-:" + keyVal[k].toLowerCase();
		var mainPanel = Ext.getCmp('doc-body');
		var reportGrid = mainPanel.getActiveTab().items.items[0];
		var columnsList = reportGrid.columns;
		if (columnsList) {
			var column = getColumnIndex(columnsList, keyVal[k].toLowerCase());
			if (selectedRecords && selectedRecords.data[keyVal[k].toLowerCase()]) {

			if (column && column.dataType === "D") {
				var value =  selectedRecords.data[keyVal[k].toLowerCase()];
				var dataValue = convertStringToDBFormat(value);
				paramObj[keyVal[k].toLowerCase()] = dataValue;
			} else {
				paramObj[keyVal[k].toLowerCase()] =  selectedRecords.data[keyVal[k].toLowerCase()];
				}
			 }
			}
		if(selectedRecords.data[keyVal[k].toLowerCase()] == "" || selectedRecords.data[keyVal[k].toLowerCase()] == undefined ){			
			var reportInputParam = reportCtStatus.get("REPORT_INPUTPARAM");

				if (reportInputParam[keyVal[k].toLowerCase()]) {

					var data = convertStringToDBFormat(reportInputParam[keyVal[k].toLowerCase()]);
					if (data && data.length === 0) {
						paramObj[keyVal[k].toLowerCase()] = reportInputParam[keyVal[k].toLowerCase()];
						continue;
					} else {
						paramObj[keyVal[k].toLowerCase()] = data;
						continue;
					}

				}
				else
				{
					paramObj[keyVal[k].toLowerCase()] = '';
				}
			
	    	}
		}
		}
	return Ext.Object.toQueryString(paramObj);
	}


	function getFieldValueForNotification(preset_value,fieldId,selectedOptions){
		let value = "";
		if (document.getElementById(fieldId).tagName == "ION-SELECT" || document.getElementById(fieldId).getAttribute('role') == "radiogroup" || document.getElementById(fieldId).getAttribute('role') == "checkgroup"){
			value = selectedOptions[fieldId];

		}
		else if (document.getElementById(fieldId).hidden == true && document.getElementById(fieldId).tagName != "ION-DATETIME"){
			value = document.getElementsByName(fieldId)[1]['value'];

		}
		else if(document.getElementById(fieldId).hidden == true && document.getElementById(fieldId).tagName == "ION-DATETIME"){
		   value = document.getElementsByName(fieldId)[0]['textContent'];
		}
		else{
			value = preset_value[fieldId];
			if(value == undefined){
				value = document.getElementsByName(fieldId)[1]['value'];
			} 
		}
		return value;
	}






