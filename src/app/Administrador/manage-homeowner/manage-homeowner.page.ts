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
  authorities = [
    'ROLE_USER'
];

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

  borrar(i) {
    // tslint:disable-next-line: max-line-length
    this.service.cambiarRol(this.propietarios[i].personaUser.id, this.propietarios[i].personaUser.login, this.propietarios[i].personaUser.firstName, this.propietarios[i].personaUser.lastName, this.propietarios[i].personaUser.email, this.propietarios[i].personaUser.imageUrl, this.propietarios[i].personaUser.activated, this.propietarios[i].personaUser.langKey, this.propietarios[i].personaUser.createdBy, this.propietarios[i].personaUser.createdDate, this.propietarios[i].personaUser.lastModifiedBy, this.propietarios[i].personaUser.lastModifiedDate, this.authorities).subscribe(data => {
      console.log(data);
      this.getPropietarios();
    },
    (error) => {console.log(error);
    });
  }

}
