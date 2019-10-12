import { Component, OnInit, ViewChild } from '@angular/core';
import { IMensaje } from 'src/app/interfaces/mensaje';
import { Iaccount } from 'src/app/interfaces/account';
import { ServiceService } from 'src/app/services/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-message',
  templateUrl: './message.page.html',
  styleUrls: ['./message.page.scss'],
})
export class MessagePage implements OnInit {
  mensajes: IMensaje[];
  chatMessage: string;
  account: Iaccount;
  Users: Iaccount[];

  constructor(private service: ServiceService, private router: Router) { }
  ngOnInit() {
    this.service.account().subscribe(resp => this.account = resp);
    this.service.getUsers().subscribe(data => {
      this.Users = data;
      console.log(data);
    });
  }
  onClick(id: number) {
    this.router.navigate(['/message', id]);
  }

}
