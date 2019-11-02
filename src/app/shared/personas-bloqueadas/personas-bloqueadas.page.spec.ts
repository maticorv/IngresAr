import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PersonasBloqueadasPage } from './personas-bloqueadas.page';

describe('PersonasBloqueadasPage', () => {
  let component: PersonasBloqueadasPage;
  let fixture: ComponentFixture<PersonasBloqueadasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonasBloqueadasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PersonasBloqueadasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
