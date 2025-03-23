import { TestBed } from '@angular/core/testing';

import { MttRowSelectionService } from './mtt-row-selection.service';

describe('MttRowSelectionService', () => {
  let service: MttRowSelectionService<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MttRowSelectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
