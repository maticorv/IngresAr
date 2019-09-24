import { Component, OnInit } from '@angular/core';
import { Empresa } from 'src/app/interfaces/empresa';
import { ServiceService } from '../../services/service.service';
import { Router } from '@angular/router';
import { Servicio } from 'src/app/classes/servicio';

@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.page.html',
  styleUrls: ['./servicio.page.scss'],
})
export class ServicioPage implements OnInit {
  i: number;

  empresas: Empresa;

  constructor(private service: ServiceService, private router: Router, private servicio: Servicio) { }

  ngOnInit() {
    this.getEmpresa();
  }

  getEmpresa() {
    this.service.getEmpresa().subscribe(data => {
      this.empresas = data;
    },
    (error) => {console.log(error);
    });
  }

  aceptar() {
    this.servicio.nomServicio = this.empresas[this.i].nombreEmpresa;
    this.servicio.nomServicio = this.empresas[this.i].id;
    this.router.navigateByUrl('/transport');
  }

}
