import { TestBed } from '@angular/core/testing';

import { PlanjoueurService } from './planjoueur.service';

describe('PlanjoueurService', () => {
  let service: PlanjoueurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanjoueurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
