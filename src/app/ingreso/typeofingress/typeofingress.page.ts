import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-typeofingress',
  templateUrl: './typeofingress.page.html',
  styleUrls: ['./typeofingress.page.scss'],
})
export class TypeofingressPage implements OnInit {

  constructor( private menuCtrl: MenuController) { 
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
  }

}
