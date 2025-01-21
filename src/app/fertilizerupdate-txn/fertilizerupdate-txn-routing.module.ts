import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FertilizerupdateTxnPage } from './fertilizerupdate-txn.page';

const routes: Routes = [
  {
    path: '',
    component: FertilizerupdateTxnPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FertilizerupdateTxnPageRoutingModule {}
