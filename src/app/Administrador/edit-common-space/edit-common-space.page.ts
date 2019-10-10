import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from 'src/app/services/service.service';
import { IEspacioComun } from 'src/app/interfaces/espacio-comun';

@Component({
  selector: 'app-edit-common-space',
  templateUrl: './edit-common-space.page.html',
  styleUrls: ['./edit-common-space.page.scss'],
})
export class EditCommonSpacePage implements OnInit {

  espacioComun: IEspacioComun;
  foto = '../assets/icon/favicon.png';

  constructor(private activatedRoute: ActivatedRoute, private service: ServiceService) { }

  ngOnInit() {
    this.obtenerEspacioComun();
  }

  obtenerEspacioComun() {
    this.service.getEspacioComun(this.activatedRoute.snapshot.params.id).subscribe(data => {
      this.espacioComun = data;
    },
    (error) => {console.log(error);
    });
  }

  mostrar() {
    // console.log(this.periodo);
  }

  ActualizarEspacioComun() {
    // tslint:disable-next-line: max-line-length
    this.service.putEspacioComun(this.espacioComun.id, this.espacioComun.disponibilidadDesde, this.espacioComun.disponibilidadHasta, this.espacioComun.fotoEspacioComun, this.espacioComun.fotoEspacioComunContentType, this.espacioComun.horaDesde, this.espacioComun.horaHasta, this.espacioComun.espacioBarrio, this.espacioComun.espacioTipos).subscribe(data => {
      console.log(data);
    },
    (error) => {console.log(error);
    });
  }

}
