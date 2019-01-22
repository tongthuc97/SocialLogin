import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageServicePortalResponseComponent } from './message-service-portal-resonse.component';

describe('MessageServicePortalDetailComponent', () => {
  let component: MessageServicePortalResponseComponent;
  let fixture: ComponentFixture<MessageServicePortalResponseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageServicePortalResponseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageServicePortalResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
