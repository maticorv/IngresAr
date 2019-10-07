import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ManageHomeownerPage } from './manage-homeowner.page';

const routes: Routes = [
  {
    path: '',
    component: ManageHomeownerPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ManageHomeownerPage]
})
export class ManageHomeownerPageModule {}
