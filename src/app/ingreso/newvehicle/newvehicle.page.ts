import { Component, OnInit } from '@angular/core';
import { Calendar } from '@ionic-native/calendar/ngx';
import { ServiceService } from '../../services/service.service';
import { Router } from '@angular/router';


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
  idMarca: number;
  constructor(private calendar: Calendar, private service: ServiceService, private router: Router) {
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

  getMarca() {
    this.service.getMarca().subscribe(data => {
      console.log(data);
    },
    (error) => { console.log(error);
    });
  }

  getModelo() {
    this.service.getModelo(this.idMarca).subscribe(data => {
      console.log(data);
    },
    (error) => { console.log(error);
    });
  }

  getColor() {
    this.service.getColor().subscribe( data => {
      console.log(data);
    },
    (error) => { console.log(error);
    });
  }

  getSeguro() {
    this.service.getSeguro().subscribe(data => {
      console.log(data);
    },
    (error) => { console.log(error);
    });
  }

}
