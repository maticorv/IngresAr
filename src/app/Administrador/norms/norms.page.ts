import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { Inormas } from 'src/app/interfaces/inormas';
import { Router, ActivatedRoute } from '@angular/router';
import { ActionSheetController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-norms',
  templateUrl: './norms.page.html',
  styleUrls: ['./norms.page.scss'],
})
export class NormsPage implements OnInit {

  normas: Inormas;

  constructor(private service: ServiceService, private router: Router,
              public actionSheetController: ActionSheetController) { }

  ngOnInit() {
    this.getNormas();
  }

  ionViewWillEnter() {
    this.getNormas();
  }

  crearNorma() {
    this.router.navigateByUrl('/new-norm');
  }

  getNormas() {
    this.service.getNormasBarrio().subscribe(data => {
      this.normas = data;
    },
    (error) => {console.log(error);
    });
  }

  async presentActionSheet(i) {
    const actionSheet = await this.actionSheetController.create({
      header: this.normas[i].titulonorma,
      mode: 'ios',
      buttons: [ {
        text: 'Abrir',
        icon: 'open',
        handler: () => {
          this.router.navigate(['/view-norm', this.normas[i].id]);
        }
      }, {
        text: 'Borrar',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.service.deleteNorma(this.normas[i].id).subscribe(data => {
            console.log(data);
            this.getNormas();
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
