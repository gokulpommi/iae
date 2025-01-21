import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FertilizermenuRptPageRoutingModule } from './fertilizermenu-rpt-routing.module';

import { FertilizermenuRptPage } from './fertilizermenu-rpt.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FertilizermenuRptPageRoutingModule
  ],
  declarations: [FertilizermenuRptPage]
})
export class FertilizermenuRptPageModule {}
