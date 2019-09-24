import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Acompañante } from 'src/app/classes/acompañante';
import { Personas } from 'src/app/classes/persona';
import { Destino } from 'src/app/classes/destino';
import { Autorizador } from 'src/app/classes/autorizador';
import { Vehiculo } from 'src/app/classes/vehiculo';
import { Empresa } from 'src/app/classes/empresa';
import { Tipovisita } from 'src/app/classes/tipovisita';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.page.html',
  styleUrls: ['./authorization.page.scss'],
})
export class AuthorizationPage implements OnInit {

  index: number;
  dni: string;
  cantidad = 0;
  personaAut: Personas;

  // planilla ingreso
  autorizadoPrevio: boolean;
  acompaniantes: number;
  fechaIngreso: Date;
  fechaEgreso: Date;
  fecha: string;
  hora: Date;
  tipovisita: string;
  planillatipo?: any;
  planillabarrio?: any;
  planillapersona?: Personas;
  planillaqr?: any;
  planilladestino?: any;
  planillavehiculo?: Vehiculo;
  planillaempresa?: Empresa;
  planillaautorizador?: Autorizador;

  // tslint:disable-next-line: max-line-length
  constructor(private autorizador: Autorizador,
              private service: ServiceService, private router: Router,
              private destino: Destino, private toastController: ToastController,
              private acompañante: Acompañante, private tipovisitas: Tipovisita,
              private persona: Personas, private vehiculo: Vehiculo,
              private empresa: Empresa) { }

  ngOnInit() {
    this.getPersonasDomicilio();
  }

  getPersonasDomicilio() {
    this.service.getPersonasDomicilio(this.destino.lote).subscribe(data => {
      this.personaAut = data[`personadoms`];
      console.log(this.personaAut);
    },
    (error) => { console.log(error);
    });
  }

  procesarIngreso() {
    this.autorizador.nombreAutorizador = this.personaAut[this.index].nombrePersona;
    this.autorizador.apellidoAutorizador = this.personaAut[this.index].apellidoPersona;
    // this.acompañante.cantidadAcompañante = this.cantidad;
    setTimeout(() => {
      this.postPlanillaIngresoEgreso();
      },
      2000);
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
      this.router.navigateByUrl('/startmenu');
      },
      2000);
  }

  postPlanillaIngresoEgreso() {
    this.autorizadoPrevio = false;
    this.acompaniantes = this.cantidad;
    this.fechaIngreso = new Date();
    this.fechaEgreso = null;
    this.fecha = null;
    this.hora = null;
    this.tipovisita = this.tipovisitas.nombreTipoVisita;
    this.planillatipo = null;
    this.planillabarrio = null;
    this.planillapersona = this.persona;
    this.planillaqr = null;
    this.planilladestino = this.destino;
    this.planillavehiculo = this.vehiculo;
    this.planillaempresa = this.empresa;
    this.planillaautorizador = this.autorizador;
    // this.planillaautorizador.nombreAutorizador = this.personaAut[this.index].nombrePersona;
    // this.planillaautorizador.apellidoAutorizador = this.personaAut[this.index].apellidoPersona;
    console.log(this.planillaautorizador, this.autorizador);
    // tslint:disable-next-line: max-line-length
    // console.log(this.autorizadoPrevio, this.acompaniantes, this.fechaIngreso, this.fechaEgreso, this.fecha, this.hora, this.tipovisita, this.planillatipo, this.planillabarrio, this.planillapersona, this.planillaqr, this.planilladestino, this.planillavehiculo, this.planillaempresa, this.planillaautorizador);
    // tslint:disable-next-line: max-line-length
    // this.service.postPlanillaEgresso(this.autorizadoPrevio, this.acompaniantes, this.fechaIngreso, this.fechaEgreso, this.fecha, this.hora, this.tipovisita, this.planillatipo, this.planillabarrio, this.planillapersona, this.planillaqr, this.planilladestino, this.planillavehiculo, this.planillaempresa, this.planillaautorizador).subscribe(data => {
    //   console.log(data);
    // },
    // (error) => {console.log(error);
    // });

  }

}
