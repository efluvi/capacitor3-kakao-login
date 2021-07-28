#import <Foundation/Foundation.h>
#import <Capacitor/Capacitor.h>

// Define the plugin using the CAP_PLUGIN Macro, and
// each method the plugin supports using the CAP_PLUGIN_METHOD macro.
CAP_PLUGIN(Capacitor3KakaoLoginPlugin, "Capacitor3KakaoLogin",
           CAP_PLUGIN_METHOD(initializeKakao, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(kakaoLogin, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(kakaoLogout, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(kakaoUnlink, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(sendLinkFeed, CAPPluginReturnPromise);
)
