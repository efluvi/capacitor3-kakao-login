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
  private readonly KAKAO_SDK_VERSION = '2.7.4';
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

  //웹 카카오 로그인
  kakaoLogin() {
    return new Promise<{ value: string }>(async (resolve, reject) => {
      if (!this.web_key) {
        reject('kakao_sdk_not_initialzed');
      }

      this.removeKakaoSdk();
      await this.loadKakaoSdk();
      if (typeof window['Kakao'] !== 'undefined') {
        window['Kakao'].init(this.web_key); // Initialize Kakao with your JavaScript key
      } else {
        reject(new Error('Kakao undefined'));
      }

      try {
        window.Kakao!.Auth.login({
          throughTalk: true,
          persistAccessToken: true,
          success: (response: any) => {
            console.log(response);

            resolve({
              value: response.access_token,
            });
          },
          fail: (error: any) => {
            console.error('Kakao Login Failed', error);
            reject(new Error('Kakao Login Failed'));
          },
        });
      } catch (e) {
        console.error('Error during Kakao login', e);
        reject(e);
      }
    });
  }

  //웹 로그아웃
  kakaoLogout() {
    return new Promise<{ value: string }>((resolve, reject) => {
      if (!this.web_key) {
        reject('kakao_sdk_not_initialzed');
      }

      const KakaoSdk: any = window['Kakao'];
      KakaoSdk.Auth.logout();
      resolve({ value: 'done' });
    });
  }

  //unlink
  kakaoUnlink() {
    return new Promise<{ value: string }>((resolve, reject) => {
      if (!this.web_key) {
        reject('kakao_sdk_not_initialzed');
      }

      const KakaoSdk: any = window['Kakao'];
      KakaoSdk.API.request({
        url: '/v1/user/unlink',
        success: function (response: any) {
          console.log(response);
          resolve({ value: 'done' });
        },
        fail: function (error: any) {
          console.log(error);
          reject(error);
        },
      });
    });
  }

  //message
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
      }
      const KakaoSdk: any = window['Kakao'];
      KakaoSdk.Link.sendDefault({
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
        callback: function () {
          resolve({ value: 'done' });
        },
      });
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
      script.src = `https://t1.kakaocdn.net/kakao_js_sdk/${this.KAKAO_SDK_VERSION}/kakao.min.js`;
      script.crossOrigin = 'anonymous';
      script.onload = () => {
        console.log('Kakao SDK loaded');
        resolve();
      };
      script.onerror = () => reject(new Error('Failed to load Kakao SDK'));
      document.head.appendChild(script);
    });
  }
}
