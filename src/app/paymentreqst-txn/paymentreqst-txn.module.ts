import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentreqstTxnPageRoutingModule } from './paymentreqst-txn-routing.module';

import { PaymentreqstTxnPage } from './paymentreqst-txn.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaymentreqstTxnPageRoutingModule
  ],
  declarations: [PaymentreqstTxnPage]
})
export class PaymentreqstTxnPageModule {}
