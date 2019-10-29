import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { Persona } from 'src/app/interfaces/persona';
import { Router } from '@angular/router';


@Component({
  selector: 'app-manage-guard',
  templateUrl: './manage-guard.page.html',
  styleUrls: ['./manage-guard.page.scss'],
})
export class ManageGuardPage implements OnInit {
  guardias: Persona[];

  constructor(private service: ServiceService, private router: Router) { }

  ngOnInit() {
    this.getGuardias();
  }

  ionViewWillEnter() {
    this.getGuardias();
  }

  getGuardias() {
    this.service.getPersonaRol('ROLE_GUARDIA').subscribe(data => {this.guardias = data; } );
  }

  crearGuardia() {
    this.router.navigateByUrl('/search-guard');
  }

}
