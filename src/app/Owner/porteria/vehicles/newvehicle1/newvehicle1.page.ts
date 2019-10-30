import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Persona } from '../../../../interfaces/persona';
import { Iaccount } from '../../../../interfaces/account';
import Swal from 'sweetalert2';
import { Button } from 'protractor';
import { IVehiculo } from '../../../../interfaces/vehiculo';

@Component({
  selector: 'app-newvehicle1',
  templateUrl: './newvehicle1.page.html',
  styleUrls: ['./newvehicle1.page.scss'],
})
export class Newvehicle1Page implements OnInit {
  dominio: string;
  persona: Persona;
  account: Iaccount;
  vehiculo: IVehiculo;

  constructor(private service: ServiceService, private router: Router,
              private toastController: ToastController) { }

  ngOnInit() {
    this.getAccount();
  }
  getAccount() {
    this.service.account().subscribe((resp) => {
      this.account = resp;
      this.getPersona();
    }
    );
  }
  getPersona() {
    this.service.getPersonUser(this.account.id).subscribe((resp) => {
      this.persona = resp;
    }
    );
  }
  onSubmit() {
    Swal.fire({
      allowOutsideClick: false,
      type: 'info',
      text: 'Espere por favor...',
    });
    Swal.showLoading();
    this.service.getVehiculoByDominio(this.dominio).subscribe(data => {
      console.log(data);
      this.vehiculo = data;
      Swal.fire({
        allowOutsideClick: false,
        type: 'info',
        html: '<strong>El vehiculo con dominio </strong>' + this.vehiculo.dominio + '<strong> Marca: </strong>' +
         this.vehiculo.vehiculoMarca.nombreMarca + '<strong> Modelo: </strong>' + this.vehiculo.vehiculoModelo.vehiculoModelo,
         confirmButtonText: 'Agregar',
      }).then((result) => {
        if (result.value) {
          this.AddVehiculo();
        }
      });
    },
    (error) => {
      console.log(error);
      Swal.fire({
        type: 'error',
        title: 'No se encuentra',
        text: 'El vehículo que esta buscando no existe',
        confirmButtonText: 'Crear Vehículo',
      }).then((result) => {
        if (result.value) {
          this.CrearVehiculo();
        }
      });
    }
    );
  }
  AddVehiculo() {
    Swal.fire({
      allowOutsideClick: false,
      type: 'info',
      text: 'Espere por favor...',
    });
    this.persona.vehiculos.push(this.vehiculo);
    console.log('this.persona :', this.persona);
    this.service.putPersona(this.persona).subscribe(data => {
      Swal.fire({
        position: 'center',
        type: 'success',
        title: 'El vehículo ha sido añadido',
        showConfirmButton: false,
        timer: 1500
      }).then((result) => {
        this.router.navigateByUrl('porteria/vehicles');
    });
    },
    (error) => {
      console.log(error);
      Swal.fire({
        type: 'error',
        title: 'Error al actualizar datos',
        confirmButtonText: 'Aceptar',
      });
    }
    );
  }
  CrearVehiculo() {
    this.router.navigateByUrl('/newVehicle');
  }

}
