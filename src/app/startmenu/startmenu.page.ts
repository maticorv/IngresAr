import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-startmenu',
  templateUrl: './startmenu.page.html',
  styleUrls: ['./startmenu.page.scss'],
})
export class StartmenuPage implements OnInit {

  image = '../assets/logo.png';

  constructor( private menuCtrl: MenuController) {
    this.activarMenu();
  }

  ngOnInit() {
    this.activarMenu();
  }

  ionViewWillEnter() {
    this.activarMenu();
  }

  activarMenu() {
    this.menuCtrl.enable(true);
  }

}
