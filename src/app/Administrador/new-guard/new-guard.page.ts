import { Component, OnInit } from '@angular/core';
import { Account } from '../../classes/account';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/services/service.service';
import { AlertController } from '@ionic/angular';
import { User } from '../../classes/user';
import { IUser } from '../../interfaces/iuser';
import { LowerCasePipe } from '@angular/common';

@Component({
  selector: 'app-new-guard',
  templateUrl: './new-guard.page.html',
  styleUrls: ['./new-guard.page.scss'],
})
export class NewGuardPage implements OnInit {

  email: string;
  password: string;
  password1: string;
  dni: number;
  nombre: string;
  apellido: string;
  users: IUser;
  constructor(private router: Router, private account: Account, private service: ServiceService,
              private alertController: AlertController, private user: User) {
  }

  ngOnInit() {
    this.email = this.user.email;
  }

  ionViewWillLeave() {
    this.email = null;
    this.password = null;
    this.password1 = null;
    this.dni = null;
    this.nombre = null;
    this.apellido = null;
    this.users = null;
  }
  async presentAlert3() {
    const alert = await this.alertController.create({
      header: 'La cuenta ha sido creada',
      // tslint:disable-next-line:max-line-length
      message: 'Por favor verifique el correo para activar la cuenta',
      buttons: [{
        text: 'Aceptar',
        cssClass: 'secondary',
        handler: (blah) => {
          this.router.navigateByUrl('/search-person-guard');
        }
      }],
    });
    await alert.present();
  }

  onSubmit() {
    this.service.register(this.email, 'en', this.nombre + this.apellido, this.password, this.nombre, this.apellido).subscribe(data => {
      const login = this.nombre.toLocaleLowerCase() + this.apellido.toLocaleLowerCase();
      this.service.getUserByLogin(login).subscribe(resp => {
        this.user.id = resp.id;
        this.user.login = resp.login;
        this.user.firstName = resp.firstName;
        this.user.lastName = resp.lastName;
        this.user.email = resp.email;
        this.user.imageUrl = resp.imageUrl;
        this.user.activated = resp.activated;
        this.user.langKey = resp.langKey;
        this.user.createdBy = resp.createdBy;
        this.user.createdDate = resp.createdDate;
        this.user.lastModifiedBy = resp.lastModifiedBy;
        this.user.lastModifiedDate = resp.lastModifiedDate;
        this.user.authorities = resp.authorities;
      },
      (error) => {console.log(error);
      });
      this.presentAlert3();
    },
    (error) => {
      console.log(error);
      }) ;
  }

}
