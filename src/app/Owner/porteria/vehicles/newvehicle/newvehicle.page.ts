import { Component, OnInit } from '@angular/core';
import { Imarca } from 'src/app/interfaces/marca';
import { Vehiculo } from 'src/app/classes/vehiculo';
import { Imodelo } from 'src/app/interfaces/modelo';
import { Icolor } from 'src/app/interfaces/color';
import { Iseguro } from 'src/app/interfaces/seguro';
import { Calendar } from '@ionic-native/calendar/ngx';
import { ServiceService } from 'src/app/services/service.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Iaccount } from 'src/app/interfaces/account';
import { IVehiculo } from 'src/app/interfaces/vehiculo';
import { Persona } from 'src/app/interfaces/persona';

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
  aseguradora: string;
  vencimiento: string;
  position: number;
  account: Iaccount;
  vehiculos: IVehiculo[];
  persona: Persona;

  constructor(private calendar: Calendar, private service: ServiceService, private router: Router,
              private toastController: ToastController) {
                this.myDate = new Date().toISOString();
                this.max = new Date(new Date().getFullYear() + 2, new Date().getMonth() , new Date().getDay()).toISOString();
                this.calendar.createCalendar('MyCalendar').then(
                  (msg) => { console.log(msg); },
                  (err) => { console.log(err); }
                );
              }

  ngOnInit() {
    this.getAccount();
    this.getMarca();
    this.getColors();
    this.getSeguros();
  }
  getAccount() {
    this.service.account().subscribe((resp) => {
      this.account = resp;
      this.getVehiculos();
    }
    );
  }
  getVehiculos() {
    this.service.getPersonUser(this.account.id).subscribe((resp) => {
      this.persona = resp;
      this.vehiculos = resp.vehiculos;
    }
    );
  }
  getMarca() {
    this.service.getMarca().subscribe(data => {
      this.marcas = data;
    },
    (error) => { console.log(error);
    });
  }
  Marca(idMarca: Event) {
    this.brand = idMarca[`detail`].value;
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
  }
  getColors() {
    this.service.getColors().subscribe( data => {
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
    },
    (error) => { console.log(error);
    });
  }

  async presentToast(me: string) {
    const toast = await this.toastController.create({
      position: 'bottom',
      color: 'dark',
      duration: 2000,
      message: me,
    });
    toast.present();
    setTimeout(() => {
      this.router.navigateByUrl('/porteria/vehicles');
      },
      2000);
  }
  postVehiculo() {
    this.service.postVehiculo(this.dominio, this.marcas[this.brand],
    this.modelos[this.model], null ,
    this.colors[this.color]).subscribe(data => {
      this.persona.vehiculos.push(data);
      console.log('this.persona :', this.persona);
      this.service.putPersona(this.persona).subscribe(
        () =>  {this.presentToast('Vehiculo añadido satisfactoriamente');
      },
        (error) => {
          console.log(error);
          this.presentToast('Ha ocurrido un error');
        }
      );

    });
  }
}
