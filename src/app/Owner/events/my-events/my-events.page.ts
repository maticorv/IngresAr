import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { Router } from '@angular/router';
import { Iaccount } from '../../../interfaces/account';
import { Persona } from '../../../interfaces/persona';
import { Ievent } from '../../../interfaces/ievent';

@Component({
  selector: 'app-my-events',
  templateUrl: './my-events.page.html',
  styleUrls: ['./my-events.page.scss'],
})
export class MyEventsPage implements OnInit {

  constructor(private service: ServiceService, private router: Router) { }
  account: Iaccount;
  persona: Persona;
  eventos: Ievent[];

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.getAccount();
  }
  getAccount() {
    this.service.account().subscribe((account) => {
      this.account = account;
      this.service.getPersonUser(this.account.id).subscribe((persona) => {
        this.persona = persona;
        this.service.getMyEvents(this.persona.id).subscribe( eventos => {
          this.eventos = eventos;
        }, (error) => {

        });
      }, (error) => {

      });
    }, (error) => {

    }
    );
  }

  Eliminar(i: number) {
    this.service.deleteEvent(this.eventos[i].id).subscribe(() => {
      this.eventos.splice(i, 1);

    }, (error) => { }

    );
    console.log(this.eventos);
  }

}
