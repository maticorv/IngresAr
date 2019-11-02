import { Component, OnInit } from '@angular/core';
import { Calendar } from '@ionic-native/calendar/ngx';
import { Router } from '@angular/router';
import { ToastController, AlertController } from '@ionic/angular';
import { Vehiculo } from 'src/app/classes/vehiculo';
import { IngresoAPie } from 'src/app/classes/ingresoAPie';
import { Personas } from 'src/app/classes/persona';
import { Marca } from 'src/app/classes/marca';
import { Imarca } from 'src/app/interfaces/marca';
import { Imodelo } from 'src/app/interfaces/modelo';
import { Icolor } from 'src/app/interfaces/color';
import { Iseguro } from 'src/app/interfaces/seguro';
import { ServiceService } from 'src/app/services/service.service';
import { IQr } from '../../../interfaces/iqr';

@Component({
  selector: 'app-newvehicle-qr',
  templateUrl: './newvehicle-qr.page.html',
  styleUrls: ['./newvehicle-qr.page.scss'],
})
export class NewvehicleQRPage implements OnInit {

  marcas: Imarca[];
  brand: string;
  vehiculo: Vehiculo;
  modelos: Imodelo[];
  model: string;
  color: string;
  colors: Icolor[];
  seguros: Iseguro[];
  myDate: string;
  max: string;
  dominio: string;
  aseguradora: string;
  vencimiento: string;
  position: number;
  qr: IQr;
  constructor(private calendar: Calendar, private service: ServiceService, private router: Router,
              private toastController: ToastController, private vehiculos: Vehiculo, private ingresoAPie: IngresoAPie,
              private persona: Personas, private marca: Marca, private alertCtrl: AlertController) {
    this.myDate = new Date().toISOString();
    this.max = new Date(new Date().getFullYear() + 2, new Date().getMonth() , new Date().getDay()).toISOString();
    this.calendar.createCalendar('MyCalendar').then(
      (msg) => { console.log(msg); },
      (err) => { console.log(err); }
    );
  }

  ngOnInit() {
    this.getMarca();
    this.getColors();
    this.getSeguros();
    this.obtenerQR(this.service.getCodQR());
  }

  obtenerQR(codQR) {
    this.service.getQRByCodQR(codQR).subscribe(data => {
      this.qr = data;
    },
    (error) => {console.log(error);
    });
  }
  postVehiculo() {

    console.log(this.dominio, this.marcas[this.brand],
    this.modelos[this.model], this.colors[this.color], this.aseguradora, this.vencimiento );
    this.service.getVehiculoByDominio(this.dominio).subscribe( vehic => {
      console.log(vehic);
      this.service.postVehiculo(this.dominio, this.marcas[this.brand],
      this.modelos[this.model], null ,
      this.colors[this.color]).subscribe(data => {
          console.log(data);
          this.vehiculos.id = data.id;
          this.vehiculos.dominio = data.dominio;
          this.vehiculos.vehiculoMarca = data.vehiculoMarca;
          this.vehiculos.vehiculoModelo = data.vehiculoModelo;
          this.ingresoAPie.ingresoAPie = false;
          this.persona.vehiculos.push(data);
          // tslint:disable-next-line: no-shadowed-variable
          // tslint:disable-next-line: max-line-length
          this.service.postPersonaVehiculo(this.persona.id, this.persona.nombrePersona, this.persona.apellidoPersona, this.persona.dniPersona, this.persona.telefonoPersona, this.persona.vehiculos).subscribe((vehi) => {
            this.presentToast('Vehiculo creado satisfactoriamente');
          });
        }, (error) => {console.log(error);
                       this.presentToast('Ha ocurrido un error');
                      }
        );
    },
    (error) => {console.log(error);
                this.presentAlert();
    });
  }

  getMarca() {
    this.service.getMarca().subscribe(data => {
      console.log(data);
      this.marcas = data;
    },
    (error) => { console.log(error);
    });
  }
  Marca(idMarca: Event) {
    this.brand = idMarca[`detail`].value;
    console.log(this.brand);
    if (idMarca !== undefined) {
      this.service.getMarcaByNombre(this.marcas[this.brand][`nombreMarca`]).subscribe(data => {
        this.modelos = data[`modelos`];
      },
      (error) => { console.log(error);
      });
    }
  }
  Modelo(e: Event) {
    this.model = e[`detail`].value;
    console.log(this.model);
  }
  getColors() {
    this.service.getColors().subscribe( data => {
      console.log(data);
      this.colors = data;
    },
    (error) => { console.log(error);
    });
  }
  Color(e: Event) {
    this.color = e[`detail`].value;
  }

  getSeguros() {
    this.service.getSeguros().subscribe(data => {
      console.log(data);
    },
    (error) => { console.log(error);
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
      this.router.navigateByUrl('/processingress');
      },
      2000);
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: 'El vehiculo con el domini: ' + this.dominio + 'ya se encuentra registrado',
      buttons: ['Aceptar']
    });

    await alert.present();
  }


}
