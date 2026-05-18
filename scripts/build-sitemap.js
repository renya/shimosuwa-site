// scripts/build-sitemap.js

const fs = require("fs");
const path = require("path");

const ROOT_URL = "https://shimosuwa.info";

const pagesDir = path.join(__dirname, "../pages");
const listDir = path.join(__dirname, "../list");
const outputPath = path.join(__dirname, "../sitemap.xml");

function getDirectories(dir) {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
}

const urls = [];

// top page
urls.push(`${ROOT_URL}/`);

// pages/*
if (fs.existsSync(pagesDir)) {
  const pageDirs = getDirectories(pagesDir);

  for (const name of pageDirs) {
    urls.push(`${ROOT_URL}/pages/${encodeURIComponent(name)}/`);
  }
}

// list/*
if (fs.existsSync(listDir)) {
  const listDirs = getDirectories(listDir);

  for (const name of listDirs) {
    if (name === "assets") continue;

    urls.push(`${ROOT_URL}/list/${encodeURIComponent(name)}/`);
  }

  // /list/
  urls.push(`${ROOT_URL}/list/`);
}

// XML生成
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${url}</loc>
  </url>`
  )
  .join("\n")}
</urlset>
`;

// 出力
fs.writeFileSync(outputPath, xml, "utf8");

console.log(`sitemap.xml generated: ${urls.length} URLs`);
