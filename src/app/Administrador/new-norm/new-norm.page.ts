import { Component, OnInit, OnDestroy  } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-new-norm',
  templateUrl: './new-norm.page.html',
  styleUrls: ['./new-norm.page.scss'],
})
export class NewNormPage implements OnInit {

  tituloNorma: string;
  descripcionNorma: string;

  constructor(private service: ServiceService, private toastController: ToastController, private router: Router) { }

  ngOnInit() {
  }

  OnDestroy() {
  }

  crearNorma() {
    this.service.postNorma(this.tituloNorma, this.descripcionNorma).subscribe(data => {
      console.log(data);
      this.presentToast('La norma se creo correctamente');
    },
    (error) => {console.log(error);
    });
    this.presentToast('La norma no se pudo crear, intente nuevamente');
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
      this.OnDestroy();
      this.router.navigateByUrl('/norms');
      },
      2000);
  }

}
