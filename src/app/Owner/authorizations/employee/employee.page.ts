import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../../../services/service.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.page.html',
  styleUrls: ['./employee.page.scss'],
})
export class EmployeePage implements OnInit {

  qrs = [];

  constructor(private router: Router, private service: ServiceService) { }

  ngOnInit() {
    // this.ObtenerQrs();
  }

  ionViewWillEnter() {
    this.ObtenerQrs();
  }

  ionViewWillLeave() {
    this.qrs = [];
  }

  generarAutorizacion() {
    this.router.navigateByUrl('/generate-qr');
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
              console.log('element :', element);
              if (new Date(element.fechaFinQR) >= hoy && element.tipoVisira === 'servicio') {
                this.qrs.push(element);
              }
            });
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
