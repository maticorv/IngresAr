import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ReportPage } from './report.page';

const routes: Routes = [
  {
    path: '',
    component: ReportPage,
    children: [
      {
        path: 'evento',
        loadChildren: '../event-report/event-report.module#EventReportPageModule'
      },
      {
        path: 'ingreso',
        loadChildren: './funcionesMenu/planilla-ingreso-egreso/planilla-ingreso-egreso.module#PlanillaIngresoEgresoPageModule'
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ReportPage]
})
export class ReportPageModule {}
