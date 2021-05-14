import { TestBed } from '@angular/core/testing';

import { SaveNotesService } from './save-notes.service';

describe('SaveCredentialsService', () => {
  let service: SaveNotesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaveNotesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
