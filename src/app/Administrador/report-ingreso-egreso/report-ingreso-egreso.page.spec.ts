import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportIngresoEgresoPage } from './report-ingreso-egreso.page';

describe('ReportIngresoEgresoPage', () => {
  let component: ReportIngresoEgresoPage;
  let fixture: ComponentFixture<ReportIngresoEgresoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportIngresoEgresoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportIngresoEgresoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
