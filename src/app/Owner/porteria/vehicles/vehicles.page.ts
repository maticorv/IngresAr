import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { IVehiculo } from 'src/app/interfaces/vehiculo';
import { ServiceService } from 'src/app/services/service.service';
import { Router } from '@angular/router';
import { Iaccount } from 'src/app/interfaces/account';
import { Persona } from '../../../interfaces/persona';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.page.html',
  styleUrls: ['./vehicles.page.scss'],
})
export class VehiclesPage implements OnInit {
  account: Iaccount;
  vehiculos: IVehiculo[];
  persona: Persona;

  constructor(private service: ServiceService, private router: Router, private location: Location) { }

  ngOnInit() {
    this.getAccount();
  }
  ionViewWillEnter() {
    this.getAccount();
  }
  getAccount() {
    this.service.account().subscribe((resp) => {
      this.account = resp;
      this.getVehiculos();
    }
    );
  }
  getVehiculos() {
    this.service.getPersonUser(this.account.id).subscribe((resp) => {
      this.persona = resp;
      this.vehiculos = resp.vehiculos;
      console.log(this.vehiculos);
    }
    );
  }
  Eliminar(indx: number) {
    this.persona.vehiculos.splice(indx, 1);
    this.service.putPersona(this.persona).subscribe();
  }
  nuevoVehiculo() {
    this.router.navigateByUrl('newVehicle');
  }
  myBackButton() {
    this.location.back();
  }

}
