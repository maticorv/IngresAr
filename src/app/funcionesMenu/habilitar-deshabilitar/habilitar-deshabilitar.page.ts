import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Persona } from '../../interfaces/persona';
import { ServiceService } from '../../services/service.service';
import { AlertController, ToastController } from '@ionic/angular';
import { IPersonaEstado } from 'src/app/interfaces/ipersona-estado';

@Component({
  selector: 'app-habilitar-deshabilitar',
  templateUrl: './habilitar-deshabilitar.page.html',
  styleUrls: ['./habilitar-deshabilitar.page.scss'],
})
export class HabilitarDeshabilitarPage implements OnInit {

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
              private service: ServiceService, private alertCtrl: AlertController,
              private toastController: ToastController ) { }

  accion: string;
  persona: Persona;
  dni: number;
  PersonaEstado: IPersonaEstado;
  accionmsj: string;

  ngOnInit() {
    this.accion = this.activatedRoute.snapshot.params.id;
    if (this.accion === 'habilitada') {
      this.accionmsj = 'habilitar';
    } else {
      this.accionmsj = 'bloquear';
    }
  }

  ionViewWillLeave() {
    this.persona = null;
    this.dni = null;
    this.PersonaEstado = null;
    this.accionmsj = null;
  }

  getpersona() {
    this.service.getPersona(this.dni).subscribe((data) => {
      console.log(data);
      if (data.personaEstado.nombreEstadoPersona === this.accion) {
        this.msgPersonaHabilitadaBloqueada('La persona que desea ' + this.accionmsj + ' ya se encuentra ' + this.accion);
      } else {
        this.persona = data;
        this.personaExiste();
      }
    },
    (error) => { console.log(error);
                 this.presentAlert();
    });

  }

  async personaExiste() {
    const alert = await this.alertCtrl.create({
      header: this.persona.nombrePersona + ' ' + this.persona.apellidoPersona + ' ' + this.persona.dniPersona,
      message: '¿Esta seguro de ' + this.accionmsj + ' a esta persona?</strong>',
      buttons: [
        {
          text: 'Aceptar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.service.putPersonaEstado(this.persona.personaEstado.id, this.accion, new Date()).subscribe(data => {
              console.log(data);
              this.presentToast('La persona ha sido ' + this.accion + ' correctamente');
            },
            (error) => {console.log(error);
            });
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
      header: 'La persona con el DNI: ' + this.dni + ' no se encuentra en la base de datos',
      buttons: ['Aceptar']
    });

    await alert.present();
  }


  async msgPersonaHabilitadaBloqueada(msg: string) {
    const alert = await this.alertCtrl.create({
      header: msg,
      buttons: ['Aceptar']
    });

    await alert.present();
  }

  async presentToast(me: string) {
    const toast = await this.toastController.create({
      position: 'bottom',
      color: 'dark',
      duration: 2000,
      message: me,
    });
    toast.present();
    setTimeout(() => {
      },
      2000);
  }

}
