import { TestBed } from '@angular/core/testing';

import { KakaoService } from './kakao.service';

describe('KakaoService', () => {
  let service: KakaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KakaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
