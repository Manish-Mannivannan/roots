# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server (Turbopack + CSS build)
npm run build      # Production build (builds CSS first, then Next.js)
npm run build:css  # Compile Tailwind CSS only
npm run lint       # Run ESLint
npm start          # Start production server
```

There is no test suite configured.

## Architecture

**Roots** is a Next.js 14 (App Router) family tree visualization app with Google OAuth via Supabase.

### Key layers

- **Pages** (`src/app/`) — `familytree/`, `about/`, `login/`, `user/profile/`, `auth/callback/`
- **Family tree** (`src/app/familytree/`) — D3.js SVG hierarchical layout with bespoke pop-in and line-drawing animations. The tree data is hardcoded in `src/app/data/familyData.ts` as a nested `FamilyNode` tree. `familyTreeAnimation.tsx` owns the D3 animation logic; `familyTree.tsx` is the main React component.
- **3D scene** (`src/app/about/`) — React Three Fiber + Three.js scene. Leva controls are used for live parameter tweaking.
- **Auth** — Google OAuth only, handled by Supabase. `src/auth/GuardedFrontendPage.tsx` is the HOC that gates pages. `src/lib/hooks/useCurrentUser.ts` fetches the authenticated user and their Supabase profile in one place.
- **State** — Jotai atoms for shared state; React hooks for local state. No Redux or Context API.
- **Data types** — All interfaces live in `src/app/types/interfaces.ts` (`FamilyNode`, `UserProfile`, etc.).

### CSS / Tailwind note

Turbopack (used in `npm run dev`) does not support PostCSS, so Tailwind is pre-compiled to `src/app/styles/tailwind.css`. **Do not edit `tailwind.css` directly** — edit `src/app/styles/globals.css` and run `npm run build:css`. The custom color palette (`palette1`–`palette5`, warm oranges/golds) is defined in `tailwind.config.ts`.

### Supabase

Credentials come from `.env.local` (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`). The client is initialized in `src/lib/supabaseClient.ts`, which also exports `signInWithGoogle` and `upsertUserProfile`. Remote images from `lh3.googleusercontent.com` (Google profile photos) are allowed in `next.config.mjs`.

### Component conventions

- Shared layout wrapper: `FrontendLayout` + `Header` from `src/app/components/`
- `src/lib/utils.ts` exports `cn()` (clsx + tailwind-merge) for conditional class names
- `ProfileCard` (`src/components/ProfileCard.tsx`) uses CSS 3D tilt and grain effects defined in `ProfileCard.css`
