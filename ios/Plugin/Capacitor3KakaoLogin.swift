import Foundation
import Capacitor

import KakaoSDKUser
import KakaoSDKCommon
import KakaoSDKShare
import KakaoSDKTemplate


@objc public class Capacitor3KakaoLogin: NSObject {
    @objc public func kakaoLogin(_ call: CAPPluginCall) -> Void {
        
        // 카카오톡 설치 여부 확인
        if (UserApi.isKakaoTalkLoginAvailable()) {
            UserApi.shared.loginWithKakaoTalk {(oauthToken, error) in
                if let error = error {
                    print(error)
                    call.reject("error")
                }
                else {

                    call.resolve([
                        "value": oauthToken?.accessToken ?? ""
                    ])
                    
                }
            }
        }
        else{
            
            UserApi.shared.loginWithKakaoAccount {(oauthToken, error) in
                    if let error = error {
                        print(error)
                        call.reject("error")
                    }
                    else {

                        call.resolve([
                            "value": oauthToken?.accessToken ?? ""
                        ])
                    }
                }
            
        }
    }
    
    @objc public func kakaoLogout(_ call: CAPPluginCall) -> Void {

        UserApi.shared.logout {(error) in
            if let error = error {
                print(error)
                call.reject("error")
            }
            else {

                call.resolve([
                    "value": "done"
                ])
            }
        }
    }
    
    
    
    @objc public func kakaoUnlink(_ call: CAPPluginCall) -> Void {

        UserApi.shared.unlink {(error) in
            if let error = error {
                print(error)
                call.reject("error")
            }
            else {

                call.resolve([
                    "value": "done"
                ])
            }
        }
    }
    
    
    @objc public func sendLinkFeed(_ call: CAPPluginCall) -> Void {

        let title = call.getString("title") ?? ""
        let description = call.getString("description") ?? ""
        let image_url = call.getString("image_url") ?? ""
        let image_link_url = call.getString("image_link_url") ?? ""
        let button_title = call.getString("button_title") ?? ""

        
        
        let link = Link(webUrl: URL(string:image_link_url),
                        mobileWebUrl: URL(string:image_link_url))

        let button = Button(title: button_title, link: link)
       
        let content = Content(title: title,
                                imageUrl: URL(string:image_url)!,
                                description: description,
                                link: link)
        let feedTemplate = FeedTemplate(content: content, social: nil, buttons: [button])

//        //메시지 템플릿 encode
//        if let feedTemplateJsonData = (try? SdkJSONEncoder.custom.encode(feedTemplate)) {
//
//        //생성한 메시지 템플릿 객체를 jsonObject로 변환
//            if let templateJsonObject = SdkUtils.toJsonObject(feedTemplateJsonData) {
//                ShareApi.shared.shareDefault(templateObject:templateJsonObject) {(linkResult, error) in
//                    if let error = error {
//                        print(error)
//                        call.reject("error")
//                    }
//                    else {
//
//                        //do something
//                        guard let linkResult = linkResult else { return }
//                        UIApplication.shared.open(linkResult.url, options: [:], completionHandler: nil)
//
//                        call.resolve([
//                            "value": "done"
//                        ])
//                    }
//                }
//            }
//
//        }
        
        
        if let feedTemplateJsonData = (try? SdkJSONEncoder.custom.encode(feedTemplate)) {

        //jsonObject
            if let templateJsonObject = SdkUtils.toJsonObject(feedTemplateJsonData) {
                ShareApi.shared.shareDefault(templateObject:templateJsonObject) { [weak self] (sharingResult, error) in
                    if let error = error {
                        print(error)
                        call.reject("error")
                    }
                    else {
                        //do something
                        guard let sharingResult = sharingResult else { return }
                        UIApplication.shared.open(sharingResult.url, options: [:], completionHandler: nil)
                    
                        
                        call.resolve([
                            "value": "done"
                        ])
                    }
                }
            }
        }
        
        
        
    }
}
