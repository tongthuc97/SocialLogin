import { TestBed, inject } from '@angular/core/testing';

import { ActionHistoryService } from './action-history.service';

describe('ActionHistoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActionHistoryService]
    });
  });

  it('should be created', inject([ActionHistoryService], (service: ActionHistoryService) => {
    expect(service).toBeTruthy();
  }));
});
