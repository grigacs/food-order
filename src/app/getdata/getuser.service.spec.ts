import { TestBed, inject } from '@angular/core/testing';

import {GetUserService} from './getuser.service';

describe('GetDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetUserService]
    });
  });

  it('should ...', inject([GetUserService], (service: GetUserService) => {
    expect(service).toBeTruthy();
  }));
});
