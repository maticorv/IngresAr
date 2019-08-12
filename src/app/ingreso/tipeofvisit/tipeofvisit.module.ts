import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TipeofvisitPage } from './tipeofvisit.page';

const routes: Routes = [
  {
    path: '',
    component: TipeofvisitPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TipeofvisitPage]
})
export class TipeofvisitPageModule {}
