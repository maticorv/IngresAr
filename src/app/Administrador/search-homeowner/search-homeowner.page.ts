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

  constructor(private sservice: ServiceService, private router: Router,
              private alertCtrl: AlertController, private user: User) { }

  ngOnInit() {
  }

  getHomeowner() {
    this.sservice.getUser(this.email).subscribe(data => {
      console.log(data);
      this.homeownerExiste();
    },
    (error) => {console.log(error);
                this.router.navigateByUrl('/new-homeowner');
    });
  }

  async homeownerExiste() {
    const alert = await this.alertCtrl.create({
      header: 'Se ha encontrado el usuario con los siguientes dato' +
              'Nombre: ' + this.users[0].firstName +
              'Apellido: ' + this.users[0].lastName,
      message: '¿Desea continuar con este usuario?</strong>',
      buttons: [
        {
          text: 'Aceptar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.email = null;
            this.user.id = this.users.id;
            this.user.firstName = this.users.firstName;
            this.user.lastName = this.users.lastName;
            this.user.activated = this.users.activated;
            this.user.email = this.users.email;
            this.user.imageUrl = this.users.imageUrl;
            this.user.langKey = this.users.langKey;
            this.user.login = this.users.login;
            this.user.resetDate = this.users.resetDate;
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

}
