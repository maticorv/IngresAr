import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewcompanionPage } from './newcompanion.page';

describe('NewcompanionPage', () => {
  let component: NewcompanionPage;
  let fixture: ComponentFixture<NewcompanionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewcompanionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewcompanionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
