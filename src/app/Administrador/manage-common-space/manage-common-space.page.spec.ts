import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCommonSpacePage } from './manage-common-space.page';

describe('ManageCommonSpacePage', () => {
  let component: ManageCommonSpacePage;
  let fixture: ComponentFixture<ManageCommonSpacePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageCommonSpacePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageCommonSpacePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
