import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParaSystemBusinessComponent } from './para-system-business.component';

describe('ParaSystemBusinessComponent', () => {
  let component: ParaSystemBusinessComponent;
  let fixture: ComponentFixture<ParaSystemBusinessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParaSystemBusinessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParaSystemBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
