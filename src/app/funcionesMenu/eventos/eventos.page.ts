import { Component, OnInit } from '@angular/core';
import { Ievent } from 'src/app/interfaces/ievent';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/services/service.service';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.page.html',
  styleUrls: ['./eventos.page.scss'],
})
export class EventosPage implements OnInit {

  eventos = [];
  evento: Ievent[];
  fecha: string;
  fechaMin: string;

  constructor(private router: Router, private service: ServiceService, private screenOrientation: ScreenOrientation) { }

  ngOnInit() {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    this.getAllEvents();
    this.fecha = new Date(new Date().setHours(0, 0, 0, 0)).toString();
    this.fechaMin = new Date(new Date().setHours(0, 0, 0, 0)).toString();
  }

  ionViewWillEnter() {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    this.getAllEvents();
  }

  ionViewWillLeave() {
    this.eventos = [];
  }

  getAllEvents() {
    this.service.getAllEvent().subscribe(data => {
      console.log(data);
      this.evento = data;
      const hoy = new Date(new Date().setHours(0, 0, 0, 0));
      console.log(hoy);
      data.forEach(element => {
        if (new Date(element.fecha) >= hoy) {
          this.eventos.push(element);
        }
      });
    },
    (error) => {console.log(error);
    });
  }

  verEvento(i) {
    this.router.navigate(['/detalle-evento', this.eventos[i].id]);
  }

  filtrar() {
    const aux = [];
    const fecha = new Date(this.fecha);
    fecha.setDate( fecha.getDate() + 1);
    this.evento.forEach(element => {
      if (new Date(element.fecha) > new Date(this.fecha) && new Date(element.fecha) < fecha) {
        aux.push(element);
      }
    });
    this.eventos = aux;
  }

}
