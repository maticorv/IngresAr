import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { PlanillaEgreso } from '../../classes/planillaEgreso';
import { Personas } from '../../classes/persona';
import { ToastController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { getLocaleDateFormat } from '@angular/common';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

@Component({
  selector: 'app-egress-page',
  templateUrl: './egress-page.page.html',
  styleUrls: ['./egress-page.page.scss'],
})
export class EgressPagePage implements OnInit {

  constructor(private service: ServiceService, private persona: Personas,
              private toastController: ToastController, private router: Router,
              public loadingController: LoadingController, private screenOrientation: ScreenOrientation) { }

  planillaEgreso: PlanillaEgreso;

  ngOnInit() {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
    this.getPlanillaEgreso();
  }

  getPlanillaEgreso() {
    this.service.getPlanillaEgreso(this.persona.dniPersona).subscribe(data => {
      this.planillaEgreso = data;
      console.log(this.planillaEgreso);
    },
    (error) => {console.log(error);
    });
  }

  registrarEgreso() {
    this.presentLoadingWithOptions();
    this.planillaEgreso.fechaEgreso = new Date();
    // tslint:disable-next-line: max-line-length
    this.service.postPlanillaEgreso(this.planillaEgreso.id, this.planillaEgreso.autorizadoPrevio, this.planillaEgreso.acompaniantes,
      this.planillaEgreso.fechaIngreso, this.planillaEgreso.fechaEgreso,
      this.planillaEgreso.tipovisita, this.planillaEgreso.ingresoAPie,
      this.planillaEgreso.planillaBarrio, this.planillaEgreso.planillaPersona,
      this.planillaEgreso.planillaQr, this.planillaEgreso.planillaDestino,
      this.planillaEgreso.planillaVehiculo, this.planillaEgreso.planillaEmpresa,
      this.planillaEgreso.planillaAutorizador, this.planillaEgreso.planillaAcompaniantes).subscribe(data => {
      console.log(data);
      this.dismissLoading();
      this.presentToast('El registro de egreso se realizó correctamente');
      this.router.navigateByUrl('/startmenu');
    },
    (error) => {console.log(error);
                this.presentToast('No se pudo realizar el egreso, por favor intente nuevamente');
    });
  }

  async presentToast(me: string) {
    const toast = await this.toastController.create({
      position: 'middle',
      color: 'dark',
      duration: 2000,
      message: me,
    });
    toast.present();
    setTimeout(() => {
      },
      2000);
  }

  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      spinner: 'lines',
      // duration: 5000,
      message: 'Procesando egreso, espere por favor...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    return await loading.present();
  }

  async dismissLoading() {
    while (await this.loadingController.getTop() !== undefined) {
      await this.loadingController.dismiss();
    }
  }

}
