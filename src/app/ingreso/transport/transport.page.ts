import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ServiceService } from '../../services/service.service';
import { Personas } from 'src/app/classes/persona';
import { IVehiculo } from '../../interfaces/vehiculo';
import { Vehiculo } from 'src/app/classes/vehiculo';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transport',
  templateUrl: './transport.page.html',
  styleUrls: ['./transport.page.scss'],
})
export class TransportPage implements OnInit {

  auto: number;

  vehiculo: IVehiculo;

  constructor(private service: ServiceService, private personas: Personas, private vehiculos: Vehiculo, private router: Router) { }

  ngOnInit() {
    this.getVehiculo();
  }

  siguiente() {
    this.vehiculos.dominio = this.vehiculo[this.auto].dominio;
    this.vehiculos.vehiculomarca = this.vehiculo[this.auto].vehiculomarca;
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
