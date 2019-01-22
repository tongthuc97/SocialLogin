import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ApiProcessComponent } from '../api-process.component';

describe('ApiLcProcessComponent', () => {
  let component: ApiProcessComponent;
  let fixture: ComponentFixture<ApiProcessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiProcessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
