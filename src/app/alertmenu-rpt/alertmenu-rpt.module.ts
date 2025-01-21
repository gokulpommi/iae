import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlertmenuRptPageRoutingModule } from './alertmenu-rpt-routing.module';

import { AlertmenuRptPage } from './alertmenu-rpt.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlertmenuRptPageRoutingModule
  ],
  declarations: [AlertmenuRptPage]
})
export class AlertmenuRptPageModule {}
