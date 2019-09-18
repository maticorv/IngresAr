import { Component, OnInit } from '@angular/core';
import { Calendar } from '@ionic-native/calendar/ngx';
import { ServiceService } from '../../services/service.service';


@Component({
  selector: 'app-newvehicle',
  templateUrl: './newvehicle.page.html',
  styleUrls: ['./newvehicle.page.scss'],
})
export class NewvehiclePage implements OnInit {
  tipo = [
    {
      nombre: 'Camioneta'
    },
    {
      nombre: 'Auto'
    },
    {
      nombre: 'Camion'
    }];

    marca = [
      {
        nombre: 'Toyota'
      },
      {
        nombre: 'Fiat'
      },
      {
        nombre: 'Peugeot'
      }];
      aseguradora = [
        {
        nombre: 'Sancor Seguros'
        }, {
          nombre: 'Federacion Patronal'
          }, {
            nombre: 'Rivadavia Seguros'
            },
      ];
  constructor(private calendar: Calendar, private service: ServiceService) {
    this.calendar.createCalendar('MyCalendar').then(
      (msg) => { console.log(msg); },
      (err) => { console.log(err); }
    );
  }

  ngOnInit() {
  }

  postVehiculo() {
    this.service.postVehiculo('SSSaaa', null, null, null, null, null, null).subscribe(data => console.log(data));
    console.log('1');
  }

}
