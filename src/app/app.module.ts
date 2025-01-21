import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { NavController, NavParams} from '@ionic/angular';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { HttpClientModule } from '@angular/common/http';
import { SQLitePorter } from '@awesome-cordova-plugins/sqlite-porter/ngx';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';
import { IonicStorageModule, Storage } from '@ionic/storage-angular';
import { DatePipe } from '@angular/common';
import { Chooser } from '@awesome-cordova-plugins/chooser/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@awesome-cordova-plugins/file-transfer/ngx';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@awesome-cordova-plugins/native-geocoder/ngx';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';
import { FilePath } from '@awesome-cordova-plugins/file-path/ngx';
import { GoogleMapsModule } from '@angular/google-maps'; 


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    GoogleMapsModule,
    IonicStorageModule.forRoot()],
  providers: [HTTP,
              SQLite,
              SQLitePorter,
              NavParams,
              DatePipe,
              CallNumber,
              Chooser,
              Geolocation,
              NativeGeocoder,
              File,
              FileTransfer,
              AndroidPermissions,
              FilePath,
              Network,{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
