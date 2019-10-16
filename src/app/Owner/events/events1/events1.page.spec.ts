import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Events1Page } from './events1.page';

describe('Events1Page', () => {
  let component: Events1Page;
  let fixture: ComponentFixture<Events1Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Events1Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Events1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
