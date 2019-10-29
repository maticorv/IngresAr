import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Newvehicle4PageRoutingModule } from './newvehicle4-routing.module';

import { Newvehicle4Page } from './newvehicle4.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Newvehicle4PageRoutingModule
  ],
  declarations: [Newvehicle4Page]
})
export class Newvehicle4PageModule {}
