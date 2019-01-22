import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiVersionComponent } from './api-version.component';

describe('ApiVersionComponent', () => {
  let component: ApiVersionComponent;
  let fixture: ComponentFixture<ApiVersionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiVersionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiVersionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
