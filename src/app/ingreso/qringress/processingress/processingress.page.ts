import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IVehiculo } from 'src/app/interfaces/vehiculo';
import { ServiceService } from 'src/app/services/service.service';
import { IQr } from '../../../interfaces/iqr';
import { ToastController, AlertController } from '@ionic/angular';
import { Personas } from '../../../classes/persona';

@Component({
  selector: 'app-processingress',
  templateUrl: './processingress.page.html',
  styleUrls: ['./processingress.page.scss'],
})
export class ProcessingressPage implements OnInit {

  ingresoApie: boolean;
  qr: IQr;
  auto: number;
  vehiculo: IVehiculo;
  avanzar: boolean;
  carnet: string;
  hoy: Date;

  // tslint:disable-next-line: max-line-length
  constructor(private service: ServiceService, private router: Router, private toastController: ToastController,
              private persona: Personas, private alertCtrl: AlertController) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getQR(this.service.getCodQR());
    this.hoy = new Date();
  }

  ionViewWillLeave() {
    this.auto = null;
    this.vehiculo = null;
    this.avanzar = null;
    this.carnet = null;
    this.hoy = null;
  }

  procesarIngreso() {
    // tslint:disable-next-line: max-line-length
    if (this.ingresoApie) {
      // tslint:disable-next-line: max-line-length
      this.service.postPlanillaIngreso(true, 0, new Date(), null, this.qr.tipoVisira, true, null, this.qr.qrAutorizado, this.qr, this.qr.qrDomicilio, null, null, this.qr.qrAutorizador, null).subscribe(data => {
      console.log(data);
      this.presentToast('El ingreso se ha procesado correctamente');
      this.router.navigateByUrl('/startmenu');
      },
      (error) => {console.log(error);
                  this.presentToast('Hubo un error al procesar los datos, intente nuevamente');
      });
    } else {
      // tslint:disable-next-line: max-line-length
      this.service.postPlanillaIngreso(true, 0, new Date(), null, this.qr.tipoVisira, false, null, this.qr.qrAutorizado, this.qr, this.qr.qrDomicilio, this.vehiculo[this.auto], null, this.qr.qrAutorizador, null).subscribe(data => {
        console.log(data);
        this.presentToast('El ingreso se ha procesado correctamente');
        this.router.navigateByUrl('/startmenu');
      },
      (error) => {console.log(error);
                  this.presentToast('Hubo un error al procesar los datos, intente nuevamente');
      });
    }
  }

  getCarnet() {
    this.service.getCarnetByIdPerson(this.persona.id).subscribe(data => {
      if (new Date(data.fechaVencimiento) < this.hoy) {
        this.carnet = 'vencido';
        this.carnetVencido();
      } else {
        this.avanzar = true;
      }
    },
    (error) => {console.log(error);
                this.carnet = 'crear';
                this.sinCarnet();
    });
  }

  selected(value: string) {
    console.log( value);
    this.auto = value[`detail`].value;
    // console.log(this.vehiculos[this.auto]);
  }
  selectedPie(value: string) {
    console.log( value);
    this.ingresoApie = value[`detail`].checked;
    // console.log(this.vehiculos[this.auto]);
  }
  imprimir() {
    console.log(this.auto);
  }

  ingresoAPie() {
    this.ingresoApie = true;
  }

  getVehiculo() {
    this.service.getVechiculo(this.qr.qrAutorizado.dniPersona).subscribe(dato => {
      this.vehiculo = dato;
      console.log(this.vehiculo);
    },
    (error) => {
      console.log(error);
    });
  }

  getQR(codQR) {
    this.service.getQRByCodQR(codQR).subscribe(data => {
      this.qr = data;
      this.persona.apellidoPersona = data.qrAutorizado.apellidoPersona;
      this.persona.dniPersona = data.qrAutorizado.dniPersona;
      this.persona.id = data.qrAutorizado.id;
      this.persona.nombrePersona = data.qrAutorizado.nombrePersona;
      this.persona.personaEstado = data.qrAutorizado.personaEstado;
      this.persona.personaUser = data.qrAutorizado.personaUser;
      this.persona.personabarrio = data.qrAutorizado.personabarrio;
      this.persona.personadomicilios = data.qrAutorizado.personadomicilios;
      this.persona.telefonoPersona = data.qrAutorizado.telefonoPersona;
      this.persona.vehiculos = data.qrAutorizador.vehiculos;
      console.log('this.qr :', this.qr);
      this.getVehiculo();
      this.getCarnet();
    },
    (error) => {console.log(error);
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
      },
      2000);
  }

  async carnetVencido() {
    const alert = await this.alertCtrl.create({
      header: 'La persona tiene vencido el carnet, por favor actualicelo',
      buttons: ['Aceptar']
    });

    await alert.present();
  }

  async sinCarnet() {
    const alert = await this.alertCtrl.create({
      header: 'La persona no tiene asociado el carnet, por favor agreguelo',
      buttons: ['Aceptar']
    });

    await alert.present();
  }

}
