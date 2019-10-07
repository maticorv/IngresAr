import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './security/login/login.module#LoginPageModule' },
  { path: 'forgot', loadChildren: './security/forgot/forgot.module#ForgotPageModule' },
  { path: 'startmenu', loadChildren: './startmenu/startmenu.module#StartmenuPageModule' },
  { path: 'qringress', loadChildren: './ingreso/qringress/qringress.module#QringressPageModule' },
  { path: 'newperson', loadChildren: './ingreso/newperson/newperson.module#NewpersonPageModule' },
  { path: 'transport', loadChildren: './ingreso/transport/transport.module#TransportPageModule' },
  { path: 'newvehicle', loadChildren: './ingreso/newvehicle/newvehicle.module#NewvehiclePageModule' },
  { path: 'newcompany', loadChildren: './ingreso/newcompany/newcompany.module#NewcompanyPageModule' },
  { path: 'signin', loadChildren: './security/signin/signin.module#SigninPageModule' },
  { path: 'destination', loadChildren: './ingreso/destination/destination.module#DestinationPageModule' },
  { path: 'servicio', loadChildren: './ingreso/servicio/servicio.module#ServicioPageModule' },
  { path: 'typeofingress', loadChildren: './ingreso/typeofingress/typeofingress.module#TypeofingressPageModule' },
  { path: 'typeofvisit', loadChildren: './ingreso/typeofvisit/typeofvisit.module#TypeofvisitPageModule' },
  { path: 'dnisearch', loadChildren: './ingreso/dnisearch/dnisearch.module#DnisearchPageModule' },
  { path: 'authorization', loadChildren: './ingreso/authorization/authorization.module#AuthorizationPageModule' },
  { path: 'egress', loadChildren: './egreso/egress/egress.module#EgressPageModule' },
  // tslint:disable-next-line: max-line-length
  { path: 'planilla-ingreso-egreso', loadChildren: './funcionesMenu/planilla-ingreso-egreso/planilla-ingreso-egreso.module#PlanillaIngresoEgresoPageModule' },
  // tslint:disable-next-line: max-line-length
  { path: 'personas-dentro-establecimiento', loadChildren: './funcionesMenu/personas-dentro-establecimiento/personas-dentro-establecimiento.module#PersonasDentroEstablecimientoPageModule' },
  { path: 'newcompanion', loadChildren: './ingreso/newcompanion/newcompanion.module#NewcompanionPageModule' },
  { path: 'register', loadChildren: './security/register/register.module#RegisterPageModule' },
  { path: 'register2', loadChildren: './security/register2/register2.module#Register2PageModule' },







  ];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
