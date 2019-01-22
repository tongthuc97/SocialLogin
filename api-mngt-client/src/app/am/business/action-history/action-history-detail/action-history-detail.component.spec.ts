import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionHistoryDetailComponent } from './action-history-detail.component';

describe('ActionHistoryDetailComponent', () => {
  let component: ActionHistoryDetailComponent;
  let fixture: ComponentFixture<ActionHistoryDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionHistoryDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionHistoryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
