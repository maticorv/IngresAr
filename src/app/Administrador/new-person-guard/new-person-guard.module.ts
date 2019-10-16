import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NewPersonGuardPage } from './new-person-guard.page';

const routes: Routes = [
  {
    path: '',
    component: NewPersonGuardPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NewPersonGuardPage]
})
export class NewPersonGuardPageModule {}
