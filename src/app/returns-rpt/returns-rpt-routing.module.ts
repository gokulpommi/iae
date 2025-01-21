import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReturnsRptPage } from './returns-rpt.page';

const routes: Routes = [
  {
    path: '',
    component: ReturnsRptPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReturnsRptPageRoutingModule {}
