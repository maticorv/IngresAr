import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { User } from 'src/app/classes/user';
import { IUser } from 'src/app/interfaces/iuser';

@Component({
  selector: 'app-search-homeowner',
  templateUrl: './search-homeowner.page.html',
  styleUrls: ['./search-homeowner.page.scss'],
})
export class SearchHomeownerPage implements OnInit {

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

  getHomeowner() {
    this.service.getUser(this.email).subscribe(data => {
      this.users = data;
      console.log(this.users);
      this.personaExiste();
    },
    (error) => {console.log(error);
                console.log('hola+');
                this.personaNoExiste();
                // this.router.navigateByUrl('/new-guard');
    });
  }

  async personaExiste() {
    const alert = await this.alertCtrl.create({
      header: 'Se ha encontrado el usuario con el email' + this.email,
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
            this.router.navigateByUrl('/search-person-homeowener');
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

  async personaNoExiste() {
    const alert = await this.alertCtrl.create({
      header: 'No se ha encontrado el usuario con el usuario con el email: ' + this.email,
      message: '¿Desea crear un nuevo usuario?</strong>',
      buttons: [
        {
          text: 'Aceptar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.user.email = this.email;
            this.router.navigateByUrl('/new-homeowner');
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
