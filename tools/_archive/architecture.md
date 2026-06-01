# shimosuwa.info architecture

## overview

- static HTML centered site
- hosted on Cloudflare Pages
- source managed with GitHub
- JavaScript used only in /view/ interactive viewers
- local build scripts run with Node.js

## repositories

### shimosuwa-site

Main production repository.

Contains:

- /pages/
- /assets/
- /list/
- /scripts/
- /tools/
- /contact/

### suwa-site

Future broader Suwa area expansion.

### suwa-images

Dedicated image repository.

Used with:

- i.suwa.info
- image hosting
- binary separation from main site repository

Contains:

- photos
- poster images
- mp4 videos

### shimosuwa-memo

Experimental / archive repository.

Used for:

- redirect experiments
- memo experiments
- future reuse possibilities

## directory structure

### /pages/

Hand-written content pages.

Rules:

- one directory per page
- index.html inside each page directory
- mostly flat structure
- Japanese directory names allowed

Example:

/pages/万治の石仏/index.html

### /assets/

Shared resources.

Examples:

- CSS
- favicon
- shared images

### /list/

Auto-generated list pages.

### /scripts/

Local Node.js build scripts.

Examples:

- build-list.js
- build-tags.js
- build-sitemap.js

### /tools/

Operational notes and AI-support files.

Examples:

- philosophy.md
- architecture.md
- cloudflare.md
- build.md
- content-style.md
- scrapbox2html.txt

### /contact/

Simple contact form pages.

## image strategy

Images are often separated from the main repository.

Goals:

- reduce repository size
- separate binary assets
- lightweight main repository
- easier long-term maintenance

## deployment flow

Local editing
↓
GitHub push
↓
Cloudflare Pages deploy
↓
Production publish

### /view/

Interactive viewer pages.

Used for:

- Leaflet maps
- GPX route display
- boundary visualization
- point-focused map views

Features:

- OpenStreetMap based
- lightweight client-side JavaScript
- reusable single-page viewers
- URL parameter support
- popup-based point navigation
- zoom control via URL parameters

Example:

/view/shimosuwa?lat=36.11&lng=138.15&name=八島山荘&zoom=16

Purpose:

- internal map linking from article pages
- interactive geographic views
- reusable location viewer architecture

### /p/

Static asset hosting.

Used for:

- photos
- PNG preview images
- GPX preview images
- lightweight direct image access

Goals:

- separate binary assets
- lightweight main repositories
- stable image URLs
- reusable image hosting via i.suwa.info
