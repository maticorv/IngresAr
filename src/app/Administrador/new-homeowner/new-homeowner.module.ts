import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NewHomeownerPage } from './new-homeowner.page';

const routes: Routes = [
  {
    path: '',
    component: NewHomeownerPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NewHomeownerPage]
})
export class NewHomeownerPageModule {}
