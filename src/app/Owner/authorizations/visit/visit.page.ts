import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IQr } from '../../../interfaces/iqr';
import { ServiceService } from '../../../services/service.service';

@Component({
  selector: 'app-visit',
  templateUrl: './visit.page.html',
  styleUrls: ['./visit.page.scss'],
})
export class VisitPage implements OnInit {

  qrs = [];

  constructor(private router: Router, private service: ServiceService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.ObtenerQrs();
  }

  generarAutorizacion() {
    this.router.navigateByUrl('/generate-qr');
  }

  ObtenerQrs() {
    this.service.getQR().subscribe(data => {
      const hoy = new Date();
      data.forEach(element => {
        // tslint:disable-next-line: max-line-length
        if (new Date(element.fechaFinQR) >= hoy && element.tipoVisira === 'visita') {
          this.qrs.push(element);
        }
      });
    },
    (error) => {console.log(error);
    });
    console.log(this.qrs);
  }

}
