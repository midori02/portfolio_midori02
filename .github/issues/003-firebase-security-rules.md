# #003 Firebase セキュリティルール（クライアント直アクセス）

**優先度:** P0  
**状態:** ルールファイル追加済み → **Console デプロイは要実施**

## 背景

Firestore / Storage をブラウザから直接読み取り。ルールがリポジトリ外のため、過剰権限（write 許可等）の有無が不明。

## 対応内容

- [x] `firestore.rules` — 公開 read のみ、write 全面禁止
- [x] `storage.rules` — 公開 read のみ、write 全面禁止
- [x] `firebase.json` / `.firebaserc` 追加
- [ ] **Firebase Console または CLI でルールをデプロイ**（ユーザー作業）

## デプロイ手順

```bash
# Firebase CLI 未導入の場合
npm install -g firebase-tools
firebase login
cd /path/to/portfolio_midori02
firebase deploy --only firestore:rules,storage --project portfolio-midori02
```

デプロイ後、Firebase Console → Firestore → ルール で内容が一致していることを確認。

## ルール方針

| パス | read | write |
|------|------|-------|
| `admin/{adminId}` | 公開（プロフィール） | 禁止 |
| `admin/{adminId}/contents/{id}` | 公開 | 禁止 |
| `admin/{adminId}/histories/{id}` | 公開 | 禁止 |
| Storage `/{allPaths=**}` | 公開（画像配信） | 禁止 |

## 追加推奨（データ設計）

`admin/{adminId}` ドキュメントに `email` フィールドがある場合、**ルールではフィールド単位の read 制限不可**のため、公開不要なら Firestore から削除するか別コレクションへ移動すること。

## 検証

Firebase Console → Firestore → ルール → **シミュレータ**で以下を確認:

- 未認証 read `admin/{ADMIN_UID}/contents/*` → 許可
- 未認証 write 任意パス → 拒否

`ADMIN_UID` は `src/lib/constants.ts` を参照。
