import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FertilizerupdateTxnPageRoutingModule } from './fertilizerupdate-txn-routing.module';

import { FertilizerupdateTxnPage } from './fertilizerupdate-txn.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FertilizerupdateTxnPageRoutingModule
  ],
  declarations: [FertilizerupdateTxnPage]
})
export class FertilizerupdateTxnPageModule {}
