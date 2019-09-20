import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
// import { ModalPersonaPage } from 'src/pp/modals/modal-persona/modal-persona.page';
import { Persona } from 'src/app/interfaces/persona';

@Component({
  selector: 'app-dnisearch',
  templateUrl: './dnisearch.page.html',
  styleUrls: ['./dnisearch.page.scss'],
})
export class DnisearchPage implements OnInit {

  dni: number;
  persona: Persona;

  constructor(private service: ServiceService, private router: Router, private alertCtrl: AlertController) { }

  ngOnInit() {
  }

  getpersona() {
    this.service.getPersona(this.dni).subscribe((data) => {
      this.persona = data;
      // this.abrirModal();
      // this.router.navigateByUrl('/transport');
    },
    (error) => { console.log(error);
                //  this.abrirModalerror();
    });
    // this.abrirModal();
  }

  // async abrirModal() {
  //   const modal = await this.modalCtrl.create({
  //     component: ModalPersonaPage,
  //     componentProps: {
  //       existe: true,
  //       nombrePersona: this.persona.nombrePersona,
  //       apellidoPersona: this.persona.apellidoPersona,
  //       dniPersona: this.persona.dniPersona
  //     }
  //   });

  //   await modal.present();
  // }

  // async abrirModalerror() {
  //   const modal = await this.modalCtrl.create({
  //     component: ModalPersonaPage,
  //     componentProps: {
  //       existe: false,
  //       dni: this.dni
  //     }
  //   });

  //   await modal.present();
  // }
  async presentAlertConfirm() {
    const alert = await this.alertCtrl.create({
      header: this.persona.nombrePersona + this.persona.apellidoPersona + this.persona.dniPersona,
      message: 'Message <strong>text</strong>!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }

}
