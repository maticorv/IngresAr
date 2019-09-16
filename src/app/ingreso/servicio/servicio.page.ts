import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.page.html',
  styleUrls: ['./servicio.page.scss'],
})
export class ServicioPage implements OnInit {
  empresa;

  empresas = [
    {
      nombre: 'Supercanal'
    },
    {
      nombre: 'Direct TV'
    },
    {
      nombre: 'Edemsa'
    }];

  constructor() { }

  ngOnInit() {
  }
  selected(value: string) {
    console.log(value);
    // this.empresa = value[`detail`].value;
    // console.log(this.vehiculos[this.auto]);

  }

  Imprimir() {
    console.log(this.empresa);
  }

}
