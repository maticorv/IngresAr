import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipeofingressPage } from './tipeofingress.page';

describe('TipeofingressPage', () => {
  let component: TipeofingressPage;
  let fixture: ComponentFixture<TipeofingressPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipeofingressPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipeofingressPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
