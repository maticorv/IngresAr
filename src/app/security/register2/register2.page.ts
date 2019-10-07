import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ServiceService } from 'src/app/services/service.service';
import { Persona } from '../../interfaces/persona';
import { Account } from '../../classes/account';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register2',
  templateUrl: './register2.page.html',
  styleUrls: ['./register2.page.scss'],
})
export class Register2Page implements OnInit {
  dni: number;
  nombre: string;
  apellido: string;
  persona: Persona;
  constructor(private alertController: AlertController,
              private service: ServiceService, private account: Account, private router: Router) {
  }

  ngOnInit() {
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      header: '¿Por qué me piden mis datos?',
      // tslint:disable-next-line:max-line-length
      message: 'Te pedimos tus datos personales para que tú administrador pueda corroborar tú identidad.Es simplemente por una cuestión de seguridad, los datos no serán utilizados con otros fines.',
      buttons: ['Estoy de acuerdo']
    });

    await alert.present();
  }
  async presentAlert1() {
    const alert = await this.alertController.create({
      header: 'Coincidencias encontradas',
      // tslint:disable-next-line:max-line-length
      message: 'Según nuestra base de datos, el documento ingresaro corresponde a la/s siguiente/s persona/s. Selecciones a la que corresponda o toca el "Registrar un nuevo nombre" si no encuentras tu identidad.',
      buttons: [
        {
          text: this.persona.nombrePersona + ' ' + this.persona.dniPersona,
          handler: (blah) => {
          }
        },
        {
        text: 'Registrar un nuevo nombre',
        cssClass: 'secondary',
        handler: (blah) => {
          this.presentAlert2();
        }
      },
        {text: 'Cancelar',
        role: 'cancel',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
        }
      },
      ]
    });
    await alert.present();
  }
  async presentAlert2() {
    const alert = await this.alertController.create({
      header: '¿Por qué me piden mis datos?',
      // tslint:disable-next-line:max-line-length
      message: 'Este documento se encuntra duplicado, para poder registrarte contáctanos a soporte@ingresar.net indicando tus datos',
      buttons: ['Entiendo']
    });
    await alert.present();
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
  Guardar() {
    this.service.getPersona(this.dni).subscribe((data) => {
      this.persona = data;
      this.presentAlert1();
    },
    (error) => {
      console.log(error);
      this.presentAlert3();
      }) ;
  }
}
