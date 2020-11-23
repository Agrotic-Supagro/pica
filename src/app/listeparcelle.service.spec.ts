import { TestBed } from '@angular/core/testing';

import { ListeparcelleService } from './listeparcelle.service';

describe('ListeparcelleService', () => {
  let service: ListeparcelleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListeparcelleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
