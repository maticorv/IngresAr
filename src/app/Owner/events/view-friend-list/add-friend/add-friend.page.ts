import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { Router, ActivatedRoute } from '@angular/router';
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
  propietario: Persona;

  constructor(private service: ServiceService, private router: Router,
              private alertCtrl: AlertController, private amigo: Amigo,
              private naveCrtl: NavController, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.service.account().subscribe(data => {
      this.service.getPersonUser(data.id).subscribe(pers => {
        this.propietario = pers;
      },
      (error) => {console.log(error);

      });
    },
    (error) => {console.log(error);
    });
  }

  getpersona() {
    this.service.getPersonaEnListaAmigo(this.dni, this.activatedRoute.snapshot.params.id).subscribe(amigo => {
      console.log('amigo :', amigo);
      if (amigo.length !== 0) {
        this.amigoEnLista('La persona ya se encuentra en la lista de amigos');
      } else {
        this.service.getPersona(this.dni).subscribe(data => {
          if (data.dniPersona === this.propietario.dniPersona) {
            this.personaNoExiste('La persona que intenta agregar es el dueño de la lista');
          } else {
              console.log(data);
              this.persona = data;
              this.personaExiste();
            }
        },
        (error) => {console.log(error);
                    this.personaNoExiste('Para agregar la persona a la lista debe haber ingresado por lo menos una vez al establecimiento');
        });
      }
    },
    (err) => {console.log(err);
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

  async amigoEnLista(msg) {
    const alert = await this.alertCtrl.create({
      header: msg,
      buttons: ['Aceptar']
    });
    this.dni = null;
    await alert.present();
  }

}
