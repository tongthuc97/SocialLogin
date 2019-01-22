import { TestBed, inject } from '@angular/core/testing';

import { ParaSystemService } from './para-system.service';

describe('ParaSystemService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ParaSystemService]
    });
  });

  it('should be created', inject([ParaSystemService], (service: ParaSystemService) => {
    expect(service).toBeTruthy();
  }));
});
