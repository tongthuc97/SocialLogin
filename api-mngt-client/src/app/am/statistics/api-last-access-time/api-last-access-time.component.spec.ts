import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiLastAccessTimeComponent } from './api-last-access-time.component';

describe('ApiLastAccessTimeComponent', () => {
  let component: ApiLastAccessTimeComponent;
  let fixture: ComponentFixture<ApiLastAccessTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiLastAccessTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiLastAccessTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
