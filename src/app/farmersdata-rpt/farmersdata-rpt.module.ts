import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FarmersdataRptPageRoutingModule } from './farmersdata-rpt-routing.module';

import { FarmersdataRptPage } from './farmersdata-rpt.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FarmersdataRptPageRoutingModule
  ],
  declarations: [FarmersdataRptPage]
})
export class FarmersdataRptPageModule {}
