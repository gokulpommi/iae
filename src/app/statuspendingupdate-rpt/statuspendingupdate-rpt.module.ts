import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StatuspendingupdateRptPageRoutingModule } from './statuspendingupdate-rpt-routing.module';

import { StatuspendingupdateRptPage } from './statuspendingupdate-rpt.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StatuspendingupdateRptPageRoutingModule
  ],
  declarations: [StatuspendingupdateRptPage]
})
export class StatuspendingupdateRptPageModule {}
