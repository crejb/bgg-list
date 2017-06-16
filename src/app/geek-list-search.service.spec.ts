import { TestBed, inject } from '@angular/core/testing';

import { GeekListSearchService } from './geek-list-search.service';

describe('GeekListSearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GeekListSearchService]
    });
  });

  it('should be created', inject([GeekListSearchService], (service: GeekListSearchService) => {
    expect(service).toBeTruthy();
  }));
});
