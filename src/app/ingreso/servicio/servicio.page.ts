import { Component, OnInit } from '@angular/core';
import { Empresa } from 'src/app/interfaces/empresa';
import { ServiceService } from '../../services/service.service';
import { Router } from '@angular/router';
import { Servicios } from 'src/app/classes/servicio';
import { AlertController } from '@ionic/angular';
import { Personas } from '../../classes/persona';

@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.page.html',
  styleUrls: ['./servicio.page.scss'],
})
export class ServicioPage implements OnInit {

  i: number;
  empresas: Empresa;
  art: string;
  condicion: boolean;

  constructor(private service: ServiceService, private router: Router, private servicio: Servicios,
              private alertCtrl: AlertController, private persona: Personas) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getEmpresa();
    this.getART();
  }

  ionViewWillLeave() {
    this.art = null;
  }

  getART() {
    this.service.getArtByIdPersona(this.persona.id).subscribe(data => {
      if (new Date(data.fechaVencimientoArt) < new Date()) {
        this.art = 'vencida';
        this.artVencida();
      } else {
        this.condicion = true;
      }
    },
    (error) => {console.log(error);
                this.art = 'crear';
                this.sinArt();
    });
  }

  getEmpresa() {
    this.service.getEmpresa().subscribe(data => {
      this.empresas = data;
    },
    (error) => {console.log(error);
    });
  }

  aceptar() {
    this.servicio.nombreEmpresa = this.empresas[this.i].nombreEmpresa;
    this.servicio.id = this.empresas[this.i].id;
    this.router.navigateByUrl('/transport');
    console.log(this.servicio);
  }

    async artVencida() {
    const alert = await this.alertCtrl.create({
      header: 'La persona tiene vencida la ART, por favor actualicelo',
      buttons: ['Aceptar']
    });

    await alert.present();
  }

  async sinArt() {
    const alert = await this.alertCtrl.create({
      header: 'La persona no tiene asociada la ART, por favor agreguela',
      buttons: ['Aceptar']
    });

    await alert.present();
  }

}
