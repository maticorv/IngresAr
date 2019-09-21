import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanillaIngresoEgresoPage } from './planilla-ingreso-egreso.page';

describe('PlanillaIngresoEgresoPage', () => {
  let component: PlanillaIngresoEgresoPage;
  let fixture: ComponentFixture<PlanillaIngresoEgresoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanillaIngresoEgresoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanillaIngresoEgresoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
