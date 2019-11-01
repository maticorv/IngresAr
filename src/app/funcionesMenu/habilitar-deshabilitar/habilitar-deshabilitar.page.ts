import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Persona } from '../../interfaces/persona';
import { ServiceService } from '../../services/service.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-habilitar-deshabilitar',
  templateUrl: './habilitar-deshabilitar.page.html',
  styleUrls: ['./habilitar-deshabilitar.page.scss'],
})
export class HabilitarDeshabilitarPage implements OnInit {

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
              private service: ServiceService, private alertCtrl: AlertController ) { }

  accion: string;
  persona: Persona;
  dni: number;

  ngOnInit() {
    this.accion = this.activatedRoute.snapshot.params.id;
  }

  getpersona() {
    this.service.getPersona(this.dni).subscribe((data) => {
      this.persona = data;
      console.log(data);
      this.personaExiste();
    },
    (error) => { console.log(error);
                 this.presentAlert();
    });

  }

  async personaExiste() {
    const alert = await this.alertCtrl.create({
      header: this.persona.nombrePersona + ' ' + this.persona.apellidoPersona + ' ' + this.persona.dniPersona,
      message: 'Esta seguro de ' + this.accion + ' a esta persona?</strong>',
      buttons: [
        {
          text: 'Aceptar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.router.navigateByUrl('/startmenu');
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

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: 'La persona con el DNI:' + this.dni + 'no se encuentra en la base de datos',
      buttons: ['Aceptar']
    });

    await alert.present();
  }

}
