import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataBasePage } from './data-base.page';

describe('DataBasePage', () => {
  let component: DataBasePage;
  let fixture: ComponentFixture<DataBasePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataBasePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataBasePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
