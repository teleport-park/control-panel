import { TestBed } from '@angular/core/testing';

import { IncomeTariffsService } from './income-tariffs.service';

describe('IncomeTariffsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IncomeTariffsService = TestBed.get(IncomeTariffsService);
    expect(service).toBeTruthy();
  });
});
