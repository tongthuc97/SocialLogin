import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponseMessage2Component } from './response-message-2.component';

describe('ResponseMessage2Component', () => {
  let component: ResponseMessage2Component;
  let fixture: ComponentFixture<ResponseMessage2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResponseMessage2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponseMessage2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
