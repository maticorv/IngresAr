import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Destino } from 'src/app/classes/destino';

@Component({
  selector: 'app-destination',
  templateUrl: './destination.page.html',
  styleUrls: ['./destination.page.scss'],
})
export class DestinationPage implements OnInit {

  tipo: string;
  direccion: string;

  constructor(private router: Router, private destino: Destino) { }

  ngOnInit() {
  }

  destination() {
    // this.destino.tipoDestino = this.tipo;
    this.destino.casaDomicilio = this.direccion;
    this.destino.id = 8;
    this.router.navigateByUrl('/typeofvisit');
  }

}
