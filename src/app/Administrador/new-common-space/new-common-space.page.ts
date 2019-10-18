import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ServiceService } from '../../services/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-common-space',
  templateUrl: './new-common-space.page.html',
  styleUrls: ['./new-common-space.page.scss'],
})
export class NewCommonSpacePage implements OnInit {

  fotoVacia = 'assets/imageVacia.png';
  horaDesde = '2019-10-07T00:00:00-03:00';
  horaHasta = '2019-10-07T00:00:00-03:00';
  periodo = '2019-10-07T00:00:00-03:00';
  fotoEspCom: string;
  nombreEspComun: string;

  constructor(private camera: Camera, private service: ServiceService,
              private router: Router) { }

  ngOnInit() {
  }

  crearEspacioComun() {
    // tslint:disable-next-line: max-line-length
    this.service.postEspacioComun(this.nombreEspComun, this.horaDesde, this.horaHasta, this.fotoEspCom, null, this.horaDesde, this.horaHasta, null, null).subscribe(data => {
      console.log(data);
      this.horaDesde = '2019-10-07T00:00:00-03:00';
      this.horaHasta = '2019-10-07T00:00:00-03:00';
      this.fotoEspCom = null;
      this.router.navigateByUrl('/manage-common-space');
    },
    (error) => {console.log(error);
    });
    // console.log('horaDesde :', this.horaDesde);
    // console.log('horaHasta :', this.horaHasta);
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
