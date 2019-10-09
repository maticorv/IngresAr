import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-common-space',
  templateUrl: './new-common-space.page.html',
  styleUrls: ['./new-common-space.page.scss'],
})
export class NewCommonSpacePage implements OnInit {

  foto: string;
  horaDesde = '2019-10-07T00:00:00-03:00';
  horaHasta = '2019-10-07T00:00:00-03:00';
  periodo = '2019-10-07T00:00:00-03:00';

  constructor() { }

  ngOnInit() {
  }

}
