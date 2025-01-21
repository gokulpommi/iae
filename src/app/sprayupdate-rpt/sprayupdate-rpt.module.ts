import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SprayupdateRptPageRoutingModule } from './sprayupdate-rpt-routing.module';

import { SprayupdateRptPage } from './sprayupdate-rpt.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SprayupdateRptPageRoutingModule
  ],
  declarations: [SprayupdateRptPage]
})
export class SprayupdateRptPageModule {}
