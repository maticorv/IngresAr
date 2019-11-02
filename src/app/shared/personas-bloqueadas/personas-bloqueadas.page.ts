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
  }

  obtenerPersonas() {
    this.service.getAllPersonas().subscribe( data => {
      if (data.personaEstado.nombreEstadoPersona === 'bloqueada') {
        this.persona.push(data);
      }
    },
    (error) => {console.log(error);
    });
  }



}
