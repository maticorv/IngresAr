import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SearchPersonHomeowenerPage } from './search-person-homeowener.page';

const routes: Routes = [
  {
    path: '',
    component: SearchPersonHomeowenerPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SearchPersonHomeowenerPage]
})
export class SearchPersonHomeowenerPageModule {}
