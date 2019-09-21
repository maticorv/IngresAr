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
    this.destino.tipoDestino = this.tipo;
    this.destino.lote = this.direccion;
    // if (this.tipo === 'lote') {
    //   this.destino.lote = this.direccion;
    // } else {
    //   this.destino.apellido = this.direccion;
    // }
    this.router.navigateByUrl('/typeofvisit');
  }

}
