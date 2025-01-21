import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FarmmstoneTxnPage } from './farmmstone-txn.page';

const routes: Routes = [
  {
    path: '',
    component: FarmmstoneTxnPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FarmmstoneTxnPageRoutingModule {}
