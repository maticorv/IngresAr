import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPersonGuardPage } from './new-person-guard.page';

describe('NewPersonGuardPage', () => {
  let component: NewPersonGuardPage;
  let fixture: ComponentFixture<NewPersonGuardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPersonGuardPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPersonGuardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
