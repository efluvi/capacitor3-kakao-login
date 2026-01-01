export interface Capacitor3KakaoLoginPlugin {
  initializeKakao(options: {
    app_key: string;
    web_key: string;
  }): Promise<{ value: string }>;
  kakaoLogin(options?: { redirectUri?: string; webSdkVersion?: 'v1' | 'v2' }): Promise<{ value: string }>;
  handleKakaoCallback(): Promise<{ value: string }>;
  kakaoLogout(): Promise<{ value: string }>;
  kakaoUnlink(): Promise<{ value: string }>;
  sendLinkFeed(options: {
    title: string;
    description: string;
    image_url: string;
    image_link_url: string;
    button_title: string;
  }): Promise<{ value: string }>;
}
