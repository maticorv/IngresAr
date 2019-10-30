import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Messages1Page } from './messages1.page';

describe('Messages1Page', () => {
  let component: Messages1Page;
  let fixture: ComponentFixture<Messages1Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Messages1Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Messages1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
