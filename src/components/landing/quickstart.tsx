import {
  Container,
  RepoLink,
  RunningHead,
  SectionHeader,
} from "@/components/aim/primitives";
import { CodePlate } from "@/components/aim/code-plate";
import { quickstartSource } from "@/lib/snippets";

// Resource links point past the marketing page into the real surfaces. Bare
// "#…" is fine here: the quickstart only ever renders on the home page.
const resources = [
  {
    label: "The full on-ramps",
    href: "#agents",
    note: "MCP tools, the SDK, and the clients it works with — §5.",
  },
  {
    label: "llms.txt",
    href: "/llms.txt",
    note: "The machine-readable orientation an agent reads first.",
  },
  {
    label: "Editors & viewers",
    href: "/editors",
    note: "Where .aim files open — from the browser up.",
  },
];

export function Quickstart() {
  return (
    <section id="quickstart" className="relative scroll-mt-16">
      <RunningHead section="Set & Ready" folio="Quickstart" />
      <Container className="py-20 sm:py-24">
        <SectionHeader
          eyebrow="Off the shelf"
          title={
            <>
              It&rsquo;s open. Install it in{" "}
              <span className="text-oxblood">one line</span>.
            </>
          }
          lede={
            <>
              The <span className="text-oxblood">.</span>aim format is
              MIT-licensed and published to PyPI &mdash; a typed Python SDK and
              the <code className="rounded-[2px] bg-ink/[0.06] px-1 py-0.5 font-mono text-[0.85em] text-ink">aim</code>{" "}
              CLI, zero runtime dependencies. Nothing hosted, no account,
              nothing to wait for. The press notices below are for the v0.1 spec
              and the launch.
            </>
          }
        />

        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <p className="measure font-body text-[1.1rem] leading-[1.74] text-ink/85 text-pretty">
              A plain <span className="text-oxblood">.</span>aim file is valid
              HTML, so any model can read one with no tooling at all. The
              package adds the <span className="text-ink">aim</span> CLI, a
              dependency-free SDK, and a local MCP server for chunk-level
              propose and accept.
            </p>

            <ul className="mt-8 space-y-4">
              {resources.map((r) => (
                <li key={r.label} className="border-t border-ink/15 pt-3">
                  <a
                    href={r.href}
                    className="font-display text-[1.05rem] font-medium text-ink underline-offset-4 transition-colors hover:text-oxblood hover:underline"
                  >
                    {r.label}
                    <span aria-hidden> &rarr;</span>
                  </a>
                  <p className="mt-1 font-body text-[0.92rem] leading-snug text-ink-soft">
                    {r.note}
                  </p>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <RepoLink variant="button">View the source</RepoLink>
            </div>
          </div>

          <div className="lg:sticky lg:top-20">
            <CodePlate
              code={quickstartSource}
              lang="shell"
              filename="your terminal"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
