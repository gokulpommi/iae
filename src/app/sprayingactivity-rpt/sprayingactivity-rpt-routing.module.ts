import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SprayingactivityRptPage } from './sprayingactivity-rpt.page';

const routes: Routes = [
  {
    path: '',
    component: SprayingactivityRptPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SprayingactivityRptPageRoutingModule {}
