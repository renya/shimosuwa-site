# shimosuwa.info

Static site for shimosuwa.info.  
Deployed via Cloudflare Pages.

## structure

/pages/  
手動で作成・編集するページ。

/list/  
Node.jsスクリプトで自動生成する一覧ページ。

## build

ページ一覧を再生成:

```bash
node scripts/build-list.js
```

タグ一覧を再生成:

```bash
node scripts/build-tags.js
```

## build list and tags pages

```bash
npm.cmd run build
```

## check links

公開サイトのリンク確認:  
https://www.deadlinkchecker.com/

whole website を選択し、  
https://shimosuwa.info/  
を確認する。
