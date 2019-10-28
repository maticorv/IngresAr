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
import { Acompaniante } from './classes/acompañante';
import { Servicios } from './classes/servicio';
import { Vehiculo } from './classes/vehiculo';
import { IngresoAPie } from 'src/app/classes/ingresoAPie';
import { Marca } from './classes/marca';
import { AuthorizationPage } from './ingreso/authorization/authorization.page';
import { Account } from './classes/account';
import { PlanillaEgreso } from './classes/planillaEgreso';
import { Camera } from '@ionic-native/camera/ngx';
import { User } from './classes/user';
import { Amigo } from './classes/amiigo';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatStepperModule} from '@angular/material/stepper';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmailComposer } from '@ionic-native/email-composer/ngx';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AppRoutingModule,
    ComponentsModule,
    HttpClientModule,
    NgxQRCodeModule,
    BrowserAnimationsModule,
    MatStepperModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
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
    Acompaniante,
    Servicios,
    Vehiculo,
    IngresoAPie,
    Marca,
    AuthorizationPage,
    Account,
    PlanillaEgreso,
    Camera,
    User,
    Amigo,
    BarcodeScanner,
    FormBuilder,
    EmailComposer,

  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
