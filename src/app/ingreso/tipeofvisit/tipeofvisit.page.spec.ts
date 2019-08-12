import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipeofvisitPage } from './tipeofvisit.page';

describe('TipeofvisitPage', () => {
  let component: TipeofvisitPage;
  let fixture: ComponentFixture<TipeofvisitPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipeofvisitPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipeofvisitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
