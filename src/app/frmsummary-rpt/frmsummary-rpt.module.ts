import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FrmsummaryRptPageRoutingModule } from './frmsummary-rpt-routing.module';

import { FrmsummaryRptPage } from './frmsummary-rpt.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FrmsummaryRptPageRoutingModule
  ],
  declarations: [FrmsummaryRptPage]
})
export class FrmsummaryRptPageModule {}
