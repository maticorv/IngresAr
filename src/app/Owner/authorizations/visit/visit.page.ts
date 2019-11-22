import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../../../services/service.service';

@Component({
  selector: 'app-visit',
  templateUrl: './visit.page.html',
  styleUrls: ['./visit.page.scss'],
})
export class VisitPage implements OnInit {

  qrs = [];
  qrListo = false;

  constructor(private router: Router, private service: ServiceService) { }

  ngOnInit() {
    // this.ObtenerQrs();
  }

  ionViewWillLeave() {
    this.qrs = [];
    this.qrListo = false;
  }

  ionViewWillEnter() {
    this.ObtenerQrs();
  }

  generarAutorizacion() {
    this.router.navigate(['/generate-qr', 'visita']);
  }

  ObtenerQrs() {
    this.service.account().subscribe(data => {
      this.service.getPersonUser(data.id).subscribe(pers => {
        this.service.getDomicilioById(pers.id).subscribe(dom => {
          this.service.getQRByIdPerson(dom.id).subscribe(qr => {
            console.log('qr :', qr);
            const hoy = new Date();
            qr.forEach(element => {
              // tslint:disable-next-line: max-line-length
              if (new Date(element.fechaFinQR) >= hoy && element.tipoVisira === 'visita') {
                this.qrs.push(element);
              }
            });
            this.qrListo = true;
          },
          (error) => {console.log(error);
          });
          console.log('QRS', this.qrs);
        },
        (error) => {console.log(error);
        });
      },
      (error) => {console.log(error);
      });
    },
    (error) => {console.log(error);
    });
  }

}
