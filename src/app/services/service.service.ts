import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Persona } from '../interfaces/persona';
import { Observable } from 'rxjs';
import { Imarca } from '../interfaces/marca';
import { Vehiculo } from '../interfaces/vehiculo';
import { Icolor } from '../interfaces/color';
import { Empresa } from '../interfaces/empresa';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  url = 'http://192.168.0.106:8080/api/';

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

  borrarToken() {
    localStorage.removeItem('token');
    console.log('token eliminado');
  }

  getPersona(dni: number) {
    const token = this.leerToken();
    const headers = new HttpHeaders({ Authorization : 'Bearer ' + token });
    return this.http.get( this.url + 'personas/personasdni/' + dni, {headers}).pipe(map(data => data as Persona));
  }

  postPersona(nombrePersona: string, apellidoPersona: string, dniPersona: number, telefonoPersona: number) {
    const token = this.leerToken();
    const headers = new HttpHeaders({ Authorization : 'Bearer ' + token});
    const params = {nombrePersona, apellidoPersona, dniPersona, telefonoPersona};
    return this.http.post( this.url + 'personas', params, {headers}).pipe(map(data => data));
  }

  getEmpresa() {
    const token = this.leerToken();
    const headers = new HttpHeaders({ Authorization : 'Bearer ' + token });
    return this.http.get( this.url + 'empresas', {headers}).pipe(map(data => data as Empresa));
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

  getMarca(): Observable <Imarca[]> {
    const token = this.leerToken();
    const headers = new HttpHeaders({ Authorization : 'Bearer ' + token });
    return this.http.get( this.url + 'marcas', {headers}).pipe(map(data => data as Imarca[] ));
  }

  getMarcaByNombre(id: string): Observable<Imarca[]> {
    const token = this.leerToken();
    const headers = new HttpHeaders({ Authorization : 'Bearer ' + token});
    return this.http.get( this.url + 'marcas/nombremarcas/' + id, {headers}).pipe(map(data => data as Imarca[]));
  }

  getColors(): Observable<Icolor[]> {
    const token = this.leerToken();
    const headers = new HttpHeaders({ Authorization : 'Bearer ' + token});
    return this.http.get( this.url + 'colors', {headers}).pipe(map(data => data as Icolor[]));
  }

  getSeguros() {
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

  postEmpresa(nombreEmpresa: string) {
    const token = this.leerToken();
    const headers = new HttpHeaders({ Authorization : 'Bearer ' + token});
    const params = {nombreEmpresa};
    return this.http.post(this.url + 'empresas', params, {headers}).pipe(map(data => data));
  }

  postPlanillaIngreso() {
    const token = this.leerToken;
    const headers = new HttpHeaders({ Authorization : 'Bearer ' + token});
    const params = {};
    return this.http.post( this.url + 'planilla-ingreso-egreso', params, {headers}).pipe(map(date => date));
  }

  postPlanillaEgreso() {
    const token = this.leerToken;
    const headers = new HttpHeaders({ Authorization : 'Bearer ' + token});
    const params = {};
    return this.http.put( this.url + 'planilla-ingreso-egreso', params, {headers}).pipe(map(date => date));
  }

  getPersonasDomicilio(lote: string) {
    const token = this.leerToken();
    const headers = new HttpHeaders({ Authorization : 'Bearer ' + token});
    return this.http.get( this. url + 'domicilios/domiciliospersona/' + lote, {headers}).pipe(map(data => data as Persona));
  }
}
