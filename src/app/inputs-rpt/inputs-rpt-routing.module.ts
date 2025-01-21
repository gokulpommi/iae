import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InputsRptPage } from './inputs-rpt.page';

const routes: Routes = [
  {
    path: '',
    component: InputsRptPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InputsRptPageRoutingModule {}
