import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchHomeownerPage } from './search-homeowner.page';

describe('SearchHomeownerPage', () => {
  let component: SearchHomeownerPage;
  let fixture: ComponentFixture<SearchHomeownerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchHomeownerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchHomeownerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
