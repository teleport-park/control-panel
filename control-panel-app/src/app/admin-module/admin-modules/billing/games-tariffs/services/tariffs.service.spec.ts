import { TestBed } from '@angular/core/testing';

import { TariffsService } from './tariffs.service';

describe('TariffsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TariffsService = TestBed.get(TariffsService);
    expect(service).toBeTruthy();
  });
});
