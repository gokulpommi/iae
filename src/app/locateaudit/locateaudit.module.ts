import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LocateauditPageRoutingModule } from './locateaudit-routing.module';

import { LocateauditPage } from './locateaudit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LocateauditPageRoutingModule
  ],
  declarations: [LocateauditPage]
})
export class LocateauditPageModule {}
