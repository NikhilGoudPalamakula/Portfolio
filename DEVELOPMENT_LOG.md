# Development Log

How this portfolio was built, what was decided and why, and every bug found along the way. Written so that work can continue in another editor, machine, or AI session without re-deriving any of it.

Companion doc: [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md).

Built over 2026-08-31 → 2026-09-08.

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

7. **Mobile button alignment** — button rows now stack full-width below a measured breakpoint; socials moved to their own row. See §4.8–4.9.

8. **Section continuation** — a sticky "up next" chip that fades in near the bottom of a page, plus prev/next between project case studies, so reaching the end of a page is not a dead end. See §8.

---

## 4. Bugs found and fixed

All nine were in the original design file or introduced during the port. Each changed rendered output.

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

### 4.8 Button rows wrapped raggedly on mobile
Reported from the phone: rows of buttons wrapped so that a single button was orphaned on its own line — "Download resume" and "GitHub" each alone. Measured across widths:

| Row | ragged at | clean from |
|---|---|---|
| Hero (3 buttons) | 360 / 414 / 480px — 2 lines | ~543px |
| Contact (6 buttons) | 360px → **5 lines**, 414px → 4 lines, and 3 + 1 up to 900px | 920px |

**Fix:** a `button-row` mixin — a wrapping row above the breakpoint, a full-width centred stack below it. Thresholds were measured rather than guessed (`$bp-btn` 560px; `$bp-contact` 919px, since the row provably fits from 920px). The six contact buttons were also split into two rows — primary contact and socials — because six in one row wrapped 5 + 1 even at 1440px once GitHub was added.

A full sweep of `/`, `/contact` and a project page at 360 / 414 / 560 / 640 / 760 / 900 / 920 / 1024 / 1440px now reports no row wrapping to more than one line.

### 4.9 `<button>` and `<a>` rendered different heights
Found while checking the stacked spacing was even — the gaps were 57, 58, **53**, 58, 58. `global.scss` gives `button { font-family: inherit }` but not `line-height`, so a `<button>` fell back to `line-height: normal` (~40px tall) while the `<a>` buttons inherited 1.55 (~46px). In a flex *row* the default `align-items: stretch` equalised them, hiding it completely; stacking exposed it. Only "Copy email" is a real `<button>`, so only it was short.

**Fix:** `.btn` pins `line-height: 1.55`. All six buttons now measure 46px.

An audit for horizontal overflow and label collisions across all seven routes at 360 / 414 / 560px found nothing else.

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

### Open, from §8
- On desktop the chip does not appear on About / Skills (and Path at 1440px) because those pages fit the viewport. Options: leave it, show it on short pages after a short delay, or add the inline end-of-page pager as a fallback for short pages.
- On mobile at full scroll the chip overlaps the footer line. Fixable with bottom breathing room on the scroll container, at the cost of dead space once dismissed.
- ~~Path shows both the chip ("Up next — Contact") and the CTA~~ — resolved by §9: Path is now the end of the ladder, so it shows no chip.

### Not verified
Real-device touch behaviour, Safari, Firefox, and cold-cache font loading (FOUT). All checks above ran in headless Chrome.

---

## 8. Section continuation (added 2026-09-08)

**The ask:** reaching the bottom of a page shouldn't force a trip back to the nav to continue.

**Chosen pattern:** a sticky chip in the bottom-right (bottom bar on phones) that fades in once the page is scrolled 70% and offers the next section in `NAV` order. Dismissable; a dismissal holds for the session (`nextHintDismissed` in `appStore`, deliberately outside `partialize` so it resets on reload).

An inline pager at the end of the document was the other candidate — no JavaScript, no thresholds — and is still the fallback if the chip proves fussy.

**Pieces:** `components/NextHint/`, `hooks/useScrolledPast.js`, `getNextSection()` in `content/nav.js`. Rendered from `MainLayout`, which owns the scroll container.

**Also added:** `features/work/ProjectPager/` — prev / next / all-work under each case study, driven by `getAdjacentProjects()`. It replaced the *bottom* "Back to work" link (the one at the top of the page stays).

### The scroll guard, and what it means
`useScrolledPast` refuses to fire when there is less than 240px of scrollable distance. Without that, a page shorter than the viewport trips the threshold instantly and the chip appears unprompted — the exact behaviour that makes this pattern feel like an ad. Measured consequence:

| Page | 1280×800 | 1440×900 | 390×844 |
|---|---|---|---|
| Home | shows | shows | shows |
| Work | shows | shows | shows |
| About | too short | too short | shows |
| Skills | too short | too short | shows |
| Path | shows | too short | shows |
| Contact | n/a — end of ladder | n/a | n/a |

So on a large desktop the chip only appears on the two long pages. That is defensible (nothing to scroll means nothing to reach the bottom of) but it is a real inconsistency, and the alternatives are noted in §7.

### Worth knowing about the premise
In this layout the navbar sits in a fixed shell and **never scrolls away** — only `.view` scrolls. So the chip saves cursor travel, not a scroll journey back to the top. Its clearest value is on mobile, where the nav is behind the burger, and that is also where it fires on every page.

---

## 9. Contact folded into the CTA (added 2026-10-12)

**The ask:** "Let's build something" used to link to a separate `/contact` page. Put the contact details right under it instead, and drop the page.

- `CtaBanner` now renders the headline (a `mailto:` link), a one-line lead, and `ContactActions` — the email / phone / copy / resume row and the socials row. It already closed Home, Work, About, Skills and Path, so every page now ends with the full contact block.
- `ContactActions` moved from `features/contact/` to `components/`, since a shared component now uses it. Its old serif lead was dropped; `CtaBanner` carries a smaller one.
- `ContactPage` and the Contact nav item are gone. `/contact` redirects to `/` so old links keep working. Path is now the end of the "up next" ladder.
- **Not re-measured:** every page is now taller by the two button rows, so the §8 "too short" table (which pages show the chip on desktop) is likely out of date.

Also on 2026-10-12: the light theme moved off cream to a neutral near-white (`--paper` `#f4f1ea` → `#fafaf8`, with `--surface`, `--surface2`, `--line` and `--hairline` adjusted to match, mirrored in `theme/theme.js` and the `theme-color` meta).

---

## 10. Path merged into Work (added 2026-10-12)

**The ask:** Work and Path told the same story twice — Work in depth, Path company by company. Fold Path into Work and drop the tab.

- `content/path.js` became `content/career.js` (`CAREER`): one entry per employer with `org`, optional `location`, a `roles` array (SBR has two), and an optional `note`.
- `ProjectList` now groups projects under an employer header (name, location, role(s) + dates, note). A project joins a group when its `org` matches `CAREER[].org` **exactly**; anything unmatched still renders, in a trailing headerless group. Project numbering stays global (01–06) so it matches the detail pages.
- The card's meta line dropped `· org` — the group header already says it.
- Nothing from Path was lost: the SBR techno-commercial line (negotiations, quotation-to-closing, Mahindra & Mahindra) lives in the SBR note. Matrical's generic note was replaced with the client-facing work from the resume (requirements → specs, demos, pre-sales), condensed to one line to match the other headers.
- `PathPage`, `features/path/Timeline` and the nav item are gone; `/path` redirects to `/work`. Nav is now Home · Work · About · Skills, so the "up next" ladder ends at Skills.
- The two SBR projects have no `year`, so their cards show only the number.

---

## 11. Portrait on About (added 2026-10-12)

- Placed on About, not Home: the Home hero is pure typography (name with a word-by-word entrance), and a photo would compete with it; About's narrow right column had room above the quick facts.
- `src/assets/portrait.jpg` — cropped 4:5 from a 3066×1737 landscape original (crop starts at x=820, full height, so the pillar on the left is excluded), resized to 960×1200, JPEG q82 → 121 KB. Re-crop from the original if a different framing is wanted.
- `AboutBody` uses grid areas: desktop `body | photo` over `facts | photo` (facts moved under the story on 2026-10-12 — with photo *and* facts stacked on the right, the left column ended ~400px early and left a dead gap); stacked below `$bp-md` it goes photo → story → facts (capped at 300px wide) so the photo isn't buried at the bottom.
- Not done: using it as the `og:image` for link previews.

---

## 12. Work as an accordion (added 2026-10-12)

**The ask:** the grouped Work page (§10) loaded every card in full at once and read as crowded. Show the career outline first, reveal projects on demand.

- Each employer is a disclosure button (`aria-expanded` / `aria-controls`): name, project count, role(s) + dates, and a `+` that turns into `×` when open. Click/tap toggles — **not hover**, which does nothing on touch and makes the list jump under a desktop cursor. Several can be open at once.
- The most recent employer (first in `CAREER`) is open by default, so a visitor sees real work on arrival.
- Open/close animates `grid-template-rows: 0fr → 1fr` (no height measuring). Closed panels are `inert`, so their links can't be tabbed to.
- Inside, each project is one compact row — number, title, category, dates, arrow. The blurb slides in on hover/focus and is always shown on touch (`@media (hover: none)`). Tags and "Read more" are gone from the list; they live on the project page.
- Below `$bp-md` category and dates collapse into one mono line under the title.
- Trade-off accepted: a skimmer won't see Matrical / SBR projects without opening them; the project count beside each name signals there is more.

---

## 13. Motion pass, step 1 — signal trace (added 2026-10-12)

**The ask:** the site read as flat / template-like. Add motion that feels personal rather than generic. Agreed plan, one at a time: (1) hero signal trace, (2) live status line, (3) staggered row step-in on Work, (4) section-number scroll drift. Explicitly avoided: particles, gradient blobs, custom cursor, typewriter text, logo marquees, infinite loops.

- `features/home/SignalTrace/` — an inline SVG under the hero name: a PLC-style square wave (automation years) that smooths into a continuous wave (software) and ends on a node. Labels: "2020 · PLC / SCADA" → "Now · Full-stack".
- Draws once via `stroke-dashoffset` on `pathLength="1"`, starting at 1.15s (after the name's word rise), then the node switches on and pings **once**. `preserveAspectRatio="none"` + `vector-effect: non-scaling-stroke` keep the line weight constant at any width.
- Reduced motion: the finished trace, static.
- **Verification caveat:** headless Chrome screenshots don't advance CSS animations reliably (even the name was caught mid-rise), so the final state was checked with `--force-prefers-reduced-motion`. The draw itself has only been seen in code, not on screen.

---

## 14. Motion pass, steps 2–4 (added 2026-10-12)

**2 · Status line** — `features/home/StatusLine/` sits opposite the hero eyebrow (wraps under it when narrow): a green "running" lamp, "Open to work", and live local time (`16:47 IST`). Time comes from `useLocalTime(PROFILE.timeZone)` (Intl, ticks every 15s). The lamp's slow pulse is the **only** looping animation on the site. "Open to work" follows `PROFILE.available`. The green deliberately steps outside the palette — it's the universal "available" colour.

**3 · Row step-in on Work** — when an employer opens, its rows slide in 75ms apart and each index number flickers on like a lamp. The keyframes hang off `.open`, so they re-run on every open and vanish on close.

**4 · Section-number drift** — `SectionHead`'s ghost number moves 36px down and fades to 0.06 over the first 420px of scroll, via `animation-timeline: scroll(nearest block)` (MainLayout's `.view` is the scroller). Pure CSS; wrapped in `@supports` and `prefers-reduced-motion: no-preference`, so Firefox and reduced-motion users get a still number.

**Verified in real time** this time — headless Chrome driven over the DevTools protocol (a throwaway script, not in the repo): the trace caught mid-draw and settled, SBR clicked open with rows caught mid-step, and the ghost measured at `translateY(25.7px)`, opacity `0.089` after 300px of scroll (expected 300/420 × 36 = 25.7).

---

## 15. Resume refresh (added 2026-10-12)

New resume: `C:\Other files\Resumes-N\Nikhil_Goud_Palamakula_Resume.pdf` (+ `.docx`, created 2026-10-12). Copied over `client/public/Nikhil_Goud_Palamakula_Resume.pdf`; served 200 / 66,986 bytes. The PDF's text is glyph-encoded, so the content was diffed against the matching `.docx`.

Site copy brought in line with it:
- **SeaTrace** — `~200 daily users` metric; "one of two technical leads in a 6-person engineering team".
- **Factory Intelligence** — "live across 6 client organisations" (blurb + first bullet) and a `6 client organisations` metric.
- **EMS** — `~50% faster API responses` metric; bullet now says "~50% (approx. 3s to 1.5s)"; tags add Python, Docker (per the resume's EMS line).
- **HMS** — `4 core modules` metric.
- **Pharma automation** — added the liaise / specify / commission-on-site bullet; "4 pharmaceutical companies … several plant units in parallel".
- **PatternLab header** — note now the resume's line: multi-tenant B2B SaaS for manufacturing, energy and export.
- **Skills** — added Vite, Highcharts, Socket.IO, Nginx, GitLab, and a fourth **Industrial** group (Mitsubishi, Allen-Bradley, SCADA, Beijer HMI, 21 CFR Part 11). Grid went 3 → 4 columns, 2 × 2 below 1000px, 1 column below `$bp-sm`. Socket.IO / Nginx / Highcharts / GitLab / SCADA have no logo in the registry, so they render as plain labels.
- **Quick facts** — added `Education: B.Tech EIE · MBA (pursuing)`.

Not in the resume, left unchanged: the Home stat **"15 plants & sites"**.
- **Follow-up, same day:** once the facts sat on the left, the left column became the taller one and the gap moved under the photo. The portrait now `align-self: stretch`es across both rows with `object-fit: cover` (`object-position: 50% 30%`, `min-height: 420px`), so both columns end level at any desktop width; stacked layout keeps the fixed 4:5 crop.
- **Replaced, same day:** the stretched crop read as awkward. Final layout: story full width on top; below it a `236px | 1fr` row with the uncropped 4:5 portrait (+ a mono `PROFILE.location` caption) beside the quick facts. At 236px the photo (~295px tall) matches the six fact rows within ~15px, so neither side leaves a gap. Stacked: photo → story → facts, unchanged.
- **Final (user wanted the photo top-right):** story beside a `270px` portrait in the top row; the six quick facts run full width beneath as two columns of three (`grid-auto-flow: column`, each column drawing its own top rule). 270px was measured to land within ~40px of the story's height from 900px to 1350px. Stacked layout unchanged.
- **Skills follow-up, same day:** Nginx removed. GitLab logo added (Simple Icons 13.21.0, `#FC6D26`). Highcharts isn't in Simple Icons, so its mark was taken from the header logo on highcharts.com (7 coloured polygons, rescaled into the 24×24 box) — `BrandIcon` now also accepts `{ paths: [{ d, fill }] }` for multi-colour marks. Industrial group now leads with **PLC logic** (lucide `CircuitBoard` line icon via `LINE_FALLBACK`).

---

## 16. Interaction pass (added 2026-10-12)

**The ask:** more interaction, easier reading, more engagement. Agreed set (from six options): skill → project links, a career timeline bar, an interactive signal trace. Explicitly avoided: an AI chat widget.

**1 · Skills → "Used in".** A skill that appears in a project's copy becomes a disclosure button with a count badge; clicking it slides open "Used in" links to those case studies. `getProjectsForSkill()` (in `projects.js`) matches the skill as a whole word, case-sensitive, against each project's full data — so a link appears only where the project actually says so. `SKILL_TERMS` in `skills.js` adds aliases (`Material UI` ↔ `MUI`, `PLC logic` ↔ `PLC`). Skills with no match (JavaScript, Redux, Ant Design, CSS, SCSS, SQL, Redis, AWS, Git · CI/CD, GitLab, SCADA) stay plain text by design. One open at a time.

**2 · Career bar on Work.** `features/work/CareerBar/` draws every employer on one proportional bar from the earliest role start to now, with year ticks and a "Now" end. Spans are parsed from the `CAREER[].roles[].year` strings ("Nov 2020 – Dec 2021", "Present" = today). Hover state is shared with the groups below (hover either and both light up — accent block + accent rail beside the group). Clicking a block opens that employer (never closes it) and smooth-scrolls to it (`scroll-margin-top: 24px`; instant under reduced motion). `CAREER[].short` overrides the bar label (Matrical).

**3 · Trace readout on Home.** The trace's two halves are buttons (hover, focus or tap): the digital stretch lights up with "2020 – 2023 · Automation engineer · SBR Automation", the analog one with "2023 – Now · Full-stack developer · Matrical → PatternLab.ai". The rest of the line dims, the matching label turns accent, and a caption card floats below (absolutely positioned — the hero never shifts). Captions are `aria-live="polite"`.

**Verified** in headless Chrome over the DevTools protocol with real pointer events: NestJS opened to SeaTrace + Factory Intelligence; hovering the SBR block lit it and the SBR group; clicking it opened SBR (`aria-expanded=true`) and scrolled the view to 678px; both trace halves showed their cards.

---

## 17. Case studies condensed (added 2026-10-12)

**The ask:** project pages carried too much copy (Factory Intelligence ~500 words / 36 bullets, SeaTrace 19) while HMS and Injectables had ~4 each. Make them skimmable without losing anything.

- **Archive first:** `PROJECT_CONTENT_ARCHIVE.md` (repo root) — every project's previous copy, generated verbatim from `projects.js` before any edit, plus a table of what was folded vs. dropped per project.
- **New project shape** (`projects.js` header comment): `summary { problem, role, result }` → `metrics` → `built` (3–4 strongest points, always visible) → `more` (`[{ label, items }]`, folded). The old `groups` / `build` / `highlights` / `detail` fields and their render paths are gone.
- **Page:** summary as an accent-ruled problem / role / result list; "What I built" as plain bullets; `more` as native `<details>` folds (keyboard + screen-reader for free) with an item count and a `+` that turns to `×`. A single metric no longer stretches full width (`:has(> :only-child)` caps it at 240px).
- **HMS** gained three "What I built" points from the resume (modules, client requirements, demos & pre-sales); **Pharma** gained a `4 · Pharma companies` metric.
- Skill → project links re-checked after the rewrite: every match that existed before still resolves.
- **Reverted the folds, same day:** the user felt the `<details>` folds only added clicks once the copy was already condensed. `more` sections now render openly like before, and each project's "More of what I built" group was merged into its `built` list (Factory Intelligence 9 points, EMS 7). Fold styles removed.
