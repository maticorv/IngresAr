import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DnisearchPage } from './dnisearch.page';

describe('DnisearchPage', () => {
  let component: DnisearchPage;
  let fixture: ComponentFixture<DnisearchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DnisearchPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DnisearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
