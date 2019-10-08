import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EgressPagePage } from './egress-page.page';

describe('EgressPagePage', () => {
  let component: EgressPagePage;
  let fixture: ComponentFixture<EgressPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EgressPagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EgressPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
