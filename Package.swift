// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "Capacitor3KakaoLogin",
    platforms: [.iOS(.v13)],
    products: [
        .library(
            name: "Capacitor3KakaoLogin",
            targets: ["Capacitor3KakaoLoginPlugin"])
    ],
    dependencies: [
        .package(url: "https://github.com/ionic-team/capacitor-swift-pm.git", from: "6.0.0"),
        .package(url: "https://github.com/kakao/kakao-ios-sdk", from: "2.23.0")
    ],
    targets: [
        .target(
            name: "Capacitor3KakaoLoginPlugin",
            dependencies: [
                .product(name: "Capacitor", package: "capacitor-swift-pm"),
                .product(name: "Cordova", package: "capacitor-swift-pm"),
                .product(name: "KakaoSDKCommon", package: "kakao-ios-sdk"),
                .product(name: "KakaoSDKAuth", package: "kakao-ios-sdk"),
                .product(name: "KakaoSDKUser", package: "kakao-ios-sdk"),
                .product(name: "KakaoSDKTalk", package: "kakao-ios-sdk"),
                .product(name: "KakaoSDKShare", package: "kakao-ios-sdk"),
                .product(name: "KakaoSDKTemplate", package: "kakao-ios-sdk")
            ],
            path: "ios/Plugin",
            exclude: ["Capacitor3KakaoLoginPlugin.m", "Capacitor3KakaoLoginPlugin.h"])
    ]
)
