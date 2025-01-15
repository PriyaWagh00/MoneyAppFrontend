import { TestBed } from '@angular/core/testing';

import { TraService } from './tra.service';

describe('TraService', () => {
  let service: TraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
