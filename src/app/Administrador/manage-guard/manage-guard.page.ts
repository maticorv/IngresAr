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
  authorities = [
    'ROLE_USER'
];

  constructor(private service: ServiceService, private router: Router) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getGuardias();
  }

  getGuardias() {
    this.service.getPersonaRol('ROLE_GUARDIA').subscribe(data => {
      this.guardias = data;
      console.log(this.guardias);
    },
    (error) => {console.log(error);
    });
  }

  crearGuardia() {
    this.router.navigateByUrl('/search-guard');
  }

  borrar(i) {
    // tslint:disable-next-line: max-line-length
    this.service.cambiarRol(this.guardias[i].personaUser.id, this.guardias[i].personaUser.login, this.guardias[i].personaUser.firstName, this.guardias[i].personaUser.lastName, this.guardias[i].personaUser.email, this.guardias[i].personaUser.imageUrl, this.guardias[i].personaUser.activated, this.guardias[i].personaUser.langKey, this.guardias[i].personaUser.createdBy, this.guardias[i].personaUser.createdDate, this.guardias[i].personaUser.lastModifiedBy, this.guardias[i].personaUser.lastModifiedDate, this.authorities).subscribe(data => {
      console.log(data);
      this.getGuardias();
    },
    (error) => {console.log(error);
    });
  }

}
