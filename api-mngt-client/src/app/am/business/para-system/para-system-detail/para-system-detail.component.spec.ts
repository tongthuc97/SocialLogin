import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParaSystemDetailComponent } from './para-system-detail.component';

describe('ParaSystemDetailComponent', () => {
  let component: ParaSystemDetailComponent;
  let fixture: ComponentFixture<ParaSystemDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParaSystemDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParaSystemDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
