// i.suwa.info/p/ の画像をクリックでオリジナル画像にする汎用版
//
// 対象:
//   <figure> 内だけでなく、通常ページ内の <img> も対象
//
// 対象URL:
//   https://i.suwa.info/p/...
//
// 動作:
//   <img src="https://i.suwa.info/p/...">
// を
//   <a href="https://i.suwa.info/p/..." target="_blank">
//     <img src="https://i.suwa.info/p/...">
//   </a>
// に変換します。
//
// すでに <a> で囲まれている画像は変更しません。
// 元ファイルは .bak を作成してから上書きします。
// 文字コードは UTF-8 として読み書きします。
//
// 使い方:
//   node wrap-images-all.js "index.html"

const fs = require("fs");
const path = require("path");

const inputFile = process.argv[2];

if (!inputFile) {
  console.error('使い方: node wrap-images-all.js "index.html"');
  process.exit(1);
}

if (!fs.existsSync(inputFile)) {
  console.error(`ファイルが見つかりません: ${inputFile}`);
  process.exit(1);
}

const backupFile = `${inputFile}.bak`;
const html = fs.readFileSync(inputFile, "utf8");

// i.suwa.info/p/ 以下の画像だけを対象にする。
// 通常の外部画像やローカル画像は変更しない。
const imgPattern =
  /<img(\s+[^>]*?\bsrc="(https:\/\/i\.suwa\.info\/p\/[^"]+\.(?:jpg|jpeg|png|webp))"[^>]*)>/gi;

let converted = 0;
let skipped = 0;

const result = html.replace(
  imgPattern,
  (fullMatch, attrs, imageUrl, offset, wholeHtml) => {
    // 直前の範囲に <a ...> があり、その中にこのimgがある場合は変更しない。
    // 「すでにリンク済み」の画像を二重に<a>で囲まないため。
    const before = wholeHtml.slice(0, offset);
    const lastOpenA = before.lastIndexOf("<a");
    const lastCloseA = before.lastIndexOf("</a>");

    if (lastOpenA > lastCloseA) {
      skipped++;
      return fullMatch;
    }

    converted++;

    return `<a href="${imageUrl}" target="_blank">
  <img${attrs}>
</a>`;
  }
);

if (converted === 0) {
  console.log("変換対象の画像はありませんでした。");
  console.log(`変更なし: ${path.basename(inputFile)}`);
  process.exit(0);
}

// 元ファイルをバックアップ
fs.copyFileSync(inputFile, backupFile);

// UTF-8のまま上書き
fs.writeFileSync(inputFile, result, "utf8");

console.log("");
console.log("変換完了");
console.log(`ファイル : ${path.basename(inputFile)}`);
console.log(`変換画像 : ${converted} 枚`);
console.log(`既にリンク済みでスキップ : ${skipped} 枚`);
console.log(`バックアップ : ${path.basename(backupFile)}`);
console.log("文字コード : UTF-8 → UTF-8");
