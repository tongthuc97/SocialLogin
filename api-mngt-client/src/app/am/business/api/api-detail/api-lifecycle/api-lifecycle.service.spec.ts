import { TestBed, inject } from '@angular/core/testing';

import { ApiLifecycleService } from './api-lifecycle.service';

describe('MinistryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiLifecycleService]
    });
  });

  it('should be created', inject([ApiLifecycleService], (service: ApiLifecycleService) => {
    expect(service).toBeTruthy();
  }));
});
