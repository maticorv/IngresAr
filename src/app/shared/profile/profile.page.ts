import { Component, OnInit } from '@angular/core';
import { Iaccount } from 'src/app/interfaces/account';
import { ServiceService } from 'src/app/services/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  account: Iaccount;

  constructor(private service: ServiceService, private router: Router) { }

  ngOnInit() {
    this.service.account().subscribe(resp => {
      this.account = resp;
      console.log(resp);
    });
  }
  cerrarSesion() {
    this.service.borrarToken();
    this.router.navigateByUrl('/login');
  }

}
