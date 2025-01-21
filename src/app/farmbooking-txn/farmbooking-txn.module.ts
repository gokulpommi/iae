import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FarmbookingTxnPageRoutingModule } from './farmbooking-txn-routing.module';

import { FarmbookingTxnPage } from './farmbooking-txn.page';

import { SelectableComponent } from '../components/selectable/selectable.component';
import { IonicSelectableComponent } from 'ionic-selectable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IonicSelectableComponent,
    SelectableComponent,
    FarmbookingTxnPageRoutingModule
  ],
  declarations: [FarmbookingTxnPage]
})
export class FarmbookingTxnPageModule {}
