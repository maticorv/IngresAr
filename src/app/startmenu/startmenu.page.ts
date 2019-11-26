import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

@Component({
  selector: 'app-startmenu',
  templateUrl: './startmenu.page.html',
  styleUrls: ['./startmenu.page.scss'],
})
export class StartmenuPage implements OnInit {

  image = '../assets/logo.png';

  constructor( private menuCtrl: MenuController, private screenOrientation: ScreenOrientation) {
    this.activarMenu();
  }

  ngOnInit() {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    this.activarMenu();
  }
  // activa el menu cada vez q se accede a la pantalla
  ionViewWillEnter() {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    this.activarMenu();
  }

  activarMenu() {
    this.menuCtrl.enable(true);
  }

}
