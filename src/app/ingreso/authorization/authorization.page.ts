import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Acompañante } from 'src/app/classes/acompañante';
import { Personas } from 'src/app/classes/persona';
import { Destino } from 'src/app/classes/destino';
import { Autorizador } from 'src/app/classes/autorizador';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.page.html',
  styleUrls: ['./authorization.page.scss'],
})
export class AuthorizationPage implements OnInit {

  index: number;
  dni: string;
  cantidad = 0;
  persona: Personas;

  // tslint:disable-next-line: max-line-length
  constructor(private autorizador: Autorizador, private service: ServiceService, private router: Router, private destino: Destino, private toastController: ToastController, private acompañante: Acompañante) { }

  ngOnInit() {
    this.getPersonasDomicilio();
  }

  getPersonasDomicilio() {
    this.service.getPersonasDomicilio(this.destino.lote).subscribe(data => {
      this.persona = data[`personadoms`];
      console.log(this.persona);
    },
    (error) => { console.log(error);
    });
  }

  procesarIngreso() {
    this.autorizador.nombreAutorizador = this.persona[this.index].nombrePersona;
    this.autorizador.apellidoAutorizador = this.persona[this.index].apellidoPersona;
    this.acompañante.cantidadAcompañante = this.cantidad;
    this.service.postPlanillaIngreso().subscribe(data => {
      console.log(data);
      this.presentToast('El ingreso se ha realizado correctamente');
    },
    (error => {console.log(error);
               this.presentToast('El ingreso no se ha podido realizar, intente nuevamente');
  }));
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
      this.router.navigateByUrl('/startmenu');
      },
      2000);
  }

}
