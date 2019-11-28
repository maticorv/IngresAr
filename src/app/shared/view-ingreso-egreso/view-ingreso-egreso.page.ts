import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from 'src/app/services/service.service';
import { IPlanillaIngresoEgreso } from '../../interfaces/planilla-ingreso-egreso';

@Component({
  selector: 'app-view-ingreso-egreso',
  templateUrl: './view-ingreso-egreso.page.html',
  styleUrls: ['./view-ingreso-egreso.page.scss'],
})
export class ViewIngresoEgresoPage implements OnInit {

  planilla: IPlanillaIngresoEgreso;

  constructor(private activatedRoute: ActivatedRoute, private service: ServiceService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.service.getPlanillaIngresoEgresoByID(this.activatedRoute.snapshot.params.id).subscribe( data => {
      this.planilla = data;
      console.log(data);
    },
    (error) => {
      console.log(error);
    });
  }

  ionViewWillLeave() {
    this.planilla = null;
  }

}
