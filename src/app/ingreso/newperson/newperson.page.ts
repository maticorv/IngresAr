import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Personas } from 'src/app/classes/persona';
import { ServiceService } from '../../services/service.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-newperson',
  templateUrl: './newperson.page.html',
  styleUrls: ['./newperson.page.scss'],
})
export class NewpersonPage implements OnInit {

  nombrePersona: string;
  apellidoPersona: string;
  dniPersona: number;
  telefonoPersona: number;

  // tslint:disable-next-line: max-line-length
  constructor(private router: Router, private persona: Personas, private service: ServiceService, private toastController: ToastController) { }

  ngOnInit() {
  }
  crearPersona() {
    this.persona.nombrePersona = this.nombrePersona;
    this.persona.apellidoPersona = this.apellidoPersona;
    this.persona.dniPersona = this.dniPersona;
    this.persona.telefonoPersona = this.telefonoPersona;
    this.service.postPersona(this.nombrePersona, this.apellidoPersona, this.dniPersona, this.telefonoPersona).subscribe(data => {
      console.log(data);
      this.presentToast('El usuario se ha creado correctamente');
      // this.router.navigateByUrl('/destination');
    },
    (error) => { console.log(error);
                 this.presentToast('El usuario no se ha podido crear, intente nuevamente');
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
