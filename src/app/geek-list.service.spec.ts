import { TestBed, inject } from '@angular/core/testing';

import { GeekListService } from './geek-list.service';

describe('GeekListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GeekListService]
    });
  });

  it('should be created', inject([GeekListService], (service: GeekListService) => {
    expect(service).toBeTruthy();
  }));
});
