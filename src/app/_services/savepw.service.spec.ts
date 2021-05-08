import { TestBed } from '@angular/core/testing';

import { SavepwService } from './savepw.service';

describe('SavepwService', () => {
  let service: SavepwService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SavepwService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
