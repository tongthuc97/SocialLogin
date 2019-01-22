import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionCreateComponent } from './subscription-create.component';

describe('SubscriptionCreateComponent', () => {
  let component: SubscriptionCreateComponent;
  let fixture: ComponentFixture<SubscriptionCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscriptionCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
