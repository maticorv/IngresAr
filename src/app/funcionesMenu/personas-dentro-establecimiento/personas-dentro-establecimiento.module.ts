import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PersonasDentroEstablecimientoPage } from './personas-dentro-establecimiento.page';

const routes: Routes = [
  {
    path: '',
    component: PersonasDentroEstablecimientoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PersonasDentroEstablecimientoPage]
})
export class PersonasDentroEstablecimientoPageModule {}
