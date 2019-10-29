import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Newvehicle4Page } from './newvehicle4.page';

describe('Newvehicle4Page', () => {
  let component: Newvehicle4Page;
  let fixture: ComponentFixture<Newvehicle4Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Newvehicle4Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Newvehicle4Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
