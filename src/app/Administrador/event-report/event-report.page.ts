import { Component, OnInit } from '@angular/core';
import { Ievent } from 'src/app/interfaces/ievent';
import { Router } from '@angular/router';
import { ServiceService } from '../../services/service.service';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

@Component({
  selector: 'app-event-report',
  templateUrl: './event-report.page.html',
  styleUrls: ['./event-report.page.scss'],
})
export class EventReportPage implements OnInit {

  eventos: Ievent[];
  fecha: any;

  constructor(private router: Router, private service: ServiceService, private screenOrientation: ScreenOrientation) { }

  ngOnInit() {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
  }

  ionViewWillEnter() {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
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
    this.router.navigate(['/event-detail', this.eventos[i].id]);
  }

  obtener() {
    console.log(this.fecha);
    this.service.getEventByFecha(this.fecha).subscribe(data => {
      this.eventos = data;
    },
    (error) => {console.log(error);
    });
  }

}
