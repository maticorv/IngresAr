import { Component, OnInit } from '@angular/core';
import { PlanillaAcompaniante } from '../../../classes/planilla-acompaniante';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-planilla-acompaniante',
  templateUrl: './view-planilla-acompaniante.page.html',
  styleUrls: ['./view-planilla-acompaniante.page.scss'],
})
export class ViewPlanillaAcompaniantePage implements OnInit {

  planillaAcompaniante = [];

  constructor(private acompaniante: PlanillaAcompaniante, private router: Router) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.planillaAcompaniante = this.acompaniante.planillaAcompaniante;
  }

  ionViewWillLeaver() {
    this.planillaAcompaniante = this.acompaniante.planillaAcompaniante;
    this.planillaAcompaniante = [];
    this.acompaniante.planillaAcompaniante = [];
  }

  borrar(i) {
    this.planillaAcompaniante.splice(i, 1);
  }

  volver() {
    this.router.navigateByUrl('/authorization');
  }

}
