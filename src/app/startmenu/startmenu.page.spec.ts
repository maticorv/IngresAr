import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartmenuPage } from './startmenu.page';

describe('StartmenuPage', () => {
  let component: StartmenuPage;
  let fixture: ComponentFixture<StartmenuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartmenuPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartmenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
