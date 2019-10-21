import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PorteriaPage } from './porteria.page';

describe('PorteriaPage', () => {
  let component: PorteriaPage;
  let fixture: ComponentFixture<PorteriaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PorteriaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PorteriaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
