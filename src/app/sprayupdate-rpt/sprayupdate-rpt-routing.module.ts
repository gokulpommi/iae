import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SprayupdateRptPage } from './sprayupdate-rpt.page';

const routes: Routes = [
  {
    path: '',
    component: SprayupdateRptPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SprayupdateRptPageRoutingModule {}
