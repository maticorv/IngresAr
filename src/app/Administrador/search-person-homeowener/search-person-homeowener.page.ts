import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { Router } from '@angular/router';
import { Personas } from 'src/app/classes/persona';
import { AlertController } from '@ionic/angular';
import { Persona } from 'src/app/interfaces/persona';

@Component({
  selector: 'app-search-person-homeowener',
  templateUrl: './search-person-homeowener.page.html',
  styleUrls: ['./search-person-homeowener.page.scss'],
})
export class SearchPersonHomeowenerPage implements OnInit {

  dni: number;
  persona: Persona;

  constructor(private service: ServiceService, private router: Router,
              private alertCtrl: AlertController, private personas: Personas) { }

  ngOnInit() {
  }

  getPersonPropietario() {
    this.service.getPersona(this.dni).subscribe((data) => {
      this.persona = data;
      console.log(data);
      this.personaExiste();
    },
    (error) => { console.log(error);
    });

  }

  async personaExiste() {
    const alert = await this.alertCtrl.create({
      header: 'Se ha encontrado el usuario con los siguientes dato' +
              'Nombre: ' + this.persona.nombrePersona +
              'Apellido: ' + this.persona.apellidoPersona,
      message: '¿Desea continuar con este usuario?</strong>',
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
            this.dni = null;
            this.router.navigateByUrl('/new-person-homeowner');
          }
        }, {
          text: 'Cancelar',
          handler: () => {
            this.dni = null;
          }
        }
      ]
    });

    await alert.present();
  }

}
