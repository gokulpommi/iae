import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgreementpendingRptPage } from './agreementpending-rpt.page';

const routes: Routes = [
  {
    path: '',
    component: AgreementpendingRptPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgreementpendingRptPageRoutingModule {}
