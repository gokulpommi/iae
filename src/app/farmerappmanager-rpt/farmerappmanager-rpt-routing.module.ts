import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FarmerappmanagerRptPage } from './farmerappmanager-rpt.page';

const routes: Routes = [
  {
    path: '',
    component: FarmerappmanagerRptPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FarmerappmanagerRptPageRoutingModule {}
