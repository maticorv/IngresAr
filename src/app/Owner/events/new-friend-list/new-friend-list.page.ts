import { Component, OnInit } from '@angular/core';
import { Amigo } from '../../../classes/amiigo';

@Component({
  selector: 'app-new-friend-list',
  templateUrl: './new-friend-list.page.html',
  styleUrls: ['./new-friend-list.page.scss'],
})
export class NewFriendListPage implements OnInit {

  nombreListaAmigo: string;
  ListaAmigo = [];

  constructor(private amigo: Amigo) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if (this.amigo.id !== null) {
      this.ListaAmigo.push(this.amigo);
    }
    console.log(this.ListaAmigo);
  }

}
