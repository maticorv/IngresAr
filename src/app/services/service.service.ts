import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Persona } from '../interfaces/persona';
import { Vehiculo } from '../interfaces/vehiculo';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  url = 'http://192.168.0.105:8080/api/';

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const params = {password, username};
    // tslint:disable-next-line: max-line-length
    return this.http.post( this.url + 'authenticate', params, {headers} ).pipe(map(data => this.guardarToken(data[`id_token`])));

  }

  guardarToken(idToken: string ) {
    localStorage.setItem('token', idToken);
    console.log('token guardado');
  }

  leerToken() {
    if (localStorage.getItem('token')) {
      return(localStorage.getItem('token'));
    } else {
      return('');
    }
  }

  getPersona(dni: number) {
    const token = this.leerToken();
    const headers = new HttpHeaders({ Authorization : 'Bearer ' + token });
    return this.http.get( this.url + 'personas/personasdni/' + dni, {headers}).pipe(map(data => data as Persona));
  }

  getEmpresa() {
    const token = this.leerToken();
    const headers = new HttpHeaders({ Authorization : 'Bearer ' + token });
    return this.http.get( this.url, {headers}).pipe(map(data => data ));
  }

  postReporteIngresoEgreso(fechaDesde: Date, fechaHasta: Date) {
    const token = this.leerToken();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', Authorization: 'Bearer ' + token });
    const params = {fechaDesde, fechaHasta};
    return this.http.post( this.url, params, {headers}).pipe(map(data => data));
  }

  // tslint:disable-next-line: max-line-length
  postVehiculo(a: string, vehiculomarca: number, vehiculocolor: number, vehiculotipo: number, nombrePersona: string, dniPersona: number, apellidoPersona: string) {
    const token = this.leerToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer ' + token });
    const body = JSON.stringify({
      personavehiculo: {
        id: 10,
        dominio : ' moratorium moratorium' ,
        planillaIngresoEgreso : null,
        detalleEvento : null,
        vehiculomarca : null,
        vehiculocolor : null,
        vehiculotipo : null
      },
  });
    // tslint:disable-next-line:max-line-length
    return this.http.post(this.url + 'personas', body, {headers}).pipe(map(data => data));
  }

  getMarca() {
    const token = this.leerToken();
    const headers = new HttpHeaders({ Authorization : 'Bearer ' + token });
    return this.http.get( this.url + 'marcas', {headers}).pipe(map(data => data ));
  }

  getModelo(id: number) {
    const token = this.leerToken();
    const headers = new HttpHeaders({ Authorization : 'Bearer ' + token});
    return this.http.get( this.url + 'modelos/' + id, {headers}).pipe(map(data => data));
  }

  getColor() {
    const token = this.leerToken();
    const headers = new HttpHeaders({ Authorization : 'Bearer ' + token});
    return this.http.get( this.url + 'colors', {headers}).pipe(map(data => data));
  }

  getSeguro() {
    const token = this.leerToken();
    const headers = new HttpHeaders({ Authorization : 'Bearer ' + token});
    return this.http.get( this. url + 'seguros', {headers}).pipe(map(data => data));
  }

  getVechiculo(dni: number) {
    const token = this.leerToken();
    const headers = new HttpHeaders({ Authorization : 'Bearer ' + token});
    // tslint:disable-next-line: max-line-length
    return this.http.get( this.url + 'personas/personasdni/' + dni, {headers}).pipe(map(data => data[`vehiculos`] as Vehiculo));
  }

}
