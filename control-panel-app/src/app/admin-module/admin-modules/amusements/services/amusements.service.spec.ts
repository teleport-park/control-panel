import { TestBed } from '@angular/core/testing';

import { AmusementsService } from './amusements.service';

describe('AmusementsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AmusementsService = TestBed.get(AmusementsService);
    expect(service).toBeTruthy();
  });
});
