import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AttandanceTxnPageRoutingModule } from './attandance-txn-routing.module';

import { AttandanceTxnPage } from './attandance-txn.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AttandanceTxnPageRoutingModule
  ],
  declarations: [AttandanceTxnPage]
})
export class AttandanceTxnPageModule {}
