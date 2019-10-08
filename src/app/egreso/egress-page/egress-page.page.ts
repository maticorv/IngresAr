import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { PlanillaEgreso } from '../../classes/planillaEgreso';
import { Personas } from '../../classes/persona';

@Component({
  selector: 'app-egress-page',
  templateUrl: './egress-page.page.html',
  styleUrls: ['./egress-page.page.scss'],
})
export class EgressPagePage implements OnInit {

  constructor(private service: ServiceService, private persona: Personas) { }

  planillaEgreso: PlanillaEgreso;

  ngOnInit() {
    this.getPlanillaEgreso();
  }

  getPlanillaEgreso() {
    this.service.getPlanillaEgreso(this.persona.dniPersona).subscribe(data => {
      this.planillaEgreso = data;
      console.log(this.planillaEgreso);
    },
    (error) => {console.log(error);
    });
  }

  postPlanillaEgreso() {
    this.service.postPlanillaEgreso(this.planillaEgreso).subscribe(data => {
      console.log(data);
    },
    (error) => {console.log(error);
    });
  }

}
