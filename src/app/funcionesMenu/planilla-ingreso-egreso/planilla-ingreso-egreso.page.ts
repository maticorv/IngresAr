import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { IPlanillaIngresoEgreso } from 'src/app/interfaces/planilla-ingreso-egreso';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

@Component({
  selector: 'app-planilla-ingreso-egreso',
  templateUrl: './planilla-ingreso-egreso.page.html',
  styleUrls: ['./planilla-ingreso-egreso.page.scss'],
})
export class PlanillaIngresoEgresoPage implements OnInit {

  fechaDesde: string;
  fechaHasta: string;
  planilla: IPlanillaIngresoEgreso[] = [];
  planiallaIngresoEgreso: IPlanillaIngresoEgreso[];

  constructor(private service: ServiceService, private screenOrientation: ScreenOrientation) { }


  ngOnInit() {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
  }

  ionViewWillEnter() {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
    this.fechaDesde = new Date( new Date().setHours(0, 0, 0, 0)).toString();
    this.fechaHasta = new Date( new Date().setHours(23, 59, 59, 0)).toString();
    this.getPlanillaIngresoEgreso();
  }

  ionViewWillLeave() {
    this.planilla = null;
    this.planiallaIngresoEgreso = null;
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
