import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyBusinessComponent } from './policy-business.component';

describe('PolicyUpdateComponent', () => {
  let component: PolicyBusinessComponent;
  let fixture: ComponentFixture<PolicyBusinessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolicyBusinessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicyBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
