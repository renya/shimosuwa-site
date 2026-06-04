# shimosuwa.info project

Primary AI reference document.

For AI-assisted development, read this document first.

History:

This document was created by merging the following project documents:

- philosophy.md
- architecture.md
- content-style.md
- build.md
- cloudflare.md

The original files were consolidated to simplify maintenance and reduce ambiguity.

See also:

- tools/template.html (standard page template)
- assets/css/style.css (shared site styles)
- view/README.md (map system)

---

# philosophy

- Prefer plain HTML/CSS over frameworks
- Long-term readability is important
- Avoid excessive dependencies
- Prefer structures understandable by humans and AI
- Static generation preferred

- Prefer lightweight geographic visualization
- Prefer URL-addressable map views
- Keep interactive maps reusable through parameterized viewers
- Separate articles, assets, and interactive views

---

# architecture

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

Static asset and viewer repository.

Used with:

- i.suwa.info
- image hosting
- interactive viewers
- binary separation from main site repository

Contains:

- photos
- poster images
- mp4 videos
- /p/
- /view/

Naming:

- ASCII only paths preferred on i.suwa.info

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

Local Node.js scripts.

Build:

- build-list.js
- build-tags.js
- build-sitemap.js

Content creation:

- build-new.js
- make-album.js

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
- hosted via i.suwa.info

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
- hosted via i.suwa.info

---

# content style

## basic principles

- Prefer preserving original information
- Avoid excessive summarization
- Avoid unnecessary restructuring
- Maintain long-term readability

## HTML style

- article pages are primarily static HTML
- JavaScript used only for lightweight /view/ interactive viewers
- shared CSS in /assets/css/style.css

## page structure

Typical pages include:

- title
- description
- canonical
- OGP
- tags

Main layout:

<main class="container">

## tagging

Tags use:

<a class="tag" href="/pages/タグ名/">タグ名</a>

## writing style

- Prefer concise explanations
- Avoid overly commercial tone
- Avoid excessive decoration
- Preserve local context

## Scrapbox conversion

See:

- tools/scrapbox2html.txt

## social embeds

- Prefer static X-style quote blocks
- Avoid heavy embeds where possible

## images

- Often hosted separately
- Prefer lightweight pages
- Preserve original context of photos

## map links

Prefer internal interactive map links.

Examples:

/view/shimosuwa?lat=...&lng=...&name=...

Goals:

- preserve site continuity
- avoid unnecessary external map dependency
- support reusable geographic navigation

---

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

---

# cloudflare

## domains

- shimosuwa.info
- suwa.info
- i.suwa.info

## principles

- DNS centralized in Cloudflare
- Remove custom domains before deleting repos
- Prefer keeping repositories rather than deleting

---

# site roles

## domain roles

The project uses multiple domains with different scopes.

The purpose is not to create separate unrelated sites, but to organize content according to its natural subject area.

### shimosuwa.info

Primary regional archive focused on Shimotsuwa.

Examples:

- Akimiya Shrine
- Harumiya Shrine
- Manji Stone Buddha
- Shimotsuwa Station
- Yashima Wetland
- local history
- local hiking routes

Rule:

Content directly related to Shimotsuwa should generally be published on shimosuwa.info.

### suwa.info

Broader Suwa-area archive.

Used for content that belongs to the wider Suwa region rather than Shimotsuwa specifically.

Examples:

- Maemiya Shrine
- Kamisha Honmiya
- Lake Suwa
- Kirigamine
- Yatsugatake
- Onbashira Festival
- Suwa City
- Chino City
- Okaya City

Rule:

Content that is part of the Suwa region but not naturally centered on Shimotsuwa may be published on suwa.info.

### renya.com

Personal publishing platform.

Used for:

- personal notes
- technical articles
- camera notes
- travel records
- experiments
- topics outside the Suwa region

Rule:

Content that does not naturally belong to shimosuwa.info or suwa.info may be published on renya.com.

## pages philosophy

The /pages/ structure is intentionally domain-neutral.

Pages are treated as individual content units rather than category containers.

Examples:

/pages/前宮/
/pages/諏訪湖/
/pages/御柱祭/
/pages/八ヶ岳/
/pages/諏訪市/

All pages are considered first-class content.

Administrative boundaries should not be used as the primary site structure.

City and town names may exist as pages, tags, or related links, but should not be required as top-level categories.

Prefer:

- page-based organization
- cross-linking
- tags
- related content

over rigid geographic hierarchies.

## suwa.info usage

suwa.info is not intended to be a municipality portal.

The preferred approach is:

- keep the root site simple
- allow gradual growth through /pages/
- avoid unnecessary category structures
- create pages only when needed

The existence of a page does not define the identity of the entire domain.

Examples:

/pages/前宮/
/pages/上社本宮/
/pages/諏訪湖/

may exist independently without requiring a dedicated top-level category structure.

## cross-domain linking

Cross-domain links between project sites are acceptable.

Examples:

shimosuwa.info → suwa.info
suwa.info → shimosuwa.info
renya.com → suwa.info

The goal is to maintain a coherent publishing ecosystem rather than completely isolated sites.

When content naturally belongs to another domain, redirects or canonical URLs may be used.

Preserving existing URLs remains important whenever practical.
