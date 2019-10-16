import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchGuardPage } from './search-guard.page';

describe('SearchGuardPage', () => {
  let component: SearchGuardPage;
  let fixture: ComponentFixture<SearchGuardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchGuardPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchGuardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
