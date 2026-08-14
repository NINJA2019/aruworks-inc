# AruWorks — static site
Canva サイトの「レトロ OS ウィンドウ」の雰囲気を保ったまま、
スライドショー形式をやめて普通にスクロールできる静的サイトにしたものです。
ビルド不要の素の HTML / CSS / JS だけで作っているので、そのまま公開できます。
## ファイル構成
```
index.html   ページ本体（Home / Vision / About Us / Contact）
style.css    レトロ・デスクトップ風のスタイル
script.js    スクロールで窓が開くアニメーションとタスクバーの時計
```
## 1. GitHub にアップロード
1. GitHub で新しいリポジトリを作成（例: `aruworks-inc`）
2. このフォルダの中身（index.html / style.css / script.js）をそのままリポジトリ直下に置いてコミット・プッシュ
```bash
cd aruworks-inc
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/NINJA2019/aruworks-inc.git
git push -u origin main
```
## 2. Cloudflare Pages に接続
1. Cloudflare ダッシュボード → Workers & Pages → Create application → Pages → Connect to Git
2. さきほどの GitHub リポジトリを選択
3. ビルド設定はそのまま（ビルド不要な静的サイトなので）:
- Build command: 空欄のまま
- Build output directory: `/`
4. Save and Deploy をクリック
数十秒でデプロイが完了し、`https://aruworks-inc.pages.dev` のような URL が発行されます。
その後は `main` ブランチに push するたびに自動で再デプロイされます。
## 3. 独自ドメインをつなぐ場合
Cloudflare Pages のプロジェクト画面 → Custom domains から、
すでに Cloudflare で管理しているドメイン（またはネームサーバーを Cloudflare に向けたドメイン）を追加するだけで反映されます。
## カスタマイズしたい箇所
- `index.html` 内の `hello@aruworks.example` やバイリビリ / TikTok のリンク（`href="#"`）はサンプルです。実際の連絡先に差し替えてください。
- About Us のアイコン（`.avatar`）は仮のピクセル風プレースホルダーです。実際のキャラクター画像に差し替える場合は `style.css` の `.avatar` 周りを画像背景に変更してください。
- 配色は `style.css` の `:root` にまとめてあるので、`--accent` などの値を変えるだけで全体の色味を調整できます。
