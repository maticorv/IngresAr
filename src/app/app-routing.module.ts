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
  { path: 'event-report', loadChildren: './Administrador/event-report/event-report.module#EventReportPageModule' },
  { path: 'report', loadChildren: './Administrador/report/report.module#ReportPageModule' },
  { path: 'event-detail/:id', loadChildren: './Administrador/event-detail/event-detail.module#EventDetailPageModule' },
  { path: 'menu-user', loadChildren: './User/menu-user/menu-user.module#MenuUserPageModule' },
  { path: 'menu-owner', loadChildren: './Owner/menu-owner/menu-owner.module#MenuOwnerPageModule' },
  { path: 'authorizations', loadChildren: './Owner/authorizations/authorizations.module#AuthorizationsPageModule' },
  { path: 'events', loadChildren: './Owner/events/events.module#EventsPageModule' },
  { path: 'information', loadChildren: './Owner/information/information.module#InformationPageModule' },
  { path: 'search-guard', loadChildren: './Administrador/search-guard/search-guard.module#SearchGuardPageModule' },
  { path: 'search-homeowner', loadChildren: './Administrador/search-homeowner/search-homeowner.module#SearchHomeownerPageModule' },
  { path: 'new-guard', loadChildren: './Administrador/new-guard/new-guard.module#NewGuardPageModule' },
  { path: 'new-homeowner', loadChildren: './Administrador/new-homeowner/new-homeowner.module#NewHomeownerPageModule' },
  // tslint:disable-next-line: max-line-length
  { path: 'search-person-guard', loadChildren: './Administrador/search-person-guard/search-person-guard.module#SearchPersonGuardPageModule' },
  // tslint:disable-next-line: max-line-length
  { path: 'search-person-homeowener', loadChildren: './Administrador/search-person-homeowener/search-person-homeowener.module#SearchPersonHomeowenerPageModule' },
  // tslint:disable-next-line: max-line-length
  { path: 'new-person-homeowener', loadChildren: './Administrador/new-person-homeowener/new-person-homeowener.module#NewPersonHomeowenerPageModule' },
  { path: 'new-person-guard', loadChildren: './Administrador/new-person-guard/new-person-guard.module#NewPersonGuardPageModule' },
  // tslint:disable-next-line: max-line-length
  { path: 'report-ingreso-egreso', loadChildren: './Administrador/report-ingreso-egreso/report-ingreso-egreso.module#ReportIngresoEgresoPageModule' },
  { path: 'files', loadChildren: './Owner/information/files/files.module#FilesPageModule' },
  { path: 'phone', loadChildren: './Owner/information/phone/phone.module#PhonePageModule' },
  { path: 'visit', loadChildren: './Owner/authorizations/visit/visit.module#VisitPageModule' },
  { path: 'employee', loadChildren: './Owner/authorizations/employee/employee.module#EmployeePageModule' },
  { path: 'resident', loadChildren: './Owner/authorizations/resident/resident.module#ResidentPageModule' },
  { path: 'places', loadChildren: './Owner/events/places/places.module#PlacesPageModule' },
  { path: 'friends-list', loadChildren: './Owner/events/friends-list/friends-list.module#FriendsListPageModule' },
  { path: 'new-friend-list', loadChildren: './Owner/events/new-friend-list/new-friend-list.module#NewFriendListPageModule' },
  { path: 'porteria', loadChildren: './Owner/porteria/porteria.module#PorteriaPageModule' },
  { path: 'records', loadChildren: './Owner/porteria/records/records.module#RecordsPageModule' },
  { path: 'vehicles', loadChildren: './Owner/porteria/vehicles/vehicles.module#VehiclesPageModule' },
  { path: 'messages', loadChildren: './Owner/porteria/messages/messages.module#MessagesPageModule' },
  { path: 'newVehicle', loadChildren: './Owner/porteria/vehicles/newvehicle/newvehicle.module#NewvehiclePageModule' },
  { path: 'new-friend', loadChildren: './Owner/events/new-friend/new-friend.module#NewFriendPageModule' },
  { path: 'eventos', loadChildren: './funcionesMenu/eventos/eventos.module#EventosPageModule' },
  { path: 'detalle-evento/:id', loadChildren: './funcionesMenu/eventos/detalle-evento/detalle-evento.module#DetalleEventoPageModule' },
  { path: 'generate-qr/:id', loadChildren: './Owner/authorizations/generate-qr/generate-qr.module#GenerateQrPageModule' },
  { path: 'view-friend-list/:id', loadChildren: './Owner/events/view-friend-list/view-friend-list.module#ViewFriendListPageModule' },
  { path: 'add-friend/:id', loadChildren: './Owner/events/view-friend-list/add-friend/add-friend.module#AddFriendPageModule' },
  {
    path: 'processingress',
    loadChildren: () => import('./ingreso/qringress/processingress/processingress.module').then( m => m.ProcessingressPageModule)
  },
  {
    path: 'newvehicle-qr',
    loadChildren: () => import('./ingreso/qringress/newvehicle-qr/newvehicle-qr.module').then( m => m.NewvehicleQRPageModule)
  },
  {
    path: 'newvehicle1',
    loadChildren: () => import('./Owner/porteria/vehicles/newvehicle1/newvehicle1.module').then( m => m.Newvehicle1PageModule)
  },
  {
    path: 'messages1/:id',
    loadChildren: () => import('./Owner/porteria/messages/messages1/messages1.module').then( m => m.Messages1PageModule)
  },
  {
    path: 'vehicles2',
    loadChildren: () => import('./User/vehicles/vehicles.module').then( m => m.VehiclesPageModule)
  },
  {
    path: 'newvehicle3',
    loadChildren: () => import('./User/newvehicle3/newvehicle3.module').then( m => m.Newvehicle3PageModule)
  },
  {
    path: 'newvehicle4',
    loadChildren: () => import('./User/newvehicle4/newvehicle4.module').then( m => m.Newvehicle4PageModule)
  },
  {
    path: 'place/:id',
    loadChildren: () => import('./Owner/events/place/place.module').then( m => m.PlacePageModule)
  },
  {
    path: 'authorizations1',
    loadChildren: () => import('./User/authorizations/authorizations.module').then( m => m.AuthorizationsPageModule)
  },
  {
    path: 'modal',
    loadChildren: () => import('./components/modal/modal.module').then( m => m.ModalPageModule)
  },
  {
    path: 'habilitar-deshabilitar/:id',
    // tslint:disable-next-line: max-line-length
    loadChildren: () => import('./funcionesMenu/habilitar-deshabilitar/habilitar-deshabilitar.module').then( m => m.HabilitarDeshabilitarPageModule)
  },
  {
    path: 'personas-bloqueadas',
    loadChildren: () => import('./shared/personas-bloqueadas/personas-bloqueadas.module').then( m => m.PersonasBloqueadasPageModule)
  },
  {
    path: 'carnet',
    loadChildren: () => import('./shared/carnet/carnet.module').then( m => m.CarnetPageModule)
  },
  {
    path: 'actualizar-carnet',
    loadChildren: () => import('./shared/actualizar-carnet/actualizar-carnet.module').then( m => m.ActualizarCarnetPageModule)
  },
  {
    path: 'art',
    loadChildren: () => import('./ingreso/servicio/art/art.module').then( m => m.ArtPageModule)
  },
  {
    path: 'actualizar-art',
    loadChildren: () => import('./ingreso/servicio/actualizar-art/actualizar-art.module').then( m => m.ActualizarArtPageModule)
  },
  {
    path: 'newevent/:id',
    loadChildren: () => import('./Owner/events/newevent/newevent.module').then( m => m.NeweventPageModule)
  },

  {
  path: 'view-planilla-acompaniante',
  // tslint:disable-next-line:max-line-length
  loadChildren: () => import('./ingreso/authorization/view-planilla-acompaniante/view-planilla-acompaniante.module').then( m => m.ViewPlanillaAcompaniantePageModule)
  },
  {
    path: 'my-events',
    loadChildren: () => import('./Owner/events/my-events/my-events.module').then( m => m.MyEventsPageModule)
  },
  {
    path: 'view-ingreso-egreso/:id',
    loadChildren: () => import('./shared/view-ingreso-egreso/view-ingreso-egreso.module').then( m => m.ViewIngresoEgresoPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
