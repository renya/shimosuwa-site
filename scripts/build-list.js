const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const pagesDir = path.join(root, "pages");
const listDir = path.join(root, "list");
const outputFile = path.join(listDir, "index.html");

function getTitle(html, fallback) {
  const match = html.match(/<h1>(.*?)<\/h1>/);
  return match ? match[1].trim() : fallback;
}

const items = fs.readdirSync(pagesDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => {
    const name = dirent.name;
    const indexPath = path.join(pagesDir, name, "index.html");

    if (!fs.existsSync(indexPath)) return null;

    const html = fs.readFileSync(indexPath, "utf8");
    const title = getTitle(html, name);

    return {
      title,
      url: `/pages/${name}/`
    };
  })
  .filter(Boolean)
  .sort((a, b) => a.title.localeCompare(b.title, "ja"));

const listHtml = items.map(item => {
  return `      <li><a href="${item.url}">${item.title}</a></li>`;
}).join("\n");

const html = `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>ページ一覧｜shimosuwa.info</title>
  <meta name="description" content="下諏訪の情報ページを一覧で表示しています。">

  <link rel="icon" href="/favicon.ico" sizes="any">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png">

  <link rel="stylesheet" href="/assets/css/style.css">
</head>

<body>
  <main class="container">
    <h1>ページ一覧</h1>

    <p class="description">下諏訪の情報ページを一覧で表示しています。</p>

    <ul>
${listHtml}
    </ul>

    <p><a href="/pages/">下諏訪の情報へ戻る</a></p>
    <p><a href="/">トップページへ戻る</a></p>
  </main>
</body>
</html>
`;

fs.mkdirSync(listDir, { recursive: true });
fs.writeFileSync(outputFile, html, "utf8");

console.log(`生成しました: list/index.html`);
console.log(`ページ数: ${items.length}`);
