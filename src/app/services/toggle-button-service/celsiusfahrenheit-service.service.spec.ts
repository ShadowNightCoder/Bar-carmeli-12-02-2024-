import { TestBed } from '@angular/core/testing';

import { CelsiusfahrenheitServiceService } from './celsiusfahrenheit-service.service';

describe('CelsiusfahrenheitServiceService', () => {
  let service: CelsiusfahrenheitServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CelsiusfahrenheitServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
