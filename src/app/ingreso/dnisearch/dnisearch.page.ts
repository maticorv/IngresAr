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
  // Busca la persona con el dni inggreso
  getpersona() {
    this.service.getPersona(this.dni).subscribe((data) => {
      if (data.personaEstado.nombreEstadoPersona === 'bloqueada') {
        this.personaBloqueada('La persona se encuentra bloqueada');
      } else {
        this.persona = data;
        console.log(data);
        this.personaExiste();
      }
    },
    (error) => { console.log(error);
                 this.personaNoExiste();
    });
  }
  // muestra msj por pantalla si la persona existe
  async personaExiste() {
    const alert = await this.alertCtrl.create({
      message:  '<strong>Nombre: ' + this.persona.nombrePersona + '<br>' +
                'Apellido: ' + this.persona.apellidoPersona + '<br>' +
                'DNI: ' + this.persona.dniPersona + '<br>' +
                '¿Los datos son  correctos?</strong>',
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
  // muestra ms por patalla si la persona no existe
  async personaNoExiste() {
    const alert = await this.alertCtrl.create({
      header: 'La persona con el dni ' + this.dni + ' no se encuentra en la base de datos',
      message: '¿Desea crearla?</strong>',
      buttons: [
         {
          text: 'Cancelar',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Okay');
          }
        },
        {
          text: 'Aceptar',
          role: 'cancel',
          cssClass: 'primary',
          handler: () => {
            this.personas.dniPersona = this.dni;
            this.setNullData();
            this.router.navigateByUrl('/newperson');
          }
        },
      ]
    });

    await alert.present();
  }
  // pone los datos en nullos para el proximo ingreso
  setNullData() {
    this.dni = null;
    this.persona = null;
  }

  async personaBloqueada(msg) {
    const alert = await this.alertCtrl.create({
      header: msg,
      buttons: ['Aceptar']
    });
    this.setNullData();
    await alert.present();
  }

}
