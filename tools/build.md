# build

## environment

- local Node.js scripts
- npm used for build commands

## scripts

### build-list.js

Generates:

- /list/index.html

Reads:

- /pages/*/index.html

Extracts:

- h1 titles

### build-tags.js

Generates:

- /list/タグ名/index.html

Uses tag format:

<a class="tag" href="/pages/タグ名/">タグ名</a>

### build-sitemap.js

Generates:

- /sitemap.xml

## commands

npm run build

or individual scripts:

node scripts/build-list.js
node scripts/build-tags.js
node scripts/build-sitemap.js

## philosophy

- Keep scripts short and readable
- Prefer explicit generation
- Avoid framework dependency
- Local build preferred
