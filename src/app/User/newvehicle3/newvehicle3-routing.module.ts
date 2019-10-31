import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Newvehicle3Page } from './newvehicle3.page';

const routes: Routes = [
  {
    path: '',
    component: Newvehicle3Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Newvehicle3PageRoutingModule {}
