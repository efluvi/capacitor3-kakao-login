import { registerPlugin } from '@capacitor/core';

import type { Capacitor3KakaoLoginPlugin } from './definitions';

const Capacitor3KakaoLogin = registerPlugin<Capacitor3KakaoLoginPlugin>(
  'Capacitor3KakaoLogin',
  {
    web: () => import('./web').then(m => new m.Capacitor3KakaoLoginWeb()),
  },
);

export * from './definitions';
export { Capacitor3KakaoLogin };
