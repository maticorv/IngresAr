import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { InformationPage } from './information.page';

const routes: Routes = [
  {
    path: '',
    component: InformationPage,
    children: [
      {
        path: 'file',
        loadChildren: '../files/files.module#FilesPageModule'
      },
      {
        path: 'phone',
        loadChildren: '../phone/phone.module#PhonePageModule'
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
  declarations: [InformationPage]
})
export class InformationPageModule {}
