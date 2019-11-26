import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from 'src/app/services/service.service';
import { Ievent } from '../../../interfaces/ievent';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

@Component({
  selector: 'app-detalle-evento',
  templateUrl: './detalle-evento.page.html',
  styleUrls: ['./detalle-evento.page.scss'],
})
export class DetalleEventoPage implements OnInit {

  detalleEvento: any;
  evento: Ievent;

  constructor(private activatedRouter: ActivatedRoute, private service: ServiceService,
              public actionSheetController: ActionSheetController, private alertCtrl: AlertController,
              private screenOrientation: ScreenOrientation ) { }

  ngOnInit() {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
    this.obtenerEvento();
  }

  obtenerEvento() {
    this.service.getEventById(this.activatedRouter.snapshot.params.id).subscribe(data => {
      this.evento = data;
      this.detalleEvento = data[`eventoDetalles`];
      console.log(this.detalleEvento);
    },
    (error) => {console.log(error);
    });
  }

  async presentActionSheet(i) {
    const actionSheet = await this.actionSheetController.create({
      header: this.detalleEvento[i].detallePersonaEvento.apellidoPersona + '  ' + this.detalleEvento[i].detallePersonaEvento.nombrePersona,
      mode: 'ios',
      buttons: [ {
        text: 'Registrar Ingreso',
        icon: 'swap',
        handler: () => {
          if (this.detalleEvento[i].horaIngreso === null) {
            this.detalleEvento[i].horaIngreso = new Date();
            console.log(this.detalleEvento[i].horaIngreso);
            // tslint:disable-next-line: max-line-length
            this.service.putDetalleEvento(this.detalleEvento[i].id, this.detalleEvento[i].horaIngreso, this.detalleEvento[i].horaEngreso, this.detalleEvento[i].amigosevento, this.detalleEvento[i].detallePersonaEvento, this.detalleEvento[i].detalleEventoVehiculo).subscribe(data => {
              console.log('Ingreso realizado');
              // this.obtenerEvento();
            },
            (error) => {console.log(error);
                        this.presentAlert('No se pudo registrar el ingreso');
          });
          } else {
            this.presentAlert('La persona se ecuentra dentro del establecimiento');
          }
        }
      }, {
        text: 'Registrar Egreso',
        role: 'destructive',
        icon: 'swap',
        handler: () => {
          if (this.detalleEvento[i].horaIngreso !== null && this.detalleEvento[i].horaEngreso === null) {
            this.detalleEvento[i].horaEngreso = new Date();
            console.log(this.detalleEvento[i].horaEngreso);
            // tslint:disable-next-line: max-line-length
            this.service.putRegistroEgresoEvento(this.evento.id, this.evento.nombreEvento, this.evento.fecha, this.evento.horaInicio, this.evento.horaFin, this.evento.eventoPeriodo, this.evento.eventoDomicilio, this.evento.eventoEspacio, this.evento.eventoPersona, this.evento.estadoEvento, this.detalleEvento).subscribe(data => {
              console.log('Egreso realizado');
              // this.obtenerEvento();
            },
            (error) => {console.log(error);
                        this.presentAlert('No se pudo registrar el egreso');
          });
          } else {
            this.presentAlert('La persona no ha ingresado o ya se ha retirado del establecimiento');
          }
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
        }
      }]
    });
    await actionSheet.present();
  }


  async presentAlert(msg) {
    const alert = await this.alertCtrl.create({
      header: msg,
      buttons: ['Aceptar'],
    });
    await alert.present();
  }

  // putRegistroIngreso() {
     // tslint:disable-next-line: max-line-length
  //   this.service.putRegistroIngresoEvento(this.evento.id, this.evento.nombreEvento, this.evento.fecha, this.evento.horaInicio, this.evento.horaFin, this.evento.eventoPeriodo, this.evento.eventoDomicilio, this.evento.eventoEspacio, this.evento.eventoPersona, this.evento.estadoEvento, this.detalleEvento).subscribe(() => {
  //     console.log('Ingreso realizado');
  //     this.obtenerEvento();
  //   },
  //   (error) => {console.log(error);
  //               this.presentAlert('No se pudo registrar el ingreso');
  // });

  // }



}
