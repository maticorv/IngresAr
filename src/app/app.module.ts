import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { ComponentsModule } from './components/components.module';
import { Calendar } from '@ionic-native/calendar/ngx';
import { HttpClientModule } from '@angular/common/http';
import { Personas } from 'src/app/classes/persona';
import { Destino } from 'src/app/classes/destino';
import { Tipovisita } from './classes/tipovisita';
import { Autorizador } from './classes/autorizador';
import { Acompañante } from './classes/acompañante';
import { Servicio } from './classes/servicio';
import { Vehiculo } from './classes/vehiculo';
import { Empresa } from 'src/app/classes/empresa';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AppRoutingModule,
    ComponentsModule,
    HttpClientModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Calendar,
    Personas,
    Destino,
    Tipovisita,
    Autorizador,
    Acompañante,
    Servicio,
    Vehiculo,
    Empresa
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
