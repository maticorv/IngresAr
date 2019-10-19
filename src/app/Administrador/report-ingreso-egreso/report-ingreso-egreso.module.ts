import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ReportIngresoEgresoPage } from './report-ingreso-egreso.page';

const routes: Routes = [
  {
    path: '',
    component: ReportIngresoEgresoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ReportIngresoEgresoPage]
})
export class ReportIngresoEgresoPageModule {}
