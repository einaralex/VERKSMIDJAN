# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

**Keep this file up to date.** When you make architectural changes, add new patterns, or change how data flows, update this file so future sessions have accurate context.

## Commands

```bash
yarn dev        # Start dev server with Turbopack
yarn build      # Production build (static export to `out/`)
yarn start      # Start production server
yarn lint       # ESLint (Next.js rules)
```

No test suite is configured.

## Architecture

**Verksmidjan** is an Icelandic music collective portfolio built with Next.js 15 App Router, React 19, and TypeScript.

### Static export

SSR is disabled. The site is configured with `output: "export"` and `images.unoptimized: true` in `next.config.ts`. All pages are pre-rendered at build time. There is no server runtime.

### Core interaction model

The main site is a single-page accordion with 5 rows. Only one row is expanded at a time. Scroll wheel events (with a 50px threshold before switching) navigate between rows. URL routes (`/`, `/collective`, `/releases`, `/socials`, `/music`) map to row indices and are kept in sync — navigating to a route expands the corresponding row.

All interactive state lives in `src/app/page.tsx` (`"use client"`). It manages:

- `expandedRow` — which of the 5 rows is open
- `scrollAccumulation` — wheel delta accumulation before row switch
- `contentRefs` — refs for each row's scrollable content area
- Route→row index mapping via `usePathname`

Expanded content is conditionally rendered (not hidden with `display: none`) to avoid zero-width iframe issues with embedded players.

### Component pattern

Each section has a collapsed (60px label) and expanded (full content) variant, wrapped by `CollapsedWrap`/`ExpandedWrap` from `src/components/Rows/`. Sections: `Header`, `Collective`, `Releases`, `Socials`, `Music`.

### Release pages

Each release has a standalone fullscreen promotional page at `src/app/[id]/page.tsx`. These are shareable links for fans to find their preferred streaming service (like a Linktree for a release).

- Release data lives in `src/components/Releases/data.json`
- Pages are generated via `generateStaticParams()` for both the release `id` (e.g. `VERK0001`) and any `slugs` aliases (e.g. `utikottur`, `gaedablod`)
- The `findRelease()` helper matches by either `id` or slug
- Album cover images go in `public/covers/` named by ID (e.g. `VERK0001.jpg`)
- OpenGraph metadata is generated per release for social sharing
- To add a new release: add an entry to `data.json`, drop the cover in `public/covers/`, and it auto-generates all routes

### Releases accordion section

The Releases row in the main accordion (`src/components/Releases/index.tsx`) shows a grid of album covers. Each cover is a `<Link>` to the release's promotional page (`/{id}`).

### Sidebar

`src/components/Sidebar/` is a fixed 60px left sidebar. It contains an animated cogwheel SVG (`Cogwheels.tsx`) that reacts to scroll direction and row state. The logo button triggers `909.mp3` on click.

### Data

- Member data is hardcoded in `src/components/Collective/`
- Release metadata lives in `src/components/Releases/data.json` (includes streaming links, Bandcamp embed IDs, slug aliases, track listings)
- Social links are hardcoded inline in `src/components/Social/`
- External embeds (SoundCloud, Mixcloud, Bandcamp iframes) require `allow="encrypted-media"` on their iframe elements

### Styling

CSS Modules throughout (`.module.css` per component). Global CSS variables for theming (dark mode via `prefers-color-scheme`). Geist font via Next.js. No CSS framework.

White icon variants for dark backgrounds live in `public/icons/` with a `-white` suffix (e.g. `stream-apple-white.svg`). These use `fill="white"` on their SVG paths.

### Path alias

`@/*` resolves to `./src/*`.
