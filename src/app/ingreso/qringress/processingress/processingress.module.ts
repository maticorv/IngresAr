import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProcessingressPageRoutingModule } from './processingress-routing.module';

import { ProcessingressPage } from './processingress.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProcessingressPageRoutingModule
  ],
  declarations: [ProcessingressPage]
})
export class ProcessingressPageModule {}
