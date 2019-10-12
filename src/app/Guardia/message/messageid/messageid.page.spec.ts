import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageidPage } from './messageid.page';

describe('MessageidPage', () => {
  let component: MessageidPage;
  let fixture: ComponentFixture<MessageidPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageidPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageidPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
