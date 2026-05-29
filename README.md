# portfolio_midori02

midori02 のポートフォリオサイト（Next.js Pages Router + Firebase + Vercel）。

## 開発

```bash
npm ci
npm run dev src
```

- ローカル: http://127.0.0.1:3001（Node **18+**）
- 環境変数: `src/.env.local`（テンプレは `src/.env.local.example`）

## デプロイ前の確認

push 前に必ず実行:

```bash
npm run verify:deploy
```

ビルド・主要ルート・JS チャンクの自動チェック。**見た目（レイアウト・フォント・スライダー）は含まれません。**

### 本番反映の手順

**`develop` へのマージは必ずリポジトリオーナー（midori02）が GitHub 上で行ってください。**  
エージェントや CI が `develop` に直接マージすることはありません。

1. feature ブランチで修正
2. `npm run verify:deploy` を PASS
3. ローカル `npm run dev src` で目視確認（TOP / Works / About / Contact、SP 幅も確認）
4. feature ブランチを push → Vercel **Preview URL** で最終確認
5. **オーナーが** GitHub で PR を作成・レビュー・`develop` へマージ
6. Vercel が Production（https://www.midori02.com/）へ自動デプロイ
7. 本番で表示・お問い合わせ送信を確認

### Vercel 設定チェックリスト

- Node.js Version: **24.x**
- Production 環境変数: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL`

### Firebase ルール

Firestore / Storage ルールは Vercel デプロイとは別です。変更時は Firebase Console または CLI で公開してください。

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js deployment documentation](https://nextjs.org/docs/deployment)
