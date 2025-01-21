import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlerttypeTxnPageRoutingModule } from './alerttype-txn-routing.module';

import { AlerttypeTxnPage } from './alerttype-txn.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlerttypeTxnPageRoutingModule
  ],
  declarations: [AlerttypeTxnPage]
})
export class AlerttypeTxnPageModule {}
