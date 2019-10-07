import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuAdministratorPage } from './menu-administrator.page';

describe('MenuAdministratorPage', () => {
  let component: MenuAdministratorPage;
  let fixture: ComponentFixture<MenuAdministratorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuAdministratorPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuAdministratorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
