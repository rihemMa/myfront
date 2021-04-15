import { TestBed } from '@angular/core/testing';

import { SpaceGuard } from './space.guard';

describe('SpaceGuard', () => {
  let guard: SpaceGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SpaceGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
