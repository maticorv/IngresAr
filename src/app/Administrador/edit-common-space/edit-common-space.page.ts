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
  foto = '../assets/Prado-Cancha.jpg';
  fotoEspacioComun: string;
  nombreEspacioComun: string;
  disponibilidadDesde: any;
  disponibilidadHasta: any;
  convertedImg: string;
  fotoEspacioComunContentType = 'image/jpeg';

  constructor(private activatedRoute: ActivatedRoute, private service: ServiceService, private camera: Camera) { }

  ngOnInit() {
    this.obtenerEspacioComun();
  }

  obtenerEspacioComun() {
    this.service.getEspacioComun(this.activatedRoute.snapshot.params.id).subscribe(data => {
      this.espacioComun = data;
      this.disponibilidadDesde = data.horaDesde;
      this.disponibilidadHasta = data.horaHasta;
      this.nombreEspacioComun = data.nombreEspacioComun;
      this.fotoEspacioComun = data.fotoEspacioComun;
      this.fotoEspacioComunContentType = data.fotoEspacioComunContentType;
      this.convertedImg = 'data:' + data.fotoEspacioComunContentType + ';base64,' + data.fotoEspacioComun;
    },
    (error) => {console.log(error);
    });
  }

  mostrar() {
    console.log('disponibilidad desde', this.disponibilidadDesde);
    console.log('disponibilidad hasta', this.disponibilidadHasta);
  }

  ActualizarEspacioComun() {
    // tslint:disable-next-line: max-line-length
    this.service.putEspacioComun(this.espacioComun.id, this.nombreEspacioComun, this.disponibilidadDesde, this.disponibilidadHasta, this.fotoEspacioComun, this.fotoEspacioComunContentType, this.espacioComun.horaDesde, this.espacioComun.horaHasta, this.espacioComun.espacioBarrio, this.espacioComun.espacioTipos).subscribe(data => {
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
      this.fotoEspacioComun = imageData;
      this.convertedImg = `data:image/jpeg;base64,${imageData}`;
    })
    .catch(error => {
      console.error( error );
    });
  }

  getPictureAlbum() {
    const options: CameraOptions = {
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false,
      targetWidth: 1000,
      targetHeight: 1000,
      quality: 100
    };
    this.camera.getPicture( options )
    .then(imageData => {
      this.fotoEspacioComun = imageData;
      this.convertedImg = `data:image/jpeg;base64,${imageData}`;
    })
    .catch(error => {
      console.error( error );
    });
  }

}
