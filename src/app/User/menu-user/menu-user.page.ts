import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-user',
  templateUrl: './menu-user.page.html',
  styleUrls: ['./menu-user.page.scss'],
})
export class MenuUserPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  mostrar() {
    this.router.navigateByUrl('/profile');
  }
  autorizaciones() {
    this.router.navigateByUrl('/profile');
  }
  vehicles() {
    this.router.navigateByUrl('/vehicles2');
  }


}
