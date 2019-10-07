import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventReportsPage } from './event-reports.page';

describe('EventReportsPage', () => {
  let component: EventReportsPage;
  let fixture: ComponentFixture<EventReportsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventReportsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventReportsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
