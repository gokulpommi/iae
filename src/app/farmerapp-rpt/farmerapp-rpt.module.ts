import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FarmerappRptPageRoutingModule } from './farmerapp-rpt-routing.module';

import { FarmerappRptPage } from './farmerapp-rpt.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FarmerappRptPageRoutingModule
  ],
  declarations: [FarmerappRptPage]
})
export class FarmerappRptPageModule {}
