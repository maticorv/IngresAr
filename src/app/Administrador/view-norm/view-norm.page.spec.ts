import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewNormPage } from './view-norm.page';

describe('ViewNormPage', () => {
  let component: ViewNormPage;
  let fixture: ComponentFixture<ViewNormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewNormPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewNormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
