import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewIngresoEgresoPage } from './view-ingreso-egreso.page';

describe('ViewIngresoEgresoPage', () => {
  let component: ViewIngresoEgresoPage;
  let fixture: ComponentFixture<ViewIngresoEgresoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewIngresoEgresoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewIngresoEgresoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
