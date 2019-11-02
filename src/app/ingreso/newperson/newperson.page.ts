import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Personas } from 'src/app/classes/persona';
import { ServiceService } from '../../services/service.service';
import { ToastController } from '@ionic/angular';
import { IPersonaEstado } from 'src/app/interfaces/ipersona-estado';

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
  personaEstado: IPersonaEstado;

  // tslint:disable-next-line: max-line-length
  constructor(private router: Router, private persona: Personas, private service: ServiceService, private toastController: ToastController) { }

  ngOnInit() {
    this.dniPersona = this.persona.dniPersona;
    this.createPersonaEstado();
  }

  createPersonaEstado() {
    this.service.postPersonaEstado('habilitada', new Date()).subscribe(data => {
      this.personaEstado = data;
      console.log('this.personaEstado :', this.personaEstado);
    },
    (error) => {console.log(error);
    });
  }

  crearPersona() {
    // tslint:disable-next-line: max-line-length
    this.service.postPersona(this.nombrePersona, this.apellidoPersona, this.dniPersona, this.telefonoPersona, this.personaEstado, null, null, null).subscribe(data => {
      console.log(data);
      this.persona.nombrePersona = data.nombrePersona;
      this.persona.apellidoPersona = data.apellidoPersona;
      this.persona.dniPersona = data.dniPersona;
      this.persona.telefonoPersona = data.telefonoPersona;
      this.persona.id = data.id;
      this.persona.personabarrio = data.personabarrio;
      this.persona.personadomicilios = data.personadomicilios;
      this.persona.personaEstado = data.personaEstado;
      this.persona.personaUser = data.personaUser;
      this.presentToast('La persona se ha creado correctamente');
      this.router.navigateByUrl('/destination');
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
      // this.router.navigateByUrl('/destination');
      },
      2000);
  }

}
