import { Component, OnInit } from '@angular/core';
import { Tipovisita } from 'src/app/classes/tipovisita';
import { Router } from '@angular/router';

@Component({
  selector: 'app-typeofvisit',
  templateUrl: './typeofvisit.page.html',
  styleUrls: ['./typeofvisit.page.scss'],
})
export class TypeofvisitPage implements OnInit {

  constructor( private tipovisita: Tipovisita, private router: Router) { }

  ngOnInit() {
  }

  visita() {
    this.tipovisita.nombreTipoVisita = 'visita';
    this.router.navigateByUrl('/transport');
  }

  servicio() {
    this.tipovisita.nombreTipoVisita = 'servicio';
    this.router.navigateByUrl('/servicio');
  }

}
