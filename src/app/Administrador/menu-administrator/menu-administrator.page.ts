import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-administrator',
  templateUrl: './menu-administrator.page.html',
  styleUrls: ['./menu-administrator.page.scss'],
})
export class MenuAdministratorPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  mostrar() {
    this.router.navigateByUrl('/profile');
  }

  irANormas() {
    this.router.navigateByUrl('/norms');
  }

  irAAdministrarEspCom() {
    this.router.navigateByUrl('/manage-common-space');
  }

  irAAdminGuardias() {
    this.router.navigateByUrl('/manage-guard');
  }

  irAAdminPropietario() {
    this.router.navigateByUrl('/manage-homeowner');
  }

  irANovedades() {
    this.router.navigateByUrl('/news');
  }

  irAReportes() {
    this.router.navigateByUrl('/report/evento');
  }
  Backup() {
    this.router.navigateByUrl('/database');
  }


}
