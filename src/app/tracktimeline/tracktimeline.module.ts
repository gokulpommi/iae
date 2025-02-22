import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TracktimelinePageRoutingModule } from './tracktimeline-routing.module';

import { TracktimelinePage } from './tracktimeline.page';
import { GoogleMapsModule } from '@angular/google-maps';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GoogleMapsModule,
    TracktimelinePageRoutingModule
  ],
  declarations: [TracktimelinePage]
})
export class TracktimelinePageModule {}
