import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewcompanyPage } from './newcompany.page';

describe('NewcompanyPage', () => {
  let component: NewcompanyPage;
  let fixture: ComponentFixture<NewcompanyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewcompanyPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewcompanyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
