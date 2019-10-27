import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from 'src/app/services/service.service';
import { IFriendsList } from '../../../interfaces/ifriends-list';
import { Amigo } from 'src/app/classes/amiigo';

@Component({
  selector: 'app-view-friend-list',
  templateUrl: './view-friend-list.page.html',
  styleUrls: ['./view-friend-list.page.scss'],
})
export class ViewFriendListPage implements OnInit {

  listaAmigo: IFriendsList;

  constructor(private activatedRoute: ActivatedRoute, private service: ServiceService,
              private amigo: Amigo) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.obtenerListaAmigo();
    if (this.amigo.sinDatos === true) {
      this.listaAmigo.amigos.push(this.amigo.ListaAmigo[0]);
      // tslint:disable-next-line: max-line-length
      this.service.putFriend(this.listaAmigo.id, this.listaAmigo.nombreListaAmigos, this.listaAmigo.pertenece, this.listaAmigo.amigos).subscribe(data => {
        console.log(data);
        this.obtenerListaAmigo();
        this.amigo.sinDatos = false;
        this.amigo.ListaAmigo.pop();
      },
      (error) => {console.log(error);
      });
    }
  }

  obtenerListaAmigo() {
    this.service.getListFriendById(this.activatedRoute.snapshot.params.id).subscribe(data => {
      this.listaAmigo = data;
      console.log(this.listaAmigo);
    },
    (error) => { console.log(error);
    });
  }

  deleteAmigo(i) {
    this.listaAmigo.amigos.splice(i, 1);
    // tslint:disable-next-line: max-line-length
    this.service.putFriend(this.listaAmigo.id, this.listaAmigo.nombreListaAmigos, this.listaAmigo.pertenece, this.listaAmigo.amigos).subscribe(data => {
      console.log(data);
      this.obtenerListaAmigo();
    },
    (error) => {console.log(error);
    });
  }

}
