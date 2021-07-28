import Foundation
import Capacitor

/**
 * Please read the Capacitor iOS Plugin Development Guide
 * here: https://capacitorjs.com/docs/plugins/ios
 */
@objc(Capacitor3KakaoLoginPlugin)
public class Capacitor3KakaoLoginPlugin: CAPPlugin {
    private let implementation = Capacitor3KakaoLogin()

    //네이티브는 app delegate에서 초기화함
    @objc func initializeKakao(_ call: CAPPluginCall) {
        call.resolve([
            "value": "done"
        ])
    }
    
    @objc func kakaoLogin(_ call: CAPPluginCall) {
        
        DispatchQueue.main.async {
            self.implementation.kakaoLogin(call)
        }
    }
    
    @objc func kakaoLogout(_ call: CAPPluginCall) {
        DispatchQueue.main.async {
            self.implementation.kakaoLogout(call)
        }
        
    }
    
    @objc func kakaoUnlink(_ call: CAPPluginCall) {
        DispatchQueue.main.async {
            self.implementation.kakaoUnlink(call)
        }
    }
    
    @objc func sendLinkFeed(_ call: CAPPluginCall) {
        DispatchQueue.main.async {
            self.implementation.sendLinkFeed(call)
        }
    }
}
