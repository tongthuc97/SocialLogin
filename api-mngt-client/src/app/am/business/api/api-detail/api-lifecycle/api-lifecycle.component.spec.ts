import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiLifecycleComponent } from './api-lifecycle.component';

describe('ApiLifecycleComponent', () => {
  let component: ApiLifecycleComponent;
  let fixture: ComponentFixture<ApiLifecycleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiLifecycleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiLifecycleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
