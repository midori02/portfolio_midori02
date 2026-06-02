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
Works / 画像変更時は **[実装チェックリスト](docs/implementation-checklist.md) §4 の目視確認が必須**です。

### Works / 画像 — 再発防止（要約）

同じ不具合（スライド縦並び・画像横伸び）が何度も再発したため、詳細は [docs/implementation-checklist.md](docs/implementation-checklist.md) に記載。

| やってはいけないこと | 理由 |
|---------------------|------|
| `develop` の `auto_slide` を一括 revert | `rtl: true`・slick `float` 不足が戻り縦並びになる |
| スライダーで `ImageArea` に `fit="frame"` なし | Next 14 の `<img>` 直出力で `object-fit` が効かない |
| `fill` 画像に `width:100%; height:auto` を当てる | 横伸び・比率崩れ |
| Production URL だけで Preview 確認 | マージ前の Production は古い `develop` のまま |

**触る場合はセット:** `ImageArea.tsx` + `image_area.module.scss` + `AutoSlideAnimation.tsx` + `auto_slide.module.scss`

### 本番反映の手順

**`develop` へのマージは必ずリポジトリオーナー（midori02）が GitHub 上で行ってください。**  
エージェントや CI が `develop` に直接マージすることはありません。

1. feature ブランチで修正
2. `npm run verify:deploy` を PASS
3. ローカル `npm run dev src` で目視確認（TOP / Works / About / Contact、SP 幅も確認）
4. feature ブランチを push → Vercel **Preview URL** で最終確認（**報告時は Preview URL・PR URL・コミット SHA を必ず貼る**。詳細は [実装チェックリスト §1](docs/implementation-checklist.md)）
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
