import { Component, OnInit, ViewChild } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { Iaccount } from 'src/app/interfaces/account';
import { IMensaje } from 'src/app/interfaces/mensaje';

@Component({
  selector: 'app-messages1',
  templateUrl: './messages1.page.html',
  styleUrls: ['./messages1.page.scss'],
})
export class Messages1Page implements OnInit {
  mensajes: IMensaje[];
  chatMessage: string;
  account: Iaccount;
  id: number;
  destinatario: Iaccount;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private service: ServiceService) { }
  @ViewChild(IonContent, {static: false}) content: IonContent;
  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params.id;
    this.getDestinatario();
    this.service.account().subscribe(resp => {
      this.account = resp;
      this.obtenerMensajes();
    });
  }


  getDestinatario() {
    this.service.getUserById(this.id).subscribe(resp => {
      this.destinatario = resp;
    });
  }


  obtenerMensajes() {
      this.service.getMensajes(this.account.id, this.id).subscribe(data => {
        this.mensajes = data;
        // console.log(data);
        this.scrollToBottom();
      },
      (error) => { console.log(error);
      });
  }
  sendMessage() {
      if (!(this.chatMessage === '' || this.chatMessage === '\n')) {
        const hoy = new Date().toJSON();
        const destinatario: Iaccount = {
          id: this.id,
          login: null,
          firstName: null,
          lastName: null,
          email: null,
          activated: true,
          langKey: null,
          imageUrl: null,
          authorities: null,
          createdBy: null,
          createdDate: null,
          lastModifiedBy: null,
          lastModifiedDate: null,
          password: null
        };
        // if (this.account.id === this.mensajes[0].userDestino.id) {
        //   destinatario = this.mensajes[0].userOrigen;
        // } else {
        //   destinatario = this.mensajes[0].userDestino;
        // }
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
