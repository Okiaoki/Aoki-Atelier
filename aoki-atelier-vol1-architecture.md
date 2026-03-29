# Aoki Atelier — Vol.1: サイトアーキテクチャ & デザイン方針

## ブランド概要

**AOKI ATELIER** — 東京・蔵前に工房を構えるハンドメイドジュエリーブランド。
「静寂の中に宿る光」をコンセプトに、一点一点を手作業で仕上げる。
素材はSV925・K18・天然石を中心に、日本の金工技法とモダンミニマリズムを融合。

**タグライン:** *The quiet radiance of imperfection*
**日本語サブ:** 静かな光、手のぬくもり。

---

## サイトマップ（5ページ）

```
index.html .............. Top（Hero動画 + Philosophy + Collection Preview + Atelier Glimpse + CTA）
collections.html ........ Collections（全コレクション一覧 + フィルター）
about.html .............. About / Atelier（作り手紹介 + 工房 + 制作工程）
bespoke.html ............ Bespoke（オーダーメイドの流れ + 過去作品 + 問い合わせ導線）
contact.html ............ Contact（フォーム + アトリエ情報 + MAP）
```

---

## 技術仕様

| 項目 | 仕様 |
|------|------|
| HTML/CSS/JS | 静的サイト（フレームワークなし） |
| CSS構成 | `style.css`（メイン）+ `loading.css` |
| JS構成 | `main.js`（GSAP + ScrollTrigger + UI）+ `loading.js` |
| アニメーション | GSAP 3.x + ScrollTrigger（CDN） |
| フォント | DM Serif Display（見出し・ブランド名）+ Montserrat（本文・ラベル） |
| 日本語フォント | Noto Sans JP 300/400（日本語サブテキスト用） |
| Hero動画 | Coverr素材 MP4（1080p / 8.5秒 / 4.4MB） |
| 画像 | ChatGPT生成 → WebP + JPGフォールバック（picture要素） |
| デプロイ | GitHub Pages |
| SP対応 | モバイルファースト、ブレークポイント: 768px / 1024px |

---

## デザインシステム

### カラーパレット

```css
:root {
  /* Base */
  --black:        #0a0a0a;
  --near-black:   #111111;
  --dark-gray:    #1a1a1a;
  --charcoal:     #2a2a2a;

  /* Text */
  --white:        #f0ede8;    /* 温かみのあるオフホワイト */
  --light-gray:   #b8b4ad;
  --mid-gray:     #6b6760;
  --muted:        #4a4640;

  /* Accent */
  --gold:         #c8a96e;    /* メインアクセント：控えめなゴールド */
  --gold-light:   #d4bc8a;
  --gold-dim:     #8a7a55;

  /* Functional */
  --bg-primary:   var(--black);
  --bg-secondary: var(--near-black);
  --bg-card:      var(--dark-gray);
  --border:       rgba(200, 169, 110, 0.12);
  --border-hover: rgba(200, 169, 110, 0.3);
}
```

### タイポグラフィ

| 用途 | フォント | Weight | Size |
|------|----------|--------|------|
| ブランド名（Hero） | DM Serif Display | 400 | clamp(2.5rem, 6vw, 4.5rem) |
| セクション見出し | DM Serif Display | 400 | clamp(1.8rem, 3.5vw, 2.8rem) |
| 英語ラベル（PHILOSOPHY等） | Montserrat | 400 | 0.65rem, letter-spacing: 0.3em |
| 本文（英語） | Montserrat | 300 | 0.95rem, line-height: 1.9 |
| 本文（日本語サブ） | Noto Sans JP | 300 | 0.85rem, line-height: 1.8 |
| ボタン | Montserrat | 400 | 0.65rem, letter-spacing: 0.25em |
| 価格・数字 | DM Serif Display | 400 | — |

### アニメーション基準（GSAP）

| 演出 | 仕様 |
|------|------|
| スクロールフェードイン | `opacity: 0 → 1`, `y: 60 → 0`, `duration: 1`, `ease: power3.out` |
| パララックス（画像） | ScrollTrigger, `y: "-20%"`, `scrub: 1` |
| パララックス（テキスト） | ScrollTrigger, `y: "-10%"`, `scrub: 1.5` |
| 商品カード ホバー | `scale: 1.03`, `duration: 0.6`, `ease: power2.out` |
| 画像 ホバー | `filter: grayscale(0%)` from `grayscale(100%)`, `duration: 0.8` |
| テキスト分割アニメ | SplitText or 手動char分割, stagger: 0.03 |
| ページ遷移感 | ローディングスクリーン（薄いゴールドバー） |
| Hero動画 | autoplay, muted, loop, playsinline, SPは静止画フォールバック |
| スクロールインジケーター | 縦線＋パルスアニメーション |
| マーキー | コレクション名を無限横スクロール（Noir同様） |
| 水平スクロール | Collectionsページで商品カードを横スクロール（ScrollTrigger pin） |

### 写真の見せ方パターン

| パターン | 説明 | 使用箇所 |
|----------|------|----------|
| [A] フルブリード | 画面幅100%、高さ60-80vh、グレースケール | Hero背景、パララックスセクション |
| [B] マクロクロップ | aspect-ratio: 1/1 or 4/5、ジュエリー単体、ダーク背景 | Collection カード、商品詳細 |
| [C] 左右分割 | 画面50:50、片側画像+片側テキスト | About、Bespoke |
| [D] オーバーレイ | 画像上にテキスト＋半透明ブラック | CTA、Lookbook |
| [E] スタガーグリッド | 不均等グリッド（2:1比率）、高さずらし | Collection一覧 |
| [F] シネマティック帯 | 上下に黒帯（letterbox）、16:9超のワイド | ページ間の区切り |
| [G] フローティング | 画像が少しはみ出す配置、影なし | Atelier紹介 |

---

## ミニマル品質基準（通常の濃度基準を本プロジェクト用に再定義）

### 原則：「引き算のデザインを、足し算のコードで実現する」

| 観点 | 通常基準 | 本プロジェクト基準 |
|------|----------|-------------------|
| 情報密度 | 画面を埋め尽くす | **要素数は少なく、1要素の存在感を最大化** |
| CSS密度 | 最大 | **最大（変更なし）** — hover/transition/padding/装飾を全要素に |
| アニメーション | 必須 | **攻め** — GSAP ScrollTrigger全面採用、パララックス多層、テキスト分割 |
| タイポの緩急 | 極端なサイズ差 | **極端（変更なし）** — Hero文字が画面支配、ラベルは極小 |
| 画像 | 贅沢に使う | **少数精鋭** — 枚数は絞るが1枚1枚が画面を支配するサイズ |
| 余白 | 残さない | **余白は演出** — 意図的な「間」が高級感を生む |
| レイアウト | 5種以上 | **5種以上（変更なし）** — パターン[A]〜[G]で担保 |

---

## ページ概要（セクション構成プレビュー）

### index.html（Top）
1. ローディングスクリーン
2. Hero（動画背景 + ブランド名 + タグライン + CTA）
3. マーキー帯（コレクション名横スクロール）
4. Philosophy（ブランドステートメント、中央配置テキスト）
5. Collection Preview（3点ピックアップ、スタガーグリッド）
6. Atelier Glimpse（左右分割、工房写真 + 短文）
7. Bespoke CTA（フルブリード画像 + オーバーレイテキスト）
8. Footer

### collections.html
1. ページHero（シネマティック帯）
2. フィルター（カテゴリタブ: All / Rings / Necklaces / Earrings / Bracelets）
3. 商品グリッド（スタガーグリッド、ホバーでグレースケール解除 + 商品名表示）
4. 水平スクロールセクション（Featured pieces、ScrollTrigger pin）
5. CTA（Bespoke誘導）
6. Footer

### about.html
1. ページHero（シネマティック帯）
2. Designer紹介（左右分割、ポートレート + バイオ）
3. 制作工程（縦スクロール、工程写真×4-5ステップ、パララックス）
4. 素材へのこだわり（テキスト中心、アクセント画像）
5. Atelier情報（工房外観・内観写真）
6. Footer

### bespoke.html
1. ページHero（シネマティック帯）
2. Bespokeの流れ（3-4ステップ、横レイアウト）
3. Past Works（過去のオーダーメイド作品ギャラリー）
4. Contact CTA（フォームへの誘導）
5. Footer

### contact.html
1. ページHero（シネマティック帯）
2. お問い合わせフォーム（左テキスト + 右フォーム）
3. Atelier Access（住所 + 地図 + 営業時間）
4. Footer

---

## Phase分割計画

| Phase | 対象ページ | 備考 |
|-------|-----------|------|
| Phase 1 | index.html + collections.html | コアページ。GSAP・ローディング・共通CSS確立 |
| Phase 2 | about.html + bespoke.html + contact.html | Phase 1承認後に実装 |

---

## ファイル構成

```
Aoki-Atelier/
├── index.html
├── collections.html
├── about.html
├── bespoke.html
├── contact.html
├── assets/
│   ├── css/
│   │   ├── style.css
│   │   └── loading.css
│   ├── js/
│   │   ├── main.js
│   │   └── loading.js
│   ├── images/
│   │   ├── hero/
│   │   │   ├── hero-video.mp4
│   │   │   └── hero-poster.jpg  (SP用静止画フォールバック)
│   │   ├── collections/
│   │   ├── about/
│   │   ├── bespoke/
│   │   ├── common/
│   │   └── icons/
│   └── fonts/ (不要: Google Fonts CDN)
├── CLAUDE.md
├── full-migration.md
├── sitemap.xml
└── robots.txt
```
