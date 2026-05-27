# #002 お問い合わせ API 防御強化

**優先度:** P0  
**状態:** 完了（本 PR）

## 背景

- サーバー側バリデーション不足（クライアント bypass 可能）
- `application/x-www-form-urlencoded` による CSRF / クロスサイト POST
- メモリ内レート制限のみ（Vercel サーバーレスでは分散 bypass 可能）
- メールヘッダーインジェクション（`replyTo` / `subject` への改行混入）

## 対応内容

- [x] `Content-Type: application/json` 必須（form POST CSRF 遮断）
- [x] `Origin` / `Referer` / `Sec-Fetch-Site` 検証
- [x] サーバー側フィールド検証（形式・最大長・改行拒否）
- [x] リクエストボディ 16KB 上限
- [x] IP + User-Agent 複合キーでレート制限（同一 IP 共有端末対策の補助）
- [x] エラーメッセージから SMTP 内部名を除去

## Vercel 本番で追加推奨（コード外）

- [ ] Vercel Firewall / Bot Protection 有効化
- [ ] 必要なら Upstash Redis 等の共有レート制限（`CONTACT_RATE_LIMIT_*`  env 未設定時は in-memory fallback）

## 検証

```bash
# JSON のみ受理
curl -X POST -H "Content-Type: application/json" \
  -H "Origin: https://www.midori02.com" \
  -d '{"name":"test","email":"t@example.com","textbox":"hello"}' \
  https://www.midori02.com/api/contact

# form POST は 415
curl -X POST -H "Content-Type: application/x-www-form-urlencoded" \
  -d "name=x&email=x@x.com&textbox=x" \
  https://www.midori02.com/api/contact
```

## 関連ファイル

- `src/pages/api/contact.ts`
- `src/lib/contactSecurity.ts`
- `src/lib/validation.ts`
- `src/lib/contactRateLimit.ts`
