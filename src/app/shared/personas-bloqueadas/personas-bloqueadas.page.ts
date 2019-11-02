import { Component, OnInit } from '@angular/core';
import { Persona } from '../../interfaces/persona';
import { ServiceService } from '../../services/service.service';

@Component({
  selector: 'app-personas-bloqueadas',
  templateUrl: './personas-bloqueadas.page.html',
  styleUrls: ['./personas-bloqueadas.page.scss'],
})
export class PersonasBloqueadasPage implements OnInit {

  persona = [];

  constructor(private service: ServiceService) { }

  ngOnInit() {
    this.obtenerPersonas();
  }

  obtenerPersonas() {
    this.service.getAllPersonas().subscribe( data => {
      console.log(data);
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
