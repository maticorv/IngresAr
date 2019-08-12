import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewpersonPage } from './newperson.page';

describe('NewpersonPage', () => {
  let component: NewpersonPage;
  let fixture: ComponentFixture<NewpersonPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewpersonPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewpersonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
