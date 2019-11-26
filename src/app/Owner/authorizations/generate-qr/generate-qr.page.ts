import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';
import { Persona } from 'src/app/interfaces/persona';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
// PDFMAKE
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-generate-qr',
  templateUrl: './generate-qr.page.html',
  styleUrls: ['./generate-qr.page.scss'],
})
export class GenerateQrPage implements OnInit {

  pers: FormGroup;
  tipoVisita: string;
  personaAutorizada: Persona;
  personaAutorizador: Persona;
  domicilio: any;
  codigoQR: string;
  canvas = document.getElementById('value');
  img: string;
  fecha: string;
  deshabilitar: boolean;
  fechaFinQR: string;
  fechaMin: Date;
  fechaMax: Date;
  fileData;
  pdfObj;
  pdfGenerator;
  // tslint:disable-next-line: max-line-length
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  fotoQR: string;
  fotoQRContentType: string;


  constructor(private service: ServiceService, private router: Router,
              // tslint:disable-next-line: variable-name
              private alertCtrl: AlertController, private _formBuilder: FormBuilder,
              private emailComposer: EmailComposer, private activatedRoute: ActivatedRoute,
              private toastController: ToastController, public loadingController: LoadingController,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.pers = this.formBuilder.group({
      dni: ['', [Validators.required, Validators.min(1000000), Validators.max(99999999)]]
    });
    this.tipoVisita = this.activatedRoute.snapshot.params.id;
    console.log('tipoVisita :', this.activatedRoute.snapshot.params.id);
    this.getOwner();
    this.fechaMin = new Date();
    this.fechaMax = new Date();
    this.fechaMax.setDate(this.fechaMin.getDate() + 30);
    this.fechaFinQR = new Date().toISOString();
    console.log('fecha Max', this.fechaMax);
    // console.log(this.fechaFinQR);
    // this.firstFormGroup = this._formBuilder.group({
    //   firstCtrl: ['', Validators.required]
    // });
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
    // this.handleImage(imageData);
    this.img = imageData;
  }

  crearQr() {
    this.presentLoadingWithOptions();
    // tslint:disable-next-line: max-line-length
    this.service.postQR(this.codigoQR, this.fechaFinQR, this.fotoQR, this.fotoQRContentType, this.tipoVisita, this.personaAutorizador, this.personaAutorizada, this.domicilio).subscribe(data => {
      console.log(data);
      this.loadingController.dismiss();
      this.presentToast('La autorización se ha creado con éxito');
      this.enviarMail();
    },
    (error) => {console.log(error);
    });
  }

  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      spinner: 'lines',
      duration: 5000,
      message: 'Generando QR, espere por favor...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    return await loading.present();
  }



  // getpersona(stepper) {
  //   this.service.getPersona(this.dni).subscribe((data) => {
  //     this.personaAutorizada = data;
  //     console.log(data);
  //     this.fecha = new Date().toISOString();
  //     this.personaExiste(stepper);
  //   },
  //   (error) => { console.log(error);
  //                this.presentAlert('La persona no se encuentra en la Base de Datos');
  //   });
  // }

  getpersona(stepper) {
    this.service.getPersona(this.pers.controls.dni.value).subscribe((data) => {
      if (data.personaEstado.nombreEstadoPersona === 'bloqueada') {
        this.personaBloqueada('La persona se encuentra bloqueada');
      } else {
        this.personaAutorizada = data;
        this.fecha = new Date().toISOString();
        console.log(data);
        this.personaExiste(stepper);
      }
    },
    (error) => { console.log(error);
                 // tslint:disable-next-line: max-line-length
                 this.presentAlert('Para crearle una autorización previa a la persona debe haber ingresado por lo menos una vez al establecimiento');
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
      // tslint:disable-next-line: max-line-length
      // header: this.personaAutorizada.nombrePersona + ' ' + this.personaAutorizada.apellidoPersona + ' ' + this.personaAutorizada.dniPersona,
      message: '<strong> Nombre: ' + this.personaAutorizada.nombrePersona + '<br>' +
      'Apellido: ' + this.personaAutorizada.apellidoPersona + '<br>' +
      'DNI: ' + this.personaAutorizada.dniPersona + '<br>' +
      '¿Los datos son correctos?</strong>',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            this.pers.reset();
            console.log('Confirm Okay');
          }
        },
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
        },
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

    // this.createPdf();
    const email = {
      to: this.personaAutorizada.personaUser.email,
      attachments: [
        `base64:Autorizacion.pdf//${this.pdfObj}`,
      ],
      subject: 'Autorización previa',
      isHtml: true
    };
    this.emailComposer.open(email);
    if (this.tipoVisita === 'visita') {
      this.router.navigateByUrl('/authorizations/visit');
    } else {
      this.router.navigateByUrl('/authorizations/employee');
    }
  }

  goBack(stepper: MatStepper) {
      stepper.previous();
  }

  goForward(stepper: MatStepper) {
      stepper.next();
  }


  createPdf() {
    const docDefinition = {
      content: [
        {
          text: 'Autorización Previa',
          bold: true,
          fontSize: 32,
          alignment: 'center',
          margin: [0, 15, 0, 15]
        },
        {
          image: this.img,
          fit: [250, 250],
          alignment: 'center',
          // margin: [0, 0, 0, 20]
        },
        {
          text: 'Datos de la persona autorizada:',
          fontSize: 16,
          margin: [0, 10, 0, 5]
        },
          {
            ul: [
              {
                text: 'Apellido: ' + this.personaAutorizada.apellidoPersona,
                fontSize: 14,
                margin: [5, 0, 0, 0]
              },
              {
                text: 'Nombre: ' + this.personaAutorizada.nombrePersona,
                fontSize: 14,
                margin: [5, 0, 0, 0]
              },
              {
                text: 'DNI: ' + this.personaAutorizada.dniPersona,
                fontSize: 14,
                margin: [5, 0, 0, 0]
              },
              {
                text: 'Fecha expiración: ' + new Date(this.fechaFinQR).toLocaleDateString(),
                fontSize: 14,
                margin: [5, 0, 0, 0]
              },
            ]
          }
      ],
      footer:
      {
        text: new Date().toLocaleString(),
        alignment: 'right',
        margin: [0, 0, 10, 0]
      },
    };
    const pdfGenerator = pdfMake.createPdf(docDefinition);
    this.pdfGenerator = pdfMake.createPdf(docDefinition);
    pdfGenerator.getBase64((data) => {
    this.pdfObj = data;
    console.log('El pdf se creo correctamente');
  });
  }

  descargarPDF() {
    this.pdfGenerator.download();
  }

  getPart(str: string) {
    // this.img = str.split(',')[1];
    const axu = str.split(':')[1];
    this.fotoQRContentType = axu.split(';')[0];
    this.fotoQR = str.split(',')[1];
    console.log('this.fotoQRContentType :', this.fotoQRContentType);
    console.log('this.fotoQR :', this.fotoQR);
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

  async personaBloqueada(msg) {
    const alert = await this.alertCtrl.create({
      header: msg,
      buttons: ['Aceptar']
    });
    this.pers.reset();
    await alert.present();
  }


}
