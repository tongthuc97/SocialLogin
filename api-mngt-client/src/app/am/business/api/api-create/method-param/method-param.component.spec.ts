import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MethodParamComponent } from './method-param.component';

describe('MethodParamComponent', () => {
  let component: MethodParamComponent;
  let fixture: ComponentFixture<MethodParamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MethodParamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MethodParamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
