import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
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

  dni: number;
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

  constructor(private service: ServiceService, private router: Router,
              // tslint:disable-next-line: variable-name
              private alertCtrl: AlertController, private _formBuilder: FormBuilder,
              private emailComposer: EmailComposer, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.tipoVisita = this.activatedRoute.snapshot.params.id;
    console.log('tipoVisita :', this.activatedRoute.snapshot.params.id);
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
    // this.handleImage(imageData);
    this.img = imageData;
  }

  crearQr() {
    // tslint:disable-next-line: max-line-length
    this.service.postQR(this.codigoQR, this.fechaFinQR, null, 'image/png', this.tipoVisita, this.personaAutorizador, this.personaAutorizada, this.domicilio).subscribe(data => {
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
      this.fecha = new Date().toISOString();
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

//   public handleImage(Image: string): void {
//     this.fileData = this.convertDataUrlToBlob(Image);
//     console.log('this.fileData :', this.fileData);
//   }

//   convertDataUrlToBlob(dataUrl: string): Blob {
//     console.log('dataUrl :', dataUrl);
//     const arr = dataUrl.split(',');
//     const mime = arr[0].match(/:(.*?);/)[1];
//     const bstr = atob(arr[1]);
//     let n = bstr.length;
//     const u8arr = new Uint8Array(n);
//     while (n--) {
//         u8arr[n] = bstr.charCodeAt(n);
//     }

//     return new Blob([u8arr], {type: mime});
// }


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

}
