import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaymentsRptPage } from './payments-rpt.page';

const routes: Routes = [
  {
    path: '',
    component: PaymentsRptPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentsRptPageRoutingModule {}
