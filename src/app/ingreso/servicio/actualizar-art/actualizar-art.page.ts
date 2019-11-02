import { Component, OnInit } from '@angular/core';
import { IArt } from '../../../interfaces/iart';
import { Router } from '@angular/router';
import { ServiceService } from '../../../services/service.service';
import { Personas } from '../../../classes/persona';
import { ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-actualizar-art',
  templateUrl: './actualizar-art.page.html',
  styleUrls: ['./actualizar-art.page.scss'],
})
export class ActualizarArtPage implements OnInit {

  art: IArt;
  fechaMin: string;
  fechaVencimientoArt: Date;

  constructor(private router: Router, private service: ServiceService, private persona: Personas,
              private toastController: ToastController, private alertCtrl: AlertController) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.fechaMin = new Date().toString();
    this.obtenerART()
  }

  ionViewWillLeave() {
    this.art = null;
    this.fechaVencimientoArt = null;
    this.fechaMin = null;
  }

  obtenerART() {
    this.service.getArtByIdPersona(this.persona.id).subscribe(data => {
      this.art = data;
      this.fechaVencimientoArt = data.fechaVencimientoArt;
    },
    (error) => {console.log(error);
    });
  }

  actualizarART() {
    this.service.putART(this.art.id, this.fechaVencimientoArt, this.persona).subscribe(data => {
      console.log(data);
      this.presentToast('Se ha actualizado la ART correctamente');
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
      header: 'Hubo un error al intentar actualizar la ART, por favor veulva a intentar',
      buttons: ['Aceptar']
    });

    await alert.present();
  }

}
