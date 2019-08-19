import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TypeofingressPage } from './typeofingress.page';

const routes: Routes = [
  {
    path: '',
    component: TypeofingressPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TypeofingressPage]
})
export class TypeofingressPageModule {}
