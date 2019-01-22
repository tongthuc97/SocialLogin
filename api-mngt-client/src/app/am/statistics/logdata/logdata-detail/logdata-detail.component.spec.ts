import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogdataDetailComponent } from './logdata-detail.component';

describe('LogdataDetailComponent', () => {
  let component: LogdataDetailComponent;
  let fixture: ComponentFixture<LogdataDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogdataDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogdataDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
