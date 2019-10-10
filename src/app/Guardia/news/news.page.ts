import { Component, OnInit, ViewChild } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { Inovedad } from '../../interfaces/novedad';
import { Persona } from '../../interfaces/persona';
import { IonContent } from '@ionic/angular';
import { Iaccount } from 'src/app/interfaces/account';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {
  novedades: Inovedad[];
  chatMessage: string;
  account: Iaccount;

  constructor(private service: ServiceService) { }
  @ViewChild(IonContent, {static: false}) content: IonContent;
  ngOnInit() {
    this.service.account().subscribe(resp => this.account = resp);
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

