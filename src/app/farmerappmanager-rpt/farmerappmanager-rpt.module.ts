import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FarmerappmanagerRptPageRoutingModule } from './farmerappmanager-rpt-routing.module';

import { FarmerappmanagerRptPage } from './farmerappmanager-rpt.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FarmerappmanagerRptPageRoutingModule
  ],
  declarations: [FarmerappmanagerRptPage]
})
export class FarmerappmanagerRptPageModule {}
