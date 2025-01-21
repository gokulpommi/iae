import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AttandanceTxnPage } from './attandance-txn.page';

const routes: Routes = [
  {
    path: '',
    component: AttandanceTxnPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AttandanceTxnPageRoutingModule {}
