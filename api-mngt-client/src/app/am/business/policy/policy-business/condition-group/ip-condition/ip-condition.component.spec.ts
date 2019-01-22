import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IpConditionComponent } from './ip-condition.component';

describe('IpConditionComponent', () => {
  let component: IpConditionComponent;
  let fixture: ComponentFixture<IpConditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IpConditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IpConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
