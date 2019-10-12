import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { ServiceService } from '../../services/service.service';
import { IReporte } from 'src/app/interfaces/reporte';
import { Iaccount } from '../../interfaces/account';
import { Persona } from 'src/app/interfaces/persona';

@Component({
  selector: 'app-diary',
  templateUrl: './diary.page.html',
  styleUrls: ['./diary.page.scss'],
})
export class DiaryPage implements OnInit {
  reportes: IReporte[];
  account: Iaccount;
  chatMessage: string;
  constructor(private service: ServiceService) { }
  @ViewChild(IonContent, {static: false}) content: IonContent;
  ngOnInit() {
    this.service.account().subscribe(data => { this.account = data; console.log(data); });
    this.service.getReportes().subscribe(resp => {this.reportes = resp; console.log(resp); this.scrollToBottom(); });

  }
  sendMessage() {
    if (!(this.chatMessage === '' || this.chatMessage === '\n')) {
      const hoy = new Date().toJSON();
      this.service.postReporte(hoy, this.chatMessage, this.account ).subscribe(data => {
        this.chatMessage = '';
        this.reportes.push(data);
        this.scrollToBottom();
      });
    }
  }
  scrollToBottom() {
    this.content.scrollToBottom(300);
  }

}
