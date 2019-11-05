import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { IonicModule } from '@ionic/angular';

import { NeweventPageRoutingModule } from './newevent-routing.module';

import { NeweventPage } from './newevent.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    NeweventPageRoutingModule
  ],
  declarations: [NeweventPage]
})
export class NeweventPageModule {}
