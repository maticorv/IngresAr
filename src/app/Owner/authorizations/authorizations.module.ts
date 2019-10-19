import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AuthorizationsPage } from './authorizations.page';

const routes: Routes = [
  {
    path: '',
    component: AuthorizationsPage,
    children: [
      {
        path: 'resident',
        loadChildren: '../authorizations/resident/resident.module#ResidentPageModule'
      },
      {
        path: 'visit',
        loadChildren: '../authorizations/visit/visit.module#VisitPageModule'
      },
      {
        path: 'employee',
        loadChildren: '../authorizations/employee/employee.module#EmployeePageModule'
      },
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
  declarations: [AuthorizationsPage]
})
export class AuthorizationsPageModule {}
