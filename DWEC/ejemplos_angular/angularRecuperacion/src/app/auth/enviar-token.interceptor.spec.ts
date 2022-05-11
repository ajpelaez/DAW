import { TestBed } from '@angular/core/testing';

import { EnviarTokenInterceptor } from './enviar-token.interceptor';

describe('EnviarTokenInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      EnviarTokenInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: EnviarTokenInterceptor = TestBed.inject(EnviarTokenInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
