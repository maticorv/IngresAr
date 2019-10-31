import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ServiceService } from '../../services/service.service';
import { Router } from '@angular/router';
import { IQr } from '../../interfaces/iqr';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-qringress',
  templateUrl: './qringress.page.html',
  styleUrls: ['./qringress.page.scss'],
})
export class QringressPage implements OnInit {

  constructor(private barcodeScanner: BarcodeScanner, private service: ServiceService,
              private router: Router, private alertCtrl: AlertController) { }

  qr: IQr;
  // codQR = 'GastonSilveyra2019-10-31T22:44:48.406Z';

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.scan();
    // this.scaForce();
  }

  // scaForce() {
  //   const hoy = new Date( new Date().setHours(0, 0, 0, 0));
  //   this.service.getQRByCodQR(this.codQR).subscribe(qr => {
  //     console.log('qr :', qr);
  //     this.qr = qr;
  //     if (new Date(qr.fechaFinQR) >= hoy) {
  //       this.service.setCodQR(this.qr.codigoQR);
  //       this.qrExiste();
  //     } else {
  //       this.presentAlert();
  //     }
  //   },
  //   (error) => {console.log(error);
  //   });
  // }

  scan() {
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      const hoy = new Date( new Date().setHours(0, 0, 0, 0));
      this.service.getQRByCodQR(barcodeData.text).subscribe(data => {
        this.qr = data;
        if (new Date(data.fechaFinQR) >= hoy) {
          this.service.setCodQR(this.qr.codigoQR);
          this.qrExiste();
        } else {
          this.presentAlert();
        }
      },
      (error) => {console.log(error);
      });

     }).catch(err => {
         console.log('Error', err);
     });
  }

  async qrExiste() {
    const alert = await this.alertCtrl.create({
      header: 'Autorización para\n' +
              'Nombre: ' + this.qr.qrAutorizado.nombrePersona + '\n' +
              'Apellido: ' + this.qr.qrAutorizado.apellidoPersona + '\n' +
              'DNI: ' + this.qr.qrAutorizado.dniPersona + '\n',
      message: '¿Desea continuar con este usuario?</strong>',
      buttons: [
        {
          text: 'Aceptar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.router.navigateByUrl('/processingress');
          }
        }, {
          text: 'Cancelar',
          handler: () => {
          }
        }
      ]
    });

    await alert.present();
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: 'La autorización esta vencida',
      buttons: ['Aceptar']
    });

    await alert.present();
  }

}
