import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewvehicleQRPage } from './newvehicle-qr.page';

describe('NewvehicleQRPage', () => {
  let component: NewvehicleQRPage;
  let fixture: ComponentFixture<NewvehicleQRPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewvehicleQRPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewvehicleQRPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
