import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { Servicios } from 'src/app/classes/servicio';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-newcompany',
  templateUrl: './newcompany.page.html',
  styleUrls: ['./newcompany.page.scss'],
})
export class NewcompanyPage implements OnInit {

  nombreEmpresa: string;

  // tslint:disable-next-line: max-line-length
  constructor(private service: ServiceService, private servicio: Servicios, private router: Router, private toastController: ToastController) { }

  ngOnInit() {
  }

  crearEmpresa() {
    this.service.postEmpresa(this.nombreEmpresa).subscribe( data => {
      console.log(data);
      this.servicio.id = data.id;
      this.servicio.nombreEmpresa = data.nombreEmpresa;
      this.presentToast('La empresa se ha creado correctamente');
    },
    (error) => {console.log(error);
                this.presentToast('La empresa no se ha podido crear, vuelvalo a intentar');
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
      this.router.navigateByUrl('/transport');
      },
      2000);
  }

}
