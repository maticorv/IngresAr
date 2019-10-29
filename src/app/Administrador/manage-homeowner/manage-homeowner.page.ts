import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { Persona } from 'src/app/interfaces/persona';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-homeowner',
  templateUrl: './manage-homeowner.page.html',
  styleUrls: ['./manage-homeowner.page.scss'],
})
export class ManageHomeownerPage implements OnInit {
  propietarios: Persona[];

  constructor(private service: ServiceService, private router: Router) { }

  ngOnInit() {
    this.getPropietarios();
  }

  ionViewWillEnter() {
    this.getPropietarios();
  }

  getPropietarios() {
    this.service.getPersonaRol('ROLE_PROPIETARIO').subscribe(data => {this.propietarios = data; } );
  }

  crearPropietario() {
    this.router.navigateByUrl('/search-homeowner');
  }
}
