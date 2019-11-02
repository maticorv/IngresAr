import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewPlanillaAcompaniantePage } from './view-planilla-acompaniante.page';

const routes: Routes = [
  {
    path: '',
    component: ViewPlanillaAcompaniantePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewPlanillaAcompaniantePageRoutingModule {}
