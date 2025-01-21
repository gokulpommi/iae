import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlertsRptPage } from './alerts-rpt.page';

const routes: Routes = [
  {
    path: '',
    component: AlertsRptPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlertsRptPageRoutingModule {}
