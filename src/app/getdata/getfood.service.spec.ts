import { TestBed, inject } from '@angular/core/testing';

import { GetfoodService } from './getfood.service';


describe('GetfoodService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetfoodService]
    });
  });

  it('should ...', inject([GetfoodService], (service: GetfoodService) => {
    expect(service).toBeTruthy();
  }));
});
