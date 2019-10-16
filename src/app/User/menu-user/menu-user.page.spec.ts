import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuUserPage } from './menu-user.page';

describe('MenuUserPage', () => {
  let component: MenuUserPage;
  let fixture: ComponentFixture<MenuUserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuUserPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
