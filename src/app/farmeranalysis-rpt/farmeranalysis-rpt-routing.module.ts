import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FarmeranalysisRptPage } from './farmeranalysis-rpt.page';

const routes: Routes = [
  {
    path: '',
    component: FarmeranalysisRptPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FarmeranalysisRptPageRoutingModule {}
