import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AreaauditlistTxnPageRoutingModule } from './areaauditlist-txn-routing.module';

import { AreaauditlistTxnPage } from './areaauditlist-txn.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AreaauditlistTxnPageRoutingModule
  ],
  declarations: [AreaauditlistTxnPage]
})
export class AreaauditlistTxnPageModule {}
