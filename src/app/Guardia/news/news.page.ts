import { Component, OnInit, ViewChild } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { Inovedad } from '../../interfaces/novedad';
import { Persona } from '../../interfaces/persona';
import { Account } from 'src/app/classes/account';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {
  novedades: Inovedad[];
  chatMessage: string;

  constructor(private service: ServiceService, private account: Account) { }
  @ViewChild(IonContent, {static: false}) content: IonContent;
  ngOnInit() {
    console.log(this.account);
    this.service.getNovedades().subscribe(data => {
      this.novedades = data;
      console.log(data);
      this.scrollToBottom();
    });
  }
  sendMessage() {
    if (!(this.chatMessage === '' || this.chatMessage === '\n')) {
      const person: Persona = {
        id: this.account.id,
        nombrePersona:  this.account.firstName,
        apellidoPersona: this.account.lastName,
        dniPersona: 5808,
        telefonoPersona: 45924,
        personabarrio: null,
        tipoPersona: null,
        vehiculos: null
      };
      const hoy = new Date().toJSON();
      this.service.postNovedad(hoy, this.chatMessage, person ).subscribe(data => {
        this.chatMessage = '';
        this.novedades.push(data);
        this.scrollToBottom();
      });
    }
  }
  scrollToBottom() {
    this.content.scrollToBottom(300);
  }
}

