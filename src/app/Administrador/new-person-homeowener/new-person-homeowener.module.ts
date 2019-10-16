import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NewPersonHomeowenerPage } from './new-person-homeowener.page';

const routes: Routes = [
  {
    path: '',
    component: NewPersonHomeowenerPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NewPersonHomeowenerPage]
})
export class NewPersonHomeowenerPageModule {}
