import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FarmergeotaggingTxnPage } from './farmergeotagging-txn.page';

const routes: Routes = [
  {
    path: '',
    component: FarmergeotaggingTxnPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FarmergeotaggingTxnPageRoutingModule {}
