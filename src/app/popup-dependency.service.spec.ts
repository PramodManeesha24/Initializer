import { TestBed } from '@angular/core/testing';

import { PopupDependencyService } from './popup-dependency.service';

describe('PopupDependencyService', () => {
  let service: PopupDependencyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PopupDependencyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
