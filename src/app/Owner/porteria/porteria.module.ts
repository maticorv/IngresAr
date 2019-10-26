import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';


import { IonicModule } from '@ionic/angular';

import { PorteriaPage } from './porteria.page';

const routes: Routes = [
  {
    path: '',
    component: PorteriaPage,
    children: [
      {
        path: 'records',
        loadChildren: './records/records.module#RecordsPageModule'
      },
      {
        path: 'messages',
        loadChildren: './messages/messages.module#MessagesPageModule'
      },
      {
        path: 'vehicles',
        loadChildren: './vehicles/vehicles.module#VehiclesPageModule'
      },
    ]
  },
];


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PorteriaPage]
})
export class PorteriaPageModule {}
