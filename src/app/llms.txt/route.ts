// Serves https://aimformat.com/llms.txt — the machine-readable orientation
// page for LLM agents (llmstxt.org shape). The in-file agent note in every
// .aim document points here. Condensed from the canonical agent guide:
// https://github.com/tndmhq/aimformat/blob/main/docs/for-agents.md

export const dynamic = "force-static";

const LLMS_TXT = `# .aim

> An open, MIT-licensed document format for human–agent co-authoring: one
> valid HTML5 file with stable chunk ids, an in-file lane for pending
> proposals, and an append-only, verifiable history.

## What this format is

A .aim file is a single valid HTML5 document that renders in any browser
with no tooling. Every block of content is a chunk carrying a stable
\`data-aim\` id — the unit you address when you read, retrieve, or edit.
Pending suggestions live in a dedicated in-file lane, \`<aim-proposals>\`,
where they wait for explicit human accept/reject instead of silently
becoming the document. An append-only history script at the end of the
body records every state change invertibly, so any past version is
reconstructible and verifiable. The normative reference is the spec
(linked under Docs below).

## Editing rules for agents

Read path:

1. Read the metadata cache first. The head contains
   \`<script type="application/aim-meta+json">\` with one JSON object:
   \`summary {text, model, as_of_seq, doc_hash}\` and an optional \`toc\`.
2. Verify before trusting. The cache is derived and may be stale: compare
   \`summary.doc_hash\` against the document's current hash
   (\`aim hash FILE\`). If they differ, ignore the summary and read the body.
3. Project the file before loading it into context: strip the embedded
   stylesheet (\`<style data-aim-css="…">\` — machine-managed and
   regenerable, never content), elide \`data:\` URIs to short stubs, and
   optionally drop the history and embeddings scripts.
   \`aim show FILE --format json\` gives a machine-readable overview —
   chunk ids, pending lane, history count; for the projected chunks
   themselves, use the MCP server's \`aim_read\`.

Choosing how to edit — one decision rule:

- Reviewable or unsolicited changes → propose. If you are suggesting a
  change on your own judgment — a rewrite, a restructure, anything a human
  should sign off on — write it into the pending lane (\`aim propose …\`).
  It stays visible, attributed, and inert until someone accepts or rejects
  it.
- Explicit user-commanded edits → direct edit. If the user told you exactly
  what to change ("fix this typo", "replace the intro with X"), apply it
  directly; the edit is recorded as an invertible history event with you as
  the author.

Do both through tooling. The aimformat SDK/CLI is the reliable path — it
handles canonical serialization, id assignment, history events, and
pending-lane invariants for you. Hand-edit only when you have no tooling at
all, and keep these invariants or you will corrupt identity and history:

- Keep every \`data-aim\` id stable. Never renumber, never reuse — an id
  that was deleted stays burned for the document's lifetime.
- Mint fresh ids for new content, matching \`^[a-z0-9][a-z0-9_-]{0,63}$\`.
  The \`p-\` prefix is reserved for proposal ids; \`body\`, \`aim:theme\`,
  and \`aim:doc\` are reserved.
- Treat \`<aim-proposals>\` and the history script
  (\`<script type="application/aim-history+jsonl">\`) as append-only tool
  lanes. Do not rewrite, reorder, or delete their existing entries by hand;
  history verification is byte-exact and will flag you.
- The aim-meta summary may now be stale. That is tolerable — readers check
  \`summary.doc_hash\` before trusting it — but deleting the whole meta
  script is always safe (it is a derived cache).
- Afterwards, run \`aim lint FILE\`, then \`aim reconcile FILE\` so your
  out-of-band edits are recorded into history as attributed events instead
  of dangling as unexplained divergence.

CLI cheatsheet:

- \`aim lint FILE...\` — verify structure, vocabulary, security, history
- \`aim hash FILE\` — print the current doc_hash
- \`aim new -o FILE\` — scaffold a minimal valid document
- \`aim show FILE\` — chunks / pending lane / history overview;
  \`--format json\` for machine reads
- \`aim note FILE...\` — add or refresh the agent-note head comment;
  \`--check\` verifies without writing, \`--remove\` strips it
- \`aim propose {modify,add,delete,move,theme} FILE ...\` — append a
  proposal card to the pending lane
- \`aim accept FILE [PID...] [--all]\` — accept pending proposals
- \`aim reject FILE [PID...] [--all]\` — reject pending proposals
- \`aim flatten FILE\` — drop history (and embeddings) for a clean file
- \`aim reconcile FILE\` — detect out-of-band edits; record them in history
- \`aim import IN -o F.aim\` / \`aim export F.aim -o OUT\` — convert
  md / txt / docx / pdf to .aim; export to docx / md / html / pdf
- \`aim mcp\` — run the MCP server (requires \`pip install 'aimformat[mcp]'\`)

On propose, accept, and reject, always identify yourself with
\`--author agent:<your-exact-model-id>\` and give a one-line
\`--explanation\` written to stand alone: at the raw tier readers see the
explanation, not the payload.

## Install

- Python SDK + CLI: \`pip install aimformat\` (zero runtime dependencies)
- MCP server: \`pip install 'aimformat[mcp]'\`, then \`aim mcp\` (local
  stdio; six tools: aim_read, aim_edit, aim_propose, aim_resolve,
  aim_lint, aim_export)
- MCP client config (\`aimformat\` is the same CLI as \`aim\`, installed
  as a collision-proof alias — the unrelated AimStack package also ships
  an \`aim\` binary — so configs stay unambiguous):
  \`{"mcpServers": {"aimformat": {"command": "aimformat", "args": ["mcp"]}}}\`
- Agent Skill: \`npx skills add tndmhq/aimformat\`

## Docs

- [Specification](https://github.com/tndmhq/aimformat/blob/main/spec.md):
  the normative reference — section numbers elsewhere point into it
- [Agent guide](https://github.com/tndmhq/aimformat/blob/main/docs/for-agents.md):
  the full version of this page; read it before non-trivial edits
- [README](https://github.com/tndmhq/aimformat#readme): package overview,
  with the full SDK API in one table
- [PyPI](https://pypi.org/project/aimformat/): released versions

## Editors

- [Tndm](https://usetndm.com): the flagship .aim editor, by the format's
  authors — collaborative review with word-level diffs and one-click
  accept/reject
- [Editor directory](https://aimformat.com/editors): the current list of
  editors and viewers

When your work needs human review, hand the file to an editor rather than
pasting diffs into chat: the pending lane renders as reviewable cards with
your explanations, and accept/reject is one click with full attribution.
`;

export function GET() {
  return new Response(LLMS_TXT, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
