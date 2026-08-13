// 既存アルバムの画像を「クリックでオリジナル画像を開く」形式に変換するスクリプト
//
// 使い方:
//   node wrap-images.js "index.html"
//
// 元ファイルは .bak を作成してから上書きします。
// UTF-8で読み込み、UTF-8で書き出します。

const fs = require("fs");
const path = require("path");

const inputFile = process.argv[2];

if (!inputFile) {
  console.error('使い方: node wrap-images.js "index.html"');
  process.exit(1);
}

if (!fs.existsSync(inputFile)) {
  console.error(`ファイルが見つかりません: ${inputFile}`);
  process.exit(1);
}

const backupFile = `${inputFile}.bak`;
const html = fs.readFileSync(inputFile, "utf8");

const imgPattern =
  /<img(\s+[^>]*?\bsrc="(https:\/\/i\.suwa\.info\/p\/[^"]+\.(?:jpg|jpeg|png|webp))"[^>]*)>/gi;

let converted = 0;
let skipped = 0;

const result = html.replace(
  /<figure>([\s\S]*?)<\/figure>/gi,
  (figureBlock) => {
    // すでにリンクされている画像は変更しない
    if (/<a\b[^>]*href="https:\/\/i\.suwa\.info\/p\//i.test(figureBlock)) {
      skipped++;
      return figureBlock;
    }

    return figureBlock.replace(
      imgPattern,
      (fullMatch, attrs, imageUrl) => {
        converted++;
        return `<a href="${imageUrl}" target="_blank">
        <img${attrs}>
      </a>`;
      }
    );
  }
);

if (converted === 0) {
  console.log("変換対象の画像はありませんでした。");
  process.exit(0);
}

// 元ファイルをバックアップ
fs.copyFileSync(inputFile, backupFile);

// UTF-8のまま上書き
fs.writeFileSync(inputFile, result, "utf8");

console.log("変換完了");
console.log(`変換画像: ${converted} 枚`);
console.log(`既にリンク済みでスキップ: ${skipped} 個`);
console.log(`バックアップ: ${path.basename(backupFile)}`);
console.log("文字コード: UTF-8 → UTF-8");
