import { Component, OnInit } from '@angular/core';
import { Calendar } from '@ionic-native/calendar/ngx';
import { ServiceService } from '../../services/service.service';
import { Router } from '@angular/router';
import { IVehiculo } from '../../interfaces/vehiculo';
import { Imarca } from '../../interfaces/marca';
import { Imodelo } from '../../interfaces/modelo';
import { Icolor } from '../../interfaces/color';
import { Iseguro } from '../../interfaces/seguro';
import { ToastController, AlertController } from '@ionic/angular';
import { Vehiculo } from 'src/app/classes/vehiculo';
import { IngresoAPie } from 'src/app/classes/ingresoAPie';
import { Personas } from 'src/app/classes/persona';
import { Marca } from 'src/app/classes/marca';
import { IAseguradora } from '../../interfaces/aseguradora';

@Component({
  selector: 'app-newvehicle',
  templateUrl: './newvehicle.page.html',
  styleUrls: ['./newvehicle.page.scss'],
})
export class NewvehiclePage implements OnInit {
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
  vencimiento: Date;
  position: number;
  check: boolean;
  aseguradoras: IAseguradora[];
  aseguradora: IAseguradora;

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
    this.getAseguradoras();
  }

  postVehiculo() {

    console.log(this.dominio, this.marcas[this.brand],
    this.modelos[this.model], this.colors[this.color], this.aseguradora, this.vencimiento );
    this.service.getVehiculoByDominio(this.dominio).subscribe( vehic => {
      this.persona.vehiculos.push(vehic);
      if (this.check) {
        const seguro: Iseguro = {
          id: null,
          fechaVencimientoSeguro: this.vencimiento,
          seguroAseguradora: this.aseguradora,
          seguroVehiculo: vehic,
        };
        this.service.postSeguro(seguro).subscribe(() => {
          // tslint:disable-next-line: max-line-length
          this.service.postPersonaVehiculo(this.persona.id, this.persona.nombrePersona, this.persona.apellidoPersona, this.persona.dniPersona, this.persona.telefonoPersona, this.persona.personaEstado, this.persona.personaUser, this.persona.personabarrio, this.persona.vehiculos).subscribe(() => {
             this.presentToast('Vehiculo creado satisfactoriamente');
          });
        });
      } else {
        // tslint:disable-next-line:max-line-length
        this.service.postPersonaVehiculo(this.persona.id, this.persona.nombrePersona, this.persona.apellidoPersona, this.persona.dniPersona, this.persona.telefonoPersona, this.persona.personaEstado, this.persona.personaUser, this.persona.personabarrio, this.persona.vehiculos).subscribe(() => {
          this.presentToast('Vehiculo creado satisfactoriamente');
       });
      }
    }, (error: any) => {
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
          if (this.check) {
            const seguro: Iseguro = {
              id: null,
              fechaVencimientoSeguro: this.vencimiento,
              seguroAseguradora: this.aseguradora,
              seguroVehiculo: data,
            };
            this.service.postSeguro(seguro).subscribe(() => {
              // tslint:disable-next-line: max-line-length
              this.service.postPersonaVehiculo(this.persona.id, this.persona.nombrePersona, this.persona.apellidoPersona, this.persona.dniPersona, this.persona.telefonoPersona, this.persona.personaEstado, this.persona.personaUser, this.persona.personabarrio, this.persona.vehiculos).subscribe(() => {
                 this.presentToast('Vehiculo creado satisfactoriamente');
              });
            });
          } else {
              // tslint:disable-next-line:max-line-length
              this.service.postPersonaVehiculo(this.persona.id, this.persona.nombrePersona, this.persona.apellidoPersona, this.persona.dniPersona, this.persona.telefonoPersona, this.persona.personaEstado, this.persona.personaUser, this.persona.personabarrio, this.persona.vehiculos).subscribe(() => {
                  this.presentToast('Vehiculo creado satisfactoriamente');
              });
          }
        // tslint:disable-next-line:no-shadowed-variable
        }, (error: any) => {
          console.log(error);
          this.presentToast('Ha ocurrido un error');
          }
        );
    }
    );
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
  getAseguradoras() {
    this.service.getAseguradora().subscribe( data => {
      this.aseguradoras = data;
      // console.log('this.aseguradoras :', this.aseguradoras);
    },
    (error: any) => {
      console.log(error);
    }
    );
  }
  Aseguradora(event: Event) {
    console.log(event);
    const indx = event[`detail`].value;
    this.aseguradora = this.aseguradoras[indx];
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
      this.router.navigateByUrl('/authorization');
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
