import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SprayactivitiesTxnPage } from './sprayactivities-txn.page';

const routes: Routes = [
  {
    path: '',
    component: SprayactivitiesTxnPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SprayactivitiesTxnPageRoutingModule {}
