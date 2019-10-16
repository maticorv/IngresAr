import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPersonHomeowenerPage } from './new-person-homeowener.page';

describe('NewPersonHomeowenerPage', () => {
  let component: NewPersonHomeowenerPage;
  let fixture: ComponentFixture<NewPersonHomeowenerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPersonHomeowenerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPersonHomeowenerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
