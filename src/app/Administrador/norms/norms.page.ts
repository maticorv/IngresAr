import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { Inormas } from 'src/app/interfaces/inormas';
import { Router } from '@angular/router';

@Component({
  selector: 'app-norms',
  templateUrl: './norms.page.html',
  styleUrls: ['./norms.page.scss'],
})
export class NormsPage implements OnInit {

  normas: Inormas;

  constructor(private service: ServiceService, private router: Router) { }

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

}
