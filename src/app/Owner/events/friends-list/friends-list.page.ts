import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../../services/service.service';
import { IFriendsList } from '../../../interfaces/ifriends-list';

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.page.html',
  styleUrls: ['./friends-list.page.scss'],
})
export class FriendsListPage implements OnInit {

  constructor(private service: ServiceService) { }

  ListaAmigos: IFriendsList;
  dni: number;

  ngOnInit() {
  }

  obtenerListaAmigos() {
    this.service.getListaAmigos(this.dni).subscribe(data => {
      this.ListaAmigos = data;
    },
    (error) => {console.log(error);
    });
  }

}
