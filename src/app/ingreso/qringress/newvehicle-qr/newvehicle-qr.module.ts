import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewvehicleQRPageRoutingModule } from './newvehicle-qr-routing.module';

import { NewvehicleQRPage } from './newvehicle-qr.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewvehicleQRPageRoutingModule
  ],
  declarations: [NewvehicleQRPage]
})
export class NewvehicleQRPageModule {}
