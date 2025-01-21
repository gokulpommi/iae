import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LocateauditPage } from './locateaudit.page';

const routes: Routes = [
  {
    path: '',
    component: LocateauditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LocateauditPageRoutingModule {}
