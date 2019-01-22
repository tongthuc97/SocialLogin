import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParaSystemComponent } from './para-system.component';

describe('ParaSystemComponent', () => {
  let component: ParaSystemComponent;
  let fixture: ComponentFixture<ParaSystemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParaSystemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParaSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
