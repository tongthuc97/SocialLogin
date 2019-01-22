import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageServicePortalComponent } from './message-service-portal.component';

describe('MessageServicePortalComponent', () => {
  let component: MessageServicePortalComponent;
  let fixture: ComponentFixture<MessageServicePortalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageServicePortalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageServicePortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
