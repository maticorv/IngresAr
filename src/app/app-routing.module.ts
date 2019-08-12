import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './security/login/login.module#LoginPageModule' },
  { path: 'forgot', loadChildren: './security/forgot/forgot.module#ForgotPageModule' },
  { path: 'singin', loadChildren: './security/singin/singin.module#SinginPageModule' },
  { path: 'startmenu', loadChildren: './startmenu/startmenu.module#StartmenuPageModule' },
  { path: 'tipeofingress', loadChildren: './ingreso/tipeofingress/tipeofingress.module#TipeofingressPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
