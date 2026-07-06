# .aim — format landing page

The landing page for **[`.aim`](https://github.com/tndmhq/aimformat)**, the open
AI-native document format (by Tndm). This is the *format* site; the editor site
lives separately.

Design direction: **"The Standing Type"** — a fine-press manuscript treatment where the
page itself is the product demo. The hero is a rendered `.aim` leaf marked up in
red/green editor's ink (the three-lane track-changes primitive) with a half-peeled
"view source" plate beneath. One disciplined oxblood accent; `redline`/`greenline` are
reserved exclusively for the track-changes metaphor. Set in Fraunces, Newsreader, and
IBM Plex Mono.

The sole call to action is the **newsletter**. A public repository link is intentionally
deferred (shown as a non-clickable "Repo — coming soon" affordance).

## Stack

- [Next.js 16](https://nextjs.org) (App Router) · React 19 · TypeScript
- Tailwind CSS v4
- [shadcn/ui](https://ui.shadcn.com) (Base UI primitives) — Input, Accordion, Badge
- Fonts via `next/font/google` (self-hosted at build)
- Dependency-free syntax highlighter for the `.aim` code samples (`src/lib/highlight.tsx`)

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run lint
```

## Newsletter signup

The form posts to `POST /api/subscribe`
([`src/app/api/subscribe/route.ts`](src/app/api/subscribe/route.ts)), which validates
the address and forwards it to **Buttondown**. An optional "keep me posted on the
Tndm editor" checkbox rides along and becomes an `editor-interest` tag on the
subscriber, so editor demand stays measurable.

- **Production:** set `BUTTONDOWN_API_KEY` (Vercel env var; key from
  <https://buttondown.com/settings/api>). The route **fails loudly** if the key is
  missing in production — the filesystem there is ephemeral, so a silent fallback
  would drop addresses.
- **Local dev:** with no key set, signups append to `data/subscribers.json`
  (git-ignored) so the form works out of the box. Duplicates are a no-op; invalid
  addresses return `422`.

## Structure

```
src/
  app/
    layout.tsx              # fonts, metadata, viewport
    page.tsx                # composes the sections + JSON-LD
    globals.css             # paper palette + design tokens (Tailwind v4 @theme)
    api/subscribe/route.ts  # newsletter capture (stub, provider-swappable)
  components/
    aim/                    # design primitives (CodePlate, LeafCard, RedlineDemo, InkStamp, ...)
    landing/                # page sections (Hero, Manifesto, ThreeLanes, Anatomy, ...)
    ui/                     # shadcn/ui components
  lib/
    snippets.ts             # the real .aim code samples shown on the page
    highlight.tsx           # tiny markup/json/shell highlighter for the inked-plate code
```

## Deploying

Standard Next.js app — deploy to Vercel (or any Node host) as-is. When swapping the
newsletter to a hosted provider, the local `data/` store is no longer used.
