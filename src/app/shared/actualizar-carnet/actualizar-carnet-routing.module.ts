import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActualizarCarnetPage } from './actualizar-carnet.page';

const routes: Routes = [
  {
    path: '',
    component: ActualizarCarnetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActualizarCarnetPageRoutingModule {}
