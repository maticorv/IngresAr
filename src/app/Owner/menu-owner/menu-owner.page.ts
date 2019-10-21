import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-owner',
  templateUrl: './menu-owner.page.html',
  styleUrls: ['./menu-owner.page.scss'],
})
export class MenuOwnerPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  irAutorizacionPrevia() {
    this.router.navigateByUrl('/authorizations/resident');
  }

  IrEventos() {
    this.router.navigateByUrl('/events/places');
  }

  irPorteria() {
    this.router.navigateByUrl('porteria');
  }

  irInformacionUtil() {
    this.router.navigateByUrl('/information/file');
  }

  perfilOwner() {
    this.router.navigateByUrl('/profile');
  }

}
