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
import { Iaccount } from '../interfaces/account';
import { IEspacioComun } from '../interfaces/espacio-comun';
import { IReporte } from '../interfaces/reporte';
import { IMensaje } from '../interfaces/mensaje';
import { Ievent } from '../interfaces/ievent';
import { Account } from '../classes/account';
import { IUser } from '../interfaces/iuser';
import { IFriendsList } from '../interfaces/ifriends-list';
import { IDetalleEvento } from '../interfaces/idetalle-evento';
import { IQr } from '../interfaces/iqr';
import { IDomicilio } from '../interfaces/idomicilio';
import { IAseguradora } from '../interfaces/aseguradora';
import { Iseguro } from '../interfaces/seguro';
import { IPersonaEstado } from '../interfaces/ipersona-estado';
import { ICarnet } from '../interfaces/icarnet';
import { IArt } from '../interfaces/iart';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  url = 'http://ingresar.ddns.net:8080/api/';
  idAccount: number;
  codQR: string;

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const params = {password, username};
    // tslint:disable-next-line: max-line-length
    return this.http.post( this.url + 'authenticate', params, {headers} ).pipe(map(data => this.guardarToken(data[`id_token`])));
  }
  resetPassword(email: string) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    // tslint:disable-next-line: max-line-length
    return this.http.post( this.url + 'account/reset-password/init', email, {headers} );
  }
  account(): Observable<Iaccount> {
    const token = this.leerToken();
    const headers = new HttpHeaders({ Authorization : 'Bearer ' + token });
    // tslint:disable-next-line: max-line-length
    return this.http.get( this.url + 'account', {headers} ).pipe(map(data => data as Iaccount));
  }
  getUserById(id: number): Observable<Iaccount> {
    const token = this.leerToken();
    const headers = new HttpHeaders({ Authorization : 'Bearer ' + token });
    // tslint:disable-next-line: max-line-length
    return this.http.get( this.url + 'users/userid/' + id, {headers} ).pipe(map(data => data as Iaccount));
  }
  postAccount(account) {
    const token = this.leerToken();
    const headers = new HttpHeaders({ Authorization : 'Bearer ' + token});
    const params = account;
    return this.http.post( this.url + 'account', params, {headers}).pipe(map(data => data as Iaccount));
  }
  getUsers(): Observable<Iaccount[]> {
    const token = this.leerToken();
    const headers = new HttpHeaders({ Authorization : 'Bearer ' + token });
    // tslint:disable-next-line: max-line-length
    return this.http.get( this.url + 'users', {headers} ).pipe(map(data => data as Iaccount[]));
  }

  getUserByLogin(login) {
    const token = this.leerToken();
    const headers = new HttpHeaders({ Authorization : 'Bearer ' + token });
    return this.http.get( this.url + 'users/' + login, {headers} ).pipe(map(data => data as IUser));
  }

  register( email: string, langKey: string, login: string, password: string, firstName: string, lastName: string) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const params = {login, langKey, email, password, firstName, lastName};
    // tslint:disable-next-line: max-line-length
    return this.http.post( this.url + 'register', params, {headers}).pipe(map(data => data as IUser));
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

  getAllPersonas() {
    const token = this.leerToken();
    const headers = new HttpHeaders({ Authorization : 'Bearer ' + token });
    return this.http.get( this.url + 'personas', {headers}).pipe(map(data => data as Persona[]));
  }

  putPersona(id, nombrePersona, apellidoPersona, dniPersona, telefonoPersona, personaEstado, personaUser, personabarrio, vehiculos) {
    const token = this.leerToken();
    const params = {id, nombrePersona, apellidoPersona, dniPersona, telefonoPersona, personaEstado, personaUser, personabarrio, vehiculos};
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', Accept: 'application/json', Authorization : 'Bearer ' + token});
    return this.http.put(this.url + 'personas', params, {headers}).pipe(map(data => data as Persona));
  }

  // tslint:disable-next-line: max-line-length
  postPersona(nombrePersona: string, apellidoPersona: string, dniPersona: number, telefonoPersona: number, personaEstado, personaUser, personabarrio, vehiculos) {
    const token = this.leerToken();
    const headers = new HttpHeaders({ Authorization : 'Bearer ' + token});
    const params = {nombrePersona, apellidoPersona, dniPersona, telefonoPersona, personaEstado, personaUser, personabarrio, vehiculos};
    return this.http.post( this.url + 'personas', params, {headers}).pipe(map(data => data as Persona));
  }
  getPersonaRol(rol: string): Observable <Persona[]> {
    const token = this.leerToken();
    const headers = new HttpHeaders({ Authorization : 'Bearer ' + token });
    return this.http.get( this.url + 'persona/personarol/?role=' + rol, {headers}).pipe(map(data => data as Persona[]));
  }

  // tslint:disable-next-line: max-line-length
  postPersonaVehiculo(id, nombrePersona, apellidoPersona, dniPersona, telefonoPersona, personaEstado, personaUser, personabarrio, vehiculos) {
    const token = this.leerToken();
    const headers = new HttpHeaders({ Authorization : 'Bearer ' + token});
    const params = {id, nombrePersona, apellidoPersona, dniPersona, telefonoPersona, personaEstado, personaUser, personabarrio, vehiculos};
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
  postSeguro(seguro: Iseguro): Observable <Iseguro> {
    const token = this.leerToken();
    const headers = new HttpHeaders({ Authorization : 'Bearer ' + token});
    return this.http.post( this. url + 'seguros', seguro, {headers}).pipe(map(data => data as Iseguro));
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

  getPersonasDomicilio(casa: string, manzana) {
    const token = this.leerToken();
    const headers = new HttpHeaders({ Authorization : 'Bearer ' + token});
    // tslint:disable-next-line: max-line-length
    return this.http.get( this. url + 'domicilios/domiciliospersona/?casaDomicilio=' + casa + '&' + 'manzanaDomicilio=' + manzana, {headers}).pipe(map(data => data as Persona));
  }
  getDomPersona(id: number): Observable<IDomicilio> {
    const token = this.leerToken();
    const headers = new HttpHeaders({ Authorization : 'Bearer ' + token});
    // tslint:disable-next-line: max-line-length
    return this.http.get( this. url + 'dompersona/' + id , {headers}).pipe(map(data => data as IDomicilio));

  }
  getPlanillaIngresoEgresodom(casaDomicilio: string, manzanaDomicilio: string): Observable <IPlanillaIngresoEgreso[]> {
    const token = this.leerToken();
    const headers = new HttpHeaders({ Authorization : 'Bearer ' + token});
    // tslint:disable-next-line: max-line-length
    return this.http.get( this. url + 'planilladomicilio/?casaDomicilio=' + casaDomicilio + '&' + 'manzanaDomicilio=' + manzanaDomicilio, {headers}).pipe(map(data => data as IPlanillaIngresoEgreso[]));
  }


  // Servicio JSON

  getHistorialIngresoEgreso() {
    const token = this.leerToken();
    // tslint:disable-next-line: max-line-length
    const headers = new HttpHeaders({ Authorization : 'Bearer ' + token});
    return this.http.get(this.url + 'planilla-ingreso-egresos', {headers}).pipe(map(data => data as IPlanillaIngresoEgreso[]));
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
  postNovedad(fecha: string, descripcion: string, creada: Iaccount): Observable<Inovedad> {
    const token = this.leerToken();
    const headers = new HttpHeaders({ Authorization : 'Bearer ' + token});
    const params = {fecha, descripcion, creada};
    // tslint:disable-next-line: max-line-length
    return this.http.post(this.url + 'novedades', params, {headers}).pipe(map(data => data as Inovedad));
  }
  getReportes(): Observable<IReporte[]> {
    const token = this.leerToken();
    const headers = new HttpHeaders({ Authorization : 'Bearer ' + token});
    return this.http.get(this.url + 'reportes', {headers}).pipe(map(data => data as IReporte[]));
  }
  postReporte(fecha: string, descripcion: string, creada: Iaccount): Observable<IReporte> {
    const token = this.leerToken();
    const headers = new HttpHeaders({ Authorization : 'Bearer ' + token});
    const params = {fecha, descripcion, creada};
    // tslint:disable-next-line: max-line-length
    return this.http.post(this.url + 'novedades', params, {headers}).pipe(map(data => data as IReporte));
  }
  getMensajes(id: number, iddestino: number): Observable<IMensaje[]> {
    const token = this.leerToken();
    const headers = new HttpHeaders({ Authorization : 'Bearer ' + token});
    return this.http.get(this.url + 'mensajesod/?id=' + id + '&iddestino=' + iddestino  , {headers}).pipe(map(data => data as IMensaje[]));
  }
  postMensaje(fechaHoraMensaje: string, descripcionMensaje: string, userOrigen: Iaccount, userDestino: Iaccount): Observable<IMensaje> {
    const token = this.leerToken();
    console.log(userOrigen, userDestino);
    const headers = new HttpHeaders({ Authorization : 'Bearer ' + token});
    const params = {fechaHoraMensaje, descripcionMensaje, userOrigen, userDestino};
    // tslint:disable-next-line: max-line-length
    return this.http.post(this.url + 'mensajes', params, {headers}).pipe(map(data => data as IMensaje));
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

  getAllEspacioComun(): Observable<IEspacioComun[]> {
    const token = this.leerToken();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', Accept: 'application/json', Authorization : 'Bearer ' + token});
    return this.http.get(this.url + 'espacio-comuns', {headers}).pipe(map(data => data as IEspacioComun[]));
  }

  getEspacioComun(id): Observable<IEspacioComun> {
    const token = this.leerToken();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', Accept: 'application/json', Authorization : 'Bearer ' + token});
    return this.http.get(this.url + 'espacio-comuns/' + id, {headers}).pipe(map(data => data as IEspacioComun));
  }

  // tslint:disable-next-line: max-line-length
  postEspacioComun(nombreEspacioComun, disponibilidadDesde, disponibilidadHasta, fotoEspacioComun, fotoEspacioComunContentType, horaDesde, horaHasta, espacioBarrio, espacioTipos) {
    const token = this.leerToken();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', Accept: 'application/json', Authorization : 'Bearer ' + token});
    // tslint:disable-next-line: max-line-length
    const params = {nombreEspacioComun, disponibilidadDesde, disponibilidadHasta, fotoEspacioComun, fotoEspacioComunContentType, horaDesde, horaHasta, espacioBarrio, espacioTipos};
    return this.http.post(this.url + 'espacio-comuns', params, {headers}).pipe(map(data => data as IEspacioComun));
  }

  // tslint:disable-next-line: max-line-length
  putEspacioComun(id, nombreEspacioComun, disponibilidadDesde, disponibilidadHasta, fotoEspacioComun, fotoEspacioComunContentType, horaDesde, horaHasta, espacioBarrio, espacioTipos) {
    const token = this.leerToken();
    console.log('disponibilidad desde', disponibilidadDesde);
    console.log('disponibilidad hasta', disponibilidadHasta);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', Accept: 'application/json', Authorization : 'Bearer ' + token});
    // tslint:disable-next-line: max-line-length
    const params = {id, nombreEspacioComun, disponibilidadDesde, disponibilidadHasta, fotoEspacioComun, fotoEspacioComunContentType, horaDesde, horaHasta, espacioBarrio, espacioTipos};
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

  getAllEvent() {
    const token = this.leerToken();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', Accept: 'application/json', Authorization : 'Bearer ' + token});
    return this.http.get(this.url + 'eventos', {headers}).pipe(map(data => data as Ievent[]));
  }

  getEventById(id) {
    const token = this.leerToken();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', Accept: 'application/json', Authorization : 'Bearer ' + token});
    return this.http.get(this.url + 'eventos/' + id, {headers}).pipe(map(data => data as Ievent));
  }

  getEventByFecha(fecha) {
    const token = this.leerToken();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', Accept: 'application/json', Authorization : 'Bearer ' + token});
    return this.http.post(this.url + 'eventosfecha/' + fecha, {headers}).pipe(map(data => data as Ievent[]));
  }
  getEventByFechaAndById(fecha: Date, id: number): Observable<Ievent[]> {
    const token = this.leerToken();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', Accept: 'application/json', Authorization : 'Bearer ' + token});
    return this.http.get(this.url + 'espaciofecha/?fecha=' + fecha + '&id=' + id, {headers}).pipe(map(data => data as Ievent[]));
  }
  getEventByEspacio(id: number): Observable<Ievent[]> {
    const token = this.leerToken();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', Accept: 'application/json', Authorization : 'Bearer ' + token});
    return this.http.get(this.url + 'eventosespacio/' + id, {headers}).pipe(map(data => data as Ievent[]));
  }
  getMyEvents(id: number): Observable<Ievent[]> {
    const token = this.leerToken();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', Accept: 'application/json', Authorization : 'Bearer ' + token});
    return this.http.get(this.url + 'eventospersona/' + id, {headers}).pipe(map(data => data as Ievent[]));
  }
  deleteEvent(id: number) {
    const token = this.leerToken();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', Accept: 'application/json', Authorization : 'Bearer ' + token});
    return this.http.delete(this.url + 'eventos/' + id, {headers});
  }


  getUser(email) {
    const token = this.leerToken();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', Accept: 'application/json', Authorization : 'Bearer ' + token});
    return this.http.get(this.url + 'users/email/' + email, {headers}).pipe(map(data => data as IUser));
  }
  getPersonUser(id: number): Observable<Persona> {
    const token = this.leerToken();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', Accept: 'application/json', Authorization : 'Bearer ' + token});
    return this.http.get(this.url + 'persona/userperson/?id=' + id , {headers}).pipe(map(data => data as Persona));
  }
  postEvento(event: Ievent): Observable<Ievent> {
    const token = this.leerToken();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', Accept: 'application/json', Authorization : 'Bearer ' + token });
    // tslint:disable-next-line: max-line-length
    return this.http.post(this.url + 'eventos', event, {headers}).pipe(map(data => data as Ievent));
  }

  putEvento(event: Ievent): Observable<Ievent> {
    const token = this.leerToken();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', Accept: 'application/json', Authorization : 'Bearer ' + token });
    // tslint:disable-next-line: max-line-length
    return this.http.put(this.url + 'eventos', event, {headers}).pipe(map(data => data as Ievent));
  }


  getListaAmigos(dni: number): Observable<IFriendsList[]> {
    const token = this.leerToken();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', Accept: 'application/json', Authorization : 'Bearer ' + token });
    return this.http.get(this.url + 'lista-amigos/dnilista/' + dni, {headers}).pipe(map(data => data as IFriendsList[]));
  }
  // tslint:disable-next-line: max-line-length
  putRegistroIngresoEvento(id, nombreEvento, fecha, horaInicio, horaFin, eventoPeriodo, eventoDomicilio, eventoEspacio, eventoPersona, estadoEvento, eventoDetalles) {
    const token = this.leerToken();
    console.log('Servicio Ingreso a evento');
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', Accept: 'application/json', Authorization : 'Bearer ' + token });
    // tslint:disable-next-line: max-line-length
    const params = {id, nombreEvento, fecha, horaInicio, horaFin, eventoPeriodo, eventoDomicilio, eventoEspacio, eventoPersona, estadoEvento, eventoDetalles};
    return this.http.put(this.url + 'eventos', params, {headers}).pipe(map(data => data));
  }
   // tslint:disable-next-line: max-line-length
  putRegistroEgresoEvento(id, nombreEvento, fecha, horaInicio, horaFin, eventoPeriodo, eventoDomicilio, eventoEspacio, eventoPersona, estadoEvento, eventoDetalles) {
    const token = this.leerToken();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', Accept: 'application/json', Authorization : 'Bearer ' + token });
    // tslint:disable-next-line: max-line-length
    const params = {id, nombreEvento, fecha, horaInicio, horaFin, eventoPeriodo, eventoDomicilio, eventoEspacio, eventoPersona, estadoEvento, eventoDetalles};
    return this.http.put(this.url + 'eventos', params, {headers}).pipe(map(data => data));
  }

  putDetalleEvento(id, horaIngreso, horaEngreso, amigosevento, detallePersonaEvento, detalleEventoVehiculo) {
    const token = this.leerToken();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', Accept: 'application/json', Authorization : 'Bearer ' + token });
    const params = {id, horaIngreso, horaEngreso, amigosevento, detallePersonaEvento, detalleEventoVehiculo};
    return this.http.put(this.url + 'detalle-eventos', params, {headers}).pipe(map( data => data as IDetalleEvento));
  }
  postDetalleEvento(detalleEvento: IDetalleEvento) {
    const token = this.leerToken();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', Accept: 'application/json', Authorization : 'Bearer ' + token });
    return this.http.post(this.url + 'detalle-eventos', detalleEvento, {headers}).pipe(map( data => data as IDetalleEvento));
  }

  deleteFriendList(id) {
    const token = this.leerToken();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', Accept: 'application/json', Authorization : 'Bearer ' + token });
    return this.http.delete(this.url + 'lista-amigos/' + id, {headers}).pipe(map( data => data));
  }

  getListFriendById(id) {
    const token = this.leerToken();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', Accept: 'application/json', Authorization : 'Bearer ' + token });
    return this.http.get(this.url + 'lista-amigos/' + id, {headers}).pipe(map( data => data as IFriendsList));
  }

  putFriend(id, nombreListaAmigos, pertenece, amigos) {
    const token = this.leerToken();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', Accept: 'application/json', Authorization : 'Bearer ' + token });
    const params = {id, nombreListaAmigos, pertenece, amigos};
    return this.http.put(this.url + 'lista-amigos', params, {headers}).pipe(map(data => data));
  }

  ceateFriendList(nombreListaAmigos, pertenece, amigos) {
    const token = this.leerToken();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', Accept: 'application/json', Authorization : 'Bearer ' + token });
    const params = {nombreListaAmigos, pertenece, amigos};
    console.log(params);
    return this.http.post(this.url + 'lista-amigos', params, {headers}).pipe(map(data => data as IFriendsList));
  }

  puFriendList(id, nombreListaAmigos, pertenece, amigos) {
    const token = this.leerToken();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', Accept: 'application/json', Authorization : 'Bearer ' + token });
    const params = {id , nombreListaAmigos, pertenece, amigos};
    console.log(params);
    return this.http.put(this.url + 'lista-amigos', params, {headers}).pipe(map(data => data as IFriendsList));
  }

  crearGuardia(id, nombrePersona, apellidoPersona, dniPersona, telefonoPersona, personaEstado, personaUser, personabarrio, vehiculos) {
    const token = this.leerToken();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', Accept: 'application/json', Authorization : 'Bearer ' + token });
    const params = {id, nombrePersona, apellidoPersona, dniPersona, telefonoPersona, personaEstado, personaUser, personabarrio, vehiculos};
    return this.http.put(this.url + 'personas', params, {headers}).pipe(map(data => data));
  }

  crearPropietario(id, nombrePersona, apellidoPersona, dniPersona, telefonoPersona, personaEstado, personaUser, personabarrio, vehiculos) {
    const token = this.leerToken();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', Accept: 'application/json', Authorization : 'Bearer ' + token });
    const params = {id, nombrePersona, apellidoPersona, dniPersona, telefonoPersona, personaEstado, personaUser, personabarrio, vehiculos};
    return this.http.put(this.url + 'personas', params, {headers}).pipe(map(data => data));
  }

  // tslint:disable-next-line: max-line-length
  cambiarRol(id, login, firstName, lastName, email, imageUrl, activated, langKey, createdBy, createdDate, lastModifiedBy, lastModifiedDate, authorities) {
    const token = this.leerToken();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', Accept: 'application/json', Authorization : 'Bearer ' + token });
    // tslint:disable-next-line: max-line-length
    const params = {id, login, firstName, lastName, email, imageUrl, activated, langKey, createdBy, createdDate, lastModifiedBy, lastModifiedDate, authorities};
    return this.http.put(this.url + 'users', params, {headers}).pipe(map(data => data));
  }
  getVehiculoByDominio(dominio: string): Observable<IVehiculo> {
    const token = this.leerToken();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', Accept: 'application/json', Authorization : 'Bearer ' + token });
    return this.http.get(this.url + 'vehiculos/dominio/' + dominio, {headers}).pipe(map( data => data as IVehiculo));
  }

  getQR() {
    const token = this.leerToken();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', Accept: 'application/json', Authorization : 'Bearer ' + token });
    return this.http.get(this.url + 'qrs', {headers}).pipe(map(data => data as IQr[]));
  }

  getQRByIdPerson(id) {
    const token = this.leerToken();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', Accept: 'application/json', Authorization : 'Bearer ' + token });
    return this.http.get(this.url + 'qrs/domicilioqr/' + id, {headers}).pipe(map(data => data as IQr[]));
  }

  getQRByCodQR(codigoQR) {
    const token = this.leerToken();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', Accept: 'application/json', Authorization : 'Bearer ' + token });
    return this.http.get(this.url + 'qrs/personaqr/' + codigoQR, {headers}).pipe(map(data => data as IQr));
  }

  postQR(codigoQR, fechaFinQR, fotoQR, fotoQRContentType, tipoVisira, qrAutorizador, qrAutorizado, qrDomicilio) {
    const token = this.leerToken();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', Accept: 'application/json', Authorization : 'Bearer ' + token });
    const params = {codigoQR, fechaFinQR, fotoQR, fotoQRContentType, tipoVisira, qrAutorizador, qrAutorizado, qrDomicilio};
    return this.http.post(this.url + 'qrs', params, {headers}).pipe(map(data => data as IQr));
  }
  getQrAutorizado(id: number): Observable<IQr[]> {
    const token = this.leerToken();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', Accept: 'application/json', Authorization : 'Bearer ' + token });
    return this.http.get(this.url + 'qrs/qrautorizado/' + id, {headers}).pipe(map(data => data as IQr[]));
  }

  getPersonasDomicilioByIdPers(id) {
    const token = this.leerToken();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', Accept: 'application/json', Authorization : 'Bearer ' + token });
    return this.http.get(this.url + 'personasdom/domicilio/' + id, {headers}).pipe(map(data => data as Persona));
  }

  getDomicilioById(id) {
    const token = this.leerToken();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', Accept: 'application/json', Authorization : 'Bearer ' + token });
    return this.http.get(this.url + 'dompersona/' + id, {headers}).pipe(map(data => data as IDomicilio));
  }

  postPersonaEstado(nombreEstadoPersona, fecha) {
    const token = this.leerToken();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', Accept: 'application/json', Authorization : 'Bearer ' + token });
    const params = {nombreEstadoPersona, fecha};
    return this.http.post(this.url + 'estado-personas', params, {headers}).pipe(map( data => data as IPersonaEstado));
  }

  putPersonaEstado(id, nombreEstadoPersona, fecha) {
    const token = this.leerToken();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', Accept: 'application/json', Authorization : 'Bearer ' + token });
    const params = {id, nombreEstadoPersona, fecha};
    return this.http.put(this.url + 'estado-personas', params, {headers}).pipe(map( data => data as IPersonaEstado));
  }

  postCarnet(categoria, fechaOtorgamiento, fechaVencimiento, carnetPersona) {
    const token = this.leerToken();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', Accept: 'application/json', Authorization : 'Bearer ' + token });
    const params = {categoria, fechaOtorgamiento, fechaVencimiento, carnetPersona};
    return this.http.post(this.url + 'carnet-de-conducirs', params, {headers}).pipe(map( data => data as ICarnet));
  }

  putCarnet(id, categoria, fechaOtorgamiento, fechaVencimiento, carnetPersona) {
    const token = this.leerToken();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', Accept: 'application/json', Authorization : 'Bearer ' + token });
    const params = {id, categoria, fechaOtorgamiento, fechaVencimiento, carnetPersona};
    return this.http.put(this.url + 'carnet-de-conducirs', params, {headers}).pipe(map( data => data as ICarnet));
  }

  getCarnetByIdPerson(id) {
    const token = this.leerToken();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', Accept: 'application/json', Authorization : 'Bearer ' + token });
    return this.http.get(this.url + 'carnet/persona/' + id, {headers}).pipe(map( data => data as ICarnet));
  }

  getArtByIdPersona(id) {
    const token = this.leerToken();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', Accept: 'application/json', Authorization : 'Bearer ' + token });
    return this.http.get(this.url + 'arts/persona/' + id, {headers}).pipe(map( data => data as IArt));
  }

  postART(fechaVencimientoArt, artDersona) {
    const token = this.leerToken();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', Accept: 'application/json', Authorization : 'Bearer ' + token });
    const params = {fechaVencimientoArt, artDersona};
    return this.http.post(this.url + 'arts/', params, {headers}).pipe(map( data => data as IArt));
  }

  putART(id, fechaVencimientoArt, artDersona) {
    const token = this.leerToken();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', Accept: 'application/json', Authorization : 'Bearer ' + token });
    const params = {id, fechaVencimientoArt, artDersona};
    return this.http.put(this.url + 'arts/', params, {headers}).pipe(map( data => data as IArt));
  }


  getCodQR() {
    return this.codQR;
  }

  setCodQR(codQR) {
    this.codQR = codQR;
  }
  getAseguradora(): Observable<IAseguradora[]> {
    const token = this.leerToken();
    const headers = new HttpHeaders({ Authorization : 'Bearer ' + token });
    // tslint:disable-next-line: max-line-length
    return this.http.get( this.url + 'aseguradoras', {headers} ).pipe(map(data => data as IAseguradora[]));
  }

  getPersonaEnListaAmigo(dni, id) {
    const token = this.leerToken();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', Accept: 'application/json', Authorization : 'Bearer ' + token });
    return this.http.get(this.url + 'listaexiste/?dni=' + dni + '&id=' + id, {headers}).pipe(map(data => data as []));
  }

  getPlanillaIngresoEgresoByID(id) {
    const token = this.leerToken();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', Accept: 'application/json', Authorization : 'Bearer ' + token });
    return this.http.get(this.url + 'planilla-ingreso-egresos/' + id, {headers}).pipe(map(data => data as IPlanillaIngresoEgreso));
  }

}
