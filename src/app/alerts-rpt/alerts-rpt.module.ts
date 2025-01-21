import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlertsRptPageRoutingModule } from './alerts-rpt-routing.module';

import { AlertsRptPage } from './alerts-rpt.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlertsRptPageRoutingModule
  ],
  declarations: [AlertsRptPage]
})
export class AlertsRptPageModule {}
