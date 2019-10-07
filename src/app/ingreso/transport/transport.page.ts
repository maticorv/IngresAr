import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ServiceService } from '../../services/service.service';
import { Personas } from 'src/app/classes/persona';
import { IVehiculo } from '../../interfaces/vehiculo';
import { Vehiculo } from 'src/app/classes/vehiculo';
import { Router } from '@angular/router';
import { IngresoAPie } from 'src/app/classes/ingresoAPie';

@Component({
  selector: 'app-transport',
  templateUrl: './transport.page.html',
  styleUrls: ['./transport.page.scss'],
})
export class TransportPage implements OnInit {

  auto: number;

  vehiculo: IVehiculo;

  // tslint:disable-next-line: max-line-length
  constructor(private service: ServiceService, private personas: Personas, private vehiculos: Vehiculo, private router: Router, private ingresoApie: IngresoAPie) { }

  ngOnInit() {
    this.getVehiculo();
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

}
