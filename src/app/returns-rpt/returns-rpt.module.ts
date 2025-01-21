import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReturnsRptPageRoutingModule } from './returns-rpt-routing.module';

import { ReturnsRptPage } from './returns-rpt.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReturnsRptPageRoutingModule
  ],
  declarations: [ReturnsRptPage]
})
export class ReturnsRptPageModule {}
