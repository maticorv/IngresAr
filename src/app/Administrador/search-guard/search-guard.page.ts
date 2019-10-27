import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { IUser } from '../../interfaces/iuser';
import { User } from '../../classes/user';

@Component({
  selector: 'app-search-guard',
  templateUrl: './search-guard.page.html',
  styleUrls: ['./search-guard.page.scss'],
})
export class SearchGuardPage implements OnInit {

  email: string;
  users: IUser;

  constructor(private service: ServiceService, private router: Router,
              private alertCtrl: AlertController, private user: User) { }

  ngOnInit() {
  }

  getGuardia() {
    this.service.getUser(this.email).subscribe(data => {
      this.users = data;
      console.log(this.users);
      this.guardiaExiste();
    },
    (error) => {console.log(error);
                console.log('hola+');
                this.guardiaNoExiste();
                // this.router.navigateByUrl('/new-guard');
    });
  }

  async guardiaExiste() {
    const alert = await this.alertCtrl.create({
      header: 'Se ha encontrado el usuario con los siguientes dato' +
              'Nombre: ' + this.users.firstName +
              'Apellido: ' + this.users.lastName,
      message: '¿Desea continuar con este usuario?</strong>',
      buttons: [
        {
          text: 'Aceptar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.email = null;
            this.user.id = this.users.id;
            this.user.login = this.users.login;
            this.user.firstName = this.users.firstName;
            this.user.lastName = this.users.lastName;
            this.user.email = this.users.email;
            this.user.imageUrl = this.users.imageUrl;
            this.user.activated = this.users.activated;
            this.user.langKey = this.users.langKey;
            this.user.createdBy = this.users.createdBy;
            this.user.createdDate = this.users.createdDate;
            this.user.lastModifiedBy = this.users.lastModifiedBy;
            this.user.lastModifiedDate = this.users.lastModifiedDate;
            this.user.authorities = this.users.authorities;
            this.router.navigateByUrl('/search-person-guard');
          }
        }, {
          text: 'Cancelar',
          handler: () => {
            this.email = null;
          }
        }
      ]
    });

    await alert.present();
  }

  async guardiaNoExiste() {
    const alert = await this.alertCtrl.create({
      header: 'No se ha encontrado el usuario con los siguientes dato',
      message: '¿Desea crear un nuevo usuario?</strong>',
      buttons: [
        {
          text: 'Aceptar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.email = null;
            this.router.navigateByUrl('/new-guard');
          }
        }, {
          text: 'Cancelar',
          handler: () => {
            this.email = null;
          }
        }
      ]
    });

    await alert.present();
  }

}
