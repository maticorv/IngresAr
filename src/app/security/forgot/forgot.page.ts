import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastController, AlertController } from '@ionic/angular';

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
  constructor(private router: Router, private fireauth: AngularFireAuth, private toastController: ToastController, private alertContrller: AlertController ) { }

  ngOnInit() {
  }
  recover() {
    this.fireauth.auth.sendPasswordResetEmail(this.email)
      .then(data => {
        console.log(data);
        this.presentToast('Password reset email sent', 'bottom', 2000);
        this.router.navigateByUrl('/login');
      })
      .catch(err => {
        console.log(`failed ${err}`);
        this.presentToast(err, 'bottom', 2000);
      });
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
