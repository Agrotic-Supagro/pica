import { TestBed } from '@angular/core/testing';

import { ConstructioncarteService } from './constructioncarte.service';

describe('ConstructioncarteService', () => {
  let service: ConstructioncarteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConstructioncarteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
