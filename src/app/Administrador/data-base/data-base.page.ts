import { Component, OnInit } from '@angular/core';
import { BackupService } from './backup.service';

@Component({
  selector: 'app-data-base',
  templateUrl: './data-base.page.html',
  styleUrls: ['./data-base.page.scss'],
})
export class DataBasePage implements OnInit {
  entity = 99 ;
  Entidades = [
    'Art',
    'Aseguradora',
    'Barrio',
    'Carnet De Conducir',
    'Color',
    'Detalle Evento',
    'Detalle Lista Amigos',
    'Domicilio ',
    'Empresa ',
    'Espacio Común',
    'Estado Evento',
    'Estado Mensaje',
    'Estado Persona ',
    'Evento ',
    'Lista Amigos',
    'Marca ',
    'Mensaje ',
    'Modelo ',
    'Norma Barrio',
    'Novedades ', 'novedades',
    'Periodo Espacio Comun',
    'Persona ',
    'Planilla Ingreso Egreso',
    'QR ',
    'Reporte ',
    'Seguro ',
    'Usuarios',
    'Vehiculo',
  ];
  endpoint = [
    'arts',
    'aseguradoras',
    'barrios',
    'carnet-de-conducirs',
    'colors',
    'detalle-eventos',
    'detalle-lista-amigos',
    'empresas',
    'espacio-comuns',
    'estado-eventos',
    'estado-mensajes',
    'estado-personas',
    'eventos',
    'lista-amigos',
    'marcas',
    'mensajes',
    'modelos',
    'norma-barrios',
    'novedades',
    'periodo-espacio-comuns',
    'personas',
    'planilla-ingreso-egreso',
    'qrs',
    'reportes',
    'seguros',
    'users',
    'vehiculos',

  ];
  constructor(private service: BackupService) { }

  ngOnInit() {
  }
  onClick() {
    if (!(this.entity === 99)) {
      this.service.descargar(this.endpoint[this.entity]);
    }
  }
}
