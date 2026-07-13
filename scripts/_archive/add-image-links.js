#!/usr/bin/env node

import fs from "fs/promises";
import path from "path";
import { load } from "cheerio";

const ROOT = process.argv[2] || ".";

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const full = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      await walk(full);
      continue;
    }

    if (!/\.(html?|HTML?)$/.test(entry.name)) {
      continue;
    }

    try {
      const html = await fs.readFile(full);
      const $ = load(html, {
        decodeEntities: false
      });

      let changed = false;

      $("figure > img").each((_, img) => {
        const $img = $(img);

        // 既に <a> の中なら何もしない
        if ($img.parent().is("a")) {
          return;
        }

        const src = $img.attr("src");
        if (!src) {
          return;
        }

        const $a = $("<a>")
          .attr("href", src)
          .attr("target", "_blank")
          .attr("rel", "noopener");

        $img.replaceWith($a.append($img));
        changed = true;
      });

      if (changed) {
        await fs.writeFile(full, $.html());
        console.log("Updated:", full);
      }

    } catch (err) {
      console.error("Error:", full, err.message);
    }
  }
}

walk(ROOT);

// -----------------------------------------------------------------------------
// add-image-links.js
// 【使うと壊れるので使えない】
//
// gallery内の画像をクリックでオリジナル画像が開くようにする。
// <figure>直下の<img>のみを対象とする。
//
// 2026-07-13
//
// 対象
//   ○ <figure><img></figure>
//
// 対象外
//   ○ 既に<a>で囲まれている画像
//   ○ <picture>内の画像
//   ○ figure以外の画像
//
// 変更内容
//   href = img.src
//   target="_blank"
//   rel="noopener"
//
// 使用ライブラリ
//   cheerio
//
// 実行例
//   npm install cheerio
//   cd suwa-site
//   node scripts/add-image-links.js pages
//
// このスクリプトでは文字コードは扱わない
// ただし、cheerioはHTMLを文字列として扱うため、Shift-JISのHTMLに対して実行すると文字化けする可能性がある。
// UTF-8のHTMLのみを対象とすること。
// -----------------------------------------------------------------------------
