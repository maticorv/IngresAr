import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Persona } from 'src/app/interfaces/persona';
import { Personas } from 'src/app/classes/persona';
import { ServiceService } from 'src/app/services/service.service';
import { Amigo } from '../../../classes/amiigo';

@Component({
  selector: 'app-new-friend',
  templateUrl: './new-friend.page.html',
  styleUrls: ['./new-friend.page.scss'],
})
export class NewFriendPage implements OnInit {

  dni: number;
  persona: Persona;

  constructor(private service: ServiceService, private router: Router,
              private alertCtrl: AlertController, private personas: Personas,
              private amigo: Amigo) { }

  ngOnInit() {
  }

  getpersona() {
    this.service.getPersona(this.dni).subscribe((data) => {
      this.persona = data;
      console.log(data);
      this.personaExiste();
    },
    (error) => { console.log(error);
                 this.personaNoExiste('La persona no se encuentra en la base de datos');
    });

  }

  async personaExiste() {
    const alert = await this.alertCtrl.create({
      header: this.persona.nombrePersona + ' ' + this.persona.apellidoPersona + ' ' + this.persona.dniPersona,
      message: '¿Los datos son correctos?</strong>',
      buttons: [
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

  async personaNoExiste(msg) {
    const alert = await this.alertCtrl.create({
      header: msg,
      buttons: ['Aceptar']
    });
    this.setNullData();
    await alert.present();
  }

  setNullData() {
    this.dni = null;
    this.persona = null;
  }

}
