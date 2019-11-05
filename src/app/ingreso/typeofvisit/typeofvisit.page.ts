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
  // redirige a la pantalla de visita y setea el tipo de visita
  visita() {
    this.tipovisita.nombreTipoVisita = 'visita';
    this.router.navigateByUrl('/transport');
  }
 // redirige a la pantalla de servicio y setea el tipo de visita
  servicio() {
    this.tipovisita.nombreTipoVisita = 'servicio';
    this.router.navigateByUrl('/servicio');
  }

}
