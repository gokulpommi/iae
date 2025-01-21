import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SprayactivitiesTxnPageRoutingModule } from './sprayactivities-txn-routing.module';

import { SprayactivitiesTxnPage } from './sprayactivities-txn.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SprayactivitiesTxnPageRoutingModule
  ],
  declarations: [SprayactivitiesTxnPage]
})
export class SprayactivitiesTxnPageModule {}
