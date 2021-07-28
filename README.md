# capacitor3-kakao-login

kakao login for capacitor3

## Install

```bash
npm install capacitor3-kakao-login
npx cap sync
```

## API

<docgen-index>

* [`initializeKakao(...)`](#initializekakao)
* [`kakaoLogin()`](#kakaologin)
* [`kakaoLogout()`](#kakaologout)
* [`kakaoUnlink()`](#kakaounlink)
* [`sendLinkFeed(...)`](#sendlinkfeed)

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

--------------------


### kakaoLogin()

```typescript
kakaoLogin() => Promise<{ value: string; }>
```

**Returns:** <code>Promise&lt;{ value: string; }&gt;</code>

--------------------


### kakaoLogout()

```typescript
kakaoLogout() => Promise<{ value: string; }>
```

**Returns:** <code>Promise&lt;{ value: string; }&gt;</code>

--------------------


### kakaoUnlink()

```typescript
kakaoUnlink() => Promise<{ value: string; }>
```

**Returns:** <code>Promise&lt;{ value: string; }&gt;</code>

--------------------


### sendLinkFeed(...)

```typescript
sendLinkFeed(options: { title: string; description: string; image_url: string; image_link_url: string; button_title: string; }) => Promise<{ value: string; }>
```

| Param         | Type                                                                                                                  |
| ------------- | --------------------------------------------------------------------------------------------------------------------- |
| **`options`** | <code>{ title: string; description: string; image_url: string; image_link_url: string; button_title: string; }</code> |

**Returns:** <code>Promise&lt;{ value: string; }&gt;</code>

--------------------

</docgen-api>
