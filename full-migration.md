# full-migration.md — Aoki Atelier 全Phase実行指示

## 品質基準（実装前に必ず確認）
- **ミニマル品質基準**: 情報密度は低く、CSS密度とアニメーション密度は最大
- **AI感排除**: 均一なカード配置、テンプレート的構成を避ける
- **差別化**: ダーク×ミニマル×GSAP攻めの組み合わせで独自性を出す
- **タイポ緩急**: Hero文字（4.5rem超）とラベル（0.6rem）の極端な落差
- **余白は演出**: 意図的な「間」が高級感を生む。埋め尽くさない
- **写真パターン**: [A]〜[G]のうち最低4種を使用、同パターン2連続禁止
- **GSAP全面採用**: 全セクションにScrollTrigger適用、stagger・パララックス必須

---

## Phase 1: index.html + collections.html

### 実行手順

1. **プロジェクト初期化**
   - ディレクトリ構成を作成（CLAUDE.md参照）
   - Google Fonts読み込み設定
   - GSAP + ScrollTrigger CDN読み込み設定
   - CSS変数（カラーパレット）をstyle.cssの:rootに定義
   - リセットCSS + 基本タイポグラフィ設定

2. **loading.css + loading.js**
   - ローディングスクリーン実装
   - ブランド名 + タグライン + ゴールドプログレスバー
   - 完了後スライドアウトアニメーション

3. **共通コンポーネント**
   - ヘッダー（固定、透過→スクロールでblur背景、border-bottom: var(--border)）
   - ハンバーガーメニュー（SP: 1px線3本、×変形）
   - フルスクリーンモバイルナビオーバーレイ
   - Footer（全ページ共通）
   - テキストリンクコンポーネント（アロー付き、ホバーでアロー移動）
   - CTAボタンコンポーネント（border: 1px solid rgba(255,255,255,0.3)、ホバーで反転）

4. **index.html実装**
   - SEC-02: Hero（動画背景）— video要素 autoplay muted loop playsinline、SPはposter静止画にフォールバック（pictureではなくCSS media queryでvideo非表示+背景画像表示）。オーバーレイはlinear-gradient。GSAP順次アニメーション5段階。
   - SEC-03: マーキー帯 — 無限横スクロール、@keyframes marquee
   - SEC-04: Philosophy — 中央寄せ、max-width: 720px、テキスト行ごとのstaggerフェードアップ
   - SEC-05: Collection Preview — スタガーグリッド（grid 2カラム、1つ目が2行span）、ホバーでgrayscale解除+overlay。3アイテムstaggerフェードアップ+パララックスy位置ずれ
   - SEC-06: Atelier Glimpse — grid 1.2fr 1fr、画像パララックスy:-15%、テキスト側x:60→0フェードイン
   - SEC-07: Bespoke CTA — フルブリード画像、オーバーレイ、ScrollTriggerでscale 1.05→1.0
   - SEC-08: Footer

5. **collections.html実装**
   - SEC-01: ページHero（シネマティック帯: 上下に黒帯div、中央にワイド画像+テキスト）
   - SEC-02: カテゴリフィルター（タブUI、JSでdata-categoryフィルター、GSAPでfilterアニメーション）
   - SEC-03: 商品グリッド（3カラム、中央列margin-top: 48pxでずらし、16商品、ホバーでgrayscale解除+商品名表示、ScrollTrigger batchでstaggerフェードアップ）
   - SEC-04: Featured Pieces水平スクロール（ScrollTrigger pin + scrub、4-5枚、width: min(450px,45vw)、SPはoverflow-x:auto切替）
   - SEC-05: Bespoke CTA
   - SEC-06: Footer

6. **GSAP初期化（main.js）**
   - gsap.registerPlugin(ScrollTrigger)
   - ヘッダースクロール検知
   - 全.revealの一括ScrollTriggerフェードアップ
   - パララックス各種（画像・テキスト）
   - Collection Previewのstagger
   - Collectionsフィルター
   - Featured水平スクロール
   - カウントアップ等あれば

7. **画像配置**
   - assets/images/hero/hero-video.mp4（Coverr素材を配置）
   - assets/images/hero/hero-poster.jpg（動画の1フレームをSP用に書き出し — 画像生成で代替可）
   - その他プレースホルダー画像（ChatGPT生成後に差し替え予定。実装時はプレースホルダーとしてダーク背景+テキストの仮画像を生成配置）

8. **レスポンシブ対応**
   - 768px: ハンバーガー切替、グリッド1-2カラム化、動画→静止画、水平スクロールpin解除
   - 1024px: グリッド調整、padding縮小

9. **最終チェック（自己診断11項目）**

### 重要注意
- Hero動画ファイル `hero-video.mp4` は `assets/images/hero/` に配置済みの前提で実装すること
- 画像はプレースホルダーで実装し、後日ChatGPT生成画像に差し替える
- 設計書承認以外ではノンストップで完了まで自走すること

---

## Phase 2: about.html + bespoke.html + contact.html

### 実行手順

1. **about.html**
   - SEC-01: ページHero（シネマティック帯 [F]）
   - SEC-02: Designer紹介（左右分割 [C]、ポートレート+バイオ。GSAP: 画像フェードイン+テキストスライドイン）
   - SEC-03: 制作工程（縦スクロール、4-5ステップ。各ステップ: 左に工程写真[B]、右にテキスト。交互配置。パララックス+stagger。ScrollTriggerで各ステップがスクロールに合わせて出現）
   - SEC-04: 素材へのこだわり（テキスト中心セクション、Philosophy同様の中央寄せ。アクセントとして素材のマクロ写真1枚を[G]フローティング配置）
   - SEC-05: Atelier情報（工房外観・内観写真2-3枚のグリッド + 住所テキスト。写真はgrayscale + ホバーでカラー化）
   - SEC-06: Footer

2. **bespoke.html**
   - SEC-01: ページHero（シネマティック帯 [F]）
   - SEC-02: Bespokeの流れ（横レイアウト3-4ステップ。各ステップ: 番号（DM Serif Display / 大きめ / --gold-dim）+ タイトル + 説明文。GSAP staggerでスクロールに合わせて順次出現）
     - Step 1: Consultation（ヒアリング）
     - Step 2: Design（デザイン提案・スケッチ）
     - Step 3: Crafting（制作）
     - Step 4: Delivery（お届け）
   - SEC-03: Past Works（過去オーダーメイド作品ギャラリー。4-6枚、スタガーグリッド [E]。ホバーでgrayscale解除+作品情報overlay）
   - SEC-04: Contact CTA（フルブリード [D]、「まずはご相談ください」、フォームページへの誘導ボタン）
   - SEC-05: Footer

3. **contact.html**
   - SEC-01: ページHero（シネマティック帯 [F]、小さめ height: 30vh）
   - SEC-02: お問い合わせセクション（grid 1fr 1fr。左: テキスト（見出し+説明+営業時間+メールアドレス）。右: フォーム（Name / Email / Phone / Category[select: Ring/Necklace/Earring/Bracelet/Bespoke/Other] / Message / Submit）。フォーム要素: background透過、border-bottom: 1px solid var(--border)、focus時にborder-color: var(--gold)。Submitボタン: CTAボタンコンポーネント）
   - SEC-03: Atelier Access（住所テキスト + Google Maps iframe or 静的地図画像。枠はgrayscale filter）
   - SEC-04: Footer

4. **共通作業**
   - sitemap.xml作成（5ページ分）
   - robots.txt作成
   - 全ページのmeta description / OGP設定
   - 全ページ間の内部リンク整合性確認

5. **画像配置**
   - about/: designer-portrait, process-01〜05, material-closeup, atelier-exterior, atelier-interior-01〜02
   - bespoke/: bespoke-hero, past-work-01〜06, bespoke-cta
   - common/: contact-hero

6. **最終チェック（自己診断11項目）**

### 重要注意
- Phase 1で確立したCSS・JSの共通基盤をそのまま使用すること
- 新しいCSSクラスはstyle.cssに追記（別ファイルにしない）
- main.jsへのScrollTrigger追加も既存パターンに合わせること
- 設計書承認以外ではノンストップで完了まで自走すること
