import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ievent } from '../../interfaces/ievent';
import { ServiceService } from '../../services/service.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.page.html',
  styleUrls: ['./event-detail.page.scss'],
})
export class EventDetailPage implements OnInit {

  evento: Ievent;

  constructor(private activatedRouter: ActivatedRoute, private service: ServiceService) { }

  ngOnInit() {
    this.getEvent();
  }

  getEvent() {
    this.service.getEventById(this.activatedRouter.snapshot.params.id).subscribe(data => {
      this.evento = data;
    },
    (error) => { console.log(error);
    });
  }

}
