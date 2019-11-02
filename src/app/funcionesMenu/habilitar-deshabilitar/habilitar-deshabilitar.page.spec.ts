import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HabilitarDeshabilitarPage } from './habilitar-deshabilitar.page';

describe('HabilitarDeshabilitarPage', () => {
  let component: HabilitarDeshabilitarPage;
  let fixture: ComponentFixture<HabilitarDeshabilitarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HabilitarDeshabilitarPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HabilitarDeshabilitarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
