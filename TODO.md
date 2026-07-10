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
- [ ] **Publish the draft spec publicly** (replaces the subscriber-gated spec; the
  repo seals/links could then point at the spec specifically rather than the repo root).
- [ ] **Status / roadmap strip** ("Now: v0.1 spec · Next: SDK + MCP server · Later:
  editor") so present-tense feature claims are anchored to a visible timeline.
- [ ] **Editor landing page** (separate site; the newsletter checkbox already
  segments editor-interested subscribers via the Buttondown tag).
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
