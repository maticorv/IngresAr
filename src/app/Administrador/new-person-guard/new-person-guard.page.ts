import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Personas } from 'src/app/classes/persona';
import { ServiceService } from '../../services/service.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-new-person-guard',
  templateUrl: './new-person-guard.page.html',
  styleUrls: ['./new-person-guard.page.scss'],
})
export class NewPersonGuardPage implements OnInit {

  nombrePersona: string;
  apellidoPersona: string;
  dniPersona: number;
  telefonoPersona: number;

  // tslint:disable-next-line: max-line-length
  constructor(private router: Router, private persona: Personas, private service: ServiceService, private toastController: ToastController) { }

  ngOnInit() {
    this.dniPersona = this.persona.dniPersona;
  }
  crearPersona() {
    this.service.postPersona(this.nombrePersona, this.apellidoPersona, this.dniPersona, this.telefonoPersona).subscribe(data => {
      console.log(data);
      this.persona.nombrePersona = data.nombrePersona;
      this.persona.apellidoPersona = data.apellidoPersona;
      this.persona.dniPersona = data.dniPersona;
      this.persona.telefonoPersona = data.telefonoPersona;
      this.persona.id = data.id;
      this.presentToast('La persona se ha creado correctamente');
      // this.router.navigateByUrl('/destination');
    },
    (error) => { console.log(error);
                 this.presentToast('La persona no se ha podido crear, intente nuevamente');
    });
  }

  async presentToast(me: string) {
    const toast = await this.toastController.create({
      position: 'middle',
      color: 'dark',
      duration: 2000,
      message: me,
    });
    toast.present();
    setTimeout(() => {
      this.router.navigateByUrl('/destination');
      },
      2000);
  }

}
