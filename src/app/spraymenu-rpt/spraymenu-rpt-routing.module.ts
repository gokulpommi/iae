import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SpraymenuRptPage } from './spraymenu-rpt.page';

const routes: Routes = [
  {
    path: '',
    component: SpraymenuRptPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpraymenuRptPageRoutingModule {}
