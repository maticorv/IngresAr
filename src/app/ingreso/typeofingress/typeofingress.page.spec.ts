import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeofingressPage } from './typeofingress.page';

describe('TypeofingressPage', () => {
  let component: TypeofingressPage;
  let fixture: ComponentFixture<TypeofingressPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeofingressPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeofingressPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
