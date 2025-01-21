import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FaqdetailsRptPage } from './faqdetails-rpt.page';

const routes: Routes = [
  {
    path: '',
    component: FaqdetailsRptPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FaqdetailsRptPageRoutingModule {}
