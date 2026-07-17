// Illustrative source slivers, kept faithful to the real .aim vocabulary
// (see aimformat's examples/proposal.aim and examples/deck.aim): data-aim /
// data-aim-container ids, the <aim-proposals> pending lane with p- ids and
// <template> payloads, application/aim-meta+json, application/aim-history
// +jsonl, and <style data-aim-css>. Truncated with … where illustrative.

export const heroSourceSliver = `<p data-aim="a7f3c1e0" class="text-base
  leading-relaxed">The parties agree to the
  terms set forth herein…</p>

<aim-proposals>
<aim-proposal id="p-3b9d"
    data-action="modify" data-for="a7f3c1e0"
    data-author="agent"
    data-author-model="claude-opus-4-8"
    data-explanation="Thirty (30) business
      days, not sixty.">
  <template>…</template>
</aim-proposal>
</aim-proposals>`;

export type ProposalStatus = "pending" | "accepted" | "rejected";

export function threeLaneSourceFor(status: ProposalStatus) {
  const term =
    status === "accepted" ? "thirty (30) business days" : "sixty (60) days";
  const chunk = `<p data-aim="a7f3c1e0" class="text-base
  leading-relaxed">The Vendor shall deliver the
  completed milestones within
  ${term} of
  the effective date.</p>`;

  if (status === "pending") {
    return `${chunk}

<aim-proposals>
<aim-proposal id="p-3b9d"
    data-action="modify" data-for="a7f3c1e0"
    data-author="agent"
    data-author-model="claude-opus-4-8"
    data-at="2026-05-04T14:32:00Z"
    data-explanation="Thirty days, not sixty.">
  <template><p data-aim="a7f3c1e0"
    class="text-base leading-relaxed">…within
    thirty (30) business days of…</p>
  </template>
</aim-proposal>
</aim-proposals>`;
  }

  return `${chunk}

<script type="application/aim-history+jsonl">
{"decided_by":{"id":"ada","type":"human"},
 "decision":"${status}","kind":"resolution",
 "proposal":"p-3b9d",
 "proposed_by":{"model":"claude-opus-4-8",
   "type":"agent"},
 "seq":7,"t":"2026-05-04T14:36:00Z",
 "target":"a7f3c1e0", …}
</script>`;
}

export const anatomyFile = `<!doctype html>
<html data-aim-version="0.2" lang="en">
<head>
<meta charset="utf-8">
<title>Q3 Vendor Proposal — Acme GmbH</title>
<script type="application/aim-meta+json">
{"summary":{"text":"Q3 vendor proposal:
   scope, timeline, and payment terms.",
  "model":"claude-opus-4-8",
  "as_of_seq":9,"doc_hash":"sha256:b5d4…"},
 "toc":[{"title":"Scope of Work","level":2,
   "chunks":["8b1f","a7f3c1e0"]}, …]}
</script>
<style data-aim-css="0.2">
  /* machine-managed Tailwind subset */
</style>
</head>
<body>

<h2 data-aim="8b1f" class="text-2xl
    font-semibold">Scope of Work</h2>
<p data-aim="a7f3c1e0" class="text-base
  leading-relaxed">The Vendor shall deliver the
  completed milestones within sixty (60)
  days…</p>

<aim-proposals>
<aim-proposal id="p-3b9d" …>…</aim-proposal>
</aim-proposals>

<script type="application/aim-history+jsonl">
{"kind":"direct_edit","seq":1, …}
{"kind":"resolution","decision":"accepted", …}
</script>

</body>
</html>`;

export const substrateDocx = `<w:p>
  <w:pPr>
    <w:pStyle w:val="Heading2"/>
    <w:spacing w:before="240"
        w:after="120"/>
  </w:pPr>
  <w:r>
    <w:rPr><w:b/><w:sz w:val="32"/></w:rPr>
    <w:t>Scope of Work</w:t>
  </w:r>
</w:p>
<!-- …inside a zip, beside 11 more
     XML parts and a rels manifest -->`;

export const substrateAst = `{
  "type": "heading",
  "attrs": { "level": 2 },
  "content": [
    {
      "type": "text",
      "marks": [{ "type": "bold" }],
      "text": "Scope of Work"
    }
  ]
}`;

export const substrateAim = `<h2 data-aim="8b1f"
    class="text-2xl font-semibold">
  Scope of Work</h2>

<p data-aim="a7f3c1e0"
  class="text-base leading-relaxed">
  The Vendor shall deliver the
  completed milestones within
  sixty (60) days…</p>`;

export const slideSource = `<aim-slide data-aim-container="s1"
    style="width:960px; height:540px">

  <h2 data-aim="t1" class="text-6xl
      font-semibold" style="left:75px;
      top:95px; width:400px">
    Q3 in one page</h2>

  <p data-aim="st1" class="text-2xl
      text-gray-500" style="left:75px;
      top:195px; width:380px">Revenue,
    retention, and the road to v0.1</p>

  <figure data-aim="ch" style="left:510px;
      top:85px; width:385px; height:345px">
    <svg role="img" aria-label="Q3 revenue
      chart" width="385" height="345">…</svg>
  </figure>

</aim-slide>`;

export const quickstartSource = `# the open .aim format: MIT-licensed, on PyPI.
# a typed Python SDK + the aim CLI, zero runtime deps:
$ pip install aimformat

# add the local MCP server so agents can propose and
# accept edits over stdio; nothing hosted, nothing leaves:
$ pip install 'aimformat[mcp]'
$ aim mcp

# or teach Claude the conventions in one line:
$ npx skills add tndmhq/aimformat`;

export const mcpSource = `# install the local MCP server
$ pip install 'aimformat[mcp]'

# wire it into any MCP client; aimformat is
# the aim CLI's collision-proof alias
{ "mcpServers": { "aimformat":
  { "command": "aimformat", "args": ["mcp"] } } }

# then, from the client:
> aim_read("report.aim")
> aim_propose("report.aim", action="modify",
    target="a7f3c1e0", html="…",
    explanation="Thirty days, not sixty.")
> aim_resolve("report.aim", "accept", ["p-3b9d"])`;
