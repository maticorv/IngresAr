import { Component, OnInit } from '@angular/core';
import { Persona } from '../../interfaces/persona';

@Component({
  selector: 'app-personas-bloqueadas',
  templateUrl: './personas-bloqueadas.page.html',
  styleUrls: ['./personas-bloqueadas.page.scss'],
})
export class PersonasBloqueadasPage implements OnInit {

  persona: Persona;

  constructor() { }

  ngOnInit() {
  }

}
