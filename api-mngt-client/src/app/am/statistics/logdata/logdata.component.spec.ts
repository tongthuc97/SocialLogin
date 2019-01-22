import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogdataComponent } from './logdata.component';

describe('LogdataComponent', () => {
  let component: LogdataComponent;
  let fixture: ComponentFixture<LogdataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogdataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
