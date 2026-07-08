# Open TODOs — aim-format landing

Deferred deliberately; revisit before (or at) launch.

## Before sharing widely
- [x] **OG image.** Done (2026-07-08). `src/app/opengraph-image.tsx` renders a
  paper-and-oxblood letterpress card via `next/og` (shared renderer in
  `src/lib/og.tsx`; brand fonts vendored under `public/og-fonts/`). Next wires
  it into `og:image` automatically; Twitter uses it via the `og:image` fallback
  for `summary_large_image`. Metadata/canonical URL also moved to `aimformat.com`.
- [ ] **Buttondown.** Create the list, set `BUTTONDOWN_API_KEY` in Vercel (the API
  route now refuses to run in production without it), and confirm the
  `editor-interest` tag exists so tagged signups don't error.

## Content queued behind product milestones
- [ ] **Publish the draft spec publicly** (replaces the subscriber-gated spec; the
  "Repo — coming soon" seals should then link to it or to the repo).
- [ ] **Status / roadmap strip** ("Now: v0.1 spec · Next: SDK + MCP server · Later:
  editor") so present-tense feature claims are anchored to a visible timeline.
- [ ] **Editor landing page** (separate site; the newsletter checkbox already
  segments editor-interested subscribers via the Buttondown tag).
- [ ] **GitHub link** in header/footer once the repo is public.

## To discuss
- [ ] **§7 Ledger table review.** The table self-grades `.aim` with five checkmarks
  while it's unreleased, and a couple of competitor cells are simplified
  ("PDF read-only", DOCX row). Consider adding a "bespoke AST / ProseMirror JSON"
  row — §4 already argues against that approach and it's the actual incumbent in
  AI editors. Parked pending discussion.
