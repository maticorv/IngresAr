import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NormsPage } from './norms.page';

describe('NormsPage', () => {
  let component: NormsPage;
  let fixture: ComponentFixture<NormsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NormsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NormsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
