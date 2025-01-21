import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CroppurchaseRptPageRoutingModule } from './croppurchase-rpt-routing.module';

import { CroppurchaseRptPage } from './croppurchase-rpt.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CroppurchaseRptPageRoutingModule
  ],
  declarations: [CroppurchaseRptPage]
})
export class CroppurchaseRptPageModule {}
