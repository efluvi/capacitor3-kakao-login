import { WebPlugin } from '@capacitor/core';

// import * as Kakao from './assets/kakao';
const Kakao = require('./lib/kakao.js');
export class Capacitor3KakaoLoginWeb
  extends WebPlugin
  implements Capacitor3KakaoLoginWeb {
  web_key: any;

  initializeKakao(options: { app_key: string; web_key: string }) {
    return new Promise<{ value: string }>(resolve => {
      if (!this.web_key) {
        this.web_key = options.web_key;
        Kakao.init(this.web_key);
      }
      resolve({ value: 'done' });
    });
  }

  //웹 카카오 로그인
  kakaoLogin() {
    return new Promise<{ value: string }>((resolve, reject) => {
      if (!this.web_key) {
        reject('kakao_sdk_not_initialzed');
      }
      const KakaoSdk: any = Kakao;
      KakaoSdk.Auth.login({
        success: function (authObj: any) {
          let { access_token } = authObj;
          resolve({ value: access_token });
        },
        fail: function (err: any) {
          console.error(err);
          reject(err);
        },
      });
    });
  }

  //웹 로그아웃
  kakaoLogout() {
    return new Promise<{ value: string }>((resolve, reject) => {
      if (!this.web_key) {
        reject('kakao_sdk_not_initialzed');
      }

      const KakaoSdk: any = Kakao;
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

      const KakaoSdk: any = Kakao;
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
      const KakaoSdk: any = Kakao;
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
}
