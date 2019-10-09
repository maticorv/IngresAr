import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NewCommonSpacePage } from './new-common-space.page';

const routes: Routes = [
  {
    path: '',
    component: NewCommonSpacePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NewCommonSpacePage]
})
export class NewCommonSpacePageModule {}
