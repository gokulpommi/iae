import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FarmersdataRptPage } from './farmersdata-rpt.page';

const routes: Routes = [
  {
    path: '',
    component: FarmersdataRptPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FarmersdataRptPageRoutingModule {}
