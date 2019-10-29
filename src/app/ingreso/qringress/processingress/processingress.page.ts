import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IVehiculo } from 'src/app/interfaces/vehiculo';
import { ServiceService } from 'src/app/services/service.service';
import { IQr } from '../../../interfaces/iqr';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-processingress',
  templateUrl: './processingress.page.html',
  styleUrls: ['./processingress.page.scss'],
})
export class ProcessingressPage implements OnInit {

  auto: number;
  ingresoApie = true;
  qr: IQr;

  vehiculo: IVehiculo;

  // tslint:disable-next-line: max-line-length
  constructor(private service: ServiceService, private router: Router, private toastController: ToastController) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getVehiculo();
    this.getQR(this.service.getCodQR());
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

}
