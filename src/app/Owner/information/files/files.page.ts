import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../../services/service.service';
import { Inormas } from '../../../interfaces/inormas';
import { Router } from '@angular/router';

@Component({
  selector: 'app-files',
  templateUrl: './files.page.html',
  styleUrls: ['./files.page.scss'],
})
export class FilesPage implements OnInit {

  constructor(private service: ServiceService, private router: Router) { }

  normas: Inormas;

  ngOnInit() {
    this.obtenerReglamentos();
  }

  obtenerReglamentos() {
    this.service.getNormasBarrio().subscribe( data => {
      this.normas = data;
      console.log(this.normas);
    },
    (error) => {console.log(error);
    });
  }

  verNorma(i) {
    this.router.navigate(['/view-norm', this.normas[i].id]);
  }

}
