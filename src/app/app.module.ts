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
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule} from '@angular/material/form-field';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { DemoMaterialModule } from './material-module';
import { ModalPageModule } from './components/modal/modal.module';
import { PlanillaAcompaniante } from './classes/planilla-acompaniante';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { OneSignal } from '@ionic-native/onesignal/ngx';


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
    SweetAlert2Module.forRoot(),
    BrowserAnimationsModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    DemoMaterialModule,
    ModalPageModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
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
    PlanillaAcompaniante,
    ScreenOrientation,
    OneSignal,

  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
