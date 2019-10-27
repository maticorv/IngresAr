import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { Amigo } from 'src/app/classes/amiigo';
import { Persona } from 'src/app/interfaces/persona';

@Component({
  selector: 'app-add-friend',
  templateUrl: './add-friend.page.html',
  styleUrls: ['./add-friend.page.scss'],
})
export class AddFriendPage implements OnInit {

  dni: number;
  persona: Persona;

  constructor(private service: ServiceService, private router: Router,
              private alertCtrl: AlertController, private amigo: Amigo,
              private naveCrtl: NavController) { }

  ngOnInit() {
  }

  getpersona() {
    this.service.getPersona(this.dni).subscribe((data) => {
      this.persona = data;
      console.log(data);
      this.personaExiste();
    },
    (error) => { console.log(error);
                 this.personaNoExiste('La persona no existe en la base de datos');
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
            this.amigo.sinDatos = true;
            this.amigo.ListaAmigo.push(this.persona);
            this.dni = null;
            this.naveCrtl.back();
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

  async personaNoExiste(msg) {
    const alert = await this.alertCtrl.create({
      header: msg,
      buttons: ['Aceptar']
    });
    this.dni = null;
    await alert.present();
  }

}
