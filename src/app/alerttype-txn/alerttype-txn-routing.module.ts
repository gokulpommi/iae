import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlerttypeTxnPage } from './alerttype-txn.page';

const routes: Routes = [
  {
    path: '',
    component: AlerttypeTxnPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlerttypeTxnPageRoutingModule {}
