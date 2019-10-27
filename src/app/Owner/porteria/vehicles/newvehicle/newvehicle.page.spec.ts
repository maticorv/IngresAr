import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewvehiclePage } from './newvehicle.page';

describe('NewvehiclePage', () => {
  let component: NewvehiclePage;
  let fixture: ComponentFixture<NewvehiclePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewvehiclePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewvehiclePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
