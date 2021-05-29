import { TestBed } from '@angular/core/testing';

import { GroupsInteractionService } from './groups-interaction.service';

describe('GroupsInteractionService', () => {
  let service: GroupsInteractionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupsInteractionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
