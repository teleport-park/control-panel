import { TestBed } from '@angular/core/testing';

import { VrGamesService } from './vr-games.service';

describe('VrGamesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VrGamesService = TestBed.get(VrGamesService);
    expect(service).toBeTruthy();
  });
});
