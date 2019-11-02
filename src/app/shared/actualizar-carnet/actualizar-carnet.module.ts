import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActualizarCarnetPageRoutingModule } from './actualizar-carnet-routing.module';

import { ActualizarCarnetPage } from './actualizar-carnet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActualizarCarnetPageRoutingModule
  ],
  declarations: [ActualizarCarnetPage]
})
export class ActualizarCarnetPageModule {}
