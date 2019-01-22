import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiLcComponent } from './api-lc.component';

describe('ApiLcComponent', () => {
  let component: ApiLcComponent;
  let fixture: ComponentFixture<ApiLcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiLcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiLcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
