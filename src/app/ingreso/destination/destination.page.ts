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
  // guarda la manzana, casa y redirige a la siguiente pagina
  destination() {
    this.destino.casa = this.casa;
    this.destino.manzana = this.manzana;
    this.router.navigateByUrl('/typeofvisit');
  }

}
