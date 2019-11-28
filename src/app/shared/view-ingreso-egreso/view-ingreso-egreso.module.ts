import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewIngresoEgresoPageRoutingModule } from './view-ingreso-egreso-routing.module';

import { ViewIngresoEgresoPage } from './view-ingreso-egreso.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewIngresoEgresoPageRoutingModule
  ],
  declarations: [ViewIngresoEgresoPage]
})
export class ViewIngresoEgresoPageModule {}
