import { Component, OnInit } from '@angular/core';
import { Personas } from 'src/app/classes/persona';
import { ServiceService } from '../../../services/service.service';
import { Router } from '@angular/router';
import { ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-art',
  templateUrl: './art.page.html',
  styleUrls: ['./art.page.scss'],
})
export class ArtPage implements OnInit {

  fechaVencimiento: string;
  fechaMin: string;

  constructor(private router: Router, private persona: Personas, private service: ServiceService,
              private toastController: ToastController, private alertCtrl: AlertController) { }

  ngOnInit() {
    this.fechaVencimiento = new Date().toISOString();
    this.fechaMin = new Date().toString();
  }

  ionViewWillLeave() {
    this.fechaVencimiento = null;
    this.fechaMin = null;
  }

  crearART() {
    this.service.postART(this.fechaVencimiento, this.persona).subscribe(data => {
      console.log(data);
      this.presentToast('La ART se ha creado correctamente');
      this.router.navigateByUrl('/servicio');
    },
    (error) => {console.log(error);
                this.presentAlert();
    });
  }

  async presentToast(me: string) {
    const toast = await this.toastController.create({
      position: 'bottom',
      color: 'dark',
      duration: 2000,
      message: me,
    });
    toast.present();
    setTimeout(() => {
      },
      2000);
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Hubo un error al intentar crear la ART, por favor veulva a intentar',
      buttons: ['Aceptar']
    });

    await alert.present();
  }

}
