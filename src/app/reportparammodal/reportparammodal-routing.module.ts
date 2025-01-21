import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportparammodalPage } from './reportparammodal.page';

const routes: Routes = [
  {
    path: '',
    component: ReportparammodalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportparammodalPageRoutingModule {}
