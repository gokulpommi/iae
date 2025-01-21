import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InputsRptPageRoutingModule } from './inputs-rpt-routing.module';

import { InputsRptPage } from './inputs-rpt.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InputsRptPageRoutingModule
  ],
  declarations: [InputsRptPage]
})
export class InputsRptPageModule {}
