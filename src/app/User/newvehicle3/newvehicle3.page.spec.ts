import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Newvehicle3Page } from './newvehicle3.page';

describe('Newvehicle3Page', () => {
  let component: Newvehicle3Page;
  let fixture: ComponentFixture<Newvehicle3Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Newvehicle3Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Newvehicle3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
