/*
使い方

node make-album.js https://i.suwa.info/p/onbashira-2010-04-10/

必要なファイル

filelist.txt (dir /b >filelist.txt on cmd)
template.html
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
const TEMPLATE = "template.html";
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
      "        <figcaption>",
      "          <small></small>",
      "        </figcaption>",
      "      </figure>"
    ].join("\n");
  })
  .join("\n");

// ------------------------------------
// テンプレート読込み
// ------------------------------------

const template = fs.readFileSync(TEMPLATE, "utf8");

// ------------------------------------
// gallery置換
// ------------------------------------

const output = template.replace(
  /<div class="gallery">[\s\S]*?<\/div>/,
  '<div class="gallery">\n' +
    galleryHtml +
    "\n</div>"
);

// ------------------------------------
// 出力
// ------------------------------------

fs.writeFileSync(OUTPUT, output, "utf8");

console.log("完了: " + OUTPUT);
console.log("画像数: " + files.length);
console.log("画像URL: " + IMAGE_BASE);
