import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EditProfileAdministratorPage } from './edit-profile-administrator.page';

const routes: Routes = [
  {
    path: '',
    component: EditProfileAdministratorPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EditProfileAdministratorPage]
})
export class EditProfileAdministratorPageModule {}
