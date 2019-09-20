import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ServiceService } from '../../services/service.service';
import { Personas } from 'src/app/classes/persona';
import { Vehiculo } from '../../interfaces/vehiculo';

@Component({
  selector: 'app-transport',
  templateUrl: './transport.page.html',
  styleUrls: ['./transport.page.scss'],
})
export class TransportPage implements OnInit {

  auto: number;

  vehiculo: Vehiculo;
  // vehiculos = [
  //   {
  //     marca: 'Ford',
  //     modelo: 'Focus',
  //     patente: '01x01',
  //   },
  //   {
  //     marca: 'Chevrolet',
  //     modelo: 'Astra',
  //     patente: '01x02',
  //   },
  //   {
  //     marca: 'Peugeot',
  //     modelo: '207',
  //     patente: '01x03',
  //   }
  // ];

  constructor(private service: ServiceService, private personas: Personas) { }

  ngOnInit() {
    this.getVehiculo();
  }

  siguiente(form: NgForm) {
    console.log(form);
  }
  selected(value: string) {
    // console.log( value[`detail`].value);
    this.auto = value[`detail`].value;
    // console.log(this.vehiculos[this.auto]);
  }

  getVehiculo() {
    this.service.getVechiculo(this.personas.dniPersona).subscribe(dato => {
      console.log(dato);
    },
    (error) => {
      console.log(error);
    });
  }

}
