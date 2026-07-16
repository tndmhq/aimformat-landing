# .aim format landing page

The landing page for [`.aim`](https://github.com/tndmhq/aimformat), the open
AI-native document format (by Tndm). This is the *format* site; the editor site
lives separately.

Design direction: "The Standing Type", a fine-press manuscript treatment where the
page itself is the product demo. The hero is a rendered `.aim` leaf marked up in
red/green editor's ink (the three-lane track-changes primitive) with a half-peeled
"view source" plate beneath. One disciplined oxblood accent; `redline`/`greenline` are
reserved exclusively for the track-changes metaphor. Set in Fraunces, Newsreader, and
IBM Plex Mono.

The primary call to action is the newsletter. The public
[repository](https://github.com/tndmhq/aimformat) is linked as a secondary, deliberately
less-prominent CTA (the hero "View the source" button, plus quiet links in the header and
footer). Repo links are centralized in `RepoLink`/`REPO_URL` in
[`src/components/aim/primitives.tsx`](src/components/aim/primitives.tsx).

## Stack

- [Next.js 16](https://nextjs.org) (App Router) · React 19 · TypeScript
- Tailwind CSS v4
- [shadcn/ui](https://ui.shadcn.com) (Base UI primitives): Input, Accordion, Badge
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
the address and forwards it to Buttondown. An optional "keep me posted on the
Tndm editor" checkbox rides along and becomes an `editor-interest` tag on the
subscriber, so editor demand stays measurable.

- Production: set `BUTTONDOWN_API_KEY` as a Cloudflare Worker secret (see
  [Deployment](#deployment); key from <https://buttondown.com/settings/api>). The route
  fails loudly if the key is missing in production: the filesystem there is ephemeral,
  so a silent fallback would drop addresses.
- Local dev: with no key set, signups append to `data/subscribers.json`
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

## Deployment

Hosted on Cloudflare Workers via the [`@opennextjs/cloudflare`](https://opennext.js.org/cloudflare)
adapter. (Next.js 16 with a Node-runtime API route isn't a fit for static export or the
older Pages/`next-on-pages` edge path; OpenNext on Workers is the supported route.) Live at
[aimformat.com](https://aimformat.com): Worker `aimformat-landing`, Cloudflare account
`luca.campanella1@gmail.com`.

How it deploys: push to `main`. This repo is connected to Cloudflare Workers Builds,
so every push to `main` auto-builds and deploys (it runs `npx opennextjs-cloudflare build`,
then `npx wrangler deploy`; ~1–2 min to go live). That's the normal path: merge to `main`
and the live site follows, with no manual step. The `aimformat.com` custom domain is
declared as a route in [`wrangler.jsonc`](wrangler.jsonc), so it stays attached on every
build.

Manual deploy (fallback), for an out-of-band publish (CI down, or before a build
finishes):

```bash
npm run deploy     # opennextjs-cloudflare build + wrangler deploy; live in ~30–60s
npm run preview    # optional: run the Workers build locally under workerd
```

One-time for manual deploys: Node 20+, `npm install`, and `npx wrangler login` (browser OAuth;
token stored in `~/.wrangler`, auto-refreshes). Workers Builds wiring, if it ever needs redoing:
dashboard → Workers & Pages → `aimformat-landing` → Settings → Build → Connect to Git.

The newsletter secret is set once and persists across deploys:

```bash
npx wrangler secret put BUTTONDOWN_API_KEY   # paste the key when prompted; from buttondown.com/settings/api
```

`/api/subscribe` fails loudly (500) in production without it, by design (the Workers
filesystem is ephemeral, so a silent fallback would drop signups).

Config files:

- [`wrangler.jsonc`](wrangler.jsonc): Worker name, `nodejs_compat`, static-asset binding, `aimformat.com` route.
- [`open-next.config.ts`](open-next.config.ts): OpenNext adapter config (minimal; no incremental cache for this near-static site).
- `next.config.ts`: calls `initOpenNextCloudflareForDev()` so Cloudflare bindings work under `next dev`.
