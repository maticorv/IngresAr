import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EgressPage } from './egress.page';

describe('EgressPage', () => {
  let component: EgressPage;
  let fixture: ComponentFixture<EgressPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EgressPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EgressPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
