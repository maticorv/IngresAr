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
      this.presentAlertConfirm();
    },
    (error) => { console.log(error);
    });

  }

  async presentAlertConfirm() {
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
            this.router.navigateByUrl('/transport');
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

}
