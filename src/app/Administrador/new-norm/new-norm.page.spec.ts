import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewNormPage } from './new-norm.page';

describe('NewNormPage', () => {
  let component: NewNormPage;
  let fixture: ComponentFixture<NewNormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewNormPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewNormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
