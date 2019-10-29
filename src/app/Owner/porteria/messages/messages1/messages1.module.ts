import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Messages1PageRoutingModule } from './messages1-routing.module';

import { Messages1Page } from './messages1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Messages1PageRoutingModule
  ],
  declarations: [Messages1Page]
})
export class Messages1PageModule {}
