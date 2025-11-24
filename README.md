# capacitor3-kakao-login

This plugin is kakao login for capacitor5 even if it's name is capacitor3.

## Install

```bash
npm install capacitor3-kakao-login
npx cap sync
```

<br><br>

# browser

add kakao.js file into src/assets and include in index.html

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Ionic App</title>
    <script src="assets/kakao.js"></script>
  </head>
  ....
```

<br><br>

# android

add kakao repository (https://devrepo.kakao.com/nexus/content/groups/public/) in root build.gradle

```
allprojects {
    repositories {
        google()
        jcenter()
        maven { url 'https://devrepo.kakao.com/nexus/content/groups/public/' }
    }
}

```

add Global Application for initialize kakao sdk

```java
package io.ionic.starter;

import android.app.Application;
import com.fumi.capacitor3_kakao_login.Capacitor3KakaoLoginPlugin;

public class GlobalApplication extends Application {

  @Override
  public void onCreate() {
    super.onCreate();
    Capacitor3KakaoLoginPlugin.initKakaoSdk(
      this,
      getString(R.string.kakao_app_key)
    );
  }
}

```

add kakao app_key and kakao_schema in res/string.xml

```xml
  <string name="kakao_app_key">kkba2d2cf331e7f4a7fdb0c8f3b3cecc</string>
  <string name="kakao_scheme">kakaokkba2d2cf331e7f4a7fdb0c8f3b3cecc</string>
  <string name="kakaolink_host">kakaolink</string>
```

## SDK Version

- Android : 2.23.0
- iOS : 2.23.0+ (Supported via SPM only), 2.22.0 (CocoaPods)

## Install

```bash
npm install capacitor3-kakao-login
npx cap sync
```

### iOS (Swift Package Manager)

**Prerequisites**: Capacitor 6+

If you are using Capacitor 6+, you can use Swift Package Manager to install this plugin.
When you run `npx cap sync`, Capacitor should automatically detect `Package.swift` and configure the project to use SPM if your project is set up for it.

If you are migrating from CocoaPods, please refer to the [Capacitor SPM Migration Guide](https://capacitorjs.com/docs/ios/spm).

### iOS (CocoaPods)

> [!WARNING]
> Kakao SDK 2.23.0+ dropped support for CocoaPods. If you must use CocoaPods, you will be limited to Kakao SDK 2.22.0.

```bash
# Podfile
pod 'Capacitor3KakaoLogin', :path => '../node_modules/capacitor3-kakao-login'
```

add kakao data inside application in AndroidManifest.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
  package="io.ionic.starter">

  <queries>
    <package android:name="com.kakao.talk" />
  </queries>

  <application
    android:name=".GlobalApplication"
    android:allowBackup="true"
    android:icon="@mipmap/ic_launcher"
    android:label="@string/app_name"
    android:roundIcon="@mipmap/ic_launcher_round"
    android:supportsRtl="true"
    android:theme="@style/AppTheme">

    <meta-data
      android:name="com.kakao.sdk.AppKey"
      android:value="@string/kakao_app_key" />

    <activity android:name="com.kakao.sdk.auth.AuthCodeHandlerActivity">
      <intent-filter>
        <action android:name="android.intent.action.VIEW" />

        <category android:name="android.intent.category.DEFAULT" />
        <category android:name="android.intent.category.BROWSABLE" />

        <data
          android:host="oauth"
          android:scheme="@string/kakao_scheme" />
      </intent-filter>
    </activity>

    <activity
      android:name="io.ionic.starter.MainActivity"
      android:configChanges="orientation|keyboardHidden|keyboard|screenSize|locale|smallestScreenSize|screenLayout|uiMode"
      android:label="@string/title_activity_main"
      android:launchMode="singleTask"
      android:theme="@style/AppTheme.NoActionBarLaunch">

      <intent-filter>
        <action android:name="android.intent.action.VIEW" />

        <category android:name="android.intent.category.DEFAULT" />
        <category android:name="android.intent.category.BROWSABLE" />

        <data
          android:host="@string/kakaolink_host"
          android:scheme="@string/kakao_scheme" />
      </intent-filter>


      <intent-filter>
        <action android:name="android.intent.action.MAIN" />
        <category android:name="android.intent.category.LAUNCHER" />
      </intent-filter>

    </activity>

    <provider
      android:name="androidx.core.content.FileProvider"
      android:authorities="${applicationId}.fileprovider"
      android:exported="false"
      android:grantUriPermissions="true">
      <meta-data
        android:name="android.support.FILE_PROVIDER_PATHS"
        android:resource="@xml/file_paths"></meta-data>
    </provider>
  </application>

  <!-- Permissions -->

  <uses-permission android:name="android.permission.INTERNET" />
</manifest>


```

<br><br>

# IOS

add KAKAO_APP_KEY in info.plist

```plist
<dict>
  <array>
		<dict>
			<key>CFBundleURLSchemes</key>
			<array>
				<string>kakao[KAKAO_APP_KEY]</string>
				<string>com.example.app</string>
			</array>
		</dict>
	</array>

	<key>KAKAO_APP_KEY</key>
	<string>[KAKAO_APP_KEY]</string>
	<key>LSApplicationQueriesSchemes</key>
	<array>
		<string>kakao[KAKAO_APP_KEY]</string>
		<string>kakaokompassauth</string>
		<string>storykompassauth</string>
		<string>kakaolink</string>
		<string>storylink</string>
		<string>kakaotalk</string>
		<string>kakaotalk-5.9.7</string>
		<string>kakaostory-2.9.0</string>
  </array>
</dic>
```

add kakao code in AppDelegate.swift

```swift

import UIKit
import Capacitor
import Capacitor
import AppsFlyerLib
import AppTrackingTransparency
import KakaoSDKAuth
import KakaoSDKCommon

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {

    var window: UIWindow?

    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {

        let key = Bundle.main.infoDictionary?["KAKAO_APP_KEY"] as? String
        KakaoSDK.initSDK(appKey: key!)
        // Override point for customization after application launch.
        return true
    }

    func applicationWillResignActive(_ application: UIApplication) {
        // Sent when the application is about to move from active to inactive state. This can occur for certain types of temporary interruptions (such as an incoming phone call or SMS message) or when the user quits the application and it begins the transition to the background state.
        // Use this method to pause ongoing tasks, disable timers, and invalidate graphics rendering callbacks. Games should use this method to pause the game.
    }

    func applicationDidEnterBackground(_ application: UIApplication) {
        // Use this method to release shared resources, save user data, invalidate timers, and store enough application state information to restore your application to its current state in case it is terminated later.
        // If your application supports background execution, this method is called instead of applicationWillTerminate: when the user quits.
    }

    func applicationWillEnterForeground(_ application: UIApplication) {
        // Called as part of the transition from the background to the active state; here you can undo many of the changes made on entering the background.
    }

    func applicationDidBecomeActive(_ application: UIApplication) {
        // Restart any tasks that were paused (or not yet started) while the application was inactive. If the application was previously in the background, optionally refresh the user interface.
    }

    func applicationWillTerminate(_ application: UIApplication) {
        // Called when the application is about to terminate. Save data if appropriate. See also applicationDidEnterBackground:.
    }

    func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey: Any] = [:]) -> Bool {
        // Called when the app was launched with a url. Feel free to add additional processing here,
        // but if you want the App API to support tracking app url opens, make sure to keep this call
        if (AuthApi.isKakaoTalkLoginUrl(url)) {
            return AuthController.handleOpenUrl(url: url)
       }

       return ApplicationDelegateProxy.shared.application(app, open: url, options: options)

    }

    func application(_ application: UIApplication, continue userActivity: NSUserActivity, restorationHandler: @escaping ([UIUserActivityRestoring]?) -> Void) -> Bool {
        // Called when the app was launched with an activity, including Universal Links.
        // Feel free to add additional processing here, but if you want the App API to support
        // tracking app url opens, make sure to keep this call

        return ApplicationDelegateProxy.shared.application(application, continue: userActivity, restorationHandler: restorationHandler)
    }

    override func touchesBegan(_ touches: Set<UITouch>, with event: UIEvent?) {
        super.touchesBegan(touches, with: event)

        let statusBarRect = UIApplication.shared.statusBarFrame
        guard let touchPoint = event?.allTouches?.first?.location(in: self.window) else { return }

        if statusBarRect.contains(touchPoint) {
            NotificationCenter.default.post(name: .capacitorStatusBarTapped, object: nil)
        }
    }

}


```

## API

<docgen-index>

- [capacitor3-kakao-login](#capacitor3-kakao-login)
  - [Install](#install)
- [browser](#browser)
- [android](#android)
- [IOS](#ios)
  - [API](#api)
    - [initializeKakao(...)](#initializekakao)
    - [kakaoLogin()](#kakaologin)
    - [kakaoLogout()](#kakaologout)
    - [kakaoUnlink()](#kakaounlink)
    - [sendLinkFeed(...)](#sendlinkfeed)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### initializeKakao(...)

```typescript
initializeKakao(options: { app_key: string; web_key: string; }) => Promise<{ value: string; }>
```

| Param         | Type                                               |
| ------------- | -------------------------------------------------- |
| **`options`** | <code>{ app_key: string; web_key: string; }</code> |

**Returns:** <code>Promise&lt;{ value: string; }&gt;</code>

---

### kakaoLogin()

```typescript
kakaoLogin() => Promise<{ value: string; }>
```

**Returns:** <code>Promise&lt;{ value: string; }&gt;</code>

---

### kakaoLogout()

```typescript
kakaoLogout() => Promise<{ value: string; }>
```

**Returns:** <code>Promise&lt;{ value: string; }&gt;</code>

---

### kakaoUnlink()

```typescript
kakaoUnlink() => Promise<{ value: string; }>
```

**Returns:** <code>Promise&lt;{ value: string; }&gt;</code>

---

### sendLinkFeed(...)

```typescript
sendLinkFeed(options: { title: string; description: string; image_url: string; image_link_url: string; button_title: string; }) => Promise<{ value: string; }>
```

| Param         | Type                                                                                                                  |
| ------------- | --------------------------------------------------------------------------------------------------------------------- |
| **`options`** | <code>{ title: string; description: string; image_url: string; image_link_url: string; button_title: string; }</code> |

**Returns:** <code>Promise&lt;{ value: string; }&gt;</code>

---

</docgen-api>
