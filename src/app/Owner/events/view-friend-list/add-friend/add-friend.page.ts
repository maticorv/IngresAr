import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { Amigo } from 'src/app/classes/amiigo';
import { Persona } from 'src/app/interfaces/persona';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-friend',
  templateUrl: './add-friend.page.html',
  styleUrls: ['./add-friend.page.scss'],
})
export class AddFriendPage implements OnInit {

  pers: FormGroup;
  persona: Persona;
  propietario: Persona;

  constructor(private service: ServiceService, private router: Router,
              private alertCtrl: AlertController, private amigo: Amigo,
              private naveCrtl: NavController, private activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.pers = this.formBuilder.group({
      dni: ['', [Validators.required, Validators.min(1000000), Validators.max(99999999)]]
    });
  }

  ionViewWillEnter() {
    this.pers = this.formBuilder.group({
      dni: ['', [Validators.required, Validators.min(1000000), Validators.max(99999999)]]
    });
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
    this.service.getPersonaEnListaAmigo(this.pers.controls.dni.value, this.activatedRoute.snapshot.params.id).subscribe(amigo => {
      console.log('amigo :', amigo);
      if (amigo.length !== 0) {
        this.amigoEnLista('La persona ya se encuentra en la lista de amigos');
      } else {
        this.service.getPersona(this.pers.controls.dni.value).subscribe(data => {
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
      // header: this.persona.nombrePersona + ' ' + this.persona.apellidoPersona + ' ' + this.persona.dniPersona,
      message: '<strong> Nombre: ' + this.persona.nombrePersona + '<br>' +
      'Apellido: ' + this.persona.apellidoPersona + '<br>' +
      'DNI: ' + this.persona.dniPersona + '<br>' +
      '¿Los datos son correctos?</strong>',
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
            this.amigo.sinDatos = true;
            this.amigo.ListaAmigo.push(this.persona);
            this.pers.reset();
            this.naveCrtl.back();
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
    this.pers.reset();
    await alert.present();
  }

  async amigoEnLista(msg) {
    const alert = await this.alertCtrl.create({
      header: msg,
      buttons: ['Aceptar']
    });
    this.pers.reset();
    await alert.present();
  }

}
