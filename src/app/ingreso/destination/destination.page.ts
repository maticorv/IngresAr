import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-destination',
  templateUrl: './destination.page.html',
  styleUrls: ['./destination.page.scss'],
})
export class DestinationPage implements OnInit {

  tipo: string;
  direccion: string;

  constructor() { }

  ngOnInit() {
  }

  imprimirTipo() {
    console.log(this.tipo);
  }
  imprimirDireccion() {
    console.log(this.direccion);
  }

}
