import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.page.html',
  styleUrls: ['./servicio.page.scss'],
})
export class ServicioPage implements OnInit {

  empresa = [
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

}
