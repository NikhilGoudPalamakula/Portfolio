# Project Structure

Portfolio site for Nikhil Goud Palamakula. Single React SPA, no backend.

> Companion doc: [DEVELOPMENT_LOG.md](DEVELOPMENT_LOG.md) — why things are the way they are, and the traps that already bit us. **Read that before changing styling or animations.**

---

## 1. Stack

| Layer | Choice | Version | Note |
|---|---|---|---|
| Framework | React | `19.2` | |
| Build | Vite | `7.1` | **Pinned to 7 — do not upgrade to 8.** See §6 |
| React plugin | `@vitejs/plugin-react` | `4.7` | v5+ pairs with Vite 8 |
| Routing | `react-router-dom` | `7.9` | |
| Styling | SCSS Modules + CSS custom properties | `sass 1.94` | |
| Icons | `lucide-react` | `1.37` | line icons only — see §6 |
| Global state | `zustand` | `5.0` | theme + mobile menu |
| Server state | `@tanstack/react-query` | `5.90` | login scaffold only |
| HTTP | `axios` | `1.13` | login scaffold only |
| UI kit | `antd` | `6.2` | login/admin scaffold only — **not used on the public site** |

**File conventions**
- `.js` everywhere — no `.jsx`, no `.tsx`. JSX inside `.js` works via `esbuild.loader: 'jsx'` in [vite.config.js](client/vite.config.js).
- Components: `PascalCase` folder + `index.js`
- Styles: `<Name>.module.scss`, one per component
- Hooks / utils / services / content: `camelCase.js`

**Unused but still installed:** `gsap` and `@ant-design/icons`. Both were in the original scaffold spec; the final design uses pure CSS animations and lucide. Safe to `npm uninstall` both.

---

## 2. Folder map

```
Portfolio/
├── PROJECT_STRUCTURE.md          ← this file
├── DEVELOPMENT_LOG.md            ← decisions, bugs, open items
└── client/
    ├── index.html                fonts, icon links, manifest, theme-color
    ├── vite.config.js            @ alias, JSX-in-.js loader, /api proxy
    ├── eslint.config.js
    ├── .env                      VITE_PORT / VITE_API_BASE_URL / VITE_API_PROXY_TARGET
    ├── public/                   served verbatim at /
    │   ├── favicon.svg           the N monogram (source of truth for all icons)
    │   ├── favicon.ico           16 + 32 + 48
    │   ├── apple-touch-icon.png  180×180, full-bleed
    │   ├── icon-192.png          Android / PWA
    │   ├── icon-512.png          Android / PWA
    │   ├── manifest.webmanifest
    │   └── Nikhil_Goud_Palamakula_Resume.pdf   the CV; filename IS the download name
    └── src/
        ├── main.js               QueryClient → AntdTheme → BrowserRouter → App
        ├── App.js                all routes
        │
        ├── content/              ★ ALL SITE COPY LIVES HERE ★
        │   ├── profile.js        PROFILE, RESUME, ABOUT, QUICK_FACTS, SEO_DESCRIPTION
        │   ├── projects.js       PROJECTS (+ getProjectBySlug / getProjectIndex)
        │   ├── skills.js         SKILLS
        │   ├── path.js           PATH (work history)
        │   ├── stats.js          STATS (hero counters)
        │   ├── nav.js            NAV
        │   └── index.js          re-exports — import from '@/content'
        │
        ├── styles/               ★ ALL DESIGN TOKENS LIVE HERE ★
        │   ├── global.scss       CSS custom properties (light + dark), reset
        │   ├── variables.scss    SCSS breakpoints, radius, page padding, easing
        │   └── mixins.scss       mono-label, serif, rise, *-keyframes, button-row, group-title
        │
        ├── components/           generic, reused across features
        │   ├── BrandIcon/        brand logos by name + lucide line fallbacks
        │   │   └── brandIcons.js   BRAND_ICONS registry, BRAND_ALIAS, isDarkBrand
        │   ├── Bullets/          bullet list, auto-emphasises figures
        │   ├── Button/           solid | ghost; renders Link / a / button
        │   ├── Counter/          0 → n count-up on mount
        │   ├── CtaBanner/        "Let's build something"
        │   ├── FactList/         QUICK_FACTS definition list
        │   ├── PageSection/      page vertical rhythm; `hero` variant
        │   └── SectionHead/      title + oversized ghost number
        │
        ├── features/             one folder per domain
        │   ├── home/             Hero, StatGrid
        │   ├── work/             ProjectList, ProjectDetail
        │   ├── about/            AboutBody
        │   ├── skills/           SkillGrid
        │   ├── path/             Timeline
        │   ├── contact/          ContactActions
        │   └── login/            + services/ (loginService, loginQueries)
        │
        ├── pages/                route targets — compose features
        │   ├── HomePage.js  WorkPage.js  ProjectPage.js  AboutPage.js
        │   ├── SkillsPage.js  PathPage.js  ContactPage.js
        │   └── LoginPage.js  AdminPage.js  NotFoundPage.js
        │
        ├── layouts/
        │   ├── MainLayout.js     fixed-viewport shell, scroll reset, route fade
        │   ├── Navbar/           Navbar.js + MobileDrawer.js
        │   └── Footer/
        │
        ├── hooks/
        │   ├── useTheme.js           store → <html data-theme>
        │   ├── useDocumentMeta.js    per-page title + OG tags
        │   └── useCopyToClipboard.js
        │
        ├── store/appStore.js     theme (persisted), mobile menu
        ├── auth/                 authStore (persisted), ProtectedRoute
        ├── theme/                antd tokens + AntdThemeProvider
        ├── config/               apiConfig (API_BASE_URL, ENDPOINTS), mockData/
        ├── utils/api.js          axios + bearer injection + 401 → logout
        └── locales/en/common.json  string reference (no i18n lib wired)
```

54 `.js` files, 24 `.scss` modules.

---

## 3. Routes

| Path | Page | Shell |
|---|---|---|
| `/` | HomePage | MainLayout |
| `/work` | WorkPage | MainLayout |
| `/work/:slug` | ProjectPage | MainLayout |
| `/about` | AboutPage | MainLayout |
| `/skills` | SkillsPage | MainLayout |
| `/path` | PathPage | MainLayout |
| `/contact` | ContactPage | MainLayout |
| `/admin` | AdminPage | MainLayout + ProtectedRoute |
| `/login` | LoginPage | standalone |
| `*` | NotFoundPage | MainLayout |

Project slugs come from `PROJECTS[].slug`. An unknown slug redirects to `/work`.

The public site is **not** auth-gated. Only `/admin` is — it exists purely to keep the auth scaffolding wired and testable, and can be deleted with its route.

---

## 4. Where to make a change

| I want to… | Edit |
|---|---|
| Change any text on the site | `src/content/*.js` — nothing else |
| Add / edit a project | `src/content/projects.js` (needs a unique `slug`) |
| Change colours, fonts, spacing | `src/styles/global.scss` (tokens) or `variables.scss` |
| Swap the resume PDF | replace `public/Nikhil_Goud_Palamakula_Resume.pdf`, keeping the name — or rename it and update `RESUME.href` + `RESUME.filename` together |
| Hide every resume button | `RESUME.href = null` in `src/content/profile.js` |
| Change the app icon | replace `public/favicon.svg`, then regenerate the raster set (§5) |
| Add a social link | `PROFILE.socials` in `src/content/profile.js` + its logo in `brandIcons.js` |
| Change the production domain | `PROFILE.site` (drives canonical + og:url) **and** the static `<link rel="canonical">` in `index.html` |
| Add a tech logo to a tag | `src/components/BrandIcon/brandIcons.js` |
| Add a nav item | `src/content/nav.js` + a route in `App.js` |
| Add a page | `pages/` + route in `App.js`; heavy UI goes in `features/` |
| Restyle one component | its own `*.module.scss` — never a global file |
| Add a button to a row | nothing extra — `@include button-row` already handles the mobile stack. Re-measure if the row gets wider |

**Adding a feature sub-component**
1. `features/<domain>/<Name>/index.js` + `<Name>.module.scss`
2. Render it from the relevant `pages/*Page.js`
3. `@use '../../../styles/mixins.scss' as *;` for shared type/motion mixins

---

## 5. Commands

```bash
cd client
npm install
npm run dev       # http://localhost:5174
npm run build     # → dist/
npm run preview   # serve dist/
npm run lint
```

**Regenerating app icons** after replacing `favicon.svg` — the raster set is generated, not hand-drawn:

| File | From | Size |
|---|---|---|
| `favicon.ico` | favicon.svg, transparent corners | 16 + 32 + 48 |
| `apple-touch-icon.png` | full-bleed paper background | 180 |
| `icon-192.png` / `icon-512.png` | full-bleed paper background | 192 / 512 |

Full-bleed matters: iOS ignores PNG transparency and would paint the rounded corners black.

---

## 6. Traps

These have already caused real bugs. Details in [DEVELOPMENT_LOG.md](DEVELOPMENT_LOG.md).

1. **Keyframes must be declared inside the `.module.scss` that uses them.** CSS Modules hashes the animation name in the `animation` shorthand, so a `@keyframes` in `global.scss` never matches — the animation silently does nothing. Use the `rise-keyframes` / `word-keyframes` / `page-in-keyframes` mixins at module root.
2. **Do not upgrade Vite to 8.** It uses Rolldown, which rejects JSX inside `.js` files at the parser level. The whole codebase is `.js`.
3. **`lucide-react` v1 has no brand or social icons.** `Linkedin`, `Github`, `Twitter` are gone and import as `undefined` with no build error. Add the SVG path to `brandIcons.js` instead.
4. **Never give a CSS custom property its own value** (`--body: var(--body)`). It resolves to nothing and the property silently disappears.
5. **Define every token for both themes.** A colour defined only in `:root` keeps its light value in dark mode.
6. **A missing file in `public/` may download as HTML, not 404** — SPA fallback returns `index.html`. Confirm assets exist in `dist/` after building. (`/resume.pdf` still returns 200 for this reason; nothing links to it.)
7. **Button rows stack full-width below a breakpoint** via the `button-row` mixin — a wrapped row that orphans one button reads as accidental. The stack breakpoints are *measured*, not guessed: `$bp-btn` (560px) for short rows, `$bp-contact` (919px) for the contact row, whose email button is wide. Adding a button to a row can push it past its threshold, so re-measure.
8. **`<button>` does not inherit `line-height`.** It defaults to `normal` while `<a>` inherits the body's 1.55, so the two render ~5px different in height. Invisible in a flex row (stretch hides it), obvious once stacked. `.btn` pins `line-height: 1.55` for this reason.
9. **The download filename comes from two places.** The `download` attribute sets it for clicks; the file's own name is what a right-click Save-As or direct navigation uses. Keep `RESUME.filename` and the file in `public/` identical.
