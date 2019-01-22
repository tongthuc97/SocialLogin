import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderFieldConditionComponent } from './header-field-condition.component';

describe('HeaderFieldConditionComponent', () => {
  let component: HeaderFieldConditionComponent;
  let fixture: ComponentFixture<HeaderFieldConditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderFieldConditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderFieldConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
