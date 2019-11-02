import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HabilitarDeshabilitarPageRoutingModule } from './habilitar-deshabilitar-routing.module';

import { HabilitarDeshabilitarPage } from './habilitar-deshabilitar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HabilitarDeshabilitarPageRoutingModule
  ],
  declarations: [HabilitarDeshabilitarPage]
})
export class HabilitarDeshabilitarPageModule {}
