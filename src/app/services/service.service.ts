import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  url: 'http://192.168.0.101:8080/api/';

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    console.log('login');
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const params = {password, username};
    // tslint:disable-next-line: max-line-length
    return this.http.post( 'http://192.168.0.101:8080/api/authenticate', params, {headers} ).pipe(map(data => this.guardarToken(data[`id_token`])));

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
    return this.http.get( 'http://192.168.0.101:8080/api/personas/dni/' + dni, {headers}).pipe(map(data => data ));
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
    return this.http.post('http://192.168.0.101:8080/api/personas', body, {headers}).pipe(map(data => data));
  }

}
