import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Newvehicle3PageRoutingModule } from './newvehicle3-routing.module';

import { Newvehicle3Page } from './newvehicle3.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Newvehicle3PageRoutingModule
  ],
  declarations: [Newvehicle3Page]
})
export class Newvehicle3PageModule {}
