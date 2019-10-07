import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { Router } from '@angular/router';
import { ToastController, AlertController } from '@ionic/angular';
import { Acompaniante } from 'src/app/classes/acompañante';
import { Personas } from 'src/app/classes/persona';
import { Destino } from 'src/app/classes/destino';
import { Autorizador } from 'src/app/classes/autorizador';
import { Vehiculo } from 'src/app/classes/vehiculo';
import { Tipovisita } from 'src/app/classes/tipovisita';
import { IngresoAPie } from 'src/app/classes/ingresoAPie';
import { Servicios } from 'src/app/classes/servicio';
import { Persona } from 'src/app/interfaces/persona';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.page.html',
  styleUrls: ['./authorization.page.scss'],
})
export class AuthorizationPage implements OnInit {

  index: number;
  dni: number;
  cantidad = 0;
  personaAut: Personas;
  persona: Persona;

  // planilla ingreso
  autorizadoPrevio: boolean;
  acompaniantes: number;
  fechaIngreso: Date;
  fechaEgreso: Date;
  fecha: string;
  hora: Date;
  tipovisita: string;
  planillatipo?: any;
  planillabarrio?: any;
  planillaqr?: any;
  planillaAcompaniantes = [];
  ingresoAPie: boolean;

  // tslint:disable-next-line: max-line-length
  constructor(private planillaAutorizador: Autorizador,
              private service: ServiceService, private router: Router,
              private planillaDestino: Destino, private toastController: ToastController,
              private acompañante: Acompaniante, private tipovisitas: Tipovisita,
              private planillaPersona: Personas, private planillaVehiculo: Vehiculo,
              private planillaEmpresa: Servicios, private ingresoaPie: IngresoAPie,
              private alertCtrl: AlertController) { }

  ngOnInit() {
    this.getPersonasDomicilio();
  }

  getPersonasDomicilio() {
    this.service.getPersonasDomicilio(this.planillaDestino.casaDomicilio).subscribe(data => {
      this.personaAut = data[`domiciliopersonas`];
      console.log(this.personaAut);
    },
    (error) => { console.log(error);
    });
  }

  procesarIngreso() {
    return new Promise<any>((resolve, reject) => {

      this.planillaAutorizador.nombrePersona = this.personaAut[this.index].nombrePersona;
      this.planillaAutorizador.apellidoPersona = this.personaAut[this.index].apellidoPersona;
      this.planillaAutorizador.id = this.personaAut[this.index].id;
      if (this.tipovisitas.nombreTipoVisita === 'visita') {
        this.planillaEmpresa = null;
      }
      if (this.ingresoaPie.ingresoAPie === true) {
        this.planillaVehiculo = null;
      }

      setTimeout( () => {
          resolve();
      }, 1000);
  });
    // this.acompañante.cantidadAcompañante = this.cantidad;
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
      },
      2000);
  }

  postPlanillaIngresoEgreso() {
    this.autorizadoPrevio = false;
    this.acompaniantes = this.cantidad;
    this.fechaIngreso = new Date();
    this.fechaEgreso = null;
    this.fecha = null;
    this.hora = null;
    this.tipovisita = this.tipovisitas.nombreTipoVisita;
    this.planillatipo = null;
    this.planillabarrio = null;
    this.planillaqr = null;
    this.ingresoAPie = this.ingresoaPie.ingresoAPie;
    this.planillaAutorizador.nombrePersona = this.personaAut[this.index].nombrePersona;
    this.planillaAutorizador.apellidoPersona = this.personaAut[this.index].apellidoPersona;
    // tslint:disable-next-line: max-line-length
    this.service.postPlanillaIngreso(this.autorizadoPrevio, this.acompaniantes, this.fechaIngreso, this.fechaEgreso, this.tipovisita, this.ingresoAPie, this.planillabarrio, this.planillaPersona, this.planillaqr, this.planillaDestino, this.planillaVehiculo, this.planillaEmpresa, this.planillaAutorizador, this.planillaAcompaniantes).subscribe(data => {
      this.presentToast('El ingreso se ha procesado correctamente');
      this.router.navigateByUrl('/startmenu');
    },
    (error) => {console.log('error', error);
                this.presentToast('Hubo un error al procesar los datos, intente nuevamente');
    });
    // console.log(this.planillaEmpresa);

  }

  global() {
    this.procesarIngreso().then(res => {
        this.postPlanillaIngresoEgreso();
    });
}

  procesarIngresoJson() {
  setTimeout(() => {
    this.presentToast('El ingreso se ha procesado correctamente');
    },
    2000);
}

  buscarAcompaniante() {
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
      header: this.persona.nombrePersona + ' ' + this.persona.apellidoPersona + ' ' + this.persona.dniPersona,
      message: '¿Los datos son correctos?</strong>',
      buttons: [
        {
          text: 'Aceptar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.planillaAcompaniantes.push(this.persona);
            this.dni = null;
          }
        }, {
          text: 'Cancelar',
          handler: () => {
            console.log('Confirm cancel');
          }
        }
      ]
    });

    await alert.present();
  }

  async personaNoExiste() {
    const alert = await this.alertCtrl.create({
      header: 'La persona con el dni ' + this.dni + ' no se encuentra en la base de datos',
      message: '¿Desea crearla?</strong>',
      buttons: [
        {
          text: 'Aceptar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.dni = null;
            this.router.navigateByUrl('/newcompanion');
          }
        }, {
          text: 'Cancelar',
          handler: () => {
            console.log('Confirm cancel');
          }
        }
      ]
    });

    await alert.present();
  }

  mostrarAcompaniantes() {
    console.log(this.planillaAcompaniantes);
  }

  agregarAcompaniante() {
    this.planillaAcompaniantes.push(this.acompañante);
  }


}
