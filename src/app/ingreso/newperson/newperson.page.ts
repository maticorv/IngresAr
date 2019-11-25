import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Personas } from 'src/app/classes/persona';
import { ServiceService } from '../../services/service.service';
import { ToastController } from '@ionic/angular';
import { IPersonaEstado } from 'src/app/interfaces/ipersona-estado';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { validateEvents } from 'calendar-utils';

@Component({
  selector: 'app-newperson',
  templateUrl: './newperson.page.html',
  styleUrls: ['./newperson.page.scss'],
})
export class NewpersonPage implements OnInit {

  newPersona: FormGroup;

  dniPersona: number;
  personaEstado: IPersonaEstado;

  constructor(private router: Router, private persona: Personas, private service: ServiceService,
              private toastController: ToastController, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.newPersona = this.formBuilder.group({
      nombrePersona: ['', Validators.required],
      apellidoPersona: ['', Validators.required],
      dniPersona: ['', Validators.required],
      telefonoPersona: ['', [Validators.required , Validators.min(1000000), Validators.max(9999999999)]],
    });
    console.log(this.newPersona.controls.dniPersona.value);
    this.dniPersona = this.persona.dniPersona;
    this.createPersonaEstado();
  }

  createPersonaEstado() {
    this.service.postPersonaEstado('habilitada', new Date()).subscribe(data => {
      this.personaEstado = data;
      console.log('this.personaEstado :', this.personaEstado);
    },
    (error) => {console.log(error);
    });
  }

  crearPersona() {
    this.service.postPersona(this.newPersona.controls.nombrePersona.value,
                             this.newPersona.controls.apellidoPersona.value, this.dniPersona,
                             this.newPersona.controls.telefonoPersona.value, this.personaEstado,
                             null, null, null).subscribe(data => {
      console.log(data);
      this.persona.nombrePersona = data.nombrePersona;
      this.persona.apellidoPersona = data.apellidoPersona;
      this.persona.dniPersona = data.dniPersona;
      this.persona.telefonoPersona = data.telefonoPersona;
      this.persona.id = data.id;
      this.persona.personabarrio = data.personabarrio;
      this.persona.personadomicilios = data.personadomicilios;
      this.persona.personaEstado = data.personaEstado;
      this.persona.personaUser = data.personaUser;
      this.presentToast('La persona se ha creado correctamente');
      this.router.navigateByUrl('/destination');
    },
    (error) => { console.log(error);
                 this.presentToast('La persona no se ha podido crear, intente nuevamente');
    });
  }

  async presentToast(me: string) {
    const toast = await this.toastController.create({
      position: 'middle',
      color: 'dark',
      duration: 2000,
      message: me,
    });
    toast.present();
    setTimeout(() => {
      // this.router.navigateByUrl('/destination');
      },
      2000);
  }

  imprimir() {
    console.log('persona', this.newPersona.controls);
  }

}
