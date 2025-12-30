import { WebPlugin } from '@capacitor/core';

// declare var Kakao: any;
declare global {
  interface Window {
    Kakao: any; // You can replace 'any' with a more specific type if available
  }
}

export class Capacitor3KakaoLoginWeb
  extends WebPlugin
  implements Capacitor3KakaoLoginWeb
{
  private kakaoScriptId = 'kakao-js-sdk'; // Unique ID for the Kakao SDK script
  web_key: any;

  initializeKakao(options: { app_key: string; web_key: string }) {
    return new Promise<{ value: string }>(async (resolve, reject) => {
      try {
        if (!this.web_key) {
          this.web_key = options.web_key;
        }
        resolve({ value: 'done' });
      } catch (error) {
        console.error(error);
        reject(error);
      }
    });
  }

  //웹 카카오 로그인 (SDK 2.0 방식)
  kakaoLogin() {
    return new Promise<{ value: string }>(async (resolve, reject) => {
      if (!this.web_key) {
        reject('kakao_sdk_not_initialzed');
        return;
      }

      try {
        this.removeKakaoSdk();
        await this.loadKakaoSdk();

        if (typeof window['Kakao'] === 'undefined') {
          reject(new Error('Kakao undefined'));
          return;
        }

        // SDK 2.0 초기화
        window.Kakao!.init(this.web_key);

        // SDK 2.0: authorize() 메서드 사용 (리다이렉트 방식)
        window.Kakao!.Auth.authorize({
          redirectUri: window.location.origin + '/kakao-login-callback',
          throughTalk: true,
          state: 'kakao_login_' + Date.now(),
        });

        // 리다이렉트가 발생하므로 Promise는 즉시 resolve
        // 실제 토큰은 handleKakaoCallback()에서 처리
        resolve({ value: 'redirected' });
      } catch (e) {
        console.error('Error during Kakao login', e);
        reject(e);
      }
    });
  }

  //리다이렉트 후 콜백 처리 (SDK 2.0 방식)
  handleKakaoCallback() {
    return new Promise<{ value: string }>(async (resolve, reject) => {
      if (!this.web_key) {
        reject('kakao_sdk_not_initialzed');
        return;
      }


      // SDK 2.0 초기화
      window.Kakao!.init(this.web_key);


      console.log('handleKakaoCallback!!');
      try {
        // URL 파라미터 확인
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        const error = urlParams.get('error');
        
        if (error) {
          // 에러 파라미터가 있는 경우
          window.history.replaceState({}, '', window.location.pathname);
          reject(new Error(`Kakao Login Failed: ${error}`));
          return;
        }

        if (!code) {
          // 인가 코드가 없는 경우 (리다이렉트 후가 아님)
          reject(
            new Error(
              'No authorization code found. Please call kakaoLogin() first.',
            ),
          );
          return;
        }
        
        const accessToken = window.Kakao!.Auth.getAccessToken();
        console.log('accessToken:', accessToken);
        if (accessToken) {
          // URL 파라미터 정리
          window.history.replaceState({}, '', window.location.pathname);
          resolve({ value: accessToken });
        } else {
          reject(new Error('Kakao Login Failed: Token exchange failed'));
        }
      } catch (e) {
        console.error('Error during Kakao callback handling', e);
        reject(e);
      }
    });
  }

  //웹 로그아웃 (SDK 2.0 방식)
  kakaoLogout() {
    return new Promise<{ value: string }>((resolve, reject) => {
      if (!this.web_key) {
        reject('kakao_sdk_not_initialzed');
        return;
      }

      try {
        const KakaoSdk: any = window['Kakao'];
        if (KakaoSdk && KakaoSdk.Auth) {
          // SDK 2.0: logout()은 Promise를 반환할 수 있음
          const logoutResult = KakaoSdk.Auth.logout();
          if (logoutResult && typeof logoutResult.then === 'function') {
            logoutResult
              .then(() => {
                resolve({ value: 'done' });
              })
              .catch((error: any) => {
                console.error('Kakao Logout Failed', error);
                reject(error);
              });
          } else {
            // 동기 방식으로 처리되는 경우
            resolve({ value: 'done' });
          }
        } else {
          reject(new Error('Kakao SDK not initialized'));
        }
      } catch (e) {
        console.error('Error during Kakao logout', e);
        reject(e);
      }
    });
  }

  //unlink (SDK 2.0 방식)
  kakaoUnlink() {
    return new Promise<{ value: string }>((resolve, reject) => {
      if (!this.web_key) {
        reject('kakao_sdk_not_initialzed');
        return;
      }

      try {
        const KakaoSdk: any = window['Kakao'];
        if (KakaoSdk && KakaoSdk.API) {
          // SDK 2.0: request()는 Promise를 반환
          KakaoSdk.API.request({
            url: '/v1/user/unlink',
          })
            .then((response: any) => {
              console.log(response);
              resolve({ value: 'done' });
            })
            .catch((error: any) => {
              console.error('Kakao Unlink Failed', error);
              reject(error);
            });
        } else {
          reject(new Error('Kakao SDK not initialized'));
        }
      } catch (e) {
        console.error('Error during Kakao unlink', e);
        reject(e);
      }
    });
  }

  //message (SDK 2.0 방식)
  sendLinkFeed(options: {
    title: string;
    description: string;
    image_url: string;
    image_link_url: string;
    button_title: string;
  }) {
    return new Promise<{ value: string }>((resolve, reject) => {
      if (!this.web_key) {
        reject('kakao_sdk_not_initialzed');
        return;
      }

      try {
        const KakaoSdk: any = window['Kakao'];
        if (KakaoSdk && KakaoSdk.Link) {
          // SDK 2.0: sendDefault()는 Promise를 반환할 수 있음
          const sendResult = KakaoSdk.Link.sendDefault({
            objectType: 'feed',
            content: {
              title: options.title,
              description: options.description,
              imageUrl: options.image_url,
              link: {
                mobileWebUrl: options.image_link_url,
              },
            },
            buttons: [
              {
                title: options.button_title,
                link: {
                  mobileWebUrl: options.image_link_url,
                },
              },
            ],
          });

          if (sendResult && typeof sendResult.then === 'function') {
            // Promise 기반 API
            sendResult
              .then(() => {
                resolve({ value: 'done' });
              })
              .catch((error: any) => {
                console.error('Kakao Link Send Failed', error);
                reject(error);
              });
          } else {
            // 콜백 방식 (하위 호환성)
            if (typeof sendResult === 'object' && sendResult.callback) {
              sendResult.callback = function () {
                resolve({ value: 'done' });
              };
            } else {
              // 콜백이 없는 경우 직접 resolve
              resolve({ value: 'done' });
            }
          }
        } else {
          reject(new Error('Kakao SDK not initialized'));
        }
      } catch (e) {
        console.error('Error during Kakao link send', e);
        reject(e);
      }
    });
  }

  private removeKakaoSdk(): void {
    const script = document.getElementById(this.kakaoScriptId);
    if (script) {
      document.head.removeChild(script); // Remove the script from the DOM
      console.log('Kakao SDK removed');
    }
  }

  private loadKakaoSdk(): Promise<void> {
    return new Promise((resolve, reject) => {
      // Check if the script is already loaded
      if (document.getElementById(this.kakaoScriptId)) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.id = this.kakaoScriptId; // Set an ID to reference this script
      // SDK 2.x - Kakao.Auth.authorize() 리다이렉트 방식 사용
      script.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.7/kakao.min.js';
      // script.integrity = 'sha384-DKYJZ8NLiK8MN4/C5P2dtSmLQ4KwPaoqAfyA/DfmEc1VDxu4yyC7wy6K1Hs90nka';
      // script.crossOrigin = 'anonymous';
      script.onload = () => {
        console.log('Kakao SDK loaded');
        resolve();
      };
      script.onerror = () => reject(new Error('Failed to load Kakao SDK'));
      document.head.appendChild(script);
    });
  }
}
