import { TestBed } from '@angular/core/testing';

import { ApiOpencpuService } from './api-opencpu.service';

describe('ApiOpencpuService', () => {
  let service: ApiOpencpuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiOpencpuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
