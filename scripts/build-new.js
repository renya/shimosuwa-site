// scripts/build-new.js

const fs = require("fs");
const path = require("path");

const pageName = process.argv[2];

if (!pageName) {
  console.log("Usage: node scripts/build-new.js ページ名");
  process.exit(1);
}

const rootDir = path.resolve(__dirname, "..");

const templatePath = path.join(rootDir, "tools", "template.html");

const outputDir = path.join(rootDir, "pages", pageName);

const outputPath = path.join(outputDir, "index.html");

// 既存チェック
if (fs.existsSync(outputPath)) {
  console.log(`Already exists: /pages/${pageName}/index.html`);
  process.exit(1);
}

// template.html を読む
let html = fs.readFileSync(templatePath, "utf8");

// title を置換
html = html.replace(
  "<title>｜shimosuwa.info</title>",
  `<title>${pageName}｜shimosuwa.info</title>`
);

// h1 を置換
html = html.replace(
  "<h1></h1>",
  `<h1>${pageName}</h1>`
);

// フォルダ作成
fs.mkdirSync(outputDir, { recursive: true });

// index.html 出力
fs.writeFileSync(outputPath, html, "utf8");

console.log(`Created: /pages/${pageName}/index.html`);
