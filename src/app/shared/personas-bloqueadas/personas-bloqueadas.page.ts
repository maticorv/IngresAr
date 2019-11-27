import { Component, OnInit } from '@angular/core';
import { Persona } from '../../interfaces/persona';
import { ServiceService } from '../../services/service.service';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

@Component({
  selector: 'app-personas-bloqueadas',
  templateUrl: './personas-bloqueadas.page.html',
  styleUrls: ['./personas-bloqueadas.page.scss'],
})
export class PersonasBloqueadasPage implements OnInit {

  persona = [];
  personas: Persona[];

  constructor(private service: ServiceService, private screenOrientation: ScreenOrientation) { }

  ngOnInit() {
    this.obtenerPersonas();
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
  }

  ionViewWillLeave() {
    this.personas = null;
  }

  obtenerPersonas() {
    this.service.getAllPersonas().subscribe( data => {
      console.log(data);
      this.personas = data;
      data.forEach(element => {
        if (element.personaEstado.nombreEstadoPersona === 'bloqueada') {
          this.persona.push(element);
        }
      });
    },
    (error) => {console.log(error);
    });
    console.log('this.persona :', this.persona);
  }



}
