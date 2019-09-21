import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { Router } from '@angular/router';
import { Autorizador } from 'src/app/classes/autorizador';
import { ToastController } from '@ionic/angular';
import { Acompañante } from 'src/app/classes/acompañante';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.page.html',
  styleUrls: ['./authorization.page.scss'],
})
export class AuthorizationPage implements OnInit {

  // tslint:disable-next-line: max-line-length
  constructor(private service: ServiceService, private router: Router, private autorizador: Autorizador, private toastController: ToastController, private acompañante: Acompañante) { }

  nombreAutorizador: string;
  dni: string;
  cantidad = 0;

  persona = [
    {
      nombre: 'Pedro'
    },
    {
      nombre: 'Jose'
    },
    {
      nombre: 'Silvia'
    }
  ];

  ngOnInit() {
  }

  imprimir() {
    // console.log(this.i);
    // console.log(this.dni);
    console.log(this.cantidad);
  }

  procesarIngreso() {
    this.autorizador.nombreAutorizador = this.nombreAutorizador;
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
