import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Newvehicle1PageRoutingModule } from './newvehicle1-routing.module';

import { Newvehicle1Page } from './newvehicle1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Newvehicle1PageRoutingModule
  ],
  declarations: [Newvehicle1Page]
})
export class Newvehicle1PageModule {}
