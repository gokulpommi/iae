import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FrmstatusRptPageRoutingModule } from './frmstatus-rpt-routing.module';

import { FrmstatusRptPage } from './frmstatus-rpt.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FrmstatusRptPageRoutingModule
  ],
  declarations: [FrmstatusRptPage]
})
export class FrmstatusRptPageModule {}
