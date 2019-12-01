import { Injectable } from '@angular/core';
import { OneSignal } from '@ionic-native/onesignal/ngx';

@Injectable({
  providedIn: 'root'
})
export class PushService {

  constructor(private oneSignal: OneSignal) {
  }
  configuracionInicial() {
    // id de one signal y id de firebase
    this.oneSignal.startInit('89349907-3fb7-4dd0-aec7-73b78fafb0e1', '376965492763');

    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

    this.oneSignal.handleNotificationReceived().subscribe((data) => {
      console.log('data :', data);
      // do something when notification is received
    });

    this.oneSignal.handleNotificationOpened().subscribe((data) => {
      // do something when a notification is opened
      console.log('data :', data);
      });

    this.oneSignal.endInit();

  }
}
