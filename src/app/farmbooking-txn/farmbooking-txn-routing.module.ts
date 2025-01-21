import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FarmbookingTxnPage } from './farmbooking-txn.page';

const routes: Routes = [
  {
    path: '',
    component: FarmbookingTxnPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FarmbookingTxnPageRoutingModule {}
