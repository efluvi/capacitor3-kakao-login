package com.fumi.capacitor3_kakao_login;

import android.content.Context;
import android.util.Log;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.kakao.sdk.common.KakaoSdk;

@CapacitorPlugin(name = "Capacitor3KakaoLogin")
public class Capacitor3KakaoLoginPlugin extends Plugin {

    private Capacitor3KakaoLogin implementation;

    //SDK 초기화
    public static void initKakaoSdk(Context context, String key) {
        KakaoSdk.init(context, key);
    }

    @Override
    public void load() {
        super.load();
        implementation = new CapacitorKakaoLogin(getActivity());
    }

    @PluginMethod
    public void initializeKakao(PluginCall call) {
        JSObject ret = new JSObject();
        ret.put("value", "done");
        call.resolve(ret);
    }

    @PluginMethod
    public void kakaoLogin(PluginCall call) {
        implementation.kakaoLogin(call);
    }

    @PluginMethod
    public void kakaoLogout(PluginCall call) {
        implementation.kakaoLogout(call);
    }

    @PluginMethod
    public void kakaoUnlink(PluginCall call) {
        implementation.kakaoUnlink(call);
    }

    @PluginMethod
    public void sendLinkFeed(PluginCall call) {
        implementation.sendLinkFeed(call);
    }
}
