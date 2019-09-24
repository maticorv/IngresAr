import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { IPlanillaIngresoEgreso } from 'src/app/interfaces/planilla-ingreso-egreso';

@Component({
  selector: 'app-planilla-ingreso-egreso',
  templateUrl: './planilla-ingreso-egreso.page.html',
  styleUrls: ['./planilla-ingreso-egreso.page.scss'],
})
export class PlanillaIngresoEgresoPage implements OnInit {

  constructor(private service: ServiceService) { }

  planiallaIngresoEgreso: IPlanillaIngresoEgreso;

  ngOnInit() {
    this.getPlanillaIngresoEgreso();
  }

  getPlanillaIngresoEgreso() {
    this.service.getHistorialIngresoEgreso().subscribe(data => {
      this.planiallaIngresoEgreso = data;
      console.log(this.planiallaIngresoEgreso);
    },
    (error) => {console.log(error);
    });
  }
}
