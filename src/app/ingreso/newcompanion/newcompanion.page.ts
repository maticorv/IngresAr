import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../../services/service.service';
import { ToastController } from '@ionic/angular';
import { Acompaniante } from 'src/app/classes/acompañante';
import { AuthorizationPage } from '../authorization/authorization.page';

@Component({
  selector: 'app-newcompanion',
  templateUrl: './newcompanion.page.html',
  styleUrls: ['./newcompanion.page.scss'],
})
export class NewcompanionPage implements OnInit {

  nombrePersona: string;
  apellidoPersona: string;
  dniPersona: number;
  telefonoPersona: number;

  // tslint:disable-next-line: max-line-length
  constructor(private router: Router, private acompaniante: Acompaniante,
              private service: ServiceService, private toastController: ToastController,
              private authorization: AuthorizationPage) { }

  ngOnInit() {
    this.dniPersona = this.acompaniante.dniPersona;
  }
  crearPersona() {
    this.service.postPersona(this.nombrePersona, this.apellidoPersona, this.dniPersona, this.telefonoPersona).subscribe(data => {
      console.log(data);
      this.acompaniante.nombrePersona = data.nombrePersona;
      this.acompaniante.apellidoPersona = data.apellidoPersona;
      this.acompaniante.dniPersona = data.dniPersona;
      this.acompaniante.telefonoPersona = data.telefonoPersona;
      this.acompaniante.id = data.id;
      this.presentToast('La persona se ha creado correctamente');
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
      this.router.navigateByUrl('/authorization');
      },
      2000);
  }

}
