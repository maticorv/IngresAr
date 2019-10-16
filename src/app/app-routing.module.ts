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
  { path: 'message', loadChildren: './Guardia/message/message.module#MessagePageModule' },
  { path: 'news', loadChildren: './Guardia/news/news.module#NewsPageModule' },
  { path: 'menu-administrator', loadChildren: './Administrador/menu-administrator/menu-administrator.module#MenuAdministratorPageModule' },
  // tslint:disable-next-line: max-line-length
  { path: 'manage-common-space', loadChildren: './Administrador/manage-common-space/manage-common-space.module#ManageCommonSpacePageModule' },
  { path: 'norms', loadChildren: './Administrador/norms/norms.module#NormsPageModule' },
  { path: 'view-norm/:id', loadChildren: './Administrador/view-norm/view-norm.module#ViewNormPageModule' },
  { path: 'new-norm', loadChildren: './Administrador/new-norm/new-norm.module#NewNormPageModule' },
  { path: 'edit-common-space/:id', loadChildren: './Administrador/edit-common-space/edit-common-space.module#EditCommonSpacePageModule' },
  { path: 'manage-guard', loadChildren: './Administrador/manage-guard/manage-guard.module#ManageGuardPageModule' },
  { path: 'manage-homeowner', loadChildren: './Administrador/manage-homeowner/manage-homeowner.module#ManageHomeownerPageModule' },
  // tslint:disable-next-line: max-line-length
  { path: 'profile-administrator', loadChildren: './Administrador/profile-administrator/profile-administrator.module#ProfileAdministratorPageModule' },
  // tslint:disable-next-line: max-line-length
  { path: 'edit-profile-administrator', loadChildren: './Administrador/edit-profile-administrator/edit-profile-administrator.module#EditProfileAdministratorPageModule' },
  { path: 'egress-page', loadChildren: './egreso/egress-page/egress-page.module#EgressPagePageModule' },
  { path: 'new-common-space', loadChildren: './Administrador/new-common-space/new-common-space.module#NewCommonSpacePageModule' },
  { path: 'diary', loadChildren: './Guardia/diary/diary.module#DiaryPageModule' },
  { path: 'message/:id', loadChildren: './Guardia/message/messageid/messageid.module#MessageidPageModule' },
  { path: 'database', loadChildren: './Administrador/data-base/data-base.module#DataBasePageModule' },
  { path: 'profile', loadChildren: './shared/profile/profile.module#ProfilePageModule' },
  { path: 'report/evento', loadChildren: './Administrador/event-report/event-report.module#EventReportPageModule' },
  { path: 'event-detail/:id', loadChildren: './Administrador/event-detail/event-detail.module#EventDetailPageModule' },  { path: 'menu-user', loadChildren: './User/menu-user/menu-user.module#MenuUserPageModule' },
  { path: 'menu-owner', loadChildren: './Owner/menu-owner/menu-owner.module#MenuOwnerPageModule' },
  { path: 'authorizations', loadChildren: './Owner/authorizations/authorizations.module#AuthorizationsPageModule' },









  ];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
