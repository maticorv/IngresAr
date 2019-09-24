import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service';

@Component({
  selector: 'app-planilla-ingreso-egreso',
  templateUrl: './planilla-ingreso-egreso.page.html',
  styleUrls: ['./planilla-ingreso-egreso.page.scss'],
})
export class PlanillaIngresoEgresoPage implements OnInit {

  constructor(private service: ServiceService) { }

  planiallaIngresoEgreso: any;

  ngOnInit() {
    this.getPlanillaIngresoEgreso();
  }

  getPlanillaIngresoEgreso() {
    this.service.getHistorialIngresoEgreso().subscribe(data => this.planiallaIngresoEgreso = data);
  }
}
