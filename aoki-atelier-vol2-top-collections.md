# Aoki Atelier — Vol.2: Top & Collections 詳細設計

## index.html（トップページ）

---

### SEC-01: ローディングスクリーン

**構造:** フルスクリーン黒背景、中央にブランド名、下部にプログレスバー

```
┌──────────────────────────────────────────────────┐
│                                                  │
│                                                  │
│              AOKI ATELIER                        │  DM Serif Display / 1.2rem / letter-spacing: 0.4em
│        The quiet radiance of imperfection        │  Montserrat 300 italic / 0.65rem / --gold
│                                                  │
│            ━━━━━━━━━━━━━━━━ (40%)                │  ゴールドバー / width: 120px / height: 1px
│                                                  │
└──────────────────────────────────────────────────┘
```

**アニメーション:**
- ブランド名: opacity 0→1, 0.8s ease
- タグライン: opacity 0→1, delay 0.3s
- プログレスバー: width 0→100%, 2s ease-in-out
- 完了後: 全体がopacity→0, translateY(-100%)でスライドアウト, 0.6s

**CSS仕様:**
```css
.loading-screen {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: var(--black);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
}
.loading-bar-fill {
  height: 1px;
  background: var(--gold);
  transition: width 2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
```

---

### SEC-02: Hero（動画背景）

**構造:** 全画面動画背景、中央コンテンツ、下部スクロールインジケーター

```
┌──────────────────────────────────────────────────┐
│ AOKI ATELIER (logo)          Collection  About  │  ← 固定ヘッダー（透過→スクロールでblur背景）
│                              Bespoke  Contact   │
│                                                  │
│  ┌─────────── VIDEO BG (100vh) ───────────────┐  │
│  │          (grayscale 80%, opacity 0.55)      │  │
│  │                                             │  │
│  │     ・・・ Handcrafted since 2018 ・・・      │  │  Montserrat 400 / 0.55rem / spacing 0.5em / --mid-gray
│  │                                             │  │
│  │           AOKI ATELIER                      │  │  DM Serif Display / clamp(2.5rem,6vw,4.5rem) / --white
│  │               │ (1px line, 28px)            │  │
│  │  The quiet radiance of imperfection         │  │  DM Serif Display 400 italic / clamp(0.85rem,1.5vw,1.05rem)
│  │                                             │  │
│  │        [ Explore Collections ]              │  │  border: 1px solid rgba(255,255,255,0.3) / padding: 14px 44px
│  │                                             │  │
│  │               │ (scroll line)               │  │
│  │             Scroll                          │  │
│  └─────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────┘
```

**動画仕様:**
```html
<div class="hero">
  <div class="hero-video-wrap">
    <video class="hero-video" autoplay muted loop playsinline poster="assets/images/hero/hero-poster.jpg">
      <source src="assets/images/hero/hero-video.mp4" type="video/mp4">
    </video>
  </div>
  <div class="hero-overlay"></div>
  <!-- SP: picture要素で静止画フォールバック -->
</div>
```

**CSS:**
```css
.hero-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(80%);
  opacity: 0.55;
}
.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(10,10,10,0.3) 0%,
    rgba(10,10,10,0.1) 40%,
    rgba(10,10,10,0.4) 100%
  );
}
```

**GSAP アニメーション（順次）:**
1. ブランド名: `opacity: 0, y: 40` → `opacity: 1, y: 0`, delay: 0.3s, duration: 1.2s, ease: power3.out
2. ディバイダーライン: `scaleY: 0` → `scaleY: 1`, delay: 0.6s, duration: 0.8s
3. タグライン: `opacity: 0, y: 25` → `opacity: 1, y: 0`, delay: 0.9s, duration: 1s
4. CTAボタン: `opacity: 0` → `opacity: 1`, delay: 1.3s, duration: 0.8s
5. スクロールインジケーター: `opacity: 0` → `opacity: 1`, delay: 1.8s

**ヘッダー:**
```css
.site-header {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
  padding: 28px 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background 0.5s ease, padding 0.3s ease;
}
.site-header.scrolled {
  background: rgba(10, 10, 10, 0.92);
  backdrop-filter: blur(16px);
  padding: 18px 48px;
  border-bottom: 1px solid var(--border);
}
```

**SP対応 (max-width: 768px):**
- 動画非表示、hero-poster.jpgをbackground-imageで表示
- ハンバーガーメニュー（1px線3本、×変形アニメーション）
- フルスクリーンオーバーレイナビ

---

### SEC-03: マーキー帯

**構造:** Hero直下、コレクション名＋区切り文字の無限横スクロール

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  RINGS ✦ NECKLACES ✦ EARRINGS ✦ BRACELETS ✦ BESPOKE ✦ RINGS ✦ ...
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**CSS:**
```css
.marquee-section {
  padding: 20px 0;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  overflow: hidden;
}
.marquee-track {
  display: flex;
  gap: 48px;
  animation: marquee 25s linear infinite;
  white-space: nowrap;
  font-family: 'Montserrat', sans-serif;
  font-weight: 300;
  font-size: 0.7rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--mid-gray);
}
```

---

### SEC-04: Philosophy

**構造:** 中央寄せのブランドステートメント。余白で「間」を演出

```
┌──────────────────────────────────────────────────┐
│                                                  │
│  padding-top: 160px                              │
│                                                  │
│                 PHILOSOPHY                       │  Montserrat 400 / 0.6rem / spacing 0.3em / --mid-gray
│                                                  │
│        In the quiet of the atelier,              │  DM Serif Display 300 / clamp(1.3rem,2.5vw,1.8rem)
│     each piece finds its own voice.              │  line-height: 2.2 / --white
│                                                  │
│       We do not chase trends —                   │
│   we listen to the metal, the stone,             │
│     and the silence between them.                │
│                                                  │
│    静寂のなかで、ひとつひとつの作品が             │  Noto Sans JP 300 / 0.85rem / --light-gray
│       自らの声を見つける。                        │
│                                                  │
│  padding-bottom: 160px                           │
│                                                  │
└──────────────────────────────────────────────────┘
```

**最大幅:** max-width: 720px, margin: 0 auto
**em要素:** font-style: italic, font-weight: 400（英語の強調語）

**GSAP:** 全体が`.reveal`。テキストは1行ずつstagger: 0.15でフェードアップ。

---

### SEC-05: Collection Preview

**構造:** 3点ピックアップ、スタガーグリッド [パターンE]

```
┌──────────────────────────────────────────────────┐
│              COLLECTION                          │  セクションラベル
│                                                  │
│  ┌──────────────┐  ┌──────────────┐              │
│  │              │  │              │              │
│  │   (4:5)      │  │   (4:5)      │              │  左2つは同じ高さ
│  │  Ring 01     │  │  Necklace 01 │              │
│  │  grayscale   │  │  grayscale   │              │
│  │              │  │              │              │
│  │  hover:      │  │              │              │
│  │  color +     │  └──────────────┘              │
│  │  name fade   │         ┌──────────────┐       │  右下にオフセット配置
│  │              │         │              │       │
│  └──────────────┘         │   (4:5)      │       │
│                           │  Earring 01  │       │
│                           │  grayscale   │       │
│                           │              │       │
│                           └──────────────┘       │
│                                                  │
│           [ View All Collections → ]             │  テキストリンク + アロー
│                                                  │
└──────────────────────────────────────────────────┘
```

**グリッドCSS:**
```css
.collection-preview-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto;
  gap: 2px;
  max-width: 1200px;
  margin: 0 auto;
}
.collection-preview-grid .item:nth-child(1) { grid-column: 1; grid-row: 1 / 3; }
.collection-preview-grid .item:nth-child(2) { grid-column: 2; grid-row: 1; }
.collection-preview-grid .item:nth-child(3) { grid-column: 2; grid-row: 2; }
```

**カード仕様:**
```css
.collection-preview-item {
  position: relative;
  overflow: hidden;
  cursor: pointer;
}
.collection-preview-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  aspect-ratio: 4/5;
  filter: grayscale(100%);
  transition: filter 0.8s ease, transform 0.8s ease;
}
.collection-preview-item:hover img {
  filter: grayscale(0%);
  transform: scale(1.04);
}
.collection-preview-item .overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 32px;
  background: linear-gradient(transparent, rgba(10,10,10,0.7));
  opacity: 0;
  transition: opacity 0.5s ease;
}
.collection-preview-item:hover .overlay { opacity: 1; }
```

**オーバーレイ内テキスト:**
- カテゴリ: Montserrat 400 / 0.6rem / spacing 0.2em / --gold
- 作品名: DM Serif Display / 1.2rem / --white
- 素材: Montserrat 300 / 0.75rem / --light-gray

**GSAP:** 3アイテムがstagger: 0.2でフェードアップ。スクロールパララックスで各アイテムのy位置が微妙にずれる。

**SP (max-width: 768px):** grid-template-columns: 1fr、3アイテムが縦積み。

---

### SEC-06: Atelier Glimpse

**構造:** 左右分割 [パターンC]、左に工房写真、右にテキスト

```
┌──────────────────────────────────────────────────┐
│                                                  │
│  ┌─────────────────────┬─────────────────────┐   │
│  │                     │                     │   │
│  │                     │   THE ATELIER       │   │  Montserrat / 0.6rem / --mid-gray
│  │                     │                     │   │
│  │   (工房内観写真)     │   Where hands       │   │  DM Serif Display / clamp(1.5rem,3vw,2.2rem)
│  │   grayscale 60%     │   meet intention    │   │  --white
│  │   パララックス       │                     │   │
│  │                     │   蔵前の小さな工房で  │   │  Noto Sans JP / 0.85rem / --light-gray
│  │                     │   一点ずつ手仕事で    │   │
│  │                     │   仕上げています。    │   │
│  │                     │                     │   │
│  │                     │   [ Visit Atelier → ]│   │  テキストリンク
│  │                     │                     │   │
│  └─────────────────────┴─────────────────────┘   │
│                                                  │
└──────────────────────────────────────────────────┘
```

**CSS:**
```css
.atelier-glimpse {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  min-height: 80vh;
}
.atelier-glimpse__image {
  position: relative;
  overflow: hidden;
}
.atelier-glimpse__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(60%);
}
.atelier-glimpse__text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 80px 64px;
  background: var(--near-black);
}
```

**GSAP:**
- 画像: ScrollTrigger パララックス `y: "-15%"`, scrub: 1
- テキスト側: 左からスライドイン `x: 60 → 0`, opacity, duration: 1s

**SP:** grid-template-columns: 1fr、画像が上、テキストが下。

---

### SEC-07: Bespoke CTA

**構造:** フルブリード画像＋オーバーレイ [パターンD]

```
┌──────────────────────────────────────────────────┐
│  ┌──────────────────────────────────────────────┐│
│  │                                              ││
│  │        (フルブリード画像 / height: 60vh)       ││
│  │        オーバーレイ rgba(10,10,10,0.55)       ││
│  │                                              ││
│  │              BESPOKE                         ││  Montserrat / 0.6rem / --gold
│  │                                              ││
│  │     Your vision, our craftsmanship.          ││  DM Serif Display / clamp(1.5rem,3vw,2.4rem) / --white
│  │                                              ││
│  │   あなたの想いを、かたちに。                   ││  Noto Sans JP / 0.85rem / --light-gray
│  │                                              ││
│  │        [ Begin Your Journey → ]              ││  border button
│  │                                              ││
│  └──────────────────────────────────────────────┘│
└──────────────────────────────────────────────────┘
```

**GSAP:** 画像がScrollTriggerでscale 1.05 → 1.0（スクロールに連動してゆっくりズームアウト）。テキストはフェードアップ。

---

### SEC-08: Footer

```
┌──────────────────────────────────────────────────┐
│  ─────────────── (1px line / --border) ────────  │
│                                                  │
│  AOKI ATELIER                                    │  DM Serif Display / 1rem / --white
│  The quiet radiance of imperfection              │  Montserrat 300 italic / 0.65rem / --mid-gray
│                                                  │
│  Instagram    Privacy    Terms    Contact         │  Montserrat 400 / 0.65rem / --mid-gray
│                                                  │
│  © 2026 Aoki Atelier. All rights reserved.       │  Montserrat 300 / 0.6rem / --muted
│                                                  │
└──────────────────────────────────────────────────┘
```

padding: 64px 48px。flexbox、左にブランド情報、右にリンク。
SP: flex-direction: column、中央寄せ。

---

## collections.html

---

### SEC-01: ページHero [パターンF: シネマティック帯]

```
┌──────────────────────────────────────────────────┐
│  ████████████████ (黒帯 / height: 48px) ████████ │
│  ┌──────────────────────────────────────────────┐│
│  │                                              ││
│  │   (ワイド画像 / height: 40vh / grayscale)     ││
│  │                                              ││
│  │            COLLECTIONS                       ││  DM Serif Display / clamp(2rem,4vw,3rem)
│  │     Pieces born from silence                 ││  Montserrat 300 italic / 0.85rem
│  │                                              ││
│  └──────────────────────────────────────────────┘│
│  ████████████████ (黒帯 / height: 48px) ████████ │
└──────────────────────────────────────────────────┘
```

上下に黒帯（padding相当ではなく実際のdiv）で映画的なアスペクト比を演出。
背景画像: ジュエリーが散らばったダーク背景のフラットレイ。

---

### SEC-02: カテゴリフィルター

```
┌──────────────────────────────────────────────────┐
│                                                  │
│   All    Rings    Necklaces    Earrings    Bracelets   │
│    ___                                           │  ← activeに下線（1px / --gold / width: 100%）
│                                                  │
└──────────────────────────────────────────────────┘
```

**CSS:**
```css
.filter-tabs {
  display: flex;
  justify-content: center;
  gap: 36px;
  padding: 48px 0;
}
.filter-tab {
  font-family: 'Montserrat', sans-serif;
  font-weight: 400;
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--mid-gray);
  background: none;
  border: none;
  padding-bottom: 4px;
  cursor: pointer;
  position: relative;
  transition: color 0.3s;
}
.filter-tab.active,
.filter-tab:hover {
  color: var(--white);
}
.filter-tab.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background: var(--gold);
}
```

**JS:** クリックでdata-category属性に基づきGSAPでフィルターアニメーション（opacity + scale）

---

### SEC-03: 商品グリッド [パターンE: スタガーグリッド]

**構造:** 不均等3カラムグリッド、高さをずらして配置

```
┌──────────────────────────────────────────────────┐
│                                                  │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐          │
│  │ (4:5)   │  │         │  │ (3:4)   │          │
│  │ Ring 01 │  │ (1:1)   │  │ Earring │          │
│  │         │  │ Necklace│  │   01    │          │
│  └─────────┘  │   01    │  │         │          │
│  ┌─────────┐  │         │  └─────────┘          │
│  │ (3:4)   │  └─────────┘  ┌─────────┐          │
│  │ Ring 02 │  ┌─────────┐  │ (4:5)   │          │
│  │         │  │ (4:5)   │  │ Bracelet│          │
│  │         │  │ Necklace│  │   01    │          │
│  └─────────┘  │   02    │  │         │          │
│               │         │  └─────────┘          │
│               └─────────┘                       │
│                                                  │
│  ... (12-16商品)                                  │
│                                                  │
└──────────────────────────────────────────────────┘
```

**CSS:**
```css
.products-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2px;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2px;
}
.product-card:nth-child(3n+2) {
  margin-top: 48px;  /* 中央列をずらす */
}
```

**各カード:**
- デフォルト: grayscale(100%)
- ホバー: grayscale(0%) + scale(1.03) + 商品名オーバーレイ表示
- 商品名: Montserrat 400 / 0.75rem / --white
- 素材: Montserrat 300 / 0.65rem / --light-gray
- 価格: DM Serif Display / 0.9rem / --gold

**GSAP:** ScrollTrigger batch — 画面に入ったカードから順にstagger: 0.08でフェードアップ。

**SP:** grid-template-columns: 1fr 1fr、margin-top削除（ずらしなし）。

---

### SEC-04: Featured Pieces（水平スクロール）

**構造:** ScrollTrigger pinによる横スクロールセクション

```
┌──────────────────────────────────────────────────┐
│                                                  │
│          FEATURED PIECES                         │
│                                                  │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐    │  ← 横スクロール
│  │        │ │        │ │        │ │        │    │     4-5枚の大きな画像
│  │ (3:4)  │ │ (3:4)  │ │ (3:4)  │ │ (3:4)  │    │     width: 45vw each
│  │ 450px  │ │        │ │        │ │        │    │
│  │        │ │        │ │        │ │        │    │
│  └────────┘ └────────┘ └────────┘ └────────┘    │
│   Lumière    Silence    Kintsugi    Void         │
│   Ring       Necklace   Earrings   Bracelet      │
│                                                  │
└──────────────────────────────────────────────────┘
```

**GSAP ScrollTrigger:**
```javascript
gsap.to('.featured-track', {
  x: () => -(document.querySelector('.featured-track').scrollWidth - window.innerWidth),
  ease: 'none',
  scrollTrigger: {
    trigger: '.featured-section',
    pin: true,
    scrub: 1,
    end: () => '+=' + document.querySelector('.featured-track').scrollWidth,
  }
});
```

各カードは大きめ（width: min(450px, 45vw)）。画像下にテキスト。
ホバーでscale(1.02) + 画像のgrayscale解除。

**SP:** 横スクロール（overflow-x: auto）に切り替え、pinなし。

---

### SEC-05: Bespoke CTA（Topと同様）

Collectionsを見た後のBespoke誘導。Topページ SEC-07と同じ構造・CSSだが、画像とコピーを変える。

コピー案:
- EN: *Didn't find what you're looking for? Let's create it together.*
- JA: *お探しのものが見つからなかったら、一緒につくりましょう。*

---

### SEC-06: Footer（共通）

Topページと同一。全ページで共通。

---

## 商品データ（Collections用 / 全16点）

### Rings（4点）
| ID | Name | Material | Price |
|----|------|----------|-------|
| R01 | Lumière | K18 Yellow Gold | ¥88,000 |
| R02 | Fissure | SV925 + K18 Plating | ¥38,500 |
| R03 | Kintsugi | K18 + 漆 | ¥132,000 |
| R04 | Void | SV925 Oxidized | ¥28,600 |

### Necklaces（4点）
| ID | Name | Material | Price |
|----|------|----------|-------|
| N01 | Silence | K18 + Freshwater Pearl | ¥110,000 |
| N02 | Thread | SV925 Chain | ¥33,000 |
| N03 | Horizon | K18 + Moonstone | ¥154,000 |
| N04 | Murmur | SV925 + K18 Plating | ¥44,000 |

### Earrings（4点）
| ID | Name | Material | Price |
|----|------|----------|-------|
| E01 | Whisper | K18 + Diamond 0.05ct | ¥77,000 |
| E02 | Ripple | SV925 Hammered | ¥22,000 |
| E03 | Eclipse | K18 + Onyx | ¥99,000 |
| E04 | Dew | SV925 + Freshwater Pearl | ¥26,400 |

### Bracelets（4点）
| ID | Name | Material | Price |
|----|------|----------|-------|
| B01 | Orbit | K18 Bangle | ¥176,000 |
| B02 | Trace | SV925 Chain | ¥30,800 |
| B03 | Cocoon | K18 + SV925 Mixed | ¥88,000 |
| B04 | Sway | SV925 + Silk Cord | ¥19,800 |

---

## 画像生成仕様（ChatGPT用）

### 共通プロンプト指示
- スタイル: ダーク背景（#0a0a0a〜#1a1a1a）、マクロ撮影、自然光風のソフトライティング
- 質感: 金属の反射はハイライト控えめ、マットな仕上がり
- 構図: 被写体を中央〜やや偏心に配置、十分な余白
- 人物: 手元のみ（顔は映さない）、または商品単体
- 解像度: 1024x1024 → WebP + JPG最適化

### 枚数見積もり
| ページ | 用途 | 枚数 |
|--------|------|------|
| Top | Hero poster (1) + Collection Preview (3) + Atelier Glimpse (1) + Bespoke CTA (1) | 6 |
| Collections | ページHero (1) + 商品画像 (16) + Featured (4-5) | 22 |
| **Phase 1 合計** | | **28枚** |
