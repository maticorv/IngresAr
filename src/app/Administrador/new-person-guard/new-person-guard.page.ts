import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Personas } from 'src/app/classes/persona';
import { ServiceService } from '../../services/service.service';
import { ToastController } from '@ionic/angular';
import { User } from '../../classes/user';
import { IPersonaEstado } from 'src/app/interfaces/ipersona-estado';

@Component({
  selector: 'app-new-person-guard',
  templateUrl: './new-person-guard.page.html',
  styleUrls: ['./new-person-guard.page.scss'],
})
export class NewPersonGuardPage implements OnInit {

  nombrePersona: string;
  personaEstado: IPersonaEstado;
  apellidoPersona: string;
  dniPersona: number;
  telefonoPersona: number;
  authorities = [
      'ROLE_GUARDIA'
  ];

  // tslint:disable-next-line: max-line-length
  constructor(private router: Router, private persona: Personas, private service: ServiceService,
              private toastController: ToastController, private user: User) { }

  ngOnInit() {
    this.dniPersona = this.persona.dniPersona;
    this.createPersonaEstado();
  }

  ionViewWillLeave() {
    this.nombrePersona = null;
    this.apellidoPersona = null;
    this.dniPersona = null;
    this.telefonoPersona = null;
    this.personaEstado = null;
  }

  createPersonaEstado() {
    this.service.postPersonaEstado('habilitada', new Date()).subscribe(data => {
      this.personaEstado = data;
    },
    (error) => {console.log(error);
    });
  }

  crearPersona() {
    // tslint:disable-next-line: max-line-length
    this.service.postPersona(this.nombrePersona, this.apellidoPersona, this.dniPersona, this.telefonoPersona, this.personaEstado, this.user, null, null).subscribe(data => {
      console.log(data);
      // tslint:disable-next-line: max-line-length
      this.service.crearGuardia(data.id, data.nombrePersona, data.apellidoPersona, data.dniPersona, data.telefonoPersona, this.personaEstado, this.user, data.personabarrio, data.vehiculos).subscribe(pers => {
        console.log(pers);
        // tslint:disable-next-line: max-line-length
        this.service.cambiarRol(this.user.id, this.user.login, this.user.firstName, this.user.lastName, this.user.email, this.user.imageUrl, this.user.activated, this.user.langKey, this.user.createdBy, this.user.createdDate, this.user.lastModifiedBy, this.user.lastModifiedDate, this.authorities).subscribe(user => {
          console.log(user);
        },
        (error) => {console.log(error);
        });
      },
      (error) => {console.log(error);
      });
      this.presentToast('La persona se ha creado correctamente');
      this.router.navigateByUrl('/manage-guard');
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
      this.router.navigateByUrl('/manage-guard');
      },
      2000);
  }

}
