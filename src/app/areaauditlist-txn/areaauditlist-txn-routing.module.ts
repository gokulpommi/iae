import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AreaauditlistTxnPage } from './areaauditlist-txn.page';

const routes: Routes = [
  {
    path: '',
    component: AreaauditlistTxnPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AreaauditlistTxnPageRoutingModule {}
