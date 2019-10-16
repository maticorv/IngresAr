import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPersonHomeowenerPage } from './search-person-homeowener.page';

describe('SearchPersonHomeowenerPage', () => {
  let component: SearchPersonHomeowenerPage;
  let fixture: ComponentFixture<SearchPersonHomeowenerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchPersonHomeowenerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPersonHomeowenerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
