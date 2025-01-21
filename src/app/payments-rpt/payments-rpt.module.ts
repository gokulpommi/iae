import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentsRptPageRoutingModule } from './payments-rpt-routing.module';

import { PaymentsRptPage } from './payments-rpt.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaymentsRptPageRoutingModule
  ],
  declarations: [PaymentsRptPage]
})
export class PaymentsRptPageModule {}
