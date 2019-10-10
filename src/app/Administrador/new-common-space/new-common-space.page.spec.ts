import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCommonSpacePage } from './new-common-space.page';

describe('NewCommonSpacePage', () => {
  let component: NewCommonSpacePage;
  let fixture: ComponentFixture<NewCommonSpacePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewCommonSpacePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCommonSpacePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
