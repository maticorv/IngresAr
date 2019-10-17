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
      header: 'Tu cuenta ha sido creada',
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
  onSubmit() {
    this.service.register(this.email, 'en', this.nombre + this.apellido, this.password).subscribe(data => {
      this.presentAlert3();
    },
    (error) => {
      console.log(error);
      this.presentAlert2();
      }) ;
  }
}
