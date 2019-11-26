import { Component, OnInit } from '@angular/core';
import { IPlanillaIngresoEgreso } from 'src/app/interfaces/planilla-ingreso-egreso';
import { ServiceService } from 'src/app/services/service.service';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

@Component({
  selector: 'app-personas-dentro-establecimiento',
  templateUrl: './personas-dentro-establecimiento.page.html',
  styleUrls: ['./personas-dentro-establecimiento.page.scss'],
})
export class PersonasDentroEstablecimientoPage implements OnInit {

  constructor(private service: ServiceService, private screenOrientation: ScreenOrientation) { }

  planiallaIngresoEgreso: IPlanillaIngresoEgreso;

  ngOnInit() {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
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
