import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Newvehicle1Page } from './newvehicle1.page';

describe('Newvehicle1Page', () => {
  let component: Newvehicle1Page;
  let fixture: ComponentFixture<Newvehicle1Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Newvehicle1Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Newvehicle1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
