import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeofvisitPage } from './typeofvisit.page';

describe('TypeofvisitPage', () => {
  let component: TypeofvisitPage;
  let fixture: ComponentFixture<TypeofvisitPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeofvisitPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeofvisitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
