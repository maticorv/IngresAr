import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ServiceService } from '../../services/service.service';
import { Personas } from 'src/app/classes/persona';
import { IVehiculo } from '../../interfaces/vehiculo';
import { Vehiculo } from 'src/app/classes/vehiculo';
import { Router } from '@angular/router';
import { IngresoAPie } from 'src/app/classes/ingresoAPie';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-transport',
  templateUrl: './transport.page.html',
  styleUrls: ['./transport.page.scss'],
})
export class TransportPage implements OnInit {

  auto: number;
  vehiculo: IVehiculo;
  avanzar: boolean;
  carnet: string;
  hoy: Date;

  // tslint:disable-next-line: max-line-length
  constructor(private service: ServiceService, private personas: Personas, private vehiculos: Vehiculo,
              private router: Router, private ingresoApie: IngresoAPie, private alertCtrl: AlertController) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getVehiculo();
    this.hoy = new Date();
    this.getCarnet();
  }

  ionViewWillLeave() {
    this.auto = null;
    this.vehiculo = null;
    this.avanzar = null;
    this.carnet = null;
    this.hoy = null;
  }

  getCarnet() {
    this.service.getCarnetByIdPerson(this.personas.id).subscribe(data => {
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

  siguiente() {
    this.vehiculos.dominio = this.vehiculo[this.auto].dominio;
    this.vehiculos.vehiculoMarca = this.vehiculo[this.auto].vehiculomarca;
    this.vehiculos.id = this.vehiculo[this.auto].id;
    this.ingresoApie.ingresoAPie = false;
    this.router.navigateByUrl('/authorization');
  }
  selected(value: string) {
    // console.log( value[`detail`].value);
    this.auto = value[`detail`].value;
    // console.log(this.vehiculos[this.auto]);
  }
  imprimir() {
    console.log(this.auto);
  }

  ingresoAPie() {
    this.ingresoApie.ingresoAPie = true;
    this.router.navigateByUrl('/authorization');
  }

  getVehiculo() {
    this.service.getVechiculo(this.personas.dniPersona).subscribe(dato => {
      this.vehiculo = dato;
      console.log(this.vehiculo);
    },
    (error) => {
      console.log(error);
    });
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
