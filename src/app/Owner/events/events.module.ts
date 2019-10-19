import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EventsPage } from './events.page';

const routes: Routes = [
  {
    path: '',
    component: EventsPage,
    children: [
      {
        path: 'places',
        loadChildren: '../events/places/places.module#PlacesPageModule'
      },
      {
        path: 'friendsList',
        loadChildren: '../events/friends-list/friends-list.module#FriendsListPageModule'
      },
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EventsPage]
})
export class EventsPageModule {}
