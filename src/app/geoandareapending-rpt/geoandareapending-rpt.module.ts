import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GeoandareapendingRptPageRoutingModule } from './geoandareapending-rpt-routing.module';

import { GeoandareapendingRptPage } from './geoandareapending-rpt.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GeoandareapendingRptPageRoutingModule
  ],
  declarations: [GeoandareapendingRptPage]
})
export class GeoandareapendingRptPageModule {}
