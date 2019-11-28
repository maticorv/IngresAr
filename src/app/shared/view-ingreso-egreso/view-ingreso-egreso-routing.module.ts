import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewIngresoEgresoPage } from './view-ingreso-egreso.page';

const routes: Routes = [
  {
    path: '',
    component: ViewIngresoEgresoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewIngresoEgresoPageRoutingModule {}
