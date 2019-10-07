import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageGuardPage } from './manage-guard.page';

describe('ManageGuardPage', () => {
  let component: ManageGuardPage;
  let fixture: ComponentFixture<ManageGuardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageGuardPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageGuardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
