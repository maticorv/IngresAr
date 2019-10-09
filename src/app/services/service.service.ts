import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Persona } from '../interfaces/persona';
import { Observable } from 'rxjs';
import { Imarca } from '../interfaces/marca';
import { IVehiculo } from '../interfaces/vehiculo';
import { Icolor } from '../interfaces/color';
import { Empresa } from '../interfaces/empresa';
import { IPlanillaIngresoEgreso } from '../interfaces/planilla-ingreso-egreso';
import { Imodelo } from '../interfaces/modelo';
import { Vehiculo } from '../classes/vehiculo';
import { Inovedad } from '../interfaces/novedad';
import { Inormas } from '../interfaces/inormas';
import { IEspacioComun } from '../interfaces/espacio-comun';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  url = 'http://ingresar.ddns.net:8080/api/';

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const params = {password, username};
    // tslint:disable-next-line: max-line-length
    return this.http.post( this.url + 'authenticate', params, {headers} ).pipe(map(data => this.guardarToken(data[`id_token`])));
  }
  register(login: string, firstName: string, lastName: string, email: string, password: string) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const params = {login, firstName, lastName, email, password};
    // tslint:disable-next-line: max-line-length
    return this.http.post( this.url + 'register', params, {headers});
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
    return this.http.get( this.url + 'personas/dni/' + dni, {headers}).pipe(map(data => data as Persona));
  }

  postPersona(nombrePersona: string, apellidoPersona: string, dniPersona: number, telefonoPersona: number) {
    const token = this.leerToken();
    const headers = new HttpHeaders({ Authorization : 'Bearer ' + token});
    const params = {nombrePersona, apellidoPersona, dniPersona, telefonoPersona};
    return this.http.post( this.url + 'personas', params, {headers}).pipe(map(data => data as Persona));
  }

  postPersonaVehiculo(id, nombrePersona, apellidoPersona, dniPersona, telefonoPersona, vehiculos) {
    const token = this.leerToken();
    const headers = new HttpHeaders({ Authorization : 'Bearer ' + token});
    const params = {id, nombrePersona, apellidoPersona, dniPersona, telefonoPersona, vehiculos};
    return this.http.put(this.url + 'personas', params, {headers}).pipe(map(data => data));
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
  postVehiculo(dominio, vehiculoMarca, vehiculoModelo, segurovehiculo ,  vehiculoColor) {
    const token = this.leerToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer ' + token });
    const params = {dominio, vehiculoMarca, vehiculoModelo, segurovehiculo, vehiculoColor };
    console.log(params);
    // tslint:disable-next-line:max-line-length
    return this.http.post(this.url + 'vehiculos', params, {headers}).pipe(map(data => data as IVehiculo));
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
    return this.http.get( this.url + 'personas/dni/' + dni, {headers}).pipe(map(data => data[`vehiculos`] as IVehiculo));
  }

  postEmpresa(nombreEmpresa: string) {
    const token = this.leerToken();
    const headers = new HttpHeaders({ Authorization : 'Bearer ' + token});
    const params = {nombreEmpresa};
    return this.http.post(this.url + 'empresas', params, {headers}).pipe(map(data => data as Empresa));
  }

  // postPlanillaEgreso() {
  //   const token = this.leerToken;
  //   const headers = new HttpHeaders({ Authorization : 'Bearer ' + token});
  //   const params = {};
  //   return this.http.post( this.url + 'planilla-ingreso-egreso', params, {headers}).pipe(map(date => date));
  // }

  // tslint:disable-next-line: max-line-length
  postPlanillaIngreso(autorizadoPrevio, acompaniantes, fechaIngreso, fechaEgreso, tipovisita, ingresoAPie, planillaBarrio, planillaPersona, planillaQr, planillaDestino, planillaVehiculo, planillaEmpresa, planillaAutorizador, planillaAcompaniantes) {
    const token = this.leerToken();
    // const planillapersona = persona;
    // const planillavehiculo = vehiculo;
    // const planilladestino = destino;
    // const planillaautorizador = autorizador;
    // tslint:disable-next-line: max-line-length
    const headers = new HttpHeaders({ Authorization : 'Bearer ' + token});
    // tslint:disable-next-line: max-line-length
    const params = {autorizadoPrevio, acompaniantes, fechaIngreso, fechaEgreso, tipovisita, ingresoAPie, planillaBarrio, planillaPersona, planillaQr, planillaDestino, planillaVehiculo, planillaEmpresa, planillaAutorizador, planillaAcompaniantes};
    // tslint:disable-next-line: max-line-length
    // const params = {autorizadoPrevio, acompaniantes, fechaIngreso, fechaEgreso, fecha, hora, tipovisita, planillatipo, planillabarrio, planillapersona};
    console.log(headers, params );
    return this.http.post( this.url + 'planilla-ingreso-egresos', params, {headers}).pipe(map(date => date));
  }

  getPersonasDomicilio(lote: string) {
    const token = this.leerToken();
    const headers = new HttpHeaders({ Authorization : 'Bearer ' + token});
    return this.http.get( this. url + 'domicilios/domiciliospersona/' + lote, {headers}).pipe(map(data => data as Persona));
  }


  // Servicio JSON

  getHistorialIngresoEgreso() {
    const token = this.leerToken();
    // tslint:disable-next-line: max-line-length
    const headers = new HttpHeaders({ Authorization : 'Bearer ' + token});
    return this.http.get(this.url + 'planilla-ingreso-egresos', {headers}).pipe(map(data => data as IPlanillaIngresoEgreso));
  }

  getPersonasDentroEstablecimiento() {
    const token = this.leerToken();
    const headers = new HttpHeaders({ Authorization : 'Bearer ' + token});
    return this.http.get(this.url + 'planillaegreso', {headers}).pipe(map(data => data as IPlanillaIngresoEgreso));
  }

  getNovedades(): Observable<Inovedad[]> {
    const token = this.leerToken();
    const headers = new HttpHeaders({ Authorization : 'Bearer ' + token});
    return this.http.get(this.url + 'novedades', {headers}).pipe(map(data => data as Inovedad[]));
  }
  postNovedad(fecha: string, descripcion: string, creada: Persona): Observable<Inovedad> {
    const token = this.leerToken();
    const headers = new HttpHeaders({ Authorization : 'Bearer ' + token});
    const params = {fecha, descripcion, creada};
    // tslint:disable-next-line: max-line-length
    return this.http.post(this.url + 'novedades', params, {headers}).pipe(map(data => data as Inovedad));
  }

  getNormasBarrio() {
    const token = this.leerToken();
    const headers = new HttpHeaders({ Authorization : 'Bearer ' + token});
    return this.http.get(this.url + 'norma-barrios', {headers}).pipe(map(data => data as Inormas));
  }

  getPlanillaEgreso(dni: number) {
    console.log(dni);
    const token = this.leerToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
       Authorization : 'Bearer ' + token});
    return this.http.get(this.url + 'planillaegreso/dni/' + dni, {headers}).pipe(map(data => data as IPlanillaIngresoEgreso));
  }

  // tslint:disable-next-line: max-line-length
  postPlanillaEgreso(id, autorizadoPrevio, acompaniantes, fechaIngreso, fechaEgreso, tipovisita, ingresoAPie, planillaBarrio, planillaPersona, planillaQr, planillaDestino, planillaVehiculo, planillaEmpresa, planillaAutorizador, planillaAcompaniantes) {
    const token = this.leerToken();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', Accept: 'application/json', Authorization : 'Bearer ' + token});
    // tslint:disable-next-line: max-line-length
    const params = {id, autorizadoPrevio, acompaniantes, fechaIngreso, fechaEgreso, tipovisita, ingresoAPie, planillaBarrio, planillaPersona, planillaQr, planillaDestino, planillaVehiculo, planillaEmpresa, planillaAutorizador, planillaAcompaniantes};
    return this.http.put(this.url + 'planilla-ingreso-egresos', params, {headers}).pipe(map(data => data));
  }

  getNorma(id) {
    const token = this.leerToken();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', Accept: 'application/json', Authorization : 'Bearer ' + token});
    return this.http.get(this.url + 'norma-barrios/' + id, {headers}).pipe(map(data => data as Inormas));
  }

  deleteNorma(id) {
    const token = this.leerToken();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', Accept: 'application/json', Authorization : 'Bearer ' + token});
    return this.http.delete(this.url + 'norma-barrios/' + id, {headers}).pipe(map(data => data));
  }

  postNorma(titulonorma, descripcionnorma) {
    const token = this.leerToken();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', Accept: 'application/json', Authorization : 'Bearer ' + token});
    const params = {titulonorma, descripcionnorma};
    return this.http.post(this.url + 'norma-barrios', params, {headers}).pipe(map(data => data as Inormas));
  }

  getAllEspacioComun() {
    const token = this.leerToken();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', Accept: 'application/json', Authorization : 'Bearer ' + token});
    return this.http.get(this.url + 'espacio-comuns', {headers}).pipe(map(data => data as IEspacioComun));
  }

  getEspacioComun(id) {
    const token = this.leerToken();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', Accept: 'application/json', Authorization : 'Bearer ' + token});
    return this.http.get(this.url + 'espacio-comuns/' + id, {headers}).pipe(map(data => data as IEspacioComun));
  }

  // tslint:disable-next-line: max-line-length
  postEspacioComun(id, disponibilidadDesde, disponibilidadHasta, fotoEspacioComun, fotoEspacioComunContentType, horaDesde, horaHasta, espacioBarrio, espacioTipos) {
    const token = this.leerToken();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', Accept: 'application/json', Authorization : 'Bearer ' + token});
    // tslint:disable-next-line: max-line-length
    const params = {id, disponibilidadDesde, disponibilidadHasta, fotoEspacioComun, fotoEspacioComunContentType, horaDesde, horaHasta, espacioBarrio, espacioTipos};
    return this.http.post(this.url + 'espacio-comuns', params, {headers}).pipe(map(data => data as IEspacioComun));
  }

  // tslint:disable-next-line: max-line-length
  putEspacioComun(id, disponibilidadDesde, disponibilidadHasta, fotoEspacioComun, fotoEspacioComunContentType, horaDesde, horaHasta, espacioBarrio, espacioTipos) {
    const token = this.leerToken();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', Accept: 'application/json', Authorization : 'Bearer ' + token});
    // tslint:disable-next-line: max-line-length
    const params = {id, disponibilidadDesde, disponibilidadHasta, fotoEspacioComun, fotoEspacioComunContentType, horaDesde, horaHasta, espacioBarrio, espacioTipos};
    return this.http.put(this.url + 'espacio-comuns', params, {headers}).pipe(map(data => data as IEspacioComun));
  }

  deleteEspacioComun(id) {
    const token = this.leerToken();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', Accept: 'application/json', Authorization : 'Bearer ' + token});
    return this.http.delete(this.url + 'espacio-comuns/' + id, {headers}).pipe(map(data => data));
  }

  getGuardias() {
    const token = this.leerToken();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', Accept: 'application/json', Authorization : 'Bearer ' + token});
    return this.http.get(this.url + '', {headers}).pipe(map(data => data));
  }

  putGuardia() {
    const token = this.leerToken();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', Accept: 'application/json', Authorization : 'Bearer ' + token});
    const params = {};
    return this.http.put(this.url + '', params, {headers}).pipe(map(data => data));
  }

  getPropietarios() {
    const token = this.leerToken();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', Accept: 'application/json', Authorization : 'Bearer ' + token});
    return this.http.get(this.url + '', {headers}).pipe(map(data => data));
  }

  putPropietario() {
    const token = this.leerToken();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', Accept: 'application/json', Authorization : 'Bearer ' + token});
    const params = {};
    return this.http.put(this.url + '', params, {headers}).pipe(map(data => data));
  }

}
