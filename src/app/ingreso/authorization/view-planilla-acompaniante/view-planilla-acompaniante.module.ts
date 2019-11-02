import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewPlanillaAcompaniantePageRoutingModule } from './view-planilla-acompaniante-routing.module';

import { ViewPlanillaAcompaniantePage } from './view-planilla-acompaniante.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewPlanillaAcompaniantePageRoutingModule
  ],
  declarations: [ViewPlanillaAcompaniantePage]
})
export class ViewPlanillaAcompaniantePageModule {}
