import { Component, OnInit } from '@angular/core';
import { IPlanillaIngresoEgreso } from 'src/app/interfaces/planilla-ingreso-egreso';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-personas-dentro-establecimiento',
  templateUrl: './personas-dentro-establecimiento.page.html',
  styleUrls: ['./personas-dentro-establecimiento.page.scss'],
})
export class PersonasDentroEstablecimientoPage implements OnInit {

  constructor(private service: ServiceService) { }

  planiallaIngresoEgreso: IPlanillaIngresoEgreso;

  ngOnInit() {
    this.getPlanillaDentroEstablecimiento();
  }

  getPlanillaDentroEstablecimiento() {
    this.service.getPersonasDentroEstablecimiento().subscribe(data => {
      this.planiallaIngresoEgreso = data;
      console.log(this.planiallaIngresoEgreso);
    },
    (error) => {console.log(error);
    });
  }

}
