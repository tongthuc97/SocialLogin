import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryParamConditionComponent } from './query-param-condition.component';

describe('QueryParamConditionComponent', () => {
  let component: QueryParamConditionComponent;
  let fixture: ComponentFixture<QueryParamConditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryParamConditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryParamConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
