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
    console.log('Funciona');
  }

  irANormas() {
    this.router.navigateByUrl('/norms');
  }

}
