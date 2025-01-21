import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CroppurchaseRptPage } from './croppurchase-rpt.page';

const routes: Routes = [
  {
    path: '',
    component: CroppurchaseRptPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CroppurchaseRptPageRoutingModule {}
