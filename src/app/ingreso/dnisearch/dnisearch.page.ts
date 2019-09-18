import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dnisearch',
  templateUrl: './dnisearch.page.html',
  styleUrls: ['./dnisearch.page.scss'],
})
export class DnisearchPage implements OnInit {

  dni: number;

  constructor(private service: ServiceService, private router: Router) { }

  ngOnInit() {
  }

  getpersona() {
    this.service.getPersona(this.dni).subscribe((data) => {
      console.log(data);
      this.router.navigateByUrl('/transport');
    },
    (error) => { console.log(error);
    });
  }

}
