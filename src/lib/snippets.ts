export const heroSourceSliver = `<aim-chunk id="a7f3c1e0-…">
  <p class="text-base leading-7">
    The parties agree to the terms
    set forth herein…
  </p>
  <aim-proposal id="prop-3b9d"
      author="claude" status="pending">
    <del>sixty (60) days</del>
    <ins>thirty (30) business days</ins>
  </aim-proposal>
</aim-chunk>`;

export type ProposalStatus = "pending" | "accepted" | "rejected";

export function threeLaneSourceFor(status: ProposalStatus) {
  const term =
    status === "accepted" ? "thirty (30) business days" : "sixty (60) days";
  return `<aim-chunk id="a7f3c1e0-9c2b-4f7e">
  <p class="text-base leading-7">
    The Vendor shall deliver the completed
    milestones within ${term} of
    the effective date.
  </p>

  <aim-proposal id="prop-3b9d"
      author="claude"
      at="2026-05-04T14:32:00Z"
      status="${status}">
    <del>sixty (60) days</del>
    <ins>thirty (30) business days</ins>
  </aim-proposal>
</aim-chunk>`;
}

export const anatomyFile = `<!doctype html>
<html>
<head>
  <script src="https://cdn.tndm.dev/aim.js"></script>
</head>
<body>

<aim-summary>
  Q3 vendor proposal: scope, timeline,
  and payment terms. 12 chunks, 2 slides.
</aim-summary>

<aim-toc>
  <a href="#a7f3c1e0">§2 Scope of Work</a>
  <a href="#b2e91d44">§3 Payment Terms</a>
</aim-toc>

<aim-chunk id="a7f3c1e0-9c2b-4f7e">
  <h2 class="text-2xl font-semibold">
    Scope of Work
  </h2>
  <p class="text-base leading-7">
    The Vendor shall deliver the completed
    milestones within sixty (60) days…
  </p>
</aim-chunk>

<aim-pagebreak/>

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

export const substrateAim = `<aim-chunk id="a7f3c1e0-…">
  <h2 class="text-2xl font-semibold">
    Scope of Work
  </h2>
  <p class="text-base leading-7">
    The Vendor shall deliver the
    completed milestones within
    sixty (60) days…
  </p>
</aim-chunk>`;

export const slideSource = `<aim-slide width="1920" height="1080"
    class="bg-[#fbf6ea]">

  <h1 class="absolute left-[8%] top-[18%]
      text-6xl font-semibold">
    Q3 in one page
  </h1>

  <p class="absolute left-[8%] top-[36%]
      text-2xl text-zinc-500">
    Revenue, retention, and the
    road to v0.1
  </p>

  <figure class="absolute right-[7%]
      top-[16%] h-[64%] w-[40%]">
    <!-- chart -->
  </figure>

</aim-slide>`;

export const mcpSource = `# install the local MCP server
$ uvx tndm-mcp

# or
$ pip install tndm

# then, from any MCP client:
> read_summary("report.aim")
> get_chunk("a7f3c1e0")
> propose_edit("a7f3c1e0",
    del="sixty (60) days",
    ins="thirty (30) business days")
> accept("prop-3b9d")`;
