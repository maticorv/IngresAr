import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Events3Page } from './events3.page';

describe('Events3Page', () => {
  let component: Events3Page;
  let fixture: ComponentFixture<Events3Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Events3Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Events3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
