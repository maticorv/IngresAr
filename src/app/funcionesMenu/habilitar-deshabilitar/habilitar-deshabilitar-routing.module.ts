import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HabilitarDeshabilitarPage } from './habilitar-deshabilitar.page';

const routes: Routes = [
  {
    path: '',
    component: HabilitarDeshabilitarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HabilitarDeshabilitarPageRoutingModule {}
