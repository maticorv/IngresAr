import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.page.html',
  styleUrls: ['./authorization.page.scss'],
})
export class AuthorizationPage implements OnInit {

  constructor() { }

  i: string;
  dni: string;

  persona = [
    {
      nombre: 'Pedro'
    },
    {
      nombre: 'Jose'
    },
    {
      nombre: 'Silvia'
    }
  ];

  ngOnInit() {
  }

  imprimir() {
    console.log(this.i);
    console.log(this.dni);
  }

}
