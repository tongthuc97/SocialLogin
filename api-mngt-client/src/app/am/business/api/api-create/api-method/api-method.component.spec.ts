import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiMethodComponent } from './api-method.component';

describe('ApiMethodComponent', () => {
  let component: ApiMethodComponent;
  let fixture: ComponentFixture<ApiMethodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiMethodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
