import { TestBed } from '@angular/core/testing';

import { NunuService } from './nunu.service';

describe('NunuService', () => {
  let service: NunuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NunuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
