import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { Router } from '@angular/router';
import { Personas } from 'src/app/classes/persona';
import { AlertController } from '@ionic/angular';
import { Persona } from 'src/app/interfaces/persona';
import { User } from '../../classes/user';
import { IPersonaEstado } from 'src/app/interfaces/ipersona-estado';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-search-person-guard',
  templateUrl: './search-person-guard.page.html',
  styleUrls: ['./search-person-guard.page.scss'],
})
export class SearchPersonGuardPage implements OnInit {

  pers: FormGroup;
  personaEstado: IPersonaEstado;
  persona: Persona;
  authorities = [
    'ROLE_GUARDIA'
  ];

  constructor(private service: ServiceService, private router: Router,
              private alertCtrl: AlertController, private user: User,
              private personas: Personas, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.pers = this.formBuilder.group({
      dni: ['', [Validators.required, Validators.min(1000000), Validators.max(99999999)]]
    });
    console.log('this.user :', this.user);
    this.createPersonaEstado();
  }

  ionViewWillLeave() {
    this.pers.reset();
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
    this.service.getPersona(this.pers.controls.dni.value).subscribe((data) => {
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
      message: '<strong>Se ha encontrado el usuario con los siguientes datos <br>' +
               'Nombre: ' + this.persona.nombrePersona + ' <br>' +
               'Apellido: ' + this.persona.apellidoPersona + '</strong>',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            this.pers.reset();
          }
        },
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
            this.pers.reset();
            this.router.navigateByUrl('/manage-guard');
          }
        },

      ]
    });

    await alert.present();
  }

  async personaNoExiste() {
    const alert = await this.alertCtrl.create({
      header: 'La persona con el DNI:' + this.pers.controls.dni.value + 'no se encuentra en la base de datos',
      message: '¿Desea crear la persona?</strong>',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            this.pers.reset();
          }
        },
        {
          text: 'Aceptar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.personas.dniPersona = this.pers.controls.dni.value;
            this.router.navigateByUrl('/new-person-guard');
          }
        },
      ]
    });

    await alert.present();
  }


}
