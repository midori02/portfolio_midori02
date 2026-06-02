# portfolio_midori02

midori02 のポートフォリオサイト（Next.js Pages Router + Firebase + Vercel）。

**この README は開発の入口です。** オーナー・共同作業者・Cursor エージェントは、作業前に本ファイルと [docs/implementation-checklist.md](docs/implementation-checklist.md) を確認してください（エージェント向けの要約は [`.cursor/rules/minimal-scope-and-consent.mdc`](.cursor/rules/minimal-scope-and-consent.mdc) にもあります）。

## 開発

```bash
npm ci
npm run dev src
```

- ローカル: http://127.0.0.1:3001（Node **18+**）
- 環境変数: `src/.env.local`（テンプレは `src/.env.local.example`）

## 開発フロー

機能追加・不具合修正は、次の順序とレビューゲートを守る。

```
要件定義 → レビュー → 設計 → レビュー → 実装 → テスト → レビュー → 最終マージ
```

| フェーズ | 内容 | 成果物・確認 |
|---------|------|-------------|
| **1. 要件定義** | 何を直す／作るか。対象ページ（TOP / Works 等）、PC/SP、完了条件 | Issue・チャット合意・スクショ（現状） |
| **2. レビュー** | 要件の scope が狭いか、依頼外（About 等）に触れないか | オーナー OK |
| **3. 設計** | 変更ファイル、既存パターンとの整合（[実装チェックリスト](docs/implementation-checklist.md) §2） | 方針メモ（どのファイルをセットで触るか） |
| **4. レビュー** | 設計が `develop` 一括 revert や slick/Image の再発防止に反していないか | オーナー OK |
| **5. 実装** | feature ブランチで最小 diff | コード |
| **6. テスト** | **自動 + 表示確認**（下記）。PASS するまで「直った」と報告しない | テスト結果・Preview URL |
| **7. レビュー** | Vercel Preview で目視（オーナー）。報告には **Preview URL + PR URL + コミット SHA** 必須 | オーナー OK |
| **8. 最終マージ** | **`develop` へのマージはオーナー（midori02）のみ**（GitHub 上） | Production デプロイ |

### 6. テスト（自動 + 表示確認）

#### 自動（push 前必須）

```bash
npm run verify:deploy
```

ビルド・主要ルート・JS チャンク。**レイアウト・フォント・スライダーの見た目は含まれない。**

#### 表示確認（Works / 画像 / レイアウト変更時は必須）

1. **ローカル目視** — `npm run dev src` → http://127.0.0.1:3001  
   TOP / Works / About / Contact、**PC と SP（767px 以下）**
2. **レイアウト自動チェック（Works 関連）** — dev サーバー起動中に:

```bash
npm run verify:works-layout
```

Playwright で Works セクションを計測（スライド縦積み・セクション高さ・画像比率など）。`scripts/works-check-local.png` にスクショ出力。

3. **Vercel Preview 目視** — PR の Preview URL（Production ではない）  
   チェック項目: [実装チェックリスト §4](docs/implementation-checklist.md)

**テスト完了の条件:** `verify:deploy` PASS + 表示確認 PASS + Preview URL を報告に記載。

## デプロイ前の確認

push 前に必ず実行:

```bash
npm run verify:deploy
```

Works / 画像変更時は上記 **§6 表示確認** も実施。

### Works / 画像 — 再発防止（要約）

同じ不具合（スライド縦並び・画像横伸び）が何度も再発したため、詳細は [docs/implementation-checklist.md](docs/implementation-checklist.md) に記載。

| やってはいけないこと | 理由 |
|---------------------|------|
| `develop` の `auto_slide` を一括 revert | `rtl: true`・slick `float` 不足が戻り縦並びになる |
| スライダーで `ImageArea` に `fit="frame"` なし | Next 14 の `<img>` 直出力で `object-fit` が効かない |
| `fill` 画像に `width:100%; height:auto` を当てる | 横伸び・比率崩れ |
| Production URL だけで Preview 確認 | マージ前の Production は古い `develop` のまま |
| 表示確認なしで「直った」と報告 | `verify:deploy` だけではレイアウトは検証されない |

**触る場合はセット:** `ImageArea.tsx` + `image_area.module.scss` + `AutoSlideAnimation.tsx` + `auto_slide.module.scss`

### 本番反映の手順

**`develop` へのマージは必ずリポジトリオーナー（midori02）が GitHub 上で行ってください。**  
エージェントや CI が `develop` に直接マージすることはありません。

1. [開発フロー](#開発フロー)に従い feature ブランチで実装・テスト
2. `npm run verify:deploy` を PASS（Works 変更時は `verify:works-layout` と目視も）
3. feature ブランチを push → Vercel **Preview URL** で最終確認（**報告時は Preview URL・PR URL・コミット SHA を必ず貼る**）
4. **オーナーが** GitHub で PR をレビュー・`develop` へマージ
5. Vercel が Production（https://www.midori02.com/）へ自動デプロイ
6. 本番で表示・お問い合わせ送信を確認

### Vercel 設定チェックリスト

- Node.js Version: **24.x**
- Production 環境変数: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL`

### Firebase ルール

Firestore / Storage ルールは Vercel デプロイとは別です。変更時は Firebase Console または CLI で公開してください。

## 関連ドキュメント

| ファイル | 用途 |
|---------|------|
| [README.md](README.md) | 開発フロー・入口（本ファイル） |
| [docs/implementation-checklist.md](docs/implementation-checklist.md) | Works / 画像の詳細チェック・禁止事項 |
| [.cursor/rules/minimal-scope-and-consent.mdc](.cursor/rules/minimal-scope-and-consent.mdc) | Cursor エージェント向け常時ルール |

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js deployment documentation](https://nextjs.org/docs/deployment)
