import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProcessingressPage } from './processingress.page';

describe('ProcessingressPage', () => {
  let component: ProcessingressPage;
  let fixture: ComponentFixture<ProcessingressPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessingressPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProcessingressPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
