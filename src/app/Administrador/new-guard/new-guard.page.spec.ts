import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewGuardPage } from './new-guard.page';

describe('NewGuardPage', () => {
  let component: NewGuardPage;
  let fixture: ComponentFixture<NewGuardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewGuardPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewGuardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
