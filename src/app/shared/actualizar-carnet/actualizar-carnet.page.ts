import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { ServiceService } from '../../services/service.service';
import { Personas } from '../../classes/persona';
import { ICarnet } from 'src/app/interfaces/icarnet';

@Component({
  selector: 'app-actualizar-carnet',
  templateUrl: './actualizar-carnet.page.html',
  styleUrls: ['./actualizar-carnet.page.scss'],
})
export class ActualizarCarnetPage implements OnInit {

  fechaOtorgamiento: string;
  fechaVencimiento: string;
  categoria: string;
  fechaMin;
  carnet: ICarnet;

  constructor(private navCrlt: NavController, private service: ServiceService, private persona: Personas,
              private toastController: ToastController) { }

  ngOnInit() {
    this.fechaOtorgamiento = new Date().toISOString();
    this.fechaVencimiento = new Date().toISOString();
    this.fechaMin = new Date().toString();
    this.getCarnet();
  }

  getCarnet() {
    this.service.getCarnetByIdPerson(this.persona.id).subscribe(data => {
      this.carnet = data;
    },
    (error) => {console.log(error);
    });
  }


  Actualizar() {
    this.service.putCarnet(this.carnet.id, this.categoria, this.fechaOtorgamiento, this.fechaVencimiento, this.persona).subscribe(data => {
      console.log(data);
      this.presentToast('El carnet se ha actualizado correctamente');
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
