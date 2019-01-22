import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BlockConditionBusinessComponent } from './block-condition-business.component';

describe('BlockConditionUpdateComponent', () => {
  let component: BlockConditionBusinessComponent;
  let fixture: ComponentFixture<BlockConditionBusinessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockConditionBusinessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockConditionBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
