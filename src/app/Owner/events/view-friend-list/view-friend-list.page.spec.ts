import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFriendListPage } from './view-friend-list.page';

describe('ViewFriendListPage', () => {
  let component: ViewFriendListPage;
  let fixture: ComponentFixture<ViewFriendListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewFriendListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFriendListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
