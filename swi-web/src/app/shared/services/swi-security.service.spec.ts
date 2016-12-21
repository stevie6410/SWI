/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SwiSecurityService } from './swi-security.service';

describe('SwiSecurityService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SwiSecurityService]
    });
  });

  it('should ...', inject([SwiSecurityService], (service: SwiSecurityService) => {
    expect(service).toBeTruthy();
  }));
});
