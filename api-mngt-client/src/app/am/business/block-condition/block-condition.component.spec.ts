import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockConditionComponent } from './block-condition.component';

describe('BlockConditionComponent', () => {
  let component: BlockConditionComponent;
  let fixture: ComponentFixture<BlockConditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockConditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
