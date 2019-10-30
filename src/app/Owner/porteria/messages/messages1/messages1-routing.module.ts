import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Messages1Page } from './messages1.page';

const routes: Routes = [
  {
    path: '',
    component: Messages1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Messages1PageRoutingModule {}
