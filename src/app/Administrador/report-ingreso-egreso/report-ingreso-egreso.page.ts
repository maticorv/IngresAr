import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { IPlanillaIngresoEgreso } from 'src/app/interfaces/planilla-ingreso-egreso';

@Component({
  selector: 'app-report-ingreso-egreso',
  templateUrl: './report-ingreso-egreso.page.html',
  styleUrls: ['./report-ingreso-egreso.page.scss'],
})
export class ReportIngresoEgresoPage implements OnInit {

  fechaDesde: string;
  fechaHasta: string;
  fechaMax: string;
  planilla: IPlanillaIngresoEgreso[] = [];
  planiallaIngresoEgreso: IPlanillaIngresoEgreso[];

  constructor(private service: ServiceService) { }


  ngOnInit() {
    this.fechaDesde = new Date( new Date().setHours(0, 0, 0, 0)).toString();
    this.fechaHasta = new Date( new Date().setHours(23, 59, 59, 0)).toString();
    this.fechaMax = new Date( new Date().setHours(23, 59, 59, 0)).toString();
    this.getPlanillaIngresoEgreso();
  }

  getPlanillaIngresoEgreso() {
    this.service.getHistorialIngresoEgreso().subscribe(data => {
      this.planiallaIngresoEgreso = data;
      this.planilla = data;
      console.log(this.planiallaIngresoEgreso);
    },
    (error) => {console.log(error);
    });
  }

  filtrar() {
    const aux = [];
    this.planiallaIngresoEgreso.forEach(element => {
      if (element.fechaEgreso === null) {
        if (new Date(element.fechaIngreso) >= new Date(this.fechaDesde) && new Date(element.fechaIngreso) <=  new Date(this.fechaHasta)) {
          aux.push(element);
          console.log('entro a igual a nulo');
        }
      } else {
        if (new Date(element.fechaIngreso) >= new Date(this.fechaDesde) && new Date(element.fechaEgreso) <= new Date(this.fechaHasta)) {
          aux.push(element);
          console.log('this entro al distinto de nulo');
        }
      }
    });
    this.planilla = aux;
  }

}
