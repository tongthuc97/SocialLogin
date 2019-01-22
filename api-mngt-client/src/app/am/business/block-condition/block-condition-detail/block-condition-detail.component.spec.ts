import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockConditionDetailComponent } from './block-condition-detail.component';

describe('BlockConditionDetailComponent', () => {
  let component: BlockConditionDetailComponent;
  let fixture: ComponentFixture<BlockConditionDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockConditionDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockConditionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
