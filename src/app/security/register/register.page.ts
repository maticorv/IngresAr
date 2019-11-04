import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup , Validators , FormControl } from '@angular/forms';
import { Account } from '../../classes/account';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/services/service.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  email: string;
  password: string;
  password1: string;
  dni: number;
  nombre: string;
  apellido: string;
  constructor(private router: Router, private account: Account, private service: ServiceService, private alertController: AlertController) {
  }
  ngOnInit() {
  }
  async presentAlert3() {
    const alert = await this.alertController.create({
      header: 'La cuenta con el email: ' + this.email + ' ha sido creada correctamente',
      // tslint:disable-next-line:max-line-length
      message: 'Por favor verifica tu correo para activar la cuenta',
      buttons: [{
        text: 'Iniciar sesion',
        cssClass: 'secondary',
        handler: (blah) => {
          this.router.navigateByUrl('/login');
        }
      }],
    });
    await alert.present();
  }
  async presentAlert2() {
    const alert = await this.alertController.create({
      header: 'Ha ocurrido un error',
      // tslint:disable-next-line:max-line-length
      message: 'Por favor intentelo más tarde',
      buttons: [{
        text: 'Volver al inicio',
        cssClass: 'primary',
        handler: (blah) => {
          this.router.navigateByUrl('/login');
        }
      }],
    });
    await alert.present();
  }
  crarUsuario() {

    this.service.getUser(this.email).subscribe(data => {
      this.userExistente();
    },
    (error) => {console.log(error);
                const rand = Math.floor(Math.random() * 9);
                // tslint:disable-next-line: max-line-length
                this.service.register(this.email, 'en', this.nombre + this.apellido + rand , this.password, this.nombre, this.apellido).subscribe(reg => {
        this.presentAlert3();
      },
      (err) => {console.log(err);
                // this.presentAlert2();
      });
    });

    // this.service.getUser(this.email).subscribe(data => {
    //   this.userExistente();
    // },
    // (error) => {
    //   const rand = Math.floor(Math.random() * 9) ;
       // tslint:disable-next-line:max-line-length
    //   this.service.register(this.email, 'en', this.nombre + this.apellido + rand , this.password, this.nombre, this.apellido).subscribe(data => {
    //     this.presentAlert3();
    //   },
    //   (err) => {
    //     console.log(err);
    //     console.log('Entro al error del post');
    //     // this.presentAlert2();
    //     }) ;
    // });
  }

  async userExistente() {
    const alert = await this.alertController.create({
      header: 'El usuario con el email ' + this.email + ' ya existe',
      buttons: ['Aceptar']
    });

    await alert.present();
  }
}
