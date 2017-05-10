import { TestBed, inject } from '@angular/core/testing';

import { GetOrdersService } from './getorders.service';

describe('GetordersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetOrdersService]
    });
  });

  it('should ...', inject([GetOrdersService], (service: GetOrdersService) => {
    expect(service).toBeTruthy();
  }));
});
