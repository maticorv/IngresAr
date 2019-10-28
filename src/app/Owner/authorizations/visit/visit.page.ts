import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-visit',
  templateUrl: './visit.page.html',
  styleUrls: ['./visit.page.scss'],
})
export class VisitPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  generarAutorizacion() {
    this.router.navigateByUrl('/generate-qr');
  }

}
