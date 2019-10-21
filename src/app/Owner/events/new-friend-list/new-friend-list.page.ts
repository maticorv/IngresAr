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

  constructor(private amigos: Amigo) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.ListaAmigo = this.amigos.ListaAmigo;
    console.log(this.amigos.ListaAmigo);
  }

  eliminarAmigo(i) {
    this.ListaAmigo.splice(i, 1);
  }

}
