import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartCreateComponent } from './start-create.component';

describe('StartCreateComponent', () => {
  let component: StartCreateComponent;
  let fixture: ComponentFixture<StartCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
