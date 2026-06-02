# 実装・修正時チェックリスト

レイアウト崩れ・Works スライダー不具合の再発を防ぐため、**コード変更前・PR 前**に確認する。

`npm run verify:deploy` はビルドとルート到達のみ。**見た目は必ず目視**する。

---

## 1. 確認環境（毎回）

| 確認項目 | 内容 |
|---------|------|
| 見る URL | **PR の Vercel Preview**（`git-fix-...` 系）。Production（`develop` / `www.midori02.com`）はマージ前は古い |
| ブランチ | Preview のコミット SHA が PR 先頭と一致しているか |
| 画面幅 | **PC（768px 以上）** と **SP（767px 以下）** の両方 |
| 対象ページ | TOP（Works スライダー）、各 Works 一覧、Contact フォント |

---

## 2. Works / 画像 / スライダー — 再発防止（最重要）

### なぜ何度も崩れるか

1. **Next.js 14** の `next/image` は **`<img>` 直出力**（Next 12 のラッパー `span/div` なし）
2. 既存 SCSS の多くが **`div > img` / ラッパー高さ 100%** 前提
3. **`develop` 版 SCSS をそのまま戻す**と、slick 向け修正（`float` / `rtl` / 二重ラップ）まで消え **縦並び・横伸び** が再発する

### 触るファイル（セットで扱う）

| 役割 | ファイル |
|------|----------|
| 画像コンポーネント | `src/components/atoms/Images/ImageArea.tsx` |
| 画像 CSS | `src/styles/components/atoms/image_area.module.scss` |
| スライダー TSX | `src/components/molecules/Works/AutoSlideAnimation.tsx` |
| スライダー CSS | `src/styles/components/molecules/auto_slide.module.scss` |

**ImageArea だけ / auto_slide だけ**の片方修正は原則禁止。必ずペアで整合を取る。

### ImageArea の使い分け（変更禁止パターンに注意）

| 用途 | 指定 | 理由 |
|------|------|------|
| TOP Works スライダー | `fit="frame"` | 固定枠内で `fill` + `object-fit: cover` |
| Works カード一覧 | デフォルト（`intrinsic`） | `width/height` props + `height: auto` |
| モーダルバナー | `objectFit="contain"` | 全体を見せる |

**禁止:**

- スライダーで `fit` なしのまま `width/height` だけ渡す（横伸びの原因）
- `image_area__img` に `width: 100%; height: auto` を **fill 画像にも**当てる（`__imgFill` は別クラス）
- スライダー画像を `<img>` や生の `next/image` に置き換える

### react-slick — 維持必須の実装

`AutoSlideAnimation.tsx` で **以下を削除・変更しない**（`develop` 復元で戻さない）:

```tsx
// ✅ 維持
rtl: false
slidesToShow: Math.min(2, slideCount)  // 枚数に応じる
infinite: slideCount > desktopSlidesToShow
responsive: [{ breakpoint: 768, settings: { slidesToShow: 1, ... } }]

// ✅ react-slick 必須の二重ラップ
<Slider>
  <div key={id}>                    {/* 外: slick 用 */}
    <div className={..._image}>     {/* 内: 枠・border */}
      <ImageArea fit="frame" ... />
    </div>
  </div>
</Slider>
```

`auto_slide.module.scss` で **維持必須**:

```scss
:global(.slick-slide) {
  float: left;   // ← 無いと縦並び
  ...
}
```

**禁止:**

- `rtl: position === 'left'`（`develop` 由来。**縦並びの主因**）
- `div[class='slick-slide']` の**完全一致**セレクタだけに依存（`slick-active` 付きで外れる）
- `develop` の `auto_slide.module.scss` を **一括 revert** して ImageArea 修正だけ残す

### ローディング（Metaballs）

- TSX / SCSS のクラス名は **`blubb`**（`bulbb` typo 禁止）
- SP ローディングスキップは `LoadingContainer.tsx` の `max-width: 767px` のみ

---

## 3. 変更前の判断フロー

```
Works / 画像 / スライダーに触る？
  ├─ Yes → docs/implementation-checklist.md §2 を読む
  │         ImageArea + AutoSlideAnimation + 両 SCSS をセットで確認
  │         develop 一括 revert しない
  └─ No  → 依頼範囲外（About / Contact 等）を触らない
```

---

## 4. PR 前の目視チェック（Works 関連変更時は必須）

- [ ] TOP Works: 各カテゴリ（websites / lps / apps …）が **横並びスライド**（縦積みでない）
- [ ] スライド画像: **横伸びしていない**（円・文字が潰れていない）
- [ ] 枠線: 各スライドに **1px 黒 border**
- [ ] 左配置（lps 等）・右配置（websites 等）が **交互**になっている
- [ ] SP: 1 枚表示・ローディングスキップ（意図どおり）
- [ ] PC: ローディング Metaballs（泡アニメ）が動く
- [ ] Works 一覧カード: 画像が枠内に収まる
- [ ] Preview URL が **PR ブランチ**のもの（Production URL でない）

---

## 5. その他（既存ルール）

- `.env.local` は **`src/.env.local`**
- `develop` マージは **オーナー（midori02）** が GitHub 上で実施
- push 前: `npm run verify:deploy` PASS

---

## 6. 関連ファイル早見表

| 症状 | まず見るファイル |
|------|------------------|
| スライドが縦並び | `AutoSlideAnimation.tsx`（`rtl` / 二重ラップ）、`auto_slide.module.scss`（`:global(.slick-slide) float`） |
| 画像が横伸び | `ImageArea.tsx`（`fit="frame"`）、`image_area.module.scss`（`__img` と `__imgFill` の分離） |
| 枠・高さがおかしい | `auto_slide.module.scss` の `&_image { height: 120/160/280px }` |
| Preview が変わらない | Vercel の **Preview** タブ・PR コメントの URL（Production ではない） |
