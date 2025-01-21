import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FarmerappRptPage } from './farmerapp-rpt.page';

const routes: Routes = [
  {
    path: '',
    component: FarmerappRptPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FarmerappRptPageRoutingModule {}
