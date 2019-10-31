import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceService } from 'src/app/services/service.service';
import { IEspacioComun } from '../../../interfaces/espacio-comun';

@Component({
  selector: 'app-place',
  templateUrl: './place.page.html',
  styleUrls: ['./place.page.scss'],
})
export class PlacePage implements OnInit {
id: number;
espacioComun: IEspacioComun;
convertedImage: string;
constructor(private router: Router, private activatedRoute: ActivatedRoute, private service: ServiceService) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params.id;
    this.getEspacioComun();
  }
  getEspacioComun() {
    this.service.getEspacioComun(this.id).subscribe(data => {
      this.espacioComun = data;
      this.convertedImage = 'data:' + this.espacioComun.fotoEspacioComunContentType + ';base64,' + this.espacioComun.fotoEspacioComun;
      console.log('this.espacioComun :', this.espacioComun);
    });
  }

}
