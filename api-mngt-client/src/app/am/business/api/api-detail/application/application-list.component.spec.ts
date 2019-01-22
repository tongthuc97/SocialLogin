import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ApplicationChildList } from './application-list.component';


describe('ApplicationComponent', () => {
  let component: ApplicationChildList;
  let fixture: ComponentFixture<ApplicationChildList>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationChildList ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationChildList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
