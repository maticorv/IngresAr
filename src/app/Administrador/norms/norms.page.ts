import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { Inormas } from 'src/app/interfaces/inormas';

@Component({
  selector: 'app-norms',
  templateUrl: './norms.page.html',
  styleUrls: ['./norms.page.scss'],
})
export class NormsPage implements OnInit {

  normas: Inormas;

  constructor(private service: ServiceService) { }

  ngOnInit() {
    this.getNormas();
  }

  getNormas() {
    this.service.getNormasBarrio().subscribe(data => {
      this.normas = data;
    },
    (error) => {console.log(error);
    });
  }

}
