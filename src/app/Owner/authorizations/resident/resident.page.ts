import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../../services/service.service';
import { Persona } from '../../../interfaces/persona';

@Component({
  selector: 'app-resident',
  templateUrl: './resident.page.html',
  styleUrls: ['./resident.page.scss'],
})
export class ResidentPage implements OnInit {

  persona: Persona;

  constructor(private service: ServiceService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.obtenerResidentes();
  }

  obtenerResidentes() {
    this.service.account().subscribe(data => {
      console.log(data);
      this.service.getPersonUser(data.id).subscribe(pers => {
        this.service.getPersonasDomicilioByIdPers(pers.id).subscribe(result => {
          this.persona = result;
          console.log(this.persona);
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
