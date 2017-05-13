import { TestBed, inject } from '@angular/core/testing';

import { GetMyOrdersService } from './getmyorders.service';

describe('GetmyordersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetMyOrdersService]
    });
  });

  it('should ...', inject([GetMyOrdersService], (service: GetMyOrdersService) => {
    expect(service).toBeTruthy();
  }));
});
