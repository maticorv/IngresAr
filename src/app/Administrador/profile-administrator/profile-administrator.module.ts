import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProfileAdministratorPage } from './profile-administrator.page';

const routes: Routes = [
  {
    path: '',
    component: ProfileAdministratorPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ProfileAdministratorPage]
})
export class ProfileAdministratorPageModule {}
