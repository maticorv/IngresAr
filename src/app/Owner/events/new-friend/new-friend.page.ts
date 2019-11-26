import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Persona } from 'src/app/interfaces/persona';
import { Personas } from 'src/app/classes/persona';
import { ServiceService } from 'src/app/services/service.service';
import { Amigo } from '../../../classes/amiigo';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-friend',
  templateUrl: './new-friend.page.html',
  styleUrls: ['./new-friend.page.scss'],
})
export class NewFriendPage implements OnInit {

  pers: FormGroup;
  persona: Persona;
  propietario: Persona;

  constructor(private service: ServiceService, private router: Router,
              private alertCtrl: AlertController, private personas: Personas,
              private amigo: Amigo, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.pers = this.formBuilder.group({
      dni: ['', [Validators.required, Validators.min(1000000), Validators.max(99999999)]]
    });
  }

  ionViewWillEnter() {
    this.pers = this.formBuilder.group({
      dni: ['', [Validators.required, Validators.min(1000000), Validators.max(99999999)]]
    });
    this.getPropietario();
  }

  getPropietario() {
    this.service.account().subscribe(data => {
      this.service.getPersonUser(data.id).subscribe(pers => {
        this.propietario = pers;
        console.log(this.propietario);
      },
      (error) => {console.log(error);
      });
    },
    (error) => {console.log(error);
    });
  }

  verficarSiAmigoExiste() {
    if (this.propietario.dniPersona.toString() === this.pers.controls.dni.value.toString()) {
      this.amigoExisteEnLista('La persona que intenta agregar es el dueño de la lista');
    } else {
      if (this.amigo.ListaAmigo.length === 0 ) {
        this.getpersona();
      } else {
        this.amigo.ListaAmigo.forEach(element => {
          console.log('Entro al for');
          console.log('element.dniPersona :', element.dniPersona);
          console.log('this.dni :', this.pers.controls.dni.value);
          if (element.dniPersona.toString() === this.pers.controls.dni.value.toString()) {
            this.amigoExisteEnLista('La persona ya se encuentra agregada en la lista');
          } else {
            this.getpersona();
          }
        });
      }
    }
  }

  getpersona() {
    this.service.getPersona(this.pers.controls.dni.value).subscribe((data) => {
      this.persona = data;
      console.log(data);
      this.personaExiste();
    },
    (error) => { console.log(error);
                 this.personaNoExiste('La debe haber ingresado por lo menos una vez al establecimiento');
    });

  }

  async personaExiste() {
    const alert = await this.alertCtrl.create({
      // header: this.persona.nombrePersona + ' ' + this.persona.apellidoPersona + ' ' + this.persona.dniPersona,
      message: '<strong> Nombre: ' + this.persona.nombrePersona + '<br>' +
      'Apellido: ' + this.persona.apellidoPersona + '<br>' +
      'DNI: ' + this.persona.dniPersona + '<br>' +
      '¿Los datos son correctos?</strong>',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log('Confirm Okay');
          }
        },
        {
          text: 'Aceptar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.amigo.ListaAmigo.push(this.persona);
            this.amigo.sinDatos = true;
            this.setNullData();
            this.router.navigateByUrl('/new-friend-list');
          }
        },
      ]
    });

    await alert.present();
  }

  async personaNoExiste(msg) {
    const alert = await this.alertCtrl.create({
      header: msg,
      buttons: ['Aceptar']
    });
    this.setNullData();
    await alert.present();
  }

  async amigoExisteEnLista(msg) {
    const alert = await this.alertCtrl.create({
      header: msg,
      buttons: ['Aceptar']
    });
    this.setNullData();
    await alert.present();
  }

  setNullData() {
    this.pers.reset();
    this.persona = null;
  }

}
