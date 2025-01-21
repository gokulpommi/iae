import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FrmsummaryRptPage } from './frmsummary-rpt.page';

const routes: Routes = [
  {
    path: '',
    component: FrmsummaryRptPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FrmsummaryRptPageRoutingModule {}
