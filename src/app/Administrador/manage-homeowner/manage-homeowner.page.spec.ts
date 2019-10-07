import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageHomeownerPage } from './manage-homeowner.page';

describe('ManageHomeownerPage', () => {
  let component: ManageHomeownerPage;
  let fixture: ComponentFixture<ManageHomeownerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageHomeownerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageHomeownerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
