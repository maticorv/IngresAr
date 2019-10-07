import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ManageCommonSpacePage } from './manage-common-space.page';

const routes: Routes = [
  {
    path: '',
    component: ManageCommonSpacePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ManageCommonSpacePage]
})
export class ManageCommonSpacePageModule {}
