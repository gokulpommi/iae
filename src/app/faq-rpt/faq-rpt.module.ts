import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FaqRptPageRoutingModule } from './faq-rpt-routing.module';

import { FaqRptPage } from './faq-rpt.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FaqRptPageRoutingModule
  ],
  declarations: [FaqRptPage]
})
export class FaqRptPageModule {}
