import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceService } from 'src/app/services/service.service';
import { IEspacioComun } from 'src/app/interfaces/espacio-comun';

@Component({
  selector: 'app-newevent',
  templateUrl: './newevent.page.html',
  styleUrls: ['./newevent.page.scss'],
})
export class NeweventPage implements OnInit {
  id: number;
  espacioComun: IEspacioComun;
  myDate: Date;
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private service: ServiceService) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params.id;
    this.getEspacioComun();
  }
  getEspacioComun() {
    this.service.getEspacioComun(this.id).subscribe(data => {
      this.espacioComun = data;
    });
  }
  ObtenerEventos() {
    console.log(this.myDate);
    const hoy = this.myDate;
    this.service.getEventByFechaAndById(hoy, this.id).subscribe( data => {

    }, (error: any) => {

    }
    );
  }

}
