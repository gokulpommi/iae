import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SpraymenuRptPageRoutingModule } from './spraymenu-rpt-routing.module';

import { SpraymenuRptPage } from './spraymenu-rpt.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SpraymenuRptPageRoutingModule
  ],
  declarations: [SpraymenuRptPage]
})
export class SpraymenuRptPageModule {}
