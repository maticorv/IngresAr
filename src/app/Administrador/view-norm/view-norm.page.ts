import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceService } from '../../services/service.service';
import { Inormas } from '../../interfaces/inormas';

@Component({
  selector: 'app-view-norm',
  templateUrl: './view-norm.page.html',
  styleUrls: ['./view-norm.page.scss'],
})
export class ViewNormPage implements OnInit {

  norma: Inormas;


  constructor(private router: Router, private activatedRoute: ActivatedRoute, private service: ServiceService) { }

  ngOnInit() {
    this.obtenerNorma();
  }

  obtenerNorma() {
    this.service.getNorma(this.activatedRoute.snapshot.params.id).subscribe(data => {
      this.norma = data;
    },
    (error) => { console.log(error);
    });
  }

}
