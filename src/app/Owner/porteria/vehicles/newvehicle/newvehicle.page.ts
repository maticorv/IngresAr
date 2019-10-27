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
      console.log(this.vehiculos);
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
    this.color = this.model = e[`detail`].value;
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
      this.router.navigateByUrl('/authorization');
      },
      2000);
  }

}
