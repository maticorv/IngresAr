import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { Inovedad } from '../../interfaces/novedad';
import { Persona } from '../../interfaces/persona';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {
  novedades: Inovedad[];
  chatMessage: string;

  constructor(private service: ServiceService) { }

  ngOnInit() {
    this.service.getNovedades().subscribe(data => {
      this.novedades = data;
      console.log(data);
    });
  }
  sendMessage() {
    const person: Persona = {
      id: 1,
      nombrePersona:  'mobile Fish',
      apellidoPersona: 'Home Loan Account Table Computer',
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
    });
  }
}
