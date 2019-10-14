import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from 'src/app/services/service.service';
import { IEspacioComun } from 'src/app/interfaces/espacio-comun';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-edit-common-space',
  templateUrl: './edit-common-space.page.html',
  styleUrls: ['./edit-common-space.page.scss'],
})
export class EditCommonSpacePage implements OnInit {

  espacioComun: IEspacioComun;
  foto = '../assets/imageVacia.png';
  fotoEspCom: string;

  constructor(private activatedRoute: ActivatedRoute, private service: ServiceService, private camera: Camera) { }

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

  getPicture() {
    const options: CameraOptions = {
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 1000,
      targetHeight: 1000,
      quality: 100
    };
    this.camera.getPicture( options )
    .then(imageData => {
      this.fotoEspCom = `data:image/jpeg;base64,${imageData}`;
    })
    .catch(error => {
      console.error( error );
    });
  }

  getPictureAlbum() {
    const options: CameraOptions = {
      destinationType: this.camera.PictureSourceType.PHOTOLIBRARY,
      targetWidth: 1000,
      targetHeight: 1000,
      quality: 100
    };
    this.camera.getPicture( options )
    .then(imageData => {
      this.fotoEspCom = `data:image/jpeg;base64,${imageData}`;
    })
    .catch(error => {
      console.error( error );
    });
  }

}
