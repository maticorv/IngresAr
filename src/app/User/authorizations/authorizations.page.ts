import { Component, OnInit } from '@angular/core';
import { Iaccount } from '../../interfaces/account';
import { ServiceService } from 'src/app/services/service.service';
import { Router } from '@angular/router';
import { IQr } from '../../interfaces/iqr';
import { AlertController, ModalController } from '@ionic/angular';
import { ModalPage } from 'src/app/components/modal/modal.page';
import { isThisSecond } from 'date-fns';
import { Persona } from '../../interfaces/persona';

@Component({
  selector: 'app-authorizations',
  templateUrl: './authorizations.page.html',
  styleUrls: ['./authorizations.page.scss'],
})
export class AuthorizationsPage implements OnInit {
  account: Iaccount;
  autorizaciones: IQr[];
  convertedImage: string;
  persona: Persona;

  constructor(private service: ServiceService, private router: Router, public modalController: ModalController) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.getAccount();
  }
  getAccount() {
    this.service.account().subscribe((resp) => {
      console.log('acount :', resp);
      this.account = resp;
      this.service.getPersonUser(resp.id).subscribe((pers) => {
        console.log('pers :', pers);
        this.persona = pers;
        this.getAutorzaciones();
      },
      (error) => {
        console.log(error);
      });
    }
    );
  }
  getAutorzaciones() {
    this.service.getQrAutorizado(this.persona.id).subscribe(data => {
      this.autorizaciones = data;
      // console.log('this.autorizaciones :', this.autorizaciones);
    });
  }
  async presentModal() {
    const modal = await this.modalController.create({
      component: ModalPage,
      componentProps: {
        img: this.convertedImage,
      }
    });
    return await modal.present();
  }


  onClick(i: number) {
    this.convertedImage = 'data:' + this.autorizaciones[i].fotoQRContentType + ';base64,' +  this.autorizaciones[i].fotoQR;
    this.presentModal();
  }


}
