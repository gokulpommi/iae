import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { MenuPage } from './../menu/menu.page';
import { LoginPage } from './../login/login.page';

import { FarmerappRptPage } from './../farmerapp-rpt/farmerapp-rpt.page';
import { FarmersdataRptPage } from './../farmersdata-rpt/farmersdata-rpt.page';
import { FarmbookingTxnPage } from './../farmbooking-txn/farmbooking-txn.page';
import { FrmstatusRptPage } from './../frmstatus-rpt/frmstatus-rpt.page';
import { AttandanceTxnPage } from './../attandance-txn/attandance-txn.page';
import { FaqRptPage } from './../faq-rpt/faq-rpt.page';
import { FaqdetailsRptPage } from './../faqdetails-rpt/faqdetails-rpt.page';
import { AgreementpendingRptPage } from './../agreementpending-rpt/agreementpending-rpt.page';
import { FarmmstoneTxnPage } from './../farmmstone-txn/farmmstone-txn.page';
import { StatuspendingupdateRptPage } from './../statuspendingupdate-rpt/statuspendingupdate-rpt.page';
import { GeoandareapendingRptPage } from './../geoandareapending-rpt/geoandareapending-rpt.page';
import { SprayupdateRptPage } from './../sprayupdate-rpt/sprayupdate-rpt.page';
import { FarmeranalysisRptPage } from './../farmeranalysis-rpt/farmeranalysis-rpt.page';
import { AlertmenuRptPage } from './../alertmenu-rpt/alertmenu-rpt.page';
import { AreaauditlistTxnPage } from './../areaauditlist-txn/areaauditlist-txn.page';
import { AlertsRptPage } from './../alerts-rpt/alerts-rpt.page';
import { SpraymenuRptPage } from './../spraymenu-rpt/spraymenu-rpt.page';
import { SprayingactivityRptPage } from './../sprayingactivity-rpt/sprayingactivity-rpt.page';
import { FrmsummaryRptPage } from './../frmsummary-rpt/frmsummary-rpt.page';
import { PaymentreqstTxnPage } from './../paymentreqst-txn/paymentreqst-txn.page';
import { CroppurchaseRptPage } from './../croppurchase-rpt/croppurchase-rpt.page';
import { ReturnsRptPage } from './../returns-rpt/returns-rpt.page';
import { InputsRptPage } from './../inputs-rpt/inputs-rpt.page';
import { FertilizermenuRptPage } from './../fertilizermenu-rpt/fertilizermenu-rpt.page';
import { FertilizerRptPage } from './../fertilizer-rpt/fertilizer-rpt.page';
import { FarmergeotaggingTxnPage } from './../farmergeotagging-txn/farmergeotagging-txn.page';
import { PaymentsRptPage } from './../payments-rpt/payments-rpt.page';
import { AlerttypeTxnPage } from './../alerttype-txn/alerttype-txn.page';
import { FertilizerupdateTxnPage } from './../fertilizerupdate-txn/fertilizerupdate-txn.page';
import { SprayactivitiesTxnPage } from './../sprayactivities-txn/sprayactivities-txn.page';
import { FarmerappmanagerRptPage } from './../farmerappmanager-rpt/farmerappmanager-rpt.page';
import { TracktimelinePage } from './../tracktimeline/tracktimeline.page';
import { AttendanceRptPage } from './../attendance-rpt/attendance-rpt.page';

@Injectable({
  providedIn: 'root'
})
export class PagenavService {


   public pages = [
    
     { id :'menu',component:MenuPage},
     { id :'login',component:LoginPage},

     { id :'farmerapp-rpt',component:FarmerappRptPage},
     { id :'farmersdata-rpt',component:FarmersdataRptPage},
     { id :'farmbooking-txn',component:FarmbookingTxnPage},
     { id :'frmstatus-rpt',component:FrmstatusRptPage},
     { id :'faq-rpt',component:FaqRptPage},
     { id :'faqdetails-rpt',component:FaqdetailsRptPage},
     { id :'agreementpending-rpt',component:AgreementpendingRptPage},
     { id :'statuspendingupdate-rpt',component:StatuspendingupdateRptPage},
     { id :'geoandareapending-rpt',component:GeoandareapendingRptPage},
     { id :'sprayupdate-rpt',component:SprayupdateRptPage},
     { id :'farmeranalysis-rpt',component:FarmeranalysisRptPage}, 
     { id :'attandance-txn',component:AttandanceTxnPage},
     { id :'farmmstone-txn',component:FarmmstoneTxnPage},
     { id :'sprayactivities-txn',component:SprayactivitiesTxnPage},
     { id :'alertmenu-rpt',component:AlertmenuRptPage},
     { id :'areaauditlist-txn',component:AreaauditlistTxnPage},
     { id :'alerts-rpt',component:AlertsRptPage},
     { id :'spraymenu-rpt',component:SpraymenuRptPage},
     { id :'sprayingactivity-rpt',component:SprayingactivityRptPage},    
     { id :'frmsummary-rpt',component:FrmsummaryRptPage},
     { id :'paymentreqst-txn',component:PaymentreqstTxnPage},
     { id :'croppurchase-rpt',component:CroppurchaseRptPage},
     { id :'returns-rpt',component:ReturnsRptPage}, 
     { id :'inputs-rpt',component:InputsRptPage},
     { id :'fertilizermenu-rpt',component:FertilizermenuRptPage},
     { id :'fertilizer-rpt',component:FertilizerRptPage},
     { id :'farmergeotagging-txn',component:FarmergeotaggingTxnPage},
     { id :'payments-rpt',component:PaymentsRptPage},
     { id :'alerttype-txn',component:AlerttypeTxnPage},
     { id :'fertilizerupdate-txn',component:FertilizerupdateTxnPage},
     { id :'farmerappmanager-rpt',component:FarmerappmanagerRptPage},
     { id :'tracktimeline',component:TracktimelinePage},
     { id :'attendance-rpt',component:AttendanceRptPage},

     

     

     ]

  constructor(public http:HttpClient) { }
}
