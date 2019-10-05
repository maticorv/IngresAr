import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonasDentroEstablecimientoPage } from './personas-dentro-establecimiento.page';

describe('PersonasDentroEstablecimientoPage', () => {
  let component: PersonasDentroEstablecimientoPage;
  let fixture: ComponentFixture<PersonasDentroEstablecimientoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonasDentroEstablecimientoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonasDentroEstablecimientoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
