import { TestBed, inject } from '@angular/core/testing';

import { ApiVersionService } from './api-version.service';

describe('ApiVersionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiVersionService]
    });
  });

  it('should be created', inject([ApiVersionService], (service: ApiVersionService) => {
    expect(service).toBeTruthy();
  }));
});
