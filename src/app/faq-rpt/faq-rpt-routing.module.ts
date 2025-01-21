import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FaqRptPage } from './faq-rpt.page';

const routes: Routes = [
  {
    path: '',
    component: FaqRptPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FaqRptPageRoutingModule {}
