import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../../services/service.service';
import { IEspacioComun } from 'src/app/interfaces/espacio-comun';
import { Router } from '@angular/router';

@Component({
  selector: 'app-places',
  templateUrl: './places.page.html',
  styleUrls: ['./places.page.scss'],
})
export class PlacesPage implements OnInit {

  espacioComun: IEspacioComun;

  constructor(private service: ServiceService, private router: Router) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.obtenerEspacioComun();
  }

  obtenerEspacioComun() {
    this.service.getAllEspacioComun().subscribe(data => {
      this.espacioComun = data;
      console.log(this.espacioComun);
    },
    (error) => {console.log(error);
    });
  }
  onClick(i) {
    this.router.navigate(['/place', i]);
  }

}
