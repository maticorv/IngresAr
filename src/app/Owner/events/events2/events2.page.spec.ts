import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Events2Page } from './events2.page';

describe('Events2Page', () => {
  let component: Events2Page;
  let fixture: ComponentFixture<Events2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Events2Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Events2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
