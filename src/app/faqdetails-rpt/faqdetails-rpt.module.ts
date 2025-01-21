import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FaqdetailsRptPageRoutingModule } from './faqdetails-rpt-routing.module';

import { FaqdetailsRptPage } from './faqdetails-rpt.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FaqdetailsRptPageRoutingModule
  ],
  declarations: [FaqdetailsRptPage]
})
export class FaqdetailsRptPageModule {}
