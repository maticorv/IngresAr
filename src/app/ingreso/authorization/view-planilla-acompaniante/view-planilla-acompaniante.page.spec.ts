import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewPlanillaAcompaniantePage } from './view-planilla-acompaniante.page';

describe('ViewPlanillaAcompaniantePage', () => {
  let component: ViewPlanillaAcompaniantePage;
  let fixture: ComponentFixture<ViewPlanillaAcompaniantePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPlanillaAcompaniantePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewPlanillaAcompaniantePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
