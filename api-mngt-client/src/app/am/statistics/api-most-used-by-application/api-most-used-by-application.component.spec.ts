import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiMostUsedByApplicationComponent } from './api-most-used-by-application.component';

describe('ApiMostUsedByApplicationComponent', () => {
  let component: ApiMostUsedByApplicationComponent;
  let fixture: ComponentFixture<ApiMostUsedByApplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiMostUsedByApplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiMostUsedByApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
