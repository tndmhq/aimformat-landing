import {
  Container,
  RunningHead,
  SectionHeader,
} from "@/components/aim/primitives";
import { CodePlate } from "@/components/aim/code-plate";
import { mcpSource } from "@/lib/snippets";

const onRamps = [
  {
    label: "Plain file",
    detail:
      "Valid HTML5. Any model reads it directly, no tooling; the file itself points agents at aimformat.com/llms.txt.",
  },
  {
    label: "MCP server",
    detail:
      "Local stdio: pip install 'aimformat[mcp]', then aim mcp. Six tools, from projected read to export.",
  },
  {
    label: "Claude Skill",
    detail:
      "npx skills add tndmhq/aimformat: teaches the conventions and wires up the CLI verbs.",
  },
  {
    label: "Python SDK",
    detail:
      "pip install aimformat. Zero runtime dependencies; typed load, propose, accept, save.",
  },
];

const capabilities = [
  "Propose chunk-level edits against a stable id",
  "Accept or reject a proposal, with attribution",
  "A projected, token-cheap read: summary, TOC, chunks, pending lane",
  "Read the summary before touching the body",
];

const clients = ["Claude Code", "Claude Desktop", "Cursor", "Cline", "Zed"];

export function Agents() {
  return (
    <section id="agents" className="relative scroll-mt-16">
      <RunningHead section="§5" folio="The On-Ramps" />
      <Container className="py-20 sm:py-24">
        <SectionHeader
          n="§5"
          eyebrow="§5 · The On-Ramps"
          title="Agent-native from day one"
          lede="Because a plain .aim file is valid HTML, any model can already read one with no tooling at all. For chunk-level propose and accept, and for navigation without loading the whole file, there is a local MCP server."
        />

        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1fr] lg:items-start">
          <div>
            <p className="measure font-body text-[1.1rem] leading-[1.74] text-ink/85 text-pretty">
              It runs over stdio, so nothing is hosted and nothing leaves your
              machine. Install it once and Claude Code, Claude Desktop, Cursor,
              Cline, and Zed can all work the same file. A Claude Skill bundles
              the CLI verbs with authoring guidance, and a dependency-free
              Python SDK gives you typed load, propose, and accept calls over
              the raw file.
            </p>

            <ul className="mt-8 space-y-2.5">
              {capabilities.map((c) => (
                <li
                  key={c}
                  className="flex gap-3 font-body text-[1rem] leading-snug text-ink/85"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-oxblood/70" />
                  {c}
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <p className="label-mono mb-3 text-ink-soft">
                Works with the clients you already run
              </p>
              <div className="meta-run flex flex-wrap items-baseline gap-x-2.5 gap-y-1.5">
                {clients.map((c) => (
                  <span key={c} className="label-mono text-ink-soft">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:sticky lg:top-20">
            <CodePlate
              code={mcpSource}
              lang="shell"
              filename="install + propose/accept"
            />
            <div className="mt-8 grid gap-x-8 gap-y-5 sm:grid-cols-2">
              {onRamps.map((o) => (
                <div key={o.label} className="border-t border-ink/15 pt-3">
                  <p className="font-display text-[1.05rem] font-medium text-ink">
                    {o.label}
                  </p>
                  <p className="mt-1 font-body text-[0.92rem] leading-snug text-ink-soft">
                    {o.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
