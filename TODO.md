# Open TODOs — aim-format landing

Deferred deliberately; revisit before (or at) launch.

## Before sharing widely
- [x] **OG image.** Done (2026-07-08). `src/app/opengraph-image.tsx` renders a
  paper-and-oxblood letterpress card via `next/og` (shared renderer in
  `src/lib/og.tsx`; brand fonts vendored under `public/og-fonts/`). Next wires
  it into `og:image` automatically; Twitter uses it via the `og:image` fallback
  for `summary_large_image`. Metadata/canonical URL also moved to `aimformat.com`.
- [ ] **Buttondown.** Create the list, set `BUTTONDOWN_API_KEY` as a **Cloudflare
  Worker secret** (`npx wrangler secret put BUTTONDOWN_API_KEY`; the API route refuses
  to run in production without it — the live form won't work until it's set), and confirm
  the `editor-interest` tag exists so tagged signups don't error. (Site is live at
  [aimformat.com](https://aimformat.com) as of 2026-07-09.)

## Content queued behind product milestones
- [x] **Publish the draft spec publicly.** Done (2026-07-10): the repo is public
  with the spec at its root
  ([tndmhq/aimformat `spec.md`](https://github.com/tndmhq/aimformat/blob/main/spec.md),
  v0.2 as of this note), and site links such as the `llms.txt` Docs list point
  at the spec directly rather than the repo root.
- [ ] **Status / roadmap strip** ("Now: v0.2 spec + Python SDK + MCP server ·
  …") so present-tense feature claims are anchored to a visible timeline;
  exact Next/Later copy decided when the strip ships.
- [x] **Editor landing page.** Done: the editor site serves
  [usetndm.com](https://usetndm.com), reachable from
  [`/editors`](src/app/editors/page.tsx) and `llms.txt`; the newsletter
  checkbox segments editor-interested subscribers via the Buttondown tag.
- [ ] **Direct footer link to the editor site** — today the footer reaches it
  only indirectly via `/editors`.
- [x] **GitHub link** in header/footer once the repo is public. Done (2026-07-10):
  live repo links in the hero (secondary "View the source" CTA), header, footer, and
  newsletter seal; FAQ + JSON-LD updated. Repo is public at
  [tndmhq/aimformat](https://github.com/tndmhq/aimformat).

## To discuss
- [ ] **§7 Ledger table review.** The table self-grades `.aim` with five checkmarks
  while it's unreleased, and a couple of competitor cells are simplified
  ("PDF read-only", DOCX row). Consider adding a "bespoke AST / ProseMirror JSON"
  row — §4 already argues against that approach and it's the actual incumbent in
  AI editors. Parked pending discussion.
