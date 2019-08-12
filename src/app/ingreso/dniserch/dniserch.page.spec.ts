import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DniserchPage } from './dniserch.page';

describe('DniserchPage', () => {
  let component: DniserchPage;
  let fixture: ComponentFixture<DniserchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DniserchPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DniserchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
