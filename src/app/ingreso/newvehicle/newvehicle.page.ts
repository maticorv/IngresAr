import { Component, OnInit } from '@angular/core';
import { Calendar } from '@ionic-native/calendar/ngx';


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
        },{
          nombre: 'Federacion Patronal'
          },{
            nombre: 'Rivadavia Seguros'
            },
      ]
  constructor(private calendar: Calendar) { 
    this.calendar.createCalendar('MyCalendar').then(
      (msg) => { console.log(msg); },
      (err) => { console.log(err); }
    );
  }

  ngOnInit() {
  }

}
