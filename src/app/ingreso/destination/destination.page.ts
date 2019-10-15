import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Destino } from 'src/app/classes/destino';

@Component({
  selector: 'app-destination',
  templateUrl: './destination.page.html',
  styleUrls: ['./destination.page.scss'],
})
export class DestinationPage implements OnInit {

  casa: string;
  manzana: string;

  constructor(private router: Router, private destino: Destino) { }

  ngOnInit() {
  }

  destination() {
    // this.destino.tipoDestino = this.tipo;
    this.destino.casa = this.casa;
    this.destino.manzana = this.manzana;
    // this.destino.id = 1;
    this.router.navigateByUrl('/typeofvisit');
  }

}
