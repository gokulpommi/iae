import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FarmeranalysisRptPageRoutingModule } from './farmeranalysis-rpt-routing.module';

import { FarmeranalysisRptPage } from './farmeranalysis-rpt.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FarmeranalysisRptPageRoutingModule
  ],
  declarations: [FarmeranalysisRptPage]
})
export class FarmeranalysisRptPageModule {}
