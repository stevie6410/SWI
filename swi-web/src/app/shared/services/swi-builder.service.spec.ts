/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SwiBuilderService } from './swi-builder.service';

describe('SwiBuilderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SwiBuilderService]
    });
  });

  it('should ...', inject([SwiBuilderService], (service: SwiBuilderService) => {
    expect(service).toBeTruthy();
  }));
});
