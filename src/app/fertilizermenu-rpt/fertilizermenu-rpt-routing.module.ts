import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FertilizermenuRptPage } from './fertilizermenu-rpt.page';

const routes: Routes = [
  {
    path: '',
    component: FertilizermenuRptPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FertilizermenuRptPageRoutingModule {}
