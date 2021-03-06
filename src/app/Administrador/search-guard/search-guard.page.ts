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

  ionViewWillLeave() {
    this.email = null;
    this.users = null;
  }

  getGuardia() {
    this.service.getUser(this.email).subscribe(data => {
      this.users = data;
      // console.log('users :', data);
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
      header: 'Se ha encontrado el usuario con el siguiente email: ' + this.email,
      message: '¿Desea continuar con este usuario?</strong>',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.email = null;
          }
        },
        {
          text: 'Aceptar',
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
        },
      ]
    });

    await alert.present();
  }

  async guardiaNoExiste() {
    const alert = await this.alertCtrl.create({
      header: 'No se ha encontrado el usuario con el usuario con el email: ' + this.email,
      message: '¿Desea crear un nuevo usuario?</strong>',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.email = null;
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.user.email = this.email;
            this.router.navigateByUrl('/new-guard');
          }
        },
      ]
    });

    await alert.present();
  }

}
