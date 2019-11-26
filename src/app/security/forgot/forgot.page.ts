import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastController, AlertController } from '@ionic/angular';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.page.html',
  styleUrls: ['./forgot.page.scss'],
})
export class ForgotPage implements OnInit {
  email = '';
  image = '../assets/logo.png';
  error;
  // tslint:disable-next-line:max-line-length
  constructor(private router: Router, private fireauth: AngularFireAuth, private toastController: ToastController, private alertContrller: AlertController, private service: ServiceService) { }

  ngOnInit() {
  }
  recover() {
    this.service.resetPassword(this.email).subscribe(data => {
        this.presentToast('Correo de reinicio de contraseña enviado', 'bottom', 2000);
        this.router.navigateByUrl('/login');
    }, (error) => {
      console.log(error.error.title);
      this.presentToast(error, 'bottom', 2000);
    }
    );
  }
  async presentToast(message, position, duration) {
    const toast = await this.toastController.create({
      color: 'dark',
      message,
      position,
      duration
    });
    toast.present();
  }

}
