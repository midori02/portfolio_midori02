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

機能追加・不具合修正は、**企画者・開発者・検収者の 3 視点**を通して進める。  
いずれか一方だけで「完了」としない。

```
要件定義 → レビュー → 設計 → レビュー → 実装 → テスト → レビュー → 最終マージ
         ↑ 各フェーズで 3 視点を確認
```

### 3 つの視点（役割）

| 視点 | 主な担当 | 問い |
|------|----------|------|
| **企画者** | オーナー（midori02）。エージェントは要件を整理・確認 | **何を・なぜ・どこまで**直すか。あるべき見え方は。依頼外に触れないか |
| **開発者** | 実装者（エージェント含む） | **どう実装するか**。最小 diff・既存パターン・再発防止ルールを守れるか |
| **検収者** | オーナーが最終判断。エージェントは **Preview 上で先に自己検収** | **本当に直ったか**。PC/SP・Preview URL・受入基準を満たすか |

> エージェントは 1 人で 3 役を担う。**報告前に 3 視点すべてを自分でチェック**し、報告文に簡潔に書く（下記テンプレ）。

### フェーズ別 — 3 視点チェック

| フェーズ | 企画者目線 | 開発者目線 | 検収者目線 |
|---------|------------|------------|------------|
| **1. 要件定義** | 対象ページ・PC/SP・**完了条件**（あるべき姿）を明文化 | 技術的制約（Next 14 Image、slick 等）を補足 | **受入基準**を書く（「こう見えたら OK」） |
| **2. レビュー** | scope 承認 | — | 受入基準がテスト可能か確認 |
| **3. 設計** | あるべき姿を壊さない設計か | 変更ファイル・[チェックリスト](docs/implementation-checklist.md) §2 | 検収時に何を見るか確定 |
| **4. レビュー** | 方針 OK | 実装可能か OK | 検収手順 OK |
| **5. 実装** | 依頼外変更なし | 最小 diff・4 ファイルセット整合 | — |
| **6. テスト** | — | `verify:deploy` / `verify:works-layout` | **Preview で受入基準を確認**（自己検収） |
| **7. レビュー** | マージ可否 | — | **オーナーが Preview 目視で OK** |
| **8. 最終マージ** | マージ指示（オーナーのみ） | — | 本番 `www.midori02.com` で再確認 |

### 報告テンプレ（エージェント・開発者向け）

ユーザーへ「直した」「確認してください」と伝える前に、次を埋める。

```markdown
## 企画者目線
- 対象: （例: TOP Works スライダー / lps 1 件表示）
- 完了条件: （例: 横 2 枚スライド、1 件は静止、横伸びなし）

## 開発者目線
- 変更: （ファイル概要）
- 自動テスト: verify:deploy ✅ / verify:works-layout ✅ or 未実施理由

## 検収者目線
- Preview URL: （必須）
- PR URL: / コミット SHA:
- 自己検収結果: （PC/SP で何を見て OK / NG）
- オーナー確認待ち: （NG 項目があれば正直に記載）
```

**検収者目線で NG が残っている場合は「完了」と報告しない。**

### 6. テスト（自動 + 表示確認）— 検収者目線の中心

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
