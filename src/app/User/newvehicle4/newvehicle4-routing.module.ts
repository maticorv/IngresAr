import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Newvehicle4Page } from './newvehicle4.page';

const routes: Routes = [
  {
    path: '',
    component: Newvehicle4Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Newvehicle4PageRoutingModule {}
