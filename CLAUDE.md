@AGENTS.md

# Brescia Lions — Official Website + Admin Panel

Cricket club website (tagline: "Un simbolo, una città, una famiglia", hashtag #OrgoglioDiBrescia, "One City. One Identity.").
Public website for fans + a private Admin Panel for the club team to manage all content without a developer.
Frontend and backend both live in this single Next.js project. There is NO separate backend folder.

## Working with the user
- The user writes in Hinglish (Roman Urdu/Hindi + English). Reply in the same style, keep answers short and simple.
- The user is used to NestJS (controller / service / schema). Keep that mental model.
- Do not start big implementation steps without the user's go-ahead; confirm the plan first.

## Stack
- Next.js 16 (App Router, `src/` dir), React 19, TypeScript (strict)
- Tailwind CSS v4 via `@tailwindcss/postcss` (`postcss.config.mjs`). Do NOT use `@tailwindcss/turbopack`.
- `next.config.ts` is kept default. Do NOT enable `cacheComponents` / `partialPrefetching` unless the user asks.
- MongoDB with Mongoose
- Zod for validation
- Cloudinary for images (confirmed; MongoDB stores only URLs)
- Email: SMTP via nodemailer (contact form). User provides keys in `.env.local`
- Hosting: undecided, ignore for now. User provides all secrets (MongoDB, Cloudinary, SMTP) in `.env.local`; never hardcode or commit them.
- Auth: email + password (bcrypt), session in JWT cookie, roles `admin` / `editor`
- Custom Tailwind admin UI (no shadcn/ui) — site is small
- Next 16 note: `middleware.ts` is now `proxy.ts`. Read `node_modules/next/dist/docs/` before using unfamiliar APIs.

## Theme (from the crest: golden crowned lion, Colosseum, Italian flag, cricket ball on deep green)

| Token | Value | Used for |
|---|---|---|
| Dark green | `#062A17` / `#0B3D22` | Page background, menu, footer |
| Light green | `#12572F` | Cards and sections |
| Gold | `#D4A73A` → `#F3D27A` | Headings, buttons, borders, highlights |
| Italian flag | green `#1F8A3C`, white, red `#C8272D` | Thin strip at the top of every page, small badges |
| Text | white or cream `#F7F1E1` | Body text |

Define these as tokens in `src/app/globals.css` (`@theme`), never hardcode hex in components.

### Fonts
- Headings: **Cinzel** (Roman, royal, matches the crest)
- Body, menu, buttons: **Montserrat**
- Load both with `next/font/google` in `src/app/layout.tsx`.

### Style
- Big classic gold headings
- Cards with rounded corners and thin gold borders
- Crest shown in top menu, main banner, footer and next to every Brescia Lions match
- Mobile first and fully responsive (360px phones up to desktop, no horizontal scroll): menu becomes a ☰ button, cards stack vertically. Check every new page at 360/390px and tablet width before calling a phase done.
- Sticky top menu: Home · About Us · Squad · Fixtures · Results · News · Gallery · Contact (+ "Follow Us" button)

## Public pages (`app/(site)`)
- **Home** (one scrolling page): Top menu → Main banner slider (auto-changing slides) → Upcoming matches (next 3 cards) → Latest news (3 newest) → About the Lions (+ key numbers: founded, players, matches, wins) → Meet the Squad (slider) → Photo gallery (lightbox) → Sponsors → Footer
- **About Us**: history, crest story, mission/vision, owners/management, coaching staff
- **Squad**: all players + staff, filter by role, player detail page (bio, batting/bowling style)
- **Fixtures & Results**: tabs All / Upcoming / Results, Won/Lost label, points table on the side with Brescia Lions highlighted
- **News**: filter by category + search; story page with share buttons (WhatsApp, Facebook, X) + related stories
- **Gallery**: albums → album page
- **Contact**: form (name, email, message) + club email/phone/address/map. Message is emailed AND saved in admin
- **Footer** (every page): crest, quick links, contact, social icons (Instagram, Facebook, X, YouTube, TikTok), email subscribe box, privacy/terms
- SEO (sitemap, meta, Open Graph for WhatsApp/social sharing), https, fast images

## Admin panel (`app/admin`, password protected)
Sections: Dashboard (counts), Main Banner, News (draft/publish), Matches, Results, Points Table, Squad, Gallery (albums, bulk upload), Sponsors, About Us, Messages (+ subscribers), Settings (contact, socials, footer), Users (team logins).
Extras: drag & drop images (auto resize), "Are you sure?" before every delete, search in every list.
Anything saved appears on the website immediately (use `revalidatePath` / `revalidateTag`).

## Folder structure

```
brescia/
├── public/images/ (logo.png, placeholder-player.png), og-default.jpg
├── src/
│   ├── app/
│   │   ├── layout.tsx, globals.css, sitemap.ts, robots.ts
│   │   ├── (site)/                 # PUBLIC website: layout (flag strip + Navbar + Footer),
│   │   │                           # page (home), about, squad[/[slug]], fixtures, results,
│   │   │                           # news[/[slug]], gallery[/[slug]], contact, not-found
│   │   ├── admin/
│   │   │   ├── login/page.tsx
│   │   │   └── (panel)/            # layout (sidebar + auth check), Dashboard, and per section:
│   │   │                           # banners, news, matches, points-table, squad, gallery,
│   │   │                           # sponsors, about, messages, settings, users
│   │   │                           # (list page.tsx, new/page.tsx, [id]/page.tsx)
│   │   └── api/                    # route.ts = CONTROLLER (REST endpoints)
│   │       ├── articles/ (route.ts, [id]/route.ts)
│   │       ├── banners/ matches/ standings/ players/ gallery/ sponsors/
│   │       │   about/ messages/ subscribers/ settings/ users/ auth/
│   │       └── upload/route.ts     # image upload + delete
│   ├── modules/                    # SERVICE + SCHEMA, one folder per feature
│   │   ├── articles/ (article.schema.ts, article.dto.ts, article.service.ts)
│   │   └── banners, matches, standings, players, gallery, sponsors, about,
│   │       messages, subscribers, settings, users, auth  (same 3 files each)
│   ├── components/
│   │   ├── ui/       # Button, Card, Badge, Modal, ConfirmDialog
│   │   ├── site/     # Navbar, Footer, HeroSlider, MatchCard, NewsCard, PlayerCard,
│   │   │             # GalleryGrid, Lightbox, SponsorsRow, PointsTable
│   │   └── admin/    # Sidebar, DataTable, ImageDropzone, RichTextEditor, section forms
│   ├── lib/          # db.ts, auth.ts (requireAdmin), upload.ts, mail.ts, utils.ts
│   └── proxy.ts      # protects /admin/*
├── .env.local        # MONGODB_URI, JWT_SECRET, CLOUDINARY_*, SMTP_*
└── next.config.ts, postcss.config.mjs, tsconfig.json, package.json
```

## Architecture rules (NestJS-style)
- `modules/<feature>/<feature>.schema.ts` — Mongoose schema (like a NestJS entity)
- `modules/<feature>/<feature>.dto.ts` — Zod validation for create/update input
- `modules/<feature>/<feature>.service.ts` — business logic + all DB queries
- `app/api/<feature>/route.ts` — acts as the controller: check admin, validate with DTO, call service, return response. Keep it thin; no DB queries here.
- No separate `*.controller.ts` files (route.ts is the controller).
- Public pages (Server Components) call `*.service.ts` functions directly — never fetch our own API.
- Admin forms call the REST API with `fetch("/api/...")`.
- Every mutating route (POST/PATCH/DELETE, upload) must call `requireAdmin()` itself; `proxy.ts` is not enough.
- Every create/update/delete in admin must revalidate the affected public pages.
- Drafts (e.g. unpublished news) must never be returned to public pages.
- Slugs are used in public URLs (`/news/[slug]`, `/squad/[slug]`, `/gallery/[slug]`).
- Images: upload via `/api/upload` → Cloudinary → save URL in DB; deleting a record should also delete its image.
- Path alias: `@/*` → `src/*`.

## Content note
Player photos, news, teams and scores in the proposal are samples only; real content is added by the club via the admin panel.

## Out of scope for v1 (possible later)
Online shop, live scores, ticket booking, Italian language version, videos section.

## Build phases (strictly step by step, NO parallel work)
Two stages: Phases 1-6 build the WHOLE website with static sample data (user approves the design at Phase 6). Phases 7-10 add the backend, admin panel and APIs and make everything dynamic.

The user tests after every phase. Build one phase at a time. After each phase run `npm run build` and `npm run lint`, check mobile (360/390px) and tablet, report what was built and what the user should test, then WAIT for the user's go-ahead before the next phase. Only touch files that belong to the current phase.

**Static-stage rule (so Phases 7-10 are easy):** pages must NOT hardcode data. Define types and put sample data in `src/data/`. Pages (Server Components) get data only through the `modules/<feature>/<feature>.service.ts` functions (e.g. `getLatestNews()`), which return the sample data for now. In Phases 8-9 only the service internals change to read MongoDB; page code stays the same. Forms (contact, subscribe) are visual only until Phase 10.

| # | Phase | Stage | What the user tests |
|---|---|---|---|
| 1 | **Foundation:** theme, fonts, Navbar/Footer/flag strip, common UI (DONE) | Static | Design, colours, mobile menu |
| 2 | **Home page (DONE):** banner slider (auto-changing), upcoming matches, latest news, about, squad slider, gallery, sponsors | Static | Whole home page on desktop and phone |
| 3 | **News** (list, filter, search, detail, share buttons) + **Contact** page (DONE) | Static | News pages, contact page layout |
| 4 | **Fixtures & Results** (DONE) (tabs, Won/Lost, points table) + **About Us** page | Static | Fixtures, results, points table, About |
| 5 | **Squad** (DONE) (role filter, player detail) + **Gallery** (albums, album page, lightbox) | Static | Squad and gallery pages |
| 6 | **Polish (DONE, awaiting user approval):** SEO (meta, sitemap, OG), 404/loading states, mobile pass, full review. User approves the design here | Static | Whole website end to end |
| 7 | **Backend foundation:** admin login (`proxy.ts`, `requireAdmin()`, seed admin user), Cloudinary upload/delete, admin layout + sidebar + Dashboard | Backend | Login/logout, `/admin` blocked without login, upload |
| 8 | **Dynamic:** News, Banners, Gallery (schema, dto, service, API routes, admin pages; website now reads from MongoDB) | Backend | Add/edit/delete news, banner, album; see it on the site |
| 9 | **Dynamic:** Matches + Results + Points Table, Squad, Sponsors, About Us, Settings | Backend | Same, for these sections |
| 10 | **Contact + Messages + Subscribers + Users**, SMTP email, final security check (`requireAdmin()` on every mutating route), testing | Backend | Form to admin inbox, subscribe, team users, full test |

## Status
Phases 1-5 are DONE and approved. Phase 6 (Polish) is built and verified (build, lint, tsc pass; audit of 16 routes at 360/820/1280px found no overflow, no broken images, no console errors; all 44 internal links return 200) and awaits the user's approval of the whole static design. Next: Phase 7 (Backend foundation: admin login, Cloudinary upload, admin layout) once the user approves.

Notes for all phases:
- Home page: HeroSlider with 7 sample slides (autoplay, dots, arrows, swipe; mobile has an extra dark overlay for text contrast), upcoming matches, latest news, about, squad slider, photo gallery with lightbox, sponsors.
- Types live in `modules/<feature>/<feature>.types.ts`; sample data in `src/data/*.ts`; services in `modules/<feature>/<feature>.service.ts` (async, return sample data now). Only services read `src/data/`. `src/data/` is deleted when the services move to MongoDB (Phases 8-9).
- Sample match/article dates are relative to today (`src/data/helpers.ts`), so "upcoming" always has data.
- Sample photos are free-licence Pexels photos in `public/images/sample/<pexels-id>.jpg`, for the client demo only (avoid photos with foreign flags or tournament branding). Real photos come from the admin panel.
- Phase 3: `/news` filters by category chips + search using plain links and a GET form (`?category=...&q=...`, no client JS). `/news/[slug]` has share buttons (WhatsApp/Facebook/X), related stories, OG metadata, and `generateStaticParams`; draft articles return 404. Article HTML is rendered with `.article-content` styles in `globals.css` (sanitize the HTML on save in Phase 8). `PageHeader` is the title band for all inner pages.
- Phase 4: `/fixtures` (tabs All / Upcoming via `?tab=upcoming`) and `/results` share `FixturesView` (match rows + sticky points table with Brescia highlighted; tab links: All -> /fixtures, Upcoming -> /fixtures?tab=upcoming, Results -> /results). Won/Lost/Tie/No-result badges are from the Lions' point of view. Match service: `getUpcomingMatches`, `getResults`, `getAllMatches`, `getStandings`. `/about` has Our Story, Story Behind The Crest (6 crest elements), Mission & Vision, Owners & Management, Coaching Staff (silhouette placeholders until photos are uploaded; `StaffCard`). Home page `AboutSection` and `/about` share `StatsList`.
- Phase 5: `/squad` filters by role with `?role=` (chips via the generic `FilterChips`), shows a Support Staff section (from `about.coaching`, only when no role filter). `/squad/[slug]` has photo, shirt number, role/captain badges, batting/bowling style, profile and teammates. `/gallery` lists albums (`AlbumCard`), `/gallery/[slug]` shows `PhotoGrid` with the shared `Lightbox` (also used by the home `PhotoMosaic`; keys: Esc, left/right arrows). Services added: `getPlayers(role)`, `getPlayerBySlug`, `getRelatedPlayers`, `getSupportStaff`, `getAlbums`, `getAlbumBySlug`.
- Sample player photos are anonymous stock cricketers; avoid photos with other nations' kits or sponsor branding when swapping.
- Phase 6: SEO and states. `src/app/layout.tsx` has default OG/Twitter metadata + `metadataBase`; `public/og-default.jpg` (1200x630), `src/app/icon.png` + `apple-icon.png` are generated from the crest. `sitemap.ts` lists all pages, published news, players and albums. `robots.ts` and the `robots` meta are `noindex` UNLESS the env `ALLOW_INDEXING=true` is set (set it, plus `NEXT_PUBLIC_SITE_URL`, only at real launch). JSON-LD: `SportsTeam` on home, `NewsArticle` on article pages (`JsonLd`). Canonical on home and article. 404: `app/not-found.tsx` (with Navbar/Footer) and `(site)/not-found.tsx`; `(site)/error.tsx` (try again) and `(site)/loading.tsx` (skeleton); skip-to-content link in `(site)/layout.tsx`; first images in lists use `priority`.
- Footer "Privacy Policy · Terms" are plain text (no pages yet).
- `/contact` form is visual only: it shows a thank-you message but sends nothing and saves nothing until Phase 10 (then POST `/api/messages`, saved in admin + emailed). The map is a Google Maps embed (no API key) of `siteConfig.contact.address`.
- Next 16 conventions used: `PageProps<"/route">` global type, `await props.params` / `await props.searchParams`.
- `NEXT_PUBLIC_SITE_URL` (optional env) sets the absolute site URL for share links and OG tags; default `http://localhost:3000`. Set it before deploying.
- `.env.local` is filled (MongoDB verified, Cloudinary, JWT_SECRET; SMTP empty, needed in Phase 10). Real crest `public/images/logo.png` and hashtag `public/images/hashtag.png` (paths in `src/lib/site.ts`; originals in `design-assets/`). Footer subscribe form is visual only until Phase 10.
- Testing tip: headless Chrome via DevTools protocol works for screenshots at 390px / 1280px; in Git Bash set `MSYS_NO_PATHCONV=1` when passing URL paths as arguments.
- Next dev badge "N" in the corner is dev only.
