import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../../services/service.service';
import { IFriendsList } from '../../../interfaces/ifriends-list';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.page.html',
  styleUrls: ['./friends-list.page.scss'],
})
export class FriendsListPage implements OnInit {

  listaAmigos: IFriendsList[];

  constructor(private service: ServiceService, public actionSheetController: ActionSheetController,
              private router: Router) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.obtenerListaAmigos();
  }

  obtenerListaAmigos() {
    this.service.account().subscribe( data => {
      this.service.getPersonUser(data.id).subscribe(pers => {
        this.service.getListaAmigos(pers.dniPersona).subscribe( listAm => {
          this.listaAmigos = listAm;
          console.log(this.listaAmigos);
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

  async presentActionSheet(i) {
    const actionSheet = await this.actionSheetController.create({
      header: this.listaAmigos[i].nombreListaAmigos,
      mode: 'ios',
      buttons: [ {
        text: 'Abrir',
        icon: 'open',
        handler: () => {
          this.router.navigate(['/view-friend-list', this.listaAmigos[i].id]);
        }
      }, {
        text: 'Borar',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.service.deleteFriendList(this.listaAmigos[i].id).subscribe(data => {
            console.log(data);
            this.obtenerListaAmigos();
          },
          (error) => {console.log(error);
          });
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
        }
      }]
    });
    await actionSheet.present();
  }

}
