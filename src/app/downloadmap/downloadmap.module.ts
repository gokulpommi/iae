import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DownloadmapPageRoutingModule } from './downloadmap-routing.module';

import { DownloadmapPage } from './downloadmap.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DownloadmapPageRoutingModule
  ],
  declarations: [DownloadmapPage]
})
export class DownloadmapPageModule {}
