import { TestBed } from '@angular/core/testing';

import { PagenavService } from './pagenav.service';

describe('PagenavService', () => {
  let service: PagenavService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PagenavService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
