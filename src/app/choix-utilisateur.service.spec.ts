import { TestBed } from '@angular/core/testing';

import { ChoixUtilisateurService } from './choix-utilisateur.service';

describe('ChoixUtilisateurService', () => {
  let service: ChoixUtilisateurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChoixUtilisateurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
