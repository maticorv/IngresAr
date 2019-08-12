import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SinginPage } from './singin.page';

describe('SinginPage', () => {
  let component: SinginPage;
  let fixture: ComponentFixture<SinginPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SinginPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SinginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
