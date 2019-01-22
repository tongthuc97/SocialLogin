import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JwtClaimConditionComponent } from './jwt-claim-condition.component';

describe('JwtClaimConditionComponent', () => {
  let component: JwtClaimConditionComponent;
  let fixture: ComponentFixture<JwtClaimConditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JwtClaimConditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JwtClaimConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
