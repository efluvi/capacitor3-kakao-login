import { Injectable } from '@angular/core';
import { Capacitor3KakaoLogin } from 'capacitor3-kakao-login';
import { environment } from 'src/environments/environment';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class KakaoService {
  constructor(public loadingController: LoadingController) {
    Capacitor3KakaoLogin.initializeKakao(environment.kakao);
  }

  async login() {
    const loading = await this.loadingController.create({});
    await loading.present();
    let temp = { value: null };
    try {
      temp = await Capacitor3KakaoLogin.kakaoLogin();
    } catch (error) {}

    loading.dismiss();
    return temp.value;
  }

  async logout() {
    const loading = await this.loadingController.create({});
    await loading.present();
    let temp = { value: null };
    try {
      temp = await Capacitor3KakaoLogin.kakaoLogout();
    } catch (error) {
      console.error(error);
      return null;
    }
    loading.dismiss();
    return temp.value;
  }

  async unlink() {
    const loading = await this.loadingController.create({});
    await loading.present();
    let temp = { value: null };
    try {
      temp = await Capacitor3KakaoLogin.kakaoUnlink();
    } catch (error) {
      console.error(error);
    }
    loading.dismiss();
    return temp.value;
  }

  async share(
    title: string,
    description: string,
    image_url: string,
    image_link_url: string,
    button_title: string,
  ) {
    const loading = await this.loadingController.create({});
    await loading.present();
    let temp = { value: null };
    try {
      temp = await Capacitor3KakaoLogin.sendLinkFeed({
        title,
        description,
        image_url,
        image_link_url,
        button_title,
      });
    } catch (error) {}
    loading.dismiss();
    return temp.value;
  }
}
