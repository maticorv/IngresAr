import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { Newvehicle1Page } from './newvehicle1.page';

const routes: Routes = [
  {
    path: '',
    component: Newvehicle1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Newvehicle1PageRoutingModule {}
