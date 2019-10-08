import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { PlanillaEgreso } from '../../classes/planillaEgreso';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Personas } from '../../classes/persona';

@Component({
  selector: 'app-egress',
  templateUrl: './egress.page.html',
  styleUrls: ['./egress.page.scss'],
})
export class EgressPage implements OnInit {

  dni: number;

  constructor(private service: ServiceService, private planillaEgreso: PlanillaEgreso,
              private alertCtrl: AlertController, private router: Router, private persona: Personas) { }

  ngOnInit() {
  }

  getPlanillaEgreso() {
    this.service.getPlanillaEgreso(this.dni).subscribe(data => {
      // this.planillaEgreso.id = data.id;
      // this.planillaEgreso.autorizadoPrevio = data.autorizadoPrevio;
      // this.planillaEgreso.acompaniantes = data.acompaniantes;
      // this.planillaEgreso.fechaIngreso = data.fechaIngreso;
      // this.planillaEgreso.fechaEgreso = data.fechaEgreso;
      // this.planillaEgreso.tipovisita = data.tipovisita;
      // this.planillaEgreso.planillatipo = data.planillatipo;
      // this.planillaEgreso.planillabarrio = data.planillabarrio;
      // this.planillaEgreso.planillapersona = data.planillapersona;
      // this.planillaEgreso.planillaqr = data.planillaqr;
      // this.planillaEgreso.planilladestino = data.planilladestino;
      // this.planillaEgreso.planillavehiculo = data.planillavehiculo;
      // this.planillaEgreso.planillaempresa = data.planillaempresa;
      // this.planillaEgreso.planillaautorizador = data.planillaautorizador;
      this.persona.dniPersona = this.dni;
      this.setDataNull();
    },
    (error) => {console.log(error);
                this.personaNoIngreso();
    });
  }

  async personaNoIngreso() {
    const alert = await this.alertCtrl.create({
      header: 'La persona con el dni ' + this.dni + ' no ha ingresado al establecimiento',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log('Confirm cancel');
          }
        }, {
          text: 'Aceptar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }
      ]
    });

    await alert.present();
  }

  setDataNull() {
    this.dni = null;
    this.router.navigateByUrl('/egress-page');
  }

}
