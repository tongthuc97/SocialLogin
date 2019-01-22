import { TestBed, inject } from '@angular/core/testing';

import { ApiLcService } from './api-lc.service';

describe('MinistryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiLcService]
    });
  });

  it('should be created', inject([ApiLcService], (service: ApiLcService) => {
    expect(service).toBeTruthy();
  }));
});
