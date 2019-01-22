import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageServicePortalRequestComponent } from './message-service-portal-request.component';

describe('MessageServicePortalRequestComponent', () => {
  let component: MessageServicePortalRequestComponent;
  let fixture: ComponentFixture<MessageServicePortalRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageServicePortalRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageServicePortalRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
