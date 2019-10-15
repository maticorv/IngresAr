import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { Persona } from 'src/app/interfaces/persona';


@Component({
  selector: 'app-manage-guard',
  templateUrl: './manage-guard.page.html',
  styleUrls: ['./manage-guard.page.scss'],
})
export class ManageGuardPage implements OnInit {
  guardias: Persona[];

  constructor(private service: ServiceService) { }

  ngOnInit() {
    this.getGuardias();
  }
  getGuardias() {
    this.service.getPersonaRol('ROLE_GUARDIA').subscribe(data => {this.guardias = data;  } );
  }

}
