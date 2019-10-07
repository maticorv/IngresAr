import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  constructor(private service: ServiceService, private router: Router) { }

  ngOnInit() {}

  cerrarSesion() {
    this.service.borrarToken();
    this.router.navigateByUrl('/login');
  }

  planillaIngresoEgreso() {
    this.router.navigateByUrl('/planilla-ingreso-egreso');
  }

  personasDentroEstablecimiento() {
    this.router.navigateByUrl('/personas-dentro-establecimiento');
  }
  mensajes() {
    this.router.navigateByUrl('/message');
  }
  novedades() {
    this.router.navigateByUrl('/news');
  }
  reportes() {
    this.router.navigateByUrl('/reports');
  }

}
