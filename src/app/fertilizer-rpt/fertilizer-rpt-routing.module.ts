import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FertilizerRptPage } from './fertilizer-rpt.page';

const routes: Routes = [
  {
    path: '',
    component: FertilizerRptPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FertilizerRptPageRoutingModule {}
