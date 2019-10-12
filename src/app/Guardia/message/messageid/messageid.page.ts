import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceService } from 'src/app/services/service.service';
import { IMensaje } from 'src/app/interfaces/mensaje';
import { Iaccount } from 'src/app/interfaces/account';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-messageid',
  templateUrl: './messageid.page.html',
  styleUrls: ['./messageid.page.scss'],
})
export class MessageidPage implements OnInit {
  mensajes: IMensaje[];
  chatMessage: string;
  account: Iaccount;
  id: number;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private service: ServiceService) { }
  @ViewChild(IonContent, {static: false}) content: IonContent;
  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params.id;
    this.service.account().subscribe(resp => {
      this.account = resp;
      this.obtenerMensajes();
    });
  }

  obtenerMensajes() {
      this.service.getMensajes(this.id).subscribe(data => {
        this.mensajes = data;
        console.log(data);
      },
      (error) => { console.log(error);
      });
  }
  sendMessage() {
      if (!(this.chatMessage === '' || this.chatMessage === '\n')) {
        const hoy = new Date().toJSON();
        let destinatario: Iaccount;
        if (this.account === this.mensajes[0].userDestino) {
          destinatario = this.mensajes[0].userOrigen;
        } else {
          destinatario = this.mensajes[0].userOrigen;
        }
        this.service.postMensaje(hoy, this.chatMessage, this.account, destinatario).subscribe(data => {
          this.chatMessage = '';
          this.mensajes.push(data);
          this.scrollToBottom();
        });
      }
    }
  scrollToBottom() {
      this.content.scrollToBottom(300);
  }

}
