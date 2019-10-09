import { Component, OnInit } from '@angular/core';
import { IEspacioComun } from 'src/app/interfaces/espacio-comun';
import { ServiceService } from '../../services/service.service';

@Component({
  selector: 'app-manage-common-space',
  templateUrl: './manage-common-space.page.html',
  styleUrls: ['./manage-common-space.page.scss'],
})
export class ManageCommonSpacePage implements OnInit {

  espacioComun: IEspacioComun;

  constructor(private service: ServiceService) { }

  ngOnInit() {
    this.obtenerEspacioComun();
  }

  obtenerEspacioComun() {
    this.service.getEspacioComun().subscribe(data => {
      this.espacioComun = data;
    },
    (error) => {console.log(error);
    });
  }

  crearEspacioComun() {
  }

}
