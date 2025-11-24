package com.fumi.capacitor3_kakao_login;

import android.content.Context;
import android.util.Log;
import androidx.appcompat.app.AppCompatActivity;
import com.getcapacitor.JSObject;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.kakao.sdk.common.KakaoSdk;
import com.kakao.sdk.share.ShareClient;
import com.kakao.sdk.template.model.Button;
import com.kakao.sdk.template.model.Content;
import com.kakao.sdk.template.model.FeedTemplate;
import com.kakao.sdk.template.model.Link;
import com.kakao.sdk.user.UserApiClient;
import java.util.ArrayList;

public class Capacitor3KakaoLogin {

    private static final String TAG = "Capacitor3KakaoLogin";
    AppCompatActivity activity;

    public Capacitor3KakaoLogin(AppCompatActivity activity) {
        this.activity = activity;
    }

    public void kakaoLogin(PluginCall call) {
        if (UserApiClient.getInstance().isKakaoTalkLoginAvailable(this.activity)) {
            UserApiClient
                    .getInstance()
                    .loginWithKakaoTalk(
                            this.activity,
                            (oAuthToken, error) -> {
                                if (error != null) {
                                    Log.e(TAG, "로그인 실패", error);
                                    call.reject(error.toString());
                                } else if (oAuthToken != null) {
                                    Log.i(TAG, "로그인 성공(토큰) : " + oAuthToken.getAccessToken());
                                    JSObject ret = new JSObject();
                                    ret.put("value", oAuthToken.getAccessToken());
                                    call.resolve(ret);
                                } else {
                                    call.reject("no_data");
                                }
                                return null;
                            }
                    );
        } else {
            UserApiClient
                    .getInstance()
                    .loginWithKakaoAccount(
                            this.activity,
                            (oAuthToken, error) -> {
                                if (error != null) {
                                    Log.e(TAG, "로그인 실패", error);
                                    call.reject(error.toString());
                                } else if (oAuthToken != null) {
                                    Log.i(TAG, "로그인 성공(토큰) : " + oAuthToken.getAccessToken());
                                    JSObject ret = new JSObject();
                                    ret.put("value", oAuthToken.getAccessToken());
                                    call.resolve(ret);
                                } else {
                                    call.reject("no_data");
                                }
                                return null;
                            }
                    );
        }
    }

    public void kakaoLogout(PluginCall call) {
        UserApiClient
                .getInstance()
                .logout(
                        error -> {
                            JSObject ret = new JSObject();
                            ret.put("value", "done");
                            call.resolve(ret);
                            return null;
                        }
                );
    }

    public void kakaoUnlink(PluginCall call) {
        UserApiClient
                .getInstance()
                .unlink(
                        error -> {
                            JSObject ret = new JSObject();
                            ret.put("value", "done");
                            call.resolve(ret);
                            return null;
                        }
                );
    }

    public void sendLinkFeed(PluginCall call) {
        Link link = new Link(call.getString("image_link_url"), call.getString("image_link_url"), null, null);
        Content content = new Content(call.getString("title"), call.getString("image_url"), link, call.getString("description"));
        ArrayList<Button> buttons = new ArrayList<>();
        buttons.add(new Button(call.getString("button_title"), link));
        FeedTemplate feed = new FeedTemplate(content, null, null, buttons);
        ShareClient
                .getInstance()
                .shareDefault(
                        this.activity,
                        feed,
                        (linkResult, error) -> {
                            if (error != null) {} else if (linkResult != null) {
                                this.activity.startActivity(linkResult.getIntent());
                            }

                            JSObject ret = new JSObject();
                            ret.put("value", "done");
                            call.resolve(ret);
                            return null;
                        }
                );
    }
}
