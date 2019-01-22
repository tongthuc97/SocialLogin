import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiusageComponent } from './api-usage.component';

describe('ApiusageComponent', () => {
  let component: ApiusageComponent;
  let fixture: ComponentFixture<ApiusageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiusageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiusageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
