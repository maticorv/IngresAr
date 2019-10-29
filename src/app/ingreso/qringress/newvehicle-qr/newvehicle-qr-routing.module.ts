import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewvehicleQRPage } from './newvehicle-qr.page';

const routes: Routes = [
  {
    path: '',
    component: NewvehicleQRPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewvehicleQRPageRoutingModule {}
