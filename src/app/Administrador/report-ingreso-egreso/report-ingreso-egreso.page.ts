import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { IPlanillaIngresoEgreso } from 'src/app/interfaces/planilla-ingreso-egreso';

@Component({
  selector: 'app-report-ingreso-egreso',
  templateUrl: './report-ingreso-egreso.page.html',
  styleUrls: ['./report-ingreso-egreso.page.scss'],
})
export class ReportIngresoEgresoPage implements OnInit {

  constructor(private service: ServiceService) { }

  planiallaIngresoEgreso: IPlanillaIngresoEgreso[];

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
