import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './security/login/login.module#LoginPageModule' },
  { path: 'forgot', loadChildren: './security/forgot/forgot.module#ForgotPageModule' },
  { path: 'startmenu', loadChildren: './startmenu/startmenu.module#StartmenuPageModule' },
  { path: 'tipeofingress', loadChildren: './ingreso/tipeofingress/tipeofingress.module#TipeofingressPageModule' },
  { path: 'qringress', loadChildren: './ingreso/qringress/qringress.module#QringressPageModule' },
  { path: 'dniserch', loadChildren: './ingreso/dniserch/dniserch.module#DniserchPageModule' },
  { path: 'newperson', loadChildren: './ingreso/newperson/newperson.module#NewpersonPageModule' },
  { path: 'transport', loadChildren: './ingreso/transport/transport.module#TransportPageModule' },
  { path: 'newvehicle', loadChildren: './ingreso/newvehicle/newvehicle.module#NewvehiclePageModule' },
  { path: 'tipeofvisit', loadChildren: './ingreso/tipeofvisit/tipeofvisit.module#TipeofvisitPageModule' },
  { path: 'company', loadChildren: './ingreso/company/company.module#CompanyPageModule' },
  { path: 'newcompany', loadChildren: './ingreso/newcompany/newcompany.module#NewcompanyPageModule' },
  { path: 'signin', loadChildren: './security/signin/signin.module#SigninPageModule' },
  { path: 'destination', loadChildren: './ingreso/destination/destination.module#DestinationPageModule' },
  { path: 'servicio', loadChildren: './ingreso/servicio/servicio.module#ServicioPageModule' },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
