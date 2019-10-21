import { Component, OnInit } from '@angular/core';
import { Ievent } from 'src/app/interfaces/ievent';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.page.html',
  styleUrls: ['./eventos.page.scss'],
})
export class EventosPage implements OnInit {

  eventos: Ievent;
  fecha: any;

  constructor(private router: Router, private service: ServiceService) { }

  ngOnInit() {
    this.getAllEvents();
  }

  getAllEvents() {
    this.service.getAllEvent().subscribe(data => {
      this.eventos = data;
      console.log(this.eventos);
    },
    (error) => {console.log(error);
    });
  }

  verEvento(i) {
    this.router.navigate(['/', this.eventos[i].id]);
  }

}
