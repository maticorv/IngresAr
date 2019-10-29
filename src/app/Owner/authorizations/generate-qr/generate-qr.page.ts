import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Persona } from 'src/app/interfaces/persona';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-generate-qr',
  templateUrl: './generate-qr.page.html',
  styleUrls: ['./generate-qr.page.scss'],
})
export class GenerateQrPage implements OnInit {

  dni: number;
  personaAutorizada: Persona;
  personaAutorizador: Persona;
  domicilio: any;
  codigoQR: string;
  canvas = document.getElementById('value');
  img: string;
  fecha: any;
  deshabilitar: boolean;
  fechaFinQR: string;
  fechaMin: Date;
  fechaMax: Date;
  fileData;

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(private service: ServiceService, private router: Router,
              // tslint:disable-next-line: variable-name
              private alertCtrl: AlertController, private _formBuilder: FormBuilder,
              private emailComposer: EmailComposer) { }

  ngOnInit() {
    this.getOwner();
    this.fechaMin = new Date();
    this.fechaMax = new Date();
    this.fechaMax.setDate(this.fechaMin.getDate() + 30);
    this.fechaFinQR = new Date().toISOString();
    console.log('fecha Max', this.fechaMax);
    // console.log(this.fechaFinQR);
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  generarQr() {
    // this.qr = this.personaAutorizada.nombrePersona + this.personaAutorizada.apellidoPersona + this.fecha;
    const canvas = document.querySelector('canvas') as HTMLCanvasElement;
    const imageData = canvas.toDataURL('image/jpeg').toString();
    // alert(imageData);
    // console.log(this.fechaFinQR);
    this.handleImage(imageData);
    this.img = imageData;
  }

  crearQr() {
    // tslint:disable-next-line: max-line-length
    this.service.postQR(this.codigoQR, this.fechaFinQR, this.fileData, 'image/png', 'visita', this.personaAutorizador, this.personaAutorizada, this.domicilio).subscribe(data => {
      console.log(data);
      this.enviarMail();
    },
    (error) => {console.log(error);
    });
  }



  getpersona(stepper) {
    this.service.getPersona(this.dni).subscribe((data) => {
      this.personaAutorizada = data;
      console.log(data);
      this.fecha = new Date().toLocaleString();
      this.personaExiste(stepper);
    },
    (error) => { console.log(error);
                 this.presentAlert('La persona no se encuentra en la Base de Datos');
    });

  }

  getOwner() {
    this.service.account().subscribe(data => {
      console.log(data);
      this.service.getPersonUser(data.id).subscribe(pers => {
        console.log(pers);
        this.personaAutorizador = pers;
        this.service.getDomicilioById(pers.id).subscribe(dom => {
          this.domicilio = dom;
        },
        (error) => {console.log(error);
        });
      },
      (error) => {console.log(error);
      });
    },
    (error) => {console.log(error);
    });
  }

  async personaExiste(stepper) {
    const alert = await this.alertCtrl.create({
      header: this.personaAutorizada.nombrePersona + ' ' + this.personaAutorizada.apellidoPersona + ' ' + this.personaAutorizada.dniPersona,
      message: '¿Los datos son correctos?</strong>',
      buttons: [
        {
          text: 'Aceptar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.codigoQR = this.personaAutorizada.nombrePersona + this.personaAutorizada.apellidoPersona + this.fecha;
            this.deshabilitar = true;
            this.goForward(stepper);
            // this.generarQr();
          }
        }, {
          text: 'Cancelar',
          handler: () => {
            this.dni = null;
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }

  async presentAlert(msg) {
    const alert = await this.alertCtrl.create({
      header: msg,
      buttons: ['Aceptar'],
    });
    await alert.present();
  }

  enviarMail() {

    const email = {
      to: this.personaAutorizada.personaUser.email,
      attachments: [
        this.img,
      ],
      subject: 'Autorización previa',
      isHtml: true
    };
    this.emailComposer.open(email);
    this.router.navigateByUrl('/authorizations/visit');
  }

  public handleImage(Image: string): void {
    // console.log('received webcam image', Image.imageAsDataUrl);
    this.fileData = this.convertDataUrlToBlob(Image);
    console.log('this.fileData :', this.fileData);
  }

  convertDataUrlToBlob(dataUrl: string): Blob {
    console.log('dataUrl :', dataUrl);
    const arr = dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new Blob([u8arr], {type: mime});
}


  goBack(stepper: MatStepper) {
      stepper.previous();
  }

  goForward(stepper: MatStepper) {
      stepper.next();
  }
}
