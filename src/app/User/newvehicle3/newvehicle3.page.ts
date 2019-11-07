import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/interfaces/persona';
import { Iaccount } from 'src/app/interfaces/account';
import { IVehiculo } from 'src/app/interfaces/vehiculo';
import { ServiceService } from 'src/app/services/service.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import Swal from 'sweetalert2';
import { Vehiculo } from '../../classes/vehiculo';

@Component({
  selector: 'app-newvehicle3',
  templateUrl: './newvehicle3.page.html',
  styleUrls: ['./newvehicle3.page.scss'],
})
export class Newvehicle3Page implements OnInit {
  dominio: string;
  persona: Persona;
  account: Iaccount;
  vehiculo: IVehiculo;

  constructor(private service: ServiceService, private router: Router,
              private toastController: ToastController, private vehiculos: Vehiculo) { }

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
          this.vehiculos.dominio = this.dominio;
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
    // tslint:disable-next-line: max-line-length
    this.service.putPersona(this.persona.id, this.persona.nombrePersona, this.persona.apellidoPersona, this.persona.dniPersona, this.persona.telefonoPersona, this.persona.personaEstado, this.persona.personaUser, this.persona.personabarrio, this.persona.vehiculos).subscribe(data => {
      Swal.fire({
        position: 'center',
        type: 'success',
        title: 'El vehículo ha sido añadido',
        showConfirmButton: false,
        timer: 1500
      }).then((result) => {
        this.router.navigateByUrl('vehicles2');
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
    this.router.navigateByUrl('/newvehicle4');
  }

}
