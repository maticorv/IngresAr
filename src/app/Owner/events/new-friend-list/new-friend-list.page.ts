import { Component, OnInit } from '@angular/core';
import { Amigo } from '../../../classes/amiigo';
import { ServiceService } from '../../../services/service.service';
import { Persona } from '../../../interfaces/persona';
import { Router } from '@angular/router';


@Component({
  selector: 'app-new-friend-list',
  templateUrl: './new-friend-list.page.html',
  styleUrls: ['./new-friend-list.page.scss'],
})
export class NewFriendListPage implements OnInit {

  nombreListaAmigo: string;
  ListaAmigo = [];
  sinDato: boolean;

  constructor(private amigos: Amigo, private service: ServiceService, private router: Router) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.ListaAmigo = this.amigos.ListaAmigo;
    this.sinDato = this.amigos.sinDatos;
    console.log(this.amigos.ListaAmigo);
  }

  eliminarAmigo(i) {
    this.ListaAmigo.splice(i, 1);
  }

  crearLista() {
    this.service.account().subscribe(data => {
      this.service.getPersonUser(data.id).subscribe(pers => {
        // this.service.ceateFriendList(this.nombreListaAmigo, pers , this.ListaAmigo).subscribe(result => {
        this.service.ceateFriendList(this.nombreListaAmigo, pers , this.ListaAmigo).subscribe(result => {
          console.log(result);
          this.ListaAmigo = null;
          this.nombreListaAmigo = null;
          console.log(' Se creo');
          this.router.navigateByUrl('/events/friendsList');
        },
        (error) => {console.log(error);
        });
      },
      (error) => {console.log(error);
      });
    },
    (error) => {console.log(error);
    });
  }

}
