import { TestBed } from '@angular/core/testing';

import { AuthenticationServicesService } from './authentication-services.service';

describe('AuthenticationServicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthenticationServicesService = TestBed.get(AuthenticationServicesService);
    expect(service).toBeTruthy();
  });
});
