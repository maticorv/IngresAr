import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Persona } from 'src/app/interfaces/persona';
import { Personas } from 'src/app/classes/persona';

@Component({
  selector: 'app-dnisearch',
  templateUrl: './dnisearch.page.html',
  styleUrls: ['./dnisearch.page.scss'],
})
export class DnisearchPage implements OnInit {

  dni: number;
  persona: Persona;

  constructor(private service: ServiceService, private router: Router, private alertCtrl: AlertController, private personas: Personas) { }

  ngOnInit() {
  }

  getpersona() {
    this.service.getPersona(this.dni).subscribe((data) => {
      this.persona = data;
      console.log(data);
      this.personaExiste();
    },
    (error) => { console.log(error);
                 this.personaNoExiste();
    });

  }

  async personaExiste() {
    const alert = await this.alertCtrl.create({
      header: this.persona.nombrePersona + ' ' + this.persona.apellidoPersona + ' ' + this.persona.dniPersona,
      message: '¿Los datos son correctos?</strong>',
      buttons: [
        {
          text: 'Aceptar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.personas.nombrePersona = this.persona.nombrePersona;
            this.personas.apellidoPersona = this.persona.apellidoPersona;
            this.personas.dniPersona = this.persona.dniPersona;
            this.personas.id = this.persona.id;
            this.personas.telefonoPersona = this.persona.telefonoPersona;
            this.personas.vehiculos = this.persona.vehiculos;
            this.setNullData();
            this.router.navigateByUrl('/destination');
          }
        }, {
          text: 'Cancelar',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }

  async personaNoExiste() {
    const alert = await this.alertCtrl.create({
      header: 'La persona con el dni ' + this.dni + ' no se encuentra en la base de datos',
      message: '¿Desea crearla?</strong>',
      buttons: [
        {
          text: 'Aceptar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.setNullData();
            this.router.navigateByUrl('/newperson');
          }
        }, {
          text: 'Cancelar',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }
  setNullData() {
    this.dni = null;
    this.persona = null;
  }

}
