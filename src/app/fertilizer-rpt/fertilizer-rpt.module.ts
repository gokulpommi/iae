import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FertilizerRptPageRoutingModule } from './fertilizer-rpt-routing.module';

import { FertilizerRptPage } from './fertilizer-rpt.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FertilizerRptPageRoutingModule
  ],
  declarations: [FertilizerRptPage]
})
export class FertilizerRptPageModule {}
