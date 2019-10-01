import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, AlertController, MenuController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../user.class';
import { ServiceService } from '../../services/service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user: User = new User();
  error = '';
  image = '../assets/logo.png';
  // tslint:disable-next-line:max-line-length
  constructor(private router: Router,  private fireauth: AngularFireAuth, private toastController: ToastController, private alertContrller: AlertController, private menuCtrl: MenuController, private service: ServiceService) { }

  ngOnInit() {
    this.menuCtrl.enable(false);
  }
  // async onLogin() {
  //   this.fireauth.auth.signInWithEmailAndPassword(this.user.email, this.user.password)
  //   .then(res => {
  //    if (res.user) {
  //      console.log(res);
  //      this.presentToast('Successfully logged in!');
  //      this.router.navigate(['/startmenu']);
  //    }
  //  })
  //  .catch(err => {
  //    console.log(`login failed ${err}`);
  //    this.presentToast(err);
  //  });
  //  }

  onLogin() {
    this.service.login(this.user.email, this.user.password).subscribe((data) => {
      console.log(data);
      this.presentToast('Successfully logged in!');
      this.router.navigateByUrl('/startmenu');
    },
      (error) => {console.log(error);
                  this.presentToast('Datos incorrectos, por favor ingreselos nuevamente');
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
}
