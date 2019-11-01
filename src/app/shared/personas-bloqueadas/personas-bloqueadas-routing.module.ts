import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PersonasBloqueadasPage } from './personas-bloqueadas.page';

const routes: Routes = [
  {
    path: '',
    component: PersonasBloqueadasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonasBloqueadasPageRoutingModule {}
