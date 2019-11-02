import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PersonasBloqueadasPageRoutingModule } from './personas-bloqueadas-routing.module';

import { PersonasBloqueadasPage } from './personas-bloqueadas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PersonasBloqueadasPageRoutingModule
  ],
  declarations: [PersonasBloqueadasPage]
})
export class PersonasBloqueadasPageModule {}
