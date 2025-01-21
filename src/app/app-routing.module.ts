import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'popover',
    loadChildren: () => import('./popover/popover.module').then( m => m.PopoverPageModule)
  },
  {
    path: 'farmerapp-rpt',
    loadChildren: () => import('./farmerapp-rpt/farmerapp-rpt.module').then( m => m.FarmerappRptPageModule)
  },
  {
    path: 'reportparammodal',
    loadChildren: () => import('./reportparammodal/reportparammodal.module').then( m => m.ReportparammodalPageModule)
  },
  {
    path: 'farmersdata-rpt',
    loadChildren: () => import('./farmersdata-rpt/farmersdata-rpt.module').then( m => m.FarmersdataRptPageModule)
  },
  {
    path: 'farmbooking-txn',
    loadChildren: () => import('./farmbooking-txn/farmbooking-txn.module').then( m => m.FarmbookingTxnPageModule)
  },
  {
    path: 'frmstatus-rpt',
    loadChildren: () => import('./frmstatus-rpt/frmstatus-rpt.module').then( m => m.FrmstatusRptPageModule)
  },
  {
    path: 'attandance-txn',
    loadChildren: () => import('./attandance-txn/attandance-txn.module').then( m => m.AttandanceTxnPageModule)
  },
  {
    path: 'faq-rpt',
    loadChildren: () => import('./faq-rpt/faq-rpt.module').then( m => m.FaqRptPageModule)
  },
  {
    path: 'agreementpending-rpt',
    loadChildren: () => import('./agreementpending-rpt/agreementpending-rpt.module').then( m => m.AgreementpendingRptPageModule)
  },
  {
    path: 'farmmstone-txn',
    loadChildren: () => import('./farmmstone-txn/farmmstone-txn.module').then( m => m.FarmmstoneTxnPageModule)
  },
  {
    path: 'geoandareapending-rpt',
    loadChildren: () => import('./geoandareapending-rpt/geoandareapending-rpt.module').then( m => m.GeoandareapendingRptPageModule)
  },
  {
    path: 'statuspendingupdate-rpt',
    loadChildren: () => import('./statuspendingupdate-rpt/statuspendingupdate-rpt.module').then( m => m.StatuspendingupdateRptPageModule)
  },
  {
    path: 'sprayupdate-rpt',
    loadChildren: () => import('./sprayupdate-rpt/sprayupdate-rpt.module').then( m => m.SprayupdateRptPageModule)
  },
  {
    path: 'farmeranalysis-rpt',
    loadChildren: () => import('./farmeranalysis-rpt/farmeranalysis-rpt.module').then( m => m.FarmeranalysisRptPageModule)
  },
  {
    path: 'areaauditlist-txn',
    loadChildren: () => import('./areaauditlist-txn/areaauditlist-txn.module').then( m => m.AreaauditlistTxnPageModule)
  },
  {
    path: 'farmergeotagging-txn',
    loadChildren: () => import('./farmergeotagging-txn/farmergeotagging-txn.module').then( m => m.FarmergeotaggingTxnPageModule)
  },
  {
    path: 'inputs-rpt',
    loadChildren: () => import('./inputs-rpt/inputs-rpt.module').then( m => m.InputsRptPageModule)
  },
  {
    path: 'returns-rpt',
    loadChildren: () => import('./returns-rpt/returns-rpt.module').then( m => m.ReturnsRptPageModule)
  },
  {
    path: 'croppurchase-rpt',
    loadChildren: () => import('./croppurchase-rpt/croppurchase-rpt.module').then( m => m.CroppurchaseRptPageModule)
  },
  {
    path: 'payments-rpt',
    loadChildren: () => import('./payments-rpt/payments-rpt.module').then( m => m.PaymentsRptPageModule)
  },
  {
    path: 'spraymenu-rpt',
    loadChildren: () => import('./spraymenu-rpt/spraymenu-rpt.module').then( m => m.SpraymenuRptPageModule)
  },
  {
    path: 'frmsummary-rpt',
    loadChildren: () => import('./frmsummary-rpt/frmsummary-rpt.module').then( m => m.FrmsummaryRptPageModule)
  },
  {
    path: 'alertmenu-rpt',
    loadChildren: () => import('./alertmenu-rpt/alertmenu-rpt.module').then( m => m.AlertmenuRptPageModule)
  },
  {
    path: 'fertilizermenu-rpt',
    loadChildren: () => import('./fertilizermenu-rpt/fertilizermenu-rpt.module').then( m => m.FertilizermenuRptPageModule)
  },
  {
    path: 'paymentreqst-txn',
    loadChildren: () => import('./paymentreqst-txn/paymentreqst-txn.module').then( m => m.PaymentreqstTxnPageModule)
  },
  {
    path: 'alerts-rpt',
    loadChildren: () => import('./alerts-rpt/alerts-rpt.module').then( m => m.AlertsRptPageModule)
  },
  {
    path: 'sprayingactivity-rpt',
    loadChildren: () => import('./sprayingactivity-rpt/sprayingactivity-rpt.module').then( m => m.SprayingactivityRptPageModule)
  },
  {
    path: 'fertilizer-rpt',
    loadChildren: () => import('./fertilizer-rpt/fertilizer-rpt.module').then( m => m.FertilizerRptPageModule)
  },
  {
    path: 'faqdetails-rpt',
    loadChildren: () => import('./faqdetails-rpt/faqdetails-rpt.module').then( m => m.FaqdetailsRptPageModule)
  },
  {
    path: 'locateaudit',
    loadChildren: () => import('./locateaudit/locateaudit.module').then( m => m.LocateauditPageModule)
  },
  {
    path: 'alerttype-txn',
    loadChildren: () => import('./alerttype-txn/alerttype-txn.module').then( m => m.AlerttypeTxnPageModule)
  },
  {
    path: 'fertilizerupdate-txn',
    loadChildren: () => import('./fertilizerupdate-txn/fertilizerupdate-txn.module').then( m => m.FertilizerupdateTxnPageModule)
  },
  {
    path: 'sprayactivities-txn',
    loadChildren: () => import('./sprayactivities-txn/sprayactivities-txn.module').then( m => m.SprayactivitiesTxnPageModule)
  },
  {
    path: 'farmerappmanager-rpt',
    loadChildren: () => import('./farmerappmanager-rpt/farmerappmanager-rpt.module').then( m => m.FarmerappmanagerRptPageModule)
  },
  {
    path: 'downloadmap',
    loadChildren: () => import('./downloadmap/downloadmap.module').then( m => m.DownloadmapPageModule)
  },
  {
    path: 'tracktimeline',
    loadChildren: () => import('./tracktimeline/tracktimeline.module').then( m => m.TracktimelinePageModule)
  },
  {
    path: 'attendance-rpt',
    loadChildren: () => import('./attendance-rpt/attendance-rpt.module').then( m => m.AttendanceRptPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
