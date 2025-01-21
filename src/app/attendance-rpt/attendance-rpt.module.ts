import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AttendanceRptPageRoutingModule } from './attendance-rpt-routing.module';

import { AttendanceRptPage } from './attendance-rpt.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AttendanceRptPageRoutingModule
  ],
  declarations: [AttendanceRptPage]
})
export class AttendanceRptPageModule {}
