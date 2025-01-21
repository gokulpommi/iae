import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DownloadmapPage } from './downloadmap.page';

const routes: Routes = [
  {
    path: '',
    component: DownloadmapPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DownloadmapPageRoutingModule {}
