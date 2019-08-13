import { Component, OnInit } from '@angular/core';
import { User } from '../user.class';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
  user: User = new User();
  // tslint:disable-next-line:max-line-length
  constructor(private router: Router, private fireauth: AngularFireAuth, private toastController: ToastController, private alertContrller: AlertController) { }

  ngOnInit() {
  }
  async onRegister() {
    const user = await this.fireauth.auth.signInWithEmailAndPassword(this.user.email, this.user.password)
      .then(res => {
        if (res.user) {
          console.log(res.user);
          this.router.navigateByUrl('/login');
        }
      })
      .catch(err => {
        console.log(`login failed ${err}`);
        this.presentToast(err);
      });
    }
    async presentToast(message: string) {
      const toast = await this.toastController.create({
        color: 'dark',
        message,
        duration: 2000
      });
      toast.present();
    }
}
