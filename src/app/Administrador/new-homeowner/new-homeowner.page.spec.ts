import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewHomeownerPage } from './new-homeowner.page';

describe('NewHomeownerPage', () => {
  let component: NewHomeownerPage;
  let fixture: ComponentFixture<NewHomeownerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewHomeownerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewHomeownerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
