import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, AlertController, MenuController } from '@ionic/angular';
import { User } from '../user.class';
import { ServiceService } from '../../services/service.service';
import { Account } from '../../classes/account';

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
  constructor(private router: Router,  private account: Account, private toastController: ToastController, private alertContrller: AlertController, private menuCtrl: MenuController, private service: ServiceService) { }
  ngOnInit() {
    this.menuCtrl.enable(false);
  }

  ionViewWillLeave() {
    this.user.email = null;
    this.user.password = null;
    console.log('ionViewWillLeave');
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
    this.service.login(this.user.email, this.user.password).subscribe(() => {
      this.service.account().subscribe(resp => {
        this.account.activated = resp.activated;
        this.account.id = resp.id;
        this.account.authorities = resp.authorities;
        this.account.createdBy = resp.createdBy;
        this.account.email = resp.email;
        this.account.firstName = resp.firstName;
        this.account.imageUrl = resp.imageUrl;
        this.account.lastName = resp.lastName;
        this.account.login = resp.login;
        this.presentToast('Successfully logged in!');
        this.router.navigateByUrl(this.hasAnyAuthority());
      });
    },
      (error) => {console.log(error);
                  this.presentToast('Datos incorrectos, por favor ingreselos nuevamente');
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

  hasAnyAuthority(): string {
    if (this.account.authorities.some (() => this.account.authorities.includes('ROLE_ADMIN'))) {
      return 'menu-administrator';
    } else {
      if ( this.account.authorities.some (() => this.account.authorities.includes('ROLE_PROPIETARIO'))) {
        return 'menu-owner';
      } else {
        if (this.account.authorities.some (() => this.account.authorities.includes('ROLE_GUARDIA'))) {
          return 'startmenu';
        } else {
          return 'menu-user';
        }
      }
    }
  }
}
