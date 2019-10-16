import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuOwnerPage } from './menu-owner.page';

describe('MenuOwnerPage', () => {
  let component: MenuOwnerPage;
  let fixture: ComponentFixture<MenuOwnerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuOwnerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuOwnerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
