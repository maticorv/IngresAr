import { Component, OnInit } from '@angular/core';
import { Iaccount } from '../../interfaces/account';
import { ServiceService } from 'src/app/services/service.service';
import { Router } from '@angular/router';
import { IQr } from '../../interfaces/iqr';
import { AlertController, ModalController } from '@ionic/angular';
import { ModalPage } from 'src/app/components/modal/modal.page';

@Component({
  selector: 'app-authorizations',
  templateUrl: './authorizations.page.html',
  styleUrls: ['./authorizations.page.scss'],
})
export class AuthorizationsPage implements OnInit {
  account: Iaccount;
  autorizaciones: IQr[];
  convertedImage: string;

  constructor(private service: ServiceService, private router: Router, public modalController: ModalController) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.getAccount();
  }
  getAccount() {
    this.service.account().subscribe((resp) => {
      this.account = resp;
      this.getAutorzaciones();
    }
    );
  }
  getAutorzaciones() {
    this.service.getQrAutorizado(18).subscribe(data => {
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
