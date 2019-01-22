import { TestBed, inject } from '@angular/core/testing';

import { LogdataService } from './logdata.service';

describe('LogdataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LogdataService]
    });
  });

  it('should be created', inject([LogdataService], (service: LogdataService) => {
    expect(service).toBeTruthy();
  }));
});
