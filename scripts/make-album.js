/*
使い方

node make-album.js https://i.suwa.info/p/onbashira-2010-04-10/

必要なファイル

filelist.txt (dir /b >filelist.txt on cmd)
make-album.js

生成結果

album.html
*/

const fs = require("fs");

// ------------------------------------
// 引数チェック
// ------------------------------------

const imageBase = process.argv[2];

if (!imageBase) {
  console.error(
    "使い方: node make-album.js https://i.suwa.info/p/onbashira-2010-04-10/"
  );
  process.exit(1);
}

const IMAGE_BASE =
  imageBase.endsWith("/")
    ? imageBase
    : imageBase + "/";

// ------------------------------------
// 設定
// ------------------------------------

const FILELIST = "filelist.txt";
const OUTPUT = "album.html";

// ------------------------------------
// filelist.txt 読み込み
// ------------------------------------

const files = fs
  .readFileSync(FILELIST, "utf8")
  .split(/\r?\n/)
  .map(function (line) {
    return line.trim();
  })
  .filter(function (line) {
    return /\.(jpg|jpeg|png|webp)$/i.test(line);
  });

// ------------------------------------
// ギャラリーHTML生成
// ------------------------------------

const galleryHtml = files
  .map(function (file) {
    return [
      "      <figure>",
      '        <img src="' + IMAGE_BASE + file + '" alt="" loading="lazy">',
      "      </figure>"
    ].join("\n");
  })
  .join("\n");

// ------------------------------------
// HTML生成
// ------------------------------------

const html = `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <title>アルバム｜shimosuwa.info</title>
  <meta name="description" content="">

  <!-- favicon -->
  <link rel="icon" href="/favicon.ico">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png">

  <!-- OGP -->
  <meta property="og:image" content="https://shimosuwa.info/assets/suwako-head.png">
  <meta name="twitter:card" content="summary_large_image">

  <!-- 共通CSS -->
  <link rel="stylesheet" href="/assets/css/style.css">
</head>
<body>

<main class="container">

  <h1>アルバム</h1>

    <!-- タグ -->
    <div class="tags">
      <a class="tag" href="/pages//"></a>
    </div>

  <div class="gallery">
${galleryHtml}
  </div>

    <div class="footer-nav">
      <a href="/pages/" class="footer-link">
        一覧へ→
      </a>
      <a href="/contact/" class="footer-banner">
        <img src="/assets/contact.png" alt="お問い合わせ">
      </a>
    </div>
</main>
</body>
</html>`;

// ------------------------------------
// 出力
// ------------------------------------

fs.writeFileSync(OUTPUT, html, "utf8");

console.log("完了: " + OUTPUT);
console.log("画像数: " + files.length);
console.log("画像URL: " + IMAGE_BASE);
