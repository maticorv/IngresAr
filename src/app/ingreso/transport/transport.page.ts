import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-transport',
  templateUrl: './transport.page.html',
  styleUrls: ['./transport.page.scss'],
})
export class TransportPage implements OnInit {

  auto: number;

  vehiculos = [
    {
      marca: 'Ford',
      modelo: 'Focus',
      patente: '01x01',
    },
    {
      marca: 'Chevrolet',
      modelo: 'Astra',
      patente: '01x02',
    },
    {
      marca: 'Peugeot',
      modelo: '207',
      patente: '01x03',
    }
  ];

  constructor() { }

  ngOnInit() {
  }

  siguiente(form: NgForm) {
    console.log(form);
  }
  selected(value: string) {
    // console.log( value[`detail`].value);
    this.auto = value[`detail`].value;
    console.log(this.vehiculos[this.auto]);

  }

}
