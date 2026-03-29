# CLAUDE.md — Aoki Atelier

## プロジェクト概要
ハンドメイドジュエリーブランド「AOKI ATELIER」のポートフォリオ用Webサイト。
ミニマル×エレガント、ダーク基調、GSAP全面採用。

## 技術スタック
- HTML/CSS/JS（フレームワークなし）
- GSAP 3.x + ScrollTrigger（CDN: https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js）
- ScrollTrigger CDN: https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js
- Google Fonts: DM Serif Display + Montserrat + Noto Sans JP

## ディレクトリ構成
```
Aoki-Atelier/
├── index.html
├── collections.html
├── about.html
├── bespoke.html
├── contact.html
├── assets/
│   ├── css/style.css, loading.css
│   ├── js/main.js, loading.js
│   └── images/hero/, collections/, about/, bespoke/, common/, icons/
├── CLAUDE.md
├── full-migration.md
├── sitemap.xml
└── robots.txt
```

## カラーパレット（必ず CSS変数を使用）
```css
--black: #0a0a0a;
--near-black: #111111;
--dark-gray: #1a1a1a;
--charcoal: #2a2a2a;
--white: #f0ede8;
--light-gray: #b8b4ad;
--mid-gray: #6b6760;
--muted: #4a4640;
--gold: #c8a96e;
--gold-light: #d4bc8a;
--gold-dim: #8a7a55;
--border: rgba(200, 169, 110, 0.12);
--border-hover: rgba(200, 169, 110, 0.3);
```

## フォント使用ルール
| 用途 | フォント | Weight | 備考 |
|------|----------|--------|------|
| ブランド名・見出し | DM Serif Display | 400 | letter-spacing: 0.2-0.4em |
| 英語ラベル・ボタン・本文 | Montserrat | 200-500 | 本文は300、ラベルは400 |
| 日本語サブテキスト | Noto Sans JP | 300-400 | font-size: 0.85rem |

## アニメーション基準値
| 演出 | 値 |
|------|-----|
| フェードアップ | opacity: 0→1, y: 60→0, duration: 1s, ease: power3.out |
| パララックス（画像） | y: "-20%", scrub: 1 |
| パララックス（テキスト） | y: "-10%", scrub: 1.5 |
| カードホバー | scale: 1.03, duration: 0.6s, ease: power2.out |
| グレースケール解除 | filter: grayscale(100%)→grayscale(0%), duration: 0.8s |
| stagger | 0.08〜0.15（要素数に応じて調整） |
| ページ内遷移 | scroll-behavior: smooth |

## ホバー基準値
| 要素 | 効果 |
|------|------|
| ナビリンク | 下線 width: 0→100%, 0.3s |
| 商品カード | scale(1.03) + grayscale解除 + overlay表示 |
| CTAボタン | background: transparent→var(--white), color: --white→--black |
| テキストリンク | アロー translateX(0→8px), 0.3s |
| 画像（一般） | scale(1.04), 0.8s |

## 写真の見せ方パターン
| ID | パターン | 使用箇所 |
|----|----------|----------|
| [A] | フルブリード（grayscale、60-80vh） | Hero背景、パララックスセクション |
| [B] | マクロクロップ（4:5 or 1:1、ダーク背景） | 商品カード、商品詳細 |
| [C] | 左右分割（50:50） | About、Atelier Glimpse |
| [D] | オーバーレイ（画像+半透明黒+テキスト） | Bespoke CTA |
| [E] | スタガーグリッド（不均等、高さずらし） | Collection Preview、商品一覧 |
| [F] | シネマティック帯（上下黒帯） | サブページHero |
| [G] | フローティング（はみ出し配置） | Atelier紹介 |

## 品質基準（ミニマル版）
- 情報密度は低く、CSS密度とアニメーション密度は最大
- 全要素にhover/transition/paddingを細かく定義すること
- 余白は「演出」として意図的に設計する
- 同じレイアウトパターンを2回連続させない
- GSAPのScrollTriggerを全セクションに適用
- 画像は少数精鋭だが1枚1枚が画面を支配するサイズ
- AI生成感の排除：均一なカード配置やテンプレート的構成を避ける

## 完了報告時の自己診断（11項目）
1. [ ] CSS密度: 全要素にpadding/margin/hover/transition定義済み
2. [ ] メディアバリエーション: パターン[A]〜[G]のうち最低4種使用
3. [ ] タイポグラフィ緩急: Hero文字とラベルのサイズ比が5倍以上
4. [ ] アニメーション: GSAP ScrollTrigger全セクション適用
5. [ ] ホバー効果: 全インタラクティブ要素にホバー定義済み
6. [ ] 内部リンク整合性: 全ページ間リンクが正常動作
7. [ ] SP対応: 768px / 1024pxブレークポイントで崩れなし
8. [ ] 画像: picture要素 + WebP + JPGフォールバック + lazy loading
9. [ ] alt属性: 全画像に設定済み
10. [ ] パフォーマンス: Hero動画SPフォールバック、画像最適化済み
11. [ ] ダークテーマ整合性: 全要素がCSS変数を使用、ハードコードなし

## 絶対禁止事項
- ハードコードされた色値（必ずCSS変数を使う）
- font-size: 16px未満の本文（SPで読めない）
- 装飾のないプレーンなセクション区切り
- カード4つ横並びの均等グリッド（AI感・テンプレ感が出る）
- cursor追従エフェクト
