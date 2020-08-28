import { TestBed } from '@angular/core/testing';

import { PaginatorHandlerService } from './paginator-handler.service';

describe('PaginatorHandlerService', () => {
  let service: PaginatorHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaginatorHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
