import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StatuspendingupdateRptPage } from './statuspendingupdate-rpt.page';

const routes: Routes = [
  {
    path: '',
    component: StatuspendingupdateRptPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StatuspendingupdateRptPageRoutingModule {}
