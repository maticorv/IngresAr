import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Personas } from 'src/app/classes/persona';
import { ServiceService } from '../../services/service.service';
import { ToastController } from '@ionic/angular';
import { User } from '../../classes/user';

@Component({
  selector: 'app-new-person-homeowener',
  templateUrl: './new-person-homeowener.page.html',
  styleUrls: ['./new-person-homeowener.page.scss'],
})
export class NewPersonHomeowenerPage implements OnInit {

  nombrePersona: string;
  apellidoPersona: string;
  dniPersona: number;
  telefonoPersona: number;
  authorities = [
      'ROLE_PROPIETARIO'
  ];

  // tslint:disable-next-line: max-line-length
  constructor(private router: Router, private persona: Personas, private service: ServiceService,
              private toastController: ToastController, private user: User) { }

  ngOnInit() {
    this.dniPersona = this.persona.dniPersona;
  }

  ionViewWillLeave() {
    this.nombrePersona = null;
    this.apellidoPersona = null;
    this.dniPersona = null;
    this.telefonoPersona = null;
  }

  crearPersona() {
    this.service.postPersona(this.nombrePersona, this.apellidoPersona, this.dniPersona, this.telefonoPersona).subscribe(data => {
      console.log(data);
      // tslint:disable-next-line: max-line-length
      this.service.crearPropietario(data.id, data.nombrePersona, data.apellidoPersona, data.dniPersona, data.telefonoPersona, this.user, data.personabarrio, data.vehiculos).subscribe(pers => {
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
      this.router.navigateByUrl('/manage-homeowner');
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
