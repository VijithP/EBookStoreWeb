import { TestBed } from '@angular/core/testing';

import { BookfunctionalityService } from './bookfunctionality.service';

describe('BookfunctionalityService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BookfunctionalityService = TestBed.get(BookfunctionalityService);
    expect(service).toBeTruthy();
  });
});
