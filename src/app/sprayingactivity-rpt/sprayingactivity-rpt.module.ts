import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SprayingactivityRptPageRoutingModule } from './sprayingactivity-rpt-routing.module';

import { SprayingactivityRptPage } from './sprayingactivity-rpt.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SprayingactivityRptPageRoutingModule
  ],
  declarations: [SprayingactivityRptPage]
})
export class SprayingactivityRptPageModule {}
