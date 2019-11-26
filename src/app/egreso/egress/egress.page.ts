import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { PlanillaEgreso } from '../../classes/planillaEgreso';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Personas } from '../../classes/persona';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-egress',
  templateUrl: './egress.page.html',
  styleUrls: ['./egress.page.scss'],
})
export class EgressPage implements OnInit {

  pers: FormGroup;

  constructor(private service: ServiceService, private planillaEgreso: PlanillaEgreso,
              private alertCtrl: AlertController, private router: Router, private persona: Personas,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.pers = this.formBuilder.group({
      dni: ['', [Validators.required, Validators.min(1000000), Validators.max(99999999)]]
    });
  }

  getPlanillaEgreso() {
    this.service.getPlanillaEgreso(this.pers.controls.dni.value).subscribe(data => {
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
      this.persona.dniPersona = this.pers.controls.dni.value;
      this.setDataNull();
    },
    (error) => {console.log(error);
                this.personaNoIngreso();
    });
  }

  async personaNoIngreso() {
    const alert = await this.alertCtrl.create({
      header: 'La persona con el dni ' + this.pers.controls.dni.value + ' no ha ingresado al establecimiento',
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
    this.pers.reset();
    this.router.navigateByUrl('/egress-page');
  }

}
