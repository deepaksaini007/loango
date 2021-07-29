import { TestBed } from '@angular/core/testing';

import { MasterItemService } from './master-item.service';

describe('MasterItemService', () => {
  let service: MasterItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MasterItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
