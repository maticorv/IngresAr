import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceService } from 'src/app/services/service.service';
import { IEspacioComun } from 'src/app/interfaces/espacio-comun';
import { ChangeDetectionStrategy } from '@angular/core';
import { addDays, addHours } from 'date-fns';
import { CalendarEvent, CalendarEventTimesChangedEvent } from 'angular-calendar';
import { Subject } from 'rxjs';
import { Iaccount } from '../../../interfaces/account';
import { Persona } from '../../../interfaces/persona';
import { IFriendsList } from 'src/app/interfaces/ifriends-list';
import { Ievent } from 'src/app/interfaces/ievent';
import { IDetalleEvento } from '../../../interfaces/idetalle-evento';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-newevent',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './newevent.page.html',
  styleUrls: ['./newevent.page.scss'],
})
export class NeweventPage implements OnInit {
  account: Iaccount;
  persona: Persona;
  evento: Ievent = {
    id: null,
    nombreEvento: null,
    fecha: null,
    horaInicio:  new Date(),
    horaFin: addHours(new Date(), 1),
    eventoEspacio: null,
    eventoPersona: null,
    eventoDetalles: null
  };
  nombre: string;
  @Output() viewDateChange: EventEmitter<Date> = new EventEmitter();
  @Output() viewChange: EventEmitter<string> = new EventEmitter();
  id: number;
  espacioComun: IEspacioComun;
  myDate: Date;
  listas: IFriendsList[];
  lists: [];
  view = 'day';
  viewDate: Date = new Date();
  dayStartHour: Date;
  dayEndHour: Date;
  colors: any = {
    red: {
      primary: '#ad2121',
      secondary: '#FAE3E3'
    },
    blue: {
      primary: '#1e90ff',
      secondary: '#D1E8FF'
    },
    yellow: {
      primary: '#e3bc08',
      secondary: '#FDF1BA'
    }
  };

  events: CalendarEvent[] = [
    {
      title: 'Desliza para crear tu evento',
      color: this.colors.yellow,
      start: new Date(),
      end: addHours(new Date(), 1), // an end date is always required for resizable events to work
      resizable: {
        beforeStart: true, // this allows you to configure the sides the event is resizable from
        afterEnd: true
      }
    },
  ];

  refresh: Subject<any> = new Subject();

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private service: ServiceService) {
    this.evento.horaInicio = new Date();
    this.evento.horaFin = addHours(new Date(), 1);
   }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params.id;
    this.getEspacioComun();
    this.getAccount();
    this.ObtenerEventos();
  }
  getAccount() {
    this.service.account().subscribe((resp) => {
      this.account = resp;
      this.getPersona();
    }, (error) => {}
    );
  }
  getPersona() {
    this.service.getPersonUser(this.account.id).subscribe((resp) => {
      this.persona = resp;
      this.getListas(resp.dniPersona);
      this.evento[`eventoPersona`] = resp;
    }, (error) => {}
    );
  }
  getListas(dni) {
    this.service.getListaAmigos(dni).subscribe( data => {
      this.listas = data;
    }, (error) => {}
    );
  }
  getEspacioComun() {
    this.service.getEspacioComun(this.id).subscribe(data => {
      this.espacioComun = data;
      console.log(this.espacioComun);
      this.evento.eventoEspacio = this.espacioComun;
    }, (error) => {}
    );
  }
  SetDate() {
    console.log(this.viewDate);
    let hoy = new Date(this.viewDate);
    hoy = new Date(hoy.setHours(8, 0, 0, 0));
    this.events.push(
      {
        title: this.nombre,
        color: this.colors.blue,
        start: hoy,
        end: addHours(hoy, 1),
      });
    this.refresh.next();
  }

  ObtenerEventos() {
    this.service.getEventByEspacio(this.id).subscribe( data => {
      for (const iterator of data) {
        this.events.push(
          {
            title: iterator.nombreEvento,
            color: this.colors.blue,
            start: new Date(iterator.horaInicio),
            end: new Date(iterator.horaFin)
          }
        );
      }
      this.refresh.next();
    }, (error: any) => {}
    );
  }
  viewChangeemit(view: string) {
    this.view = view;
  }
  eventTimesChanged({ event, newStart, newEnd
  }: CalendarEventTimesChangedEvent): void {
    console.log('event :', event);
    event.start = newStart;
    event.end = newEnd;
    this.evento.horaInicio = new Date(event.start);
    this.evento.horaFin = new Date(event.end);
    this.refresh.next();
  }

  guardarEvento() {
    Swal.fire({
      allowOutsideClick: false,
      showConfirmButton: false,
      type: 'info',
      text: 'Espere por favor...',
    });
    console.log('this.lists :', this.lists);
    this.evento.fecha = new Date();
    this.evento.nombreEvento = this.nombre;
    const detalles: IDetalleEvento[] = [];
    this.evento.nombreEvento = this.nombre;
    for (const iterator of this.lists) {
      console.log(this.listas[iterator]);
      for (const iterator1 of this.listas[iterator].amigos) {
        console.log(iterator1);
        const detalleEvento = {
          id: null,
          Amigosevento: null,
          detallePersonaEvento: iterator1,
        };
        this.service.postDetalleEvento(detalleEvento).subscribe( detalle => {
          detalles.push(detalle);
        }, (error) => {}
        );
      }
    }
    this.evento.eventoDetalles = detalles;
    this.service.postEvento(this.evento).subscribe(data => {
      console.log('data 1:', data);
      data.eventoDetalles = detalles;
      console.log('data 2:', data);
      this.service.putEvento(data).subscribe(dat => {
        console.log(dat);
        Swal.fire({
          position: 'center',
          type: 'success',
          title: 'El evento ha sido añadido',
          showConfirmButton: false,
          timer: 1500
        }).then((result) => {
          this.router.navigateByUrl('/menu-owner');
      });
      },
      (error) => {
        console.log(error);
      });
    }, (error) => {
      Swal.fire({
        type: 'error',
        title: 'Error al crear evento',
        confirmButtonText: 'Aceptar',
      });
    }
    );
  }
  save() {
    this.evento.nombreEvento = this.nombre;
    console.log(this.evento);
  }
  selectedItems() {
    console.log(this.lists);
  }

}
