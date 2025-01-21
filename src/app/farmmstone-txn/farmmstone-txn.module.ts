import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FarmmstoneTxnPageRoutingModule } from './farmmstone-txn-routing.module';

import { FarmmstoneTxnPage } from './farmmstone-txn.page';

import { SelectableComponent } from '../components/selectable/selectable.component';
import { IonicSelectableComponent } from 'ionic-selectable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectableComponent,
    IonicSelectableComponent,
    FarmmstoneTxnPageRoutingModule
  ],
  declarations: [FarmmstoneTxnPage]
})
export class FarmmstoneTxnPageModule {}
