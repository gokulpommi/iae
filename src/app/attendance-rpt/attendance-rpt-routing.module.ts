import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AttendanceRptPage } from './attendance-rpt.page';

const routes: Routes = [
  {
    path: '',
    component: AttendanceRptPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AttendanceRptPageRoutingModule {}
