package io.ionic.starter;

import android.app.Application;

import com.fumi.capacitor3_kakao_login.Capacitor3KakaoLoginPlugin;

public class GlobalApplication extends Application {

    @Override
    public void onCreate() {
        super.onCreate();
        Capacitor3KakaoLoginPlugin.initKakaoSdk(this,getString(R.string.kakao_app_key));
    }

}
