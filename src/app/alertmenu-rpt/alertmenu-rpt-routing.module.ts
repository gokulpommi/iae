import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlertmenuRptPage } from './alertmenu-rpt.page';

const routes: Routes = [
  {
    path: '',
    component: AlertmenuRptPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlertmenuRptPageRoutingModule {}
