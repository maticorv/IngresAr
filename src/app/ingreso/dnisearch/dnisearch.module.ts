import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DnisearchPage } from './dnisearch.page';

const routes: Routes = [
  {
    path: '',
    component: DnisearchPage
  }
];

@NgModule({
  entryComponents: [
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  declarations: [DnisearchPage]
})
export class DnisearchPageModule {}
