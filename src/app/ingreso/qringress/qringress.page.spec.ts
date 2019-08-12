import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QringressPage } from './qringress.page';

describe('QringressPage', () => {
  let component: QringressPage;
  let fixture: ComponentFixture<QringressPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QringressPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QringressPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
