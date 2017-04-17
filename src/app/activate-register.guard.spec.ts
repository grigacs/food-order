import { TestBed, async, inject } from '@angular/core/testing';

import { ActivateRegisterGuard } from './activate-register.guard';

describe('DeactivateRegisterGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActivateRegisterGuard]
    });
  });

  it('should ...', inject([ActivateRegisterGuard], (guard: ActivateRegisterGuard) => {
    expect(guard).toBeTruthy();
  }));
});
