import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { ServiceService } from '../../services/service.service';
import { Personas } from '../../classes/persona';

@Component({
  selector: 'app-carnet',
  templateUrl: './carnet.page.html',
  styleUrls: ['./carnet.page.scss'],
})
export class CarnetPage implements OnInit {

  fechaOtorgamiento: string;
  fechaVencimiento: string;
  categoria: string;
  fechaMin;

  constructor(private navCrlt: NavController, private service: ServiceService, private persona: Personas,
              private toastController: ToastController) { }

  ngOnInit() {
    this.fechaOtorgamiento = new Date().toISOString();
    this.fechaVencimiento = new Date().toISOString();
    this.fechaMin = new Date().toString();
  }


  CrearCarnet() {
    this.service.postCarnet(this.categoria, this.fechaOtorgamiento, this.fechaVencimiento, this.persona).subscribe(data => {
      console.log(data);
      this.presentToast('El carnet se ha cerado correctamente');
      this.navCrlt.back();
    },
    (error) => {console.log(error);
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

}
