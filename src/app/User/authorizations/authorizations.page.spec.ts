import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AuthorizationsPage } from './authorizations.page';

describe('AuthorizationsPage', () => {
  let component: AuthorizationsPage;
  let fixture: ComponentFixture<AuthorizationsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorizationsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AuthorizationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
