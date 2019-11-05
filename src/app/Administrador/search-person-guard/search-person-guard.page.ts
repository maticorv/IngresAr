import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { Router } from '@angular/router';
import { Personas } from 'src/app/classes/persona';
import { AlertController } from '@ionic/angular';
import { Persona } from 'src/app/interfaces/persona';
import { User } from '../../classes/user';
import { IPersonaEstado } from 'src/app/interfaces/ipersona-estado';

@Component({
  selector: 'app-search-person-guard',
  templateUrl: './search-person-guard.page.html',
  styleUrls: ['./search-person-guard.page.scss'],
})
export class SearchPersonGuardPage implements OnInit {

  dni: number;
  personaEstado: IPersonaEstado;
  persona: Persona;
  authorities = [
    'ROLE_GUARDIA'
  ];

  constructor(private service: ServiceService, private router: Router,
              private alertCtrl: AlertController, private user: User,
              private personas: Personas) { }

  ngOnInit() {
    console.log('this.user :', this.user);
    this.createPersonaEstado();
  }

  ionViewWillLeave() {
    this.dni = null;
    this.personaEstado = null;
  }

  createPersonaEstado() {
    this.service.postPersonaEstado('habilitada', new Date()).subscribe(data => {
      this.personaEstado = data;
    },
    (error) => {console.log(error);
    });
  }

  getPersonGuardia() {
    this.service.getPersona(this.dni).subscribe((data) => {
      this.persona = data;
      console.log(data);
      this.personaExiste();
    },
    (error) => { console.log(error);
                 this.personaNoExiste();
    });

  }

  async personaExiste() {
    const alert = await this.alertCtrl.create({
      header: 'Se ha encontrado el usuario con los siguientes dato' +
              'Nombre: ' + this.persona.nombrePersona +
              'Apellido: ' + this.persona.apellidoPersona,
      message: '¿Desea continuar con este usuario?</strong>',
      buttons: [
        {
          text: 'Aceptar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            // tslint:disable-next-line: max-line-length
            this.service.crearGuardia(this.persona.id, this.persona.nombrePersona, this.persona.apellidoPersona, this.persona.dniPersona, this.persona.telefonoPersona, this.personaEstado, this.user, this.persona.personabarrio, this.persona.vehiculos).subscribe(pers => {
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
            this.dni = null;
            this.router.navigateByUrl('/manage-guard');
          }
        }, {
          text: 'Cancelar',
          handler: () => {
            this.dni = null;
          }
        }
      ]
    });

    await alert.present();
  }

  async personaNoExiste() {
    const alert = await this.alertCtrl.create({
      header: 'La persona con el DNI:' + this.dni + 'no se encuentra en la base de datos',
      message: '¿Desea crear la persona?</strong>',
      buttons: [
        {
          text: 'Aceptar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.personas.dniPersona = this.dni;
            this.router.navigateByUrl('/new-person-guard');
          }
        }, {
          text: 'Cancelar',
          handler: () => {
            this.dni = null;
          }
        }
      ]
    });

    await alert.present();
  }


}
