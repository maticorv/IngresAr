import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Persona } from '../../../interfaces/persona';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {
  propietarios: Persona[];

  constructor(private service: ServiceService, private router: Router, private toastController: ToastController) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.getUserByRole('ROLE_GUARDIA');
  }
  getUserByRole(role: string) {
    this.service.getPersonaRol(role).subscribe(data => {this.propietarios = data; console.log(data); } );
  }
  onClick(id: number) {
    this.router.navigate(['/messages1', id]);
  }

}
