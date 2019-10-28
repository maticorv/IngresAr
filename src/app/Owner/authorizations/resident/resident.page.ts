import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../../services/service.service';

@Component({
  selector: 'app-resident',
  templateUrl: './resident.page.html',
  styleUrls: ['./resident.page.scss'],
})
export class ResidentPage implements OnInit {

  constructor(private service: ServiceService) { }

  ngOnInit() {
  }

  obtenerResidentes() {
    this.service.account().subscribe(data => {
      this.service.getPersonUser(data.id).subscribe(pers => {
      },
      (error) => {console.log(error);
      });
    },
    (error) => {console.log(error);
    });
  }

}
