import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FarmergeotaggingTxnPageRoutingModule } from './farmergeotagging-txn-routing.module';

import { FarmergeotaggingTxnPage } from './farmergeotagging-txn.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FarmergeotaggingTxnPageRoutingModule
  ],
  declarations: [FarmergeotaggingTxnPage]
})
export class FarmergeotaggingTxnPageModule {}
