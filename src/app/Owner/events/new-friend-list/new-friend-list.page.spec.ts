import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFriendListPage } from './new-friend-list.page';

describe('NewFriendListPage', () => {
  let component: NewFriendListPage;
  let fixture: ComponentFixture<NewFriendListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewFriendListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewFriendListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
