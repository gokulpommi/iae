import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GeoandareapendingRptPage } from './geoandareapending-rpt.page';

const routes: Routes = [
  {
    path: '',
    component: GeoandareapendingRptPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeoandareapendingRptPageRoutingModule {}
