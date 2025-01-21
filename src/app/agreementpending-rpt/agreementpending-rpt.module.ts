import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgreementpendingRptPageRoutingModule } from './agreementpending-rpt-routing.module';

import { AgreementpendingRptPage } from './agreementpending-rpt.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgreementpendingRptPageRoutingModule
  ],
  declarations: [AgreementpendingRptPage]
})
export class AgreementpendingRptPageModule {}
