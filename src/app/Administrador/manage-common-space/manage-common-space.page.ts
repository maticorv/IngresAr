import { Component, OnInit } from '@angular/core';
import { IEspacioComun } from 'src/app/interfaces/espacio-comun';
import { ServiceService } from '../../services/service.service';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-common-space',
  templateUrl: './manage-common-space.page.html',
  styleUrls: ['./manage-common-space.page.scss'],
})
export class ManageCommonSpacePage implements OnInit {

  espacioComun: IEspacioComun;

  constructor(private service: ServiceService, public actionSheetController: ActionSheetController, private router: Router) { }

  ngOnInit() {
    this.obtenerEspacioComun();
  }

  obtenerEspacioComun() {
    this.service.getAllEspacioComun().subscribe(data => {
      this.espacioComun = data;
      console.log(this.espacioComun);
    },
    (error) => {console.log(error);
    });
  }

  crearEspacioComun() {
  }

  async presentActionSheet(i) {
    const actionSheet = await this.actionSheetController.create({
      header: this.espacioComun[i].titulonorma,
      mode: 'ios',
      buttons: [ {
        text: 'Abrir',
        icon: 'open',
        handler: () => {
          this.router.navigate(['/edit-common-space', this.espacioComun[i].id]);
        }
      }, {
        text: 'Borar',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.service.deleteEspacioComun(this.espacioComun[i].id).subscribe(data => {
            console.log(data);
            this.obtenerEspacioComun();
          },
          (error) => {console.log(error);
          });
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
        }
      }]
    });
    await actionSheet.present();
  }

}
