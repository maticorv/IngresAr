import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EditCommonSpacePage } from './edit-common-space.page';

const routes: Routes = [
  {
    path: '',
    component: EditCommonSpacePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EditCommonSpacePage]
})
export class EditCommonSpacePageModule {}
