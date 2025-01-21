import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaymentreqstTxnPage } from './paymentreqst-txn.page';

const routes: Routes = [
  {
    path: '',
    component: PaymentreqstTxnPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentreqstTxnPageRoutingModule {}
