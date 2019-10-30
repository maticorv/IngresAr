import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Iaccount } from '../../../interfaces/account';
import { Persona } from '../../../interfaces/persona';
import { IPlanillaIngresoEgreso } from '../../../interfaces/planilla-ingreso-egreso';

@Component({
  selector: 'app-records',
  templateUrl: './records.page.html',
  styleUrls: ['./records.page.scss'],
})
export class RecordsPage implements OnInit {
  account: Iaccount;
  persona: Persona;
  planillas: IPlanillaIngresoEgreso[];

  constructor(private service: ServiceService, private router: Router,
              private toastController: ToastController) { }

  ngOnInit() {
    this.getAccount();

  }
  getAccount() {
    this.service.account().subscribe((resp) => {
      this.account = resp;
      this.getPersona();
    }
    );
  }
  getPersona() {
    this.service.getPersonUser(this.account.id).subscribe((resp) => {
      this.persona = resp;
      this.service.getDomPersona(this.persona.id).subscribe(data => {
        this.service.getPlanillaIngresoEgresodom(data.casaDomicilio, data.manzanaDomicilio).subscribe(ret => {
          this.planillas = ret;
        });
      });
    });
  }
}
