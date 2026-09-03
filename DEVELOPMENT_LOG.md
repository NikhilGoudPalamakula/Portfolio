# Development Log

How this portfolio was built, what was decided and why, and every bug found along the way. Written so that work can continue in another editor, machine, or AI session without re-deriving any of it.

Companion doc: [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md).

Built over 2026-08-31 → 2026-09-03.

---

## 1. Where the code came from

The design was first built as a **single-file React component** (`PortfolioEditorial_2.jsx`) — an "Editorial" paged layout with all data, all icon SVG paths, and a ~250-line plain-CSS template string in one file. It switched sections with `useState('home')` rather than routes.

That file was decomposed into the component structure in `client/src/`. The visual design was **not** changed.

### Style fidelity — measured, not assumed

All 606 CSS declarations (285 unique) from the original were extracted and diffed against the compiled build. **15 didn't match verbatim; every one is accounted for:**

| Flagged | Verdict |
|---|---|
| 6 tokens (`--body`, `--body2`, `--body3`, `--surface`, `--surface2`, `--hairline`) | intentional fix — see §4.1 |
| 3 font stacks | false negative: the comparison script stripped spaces inside `'Times New Roman'`. Byte-identical in the build |
| 4 animation / delay values | false negative: minifier writes `110ms` as `.11s`. Same timings and easing |
| `transition: all .2s` on the button | intentional: narrowed to the 4 properties that actually change |

So fonts, palette, type scale, every `clamp()`, letter-spacing, hairline grids, tint rails, breakpoints and hover states carried over exactly.

---

## 2. Decisions

### Agreed with the user
| Decision | Choice | Reason |
|---|---|---|
| Folder name | lowercase `client/` | matched what already existed |
| Auth scaffolding | keep | may add a contact form / admin later |
| Icons | install `lucide-react` | keeps the design pixel-identical |
| Fonts | the design's Fraunces + Inter + Space Mono | the editorial character depends on the serif/mono pairing |
| Navigation | real routes | sections and projects become linkable and shareable |
| Content location | `src/content/` | it's real copy, not API mocks |

### Made independently (all reversible)
- **Public site is not auth-gated.** The scaffold guide nested everything under `ProtectedRoute`; a portfolio must be publicly viewable. Only `/admin` is gated.
- **`AdminPage.js` is a placeholder** so `ProtectedRoute` has a live, testable target. Deletable with its route.
- **Feature named `home`, not `dashboard`** — same pattern, named for a portfolio.
- **`data-theme` moved to `<html>`** (was on the app `<div>`), so tokens live on `:root` and `body` can be painted.
- **antd follows the site theme** via `theme/AntdThemeProvider.js`, even though antd only appears on login/admin.
- **`PageSection` component** replaced seven near-identical page-level `.module.scss` files.
- **Per-page `<title>` and meta** via `useDocumentMeta` (the original set them once on mount).
- **Theme choice persisted** to `localStorage` (`portfolio-ui`), defaulting to the OS setting.

### Dropped from the original
- The `mock()` SVG screenshot generator and every `image` field — the Editorial UI never rendered them (~60 lines of dead code). Re-add when real screenshots exist.
- The unused `SECTIONS` constant and unused icon imports (`Github`, `Twitter`, `Circle`, `Code2`, `ChevronRight`).
- `p.highlights` and `p.detail` render paths were **kept** — no project uses them yet, but adding either key just works.

---

## 3. What was built, in order

1. **Scaffold** — `npm create vite` gave Vite 8 + oxlint; replaced with the pinned Vite 7 + eslint stack. Verified JSX-in-`.js` transforms in both dev and build.
2. **Port** — content → `src/content/`, CSS string → tokens + 24 SCSS modules, view state → routes.
3. **Resume download** — one `RESUME` constant in `content/profile.js`, consumed by three buttons (hero, contact, nav). `href: null` hides all three.
4. **Nav `CV` button** — compact chip matching the theme toggle's chrome.
5. **App icons** — full set generated from the supplied `logo.n.svg`, plus `manifest.webmanifest`.
6. **Links & canonical URL** — GitHub added to `PROFILE.socials` (its mark added to `brandIcons.js`, since lucide has none). The Vercel URL became `PROFILE.site`, driving a per-route `<link rel="canonical">` and `og:url` rather than a button linking the site to itself; a static fallback for non-JS crawlers sits in `index.html`.

---

## 4. Bugs found and fixed

All seven were in the original design file or introduced during the port. Each changed rendered output.

### 4.1 Light mode had no body-copy colour
```css
.ed-app { --body: var(--body); --body2: var(--body2); /* …6 tokens */ }
```
Self-referential. A custom property defined as its own `var()` is invalid at computed-value time, so all six silently vanished in light mode. Dark mode was unaffected because it redefined them with real values. **Fix:** real hex values in `:root`.

### 4.2 `is-dark-brand` never applied
```js
const n = parseInt(brand.hex, 16);   // brand.hex === "#000000"  →  NaN
// NaN < 0.3 is false, so the class was never added
```
The near-black logos (Next.js, Express) stayed black on the dark paper. **Fix:** `parseInt(hex.slice(1), 16)` in `brandIcons.js`. They now recolour to `--ink`.

### 4.3 `--pine` had no dark value
`#1e3a2f` on `#141310` paper — the SeaTrace and HMS tint rail and title-hover were effectively invisible. **Fix:** added `--pine: #6fa88c` to the dark block.

### 4.4 Mojibake throughout the content
`â` where `—`/`–` belonged, `Â·` for `·`, `Â©` for `©`. Worse, the figure-emphasis regex character class was `[%$+~â]` — so range figures were never emphasised. **Fix:** correct characters everywhere; the class is now `[%$+~–]`.

### 4.5 Hero name depended on the animation to become visible
`.ed-word-in` had a resting `transform: translateY(105%)` inside an `overflow: hidden` box. If animations don't run, the name is permanently invisible — this actually happened during the first headless capture. **Fix:** the start frame lives in the `@keyframes`; the element has no resting transform, so no animation simply means visible.

### 4.6 Every CSS animation was dead ← the significant one
Keyframes were placed in `global.scss` and referenced from the `.module.scss` files. **CSS Modules rewrites the animation name inside the `animation` shorthand, not just `@keyframes` declarations.** The compiled CSS was:

```
declared:    @keyframes edRise            ← global.scss, unhashed
referenced:  animation: _edRise_15fen_1   ← every module, hashed
```

Seven references, zero matches. An `animation-name` with no matching keyframes is silently ignored — no console error, no build warning. Nothing on the site animated. It went unnoticed because settled screenshots look identical either way, and the hero name only stayed visible because of the 4.5 fix.

**Fix:** keyframes are emitted by mixins (`rise-keyframes`, `word-keyframes`, `page-in-keyframes`) called at the root of each animating module, so the hashed declaration and hashed reference match. Reason is commented in `styles/mixins.scss`.

**Verified afterwards** via DevTools Protocol on the live page — `document.getAnimations()` with real keyframes attached:

| Route | page fade-up | staggered rise | hero words |
|---|---|---|---|
| `/` | ✅ | 4 stat tiles | 3, delays 0.10 / 0.21 / 0.32s |
| `/work` | ✅ | 6 project rows | — |
| `/work/:slug` | ✅ | 4 metric tiles | — |
| `/skills` | ✅ | 3 skill groups | — |
| `/path` | ✅ | 4 timeline items | — |
| `/about`, `/contact` | ✅ | 0 (matches original) | — |

Keyframe values confirmed: `edIn` `translateY(10px)`→`none` + opacity; `edRise` `translateY(16px)`→`none` + opacity; `edWord` `translateY(105%)`→`0`.

### 4.7 Nav brand wrapped after the CV button was added
The ~61px CV chip pushed "NIKHIL GOUD PALAMAKULA" onto two lines at 360px (no overflow, but scrappy). **Fix:** the nav shows `PROFILE.short` below `$bp-xs` (480px). Measured after: 360 / 500 / 900 / 1440px all one line, no overflow, burger always on screen.

---

## 5. How things were verified

Claims in this log were checked by running the app, not by reading code.

- **Build + lint** clean after every change.
- **Headless Chrome** (`--dump-dom`, `--screenshot`) for rendering on every route, light and dark.
- **Chrome DevTools Protocol over WebSocket** for anything the DOM can't show: live animation objects and their keyframes, computed styles, `Page.getAppManifest` validation, forced narrow viewports via `Emulation.setDeviceMetricsOverride`, and real click-to-download with `Browser.setDownloadBehavior`.
- **A `styles.*` reference checker** confirming every `styles.x` in JS has a matching rule in its sibling module.
- **Declaration-level CSS diff** against the original stylesheet (§1).

Two headless gotchas worth remembering: a sub-second `--virtual-time-budget` makes Chrome hang, and `Browser.setDownloadBehavior` needs a Windows-style backslash path plus the **browser** session, not a page session.

---

## 6. Assets

### Resume
`public/Nikhil_Goud_Palamakula_Resume.pdf` — 66,276 bytes, PDF 1.7, 2 pages, md5 `0f061baa2cfec226ea6b94dc3c457eae`. Installed 2026-09-03, replacing an earlier draft that carried a placeholder (see §7).

The file is named exactly as it should download. Earlier the file was `resume.pdf` and only the `download` attribute renamed it — which meant a right-click Save-As, or navigating straight to the URL, produced "resume.pdf". Both now agree.

Verified: copies into `dist/`, serves as `application/pdf`, byte-identical over the wire, and a real click saves `Nikhil_Goud_Palamakula_Resume.pdf` with matching md5.

Its live links, read from the PDF's own annotations: the Vercel portfolio, the GitHub profile, and LinkedIn. All return `200`.

### App icons
Source of truth is `public/favicon.svg` — the supplied `N` monogram in the site palette (paper `#F4F1EA`, ink `#1A1A17`, clay dot `#B4623C`). Everything else is generated from it (see PROJECT_STRUCTURE §5).

Legibility checked by rendering and inspecting: at **32×32** the `N` is clean and the clay dot reads; at **16×16** the `N` is readable and the dot dissolves to a smudge — expected for `r=20` on a 512 canvas, and harmless.

iOS/Android icons use a **full-bleed paper background** because iOS ignores PNG transparency and would paint the rounded corners black. The browser favicon keeps its transparent corners.

`theme-color` is now a light/dark pair (`#f4f1ea` / `#141310`). It follows the OS setting, not the in-page toggle.

Removed: Vite's default purple lightning-bolt `favicon.svg` and the unused `icons.svg`.

---

## 7. Open items

### Resolved
- ~~**The resume PDF contains a placeholder.**~~ The first draft read `Portfolio: nikhilgoud.dev | PLACEHOLDER — replace before sending`, and `nikhilgoud.dev` did not resolve. Replaced 2026-09-03 with a version pointing at `nikhilgoudpalamakula.vercel.app` and `github.com/NikhilGoudPalamakula` — both verified `200`.
- ~~**The resume's portfolio URL should match wherever this deploys.**~~ It now matches `PROFILE.site`.

### Nice to have
- `gsap` and `@ant-design/icons` are installed but imported nowhere — safe to uninstall.
- `theme-color` could follow the in-page toggle instead of the OS (~3 lines in `useTheme`).
- The iOS icon could be borderless (just the `N` and dot, edge to edge) rather than keeping the rounded frame inside Apple's squircle.
- Real project screenshots would justify reinstating an `image` field per project.
- SeaTrace's "12 Floor-balance modules" / "13 Organoleptic QC forms" were queried as unsupported by the bullets — the resume corroborates both ("a 12-module material-balance system, 13 quality-inspection forms"). **No change needed.**

### Not verified
Real-device touch behaviour, Safari, Firefox, and cold-cache font loading (FOUT). All checks above ran in headless Chrome.
