# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
yarn dev        # Start dev server with Turbopack
yarn build      # Production build
yarn start      # Start production server
yarn lint       # ESLint (Next.js rules)
```

No test suite is configured.

## Architecture

**Verksmidjan** is an Icelandic music collective portfolio built with Next.js 15 App Router, React 19, and TypeScript.

### Core interaction model

The entire site is a single-page accordion with 5 rows. Only one row is expanded at a time. Scroll wheel events (with a 50px threshold before switching) navigate between rows. URL routes (`/`, `/collective`, `/releases`, `/socials`, `/music`) map to row indices and are kept in sync — navigating to a route expands the corresponding row.

All interactive state lives in `src/app/page.tsx` (`"use client"`). It manages:
- `expandedRow` — which of the 5 rows is open
- `scrollAccumulation` — wheel delta accumulation before row switch
- `contentRefs` — refs for each row's scrollable content area
- Route→row index mapping via `usePathname`

### Component pattern

Each section has a collapsed (60px label) and expanded (full content) variant, wrapped by `CollapsedWrap`/`ExpandedWrap` from `src/components/Rows/`. Sections: `Header`, `Collective`, `Releases`, `Socials`, `Music`.

### Sidebar

`src/components/Sidebar/` is a fixed 60px left sidebar. It contains an animated cogwheel SVG (`Cogwheels.tsx`) that reacts to scroll direction and row state. The logo button triggers `909.mp3` on click.

### Data

- Member data is hardcoded in `src/components/Collective/`
- Release metadata lives in `src/components/Releases/data.json`
- Social links are hardcoded inline in `src/components/Social/`
- External embeds (SoundCloud, Mixcloud, Bandcamp iframes) are rendered directly

### Styling

CSS Modules throughout (`.module.css` per component). Global CSS variables for theming (dark mode via `prefers-color-scheme`). Geist font via Next.js. No CSS framework.

### Path alias

`@/*` resolves to `./src/*`.
