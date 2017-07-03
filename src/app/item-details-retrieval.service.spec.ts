import { TestBed, inject } from '@angular/core/testing';

import { ItemDetailsRetrievalService } from './item-details-retrieval.service';

describe('ItemDetailsRetrievalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ItemDetailsRetrievalService]
    });
  });

  it('should be created', inject([ItemDetailsRetrievalService], (service: ItemDetailsRetrievalService) => {
    expect(service).toBeTruthy();
  }));
});
