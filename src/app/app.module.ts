import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

//importamos la libreria para consumir web service
import { HttpClientModule } from '@angular/common/http';

//PARA IMPORTAR EFECTO DE MATERIAL DESIGN
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//PARA EL MANEJO DE SQL LITE
import { IonicStorageModule } from '@ionic/storage'

//PARA EL VISOR DE PDF
import {File} from '@ionic-native/file/ngx'
import {FileTransfer} from '@ionic-native/file-transfer/ngx'
import {DocumentViewer} from '@ionic-native/document-viewer/ngx'
import {FileOpener}  from '@ionic-native/file-opener/ngx'



@NgModule({
  declarations: [AppComponent],
  entryComponents: [],

  imports: [
    BrowserModule,
     IonicModule.forRoot(),
     IonicStorageModule.forRoot(), 
     AppRoutingModule ,
      HttpClientModule, 
      BrowserAnimationsModule
  ],

  providers: [
    StatusBar,
    SplashScreen,
    File,
    FileTransfer,
    DocumentViewer,
    FileOpener,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
