import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfileAdministratorPage } from './edit-profile-administrator.page';

describe('EditProfileAdministratorPage', () => {
  let component: EditProfileAdministratorPage;
  let fixture: ComponentFixture<EditProfileAdministratorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditProfileAdministratorPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProfileAdministratorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
