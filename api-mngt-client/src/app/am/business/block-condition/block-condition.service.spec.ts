import { TestBed, inject } from '@angular/core/testing';

import { BlockConditionService } from './block-condition.service';

describe('BlockConditionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BlockConditionService]
    });
  });

  it('should be created', inject([BlockConditionService], (service: BlockConditionService) => {
    expect(service).toBeTruthy();
  }));
});
