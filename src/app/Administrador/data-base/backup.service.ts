import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Iaccount } from 'src/app/interfaces/account';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { debug } from 'util';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { element } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class BackupService {
  url = 'http://ingresar.ddns.net:8080/api/';
  datos: any;

  constructor(private http: HttpClient) { }

  descargar(entity: string) {
    this.getEntity(entity).toPromise().then(res => this.downloadFile(entity));
  }

  downloadFile(filename= 'data') {
    let csvData;
    const keys = [];
    for (const indx in this.datos[0]) {
      if (indx) {
        keys.push(indx);
      }
    }
      // tslint:disable-next-line:max-line-length
    csvData = this.ConvertToCSV(this.datos, keys);
    const blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
    const dwldLink = document.createElement('a');
    const url = URL.createObjectURL(blob);
    const isSafariBrowser = navigator.userAgent.indexOf('Safari') !== -1 && navigator.userAgent.indexOf('Chrome') === -1;
    // if Safari open in new window to save file with random filename.
    if (isSafariBrowser) {
        dwldLink.setAttribute('target', '_blank');
    }
    dwldLink.setAttribute('href', url);
    dwldLink.setAttribute('download', filename + '.csv');
    dwldLink.style.visibility = 'hidden';
    document.body.appendChild(dwldLink);
    dwldLink.click();
    document.body.removeChild(dwldLink);
}

ConvertToCSV(objArray, headerList) {
     const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
     let str = '';
     let row = '';
     for (let index = 0; index < headerList.length; index++) {
       const element = array[index];
       row += headerList[index] + ',';
     }
     row = row.slice(0, -1);
     str += row + '\r\n';
     for (let i = 0; i < array.length; i++) {
         let line = '';
         for (let index = 0; index < headerList.length; index++) {
           const element = array[index];
           const head = headerList[index];
           line +=  array[i][head] + ',';
         }
         str += line + '\r\n';
     }
     return str;
 }
 leerToken() {
    if (localStorage.getItem('token')) {
      return(localStorage.getItem('token'));
    } else {
      return('');
    }
  }
 getEntity(entity: string) {
    const token = this.leerToken();
    const headers = new HttpHeaders({ Authorization : 'Bearer ' + token });
    // tslint:disable-next-line: max-line-length
    return this.http.get( this.url + entity, {headers} ).pipe(map(data => this.datos = data));
  }
}
