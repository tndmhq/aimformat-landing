import {
  Container,
  RunningHead,
  SectionHeader,
} from "@/components/aim/primitives";
import { ThreeLaneFigure } from "./three-lane-figure";

export function ThreeLanes() {
  return (
    <section id="three-lanes" className="relative scroll-mt-16">
      <RunningHead section="§2" folio="The Differentiator" />
      <Container className="py-20 sm:py-24">
        <SectionHeader
          n="§2"
          eyebrow="§2 · The Differentiator"
          title="Three lanes on one page"
          lede="Track-changes is usually a feature of an editor. In .aim it is a property of the file: one document carries the accepted text, the changes proposed against it, and the acceptance state of each proposal."
        />

        <div className="mt-12 grid grid-cols-1 items-start gap-10 lg:grid-cols-[1fr_0.92fr]">
          {/* prose + lane definitions */}
          <div>
            <p className="measure font-body text-[1.1rem] leading-[1.74] text-ink text-pretty">
              The agent does not rewrite your file and leave you to guess what
              moved. It reads the current document, writes a proposal beside the
              chunk it wants to change, and records that proposal as pending
              until a human, or another agent, accepts or rejects it. Because
              the proposal lives in the file, the history travels with the
              document. Open it next year, in any tool, and the record of who
              changed what, and whether it was accepted, is still there. That
              record is also what the next agent starts from: it opens the
              file and finds each proposal&rsquo;s author and model, the
              one-line explanation it was filed with, and the suggestions a
              person turned down, so it continues the collaboration instead
              of starting it over.
            </p>

            <dl className="mt-8 space-y-3">
              {[
                {
                  k: "Lane I · Accepted",
                  v: "the document as it stands. Clean, renderable, exportable.",
                },
                {
                  k: "Lane II · Proposed",
                  v: "changes written beside the chunk they touch. Deletions struck, insertions underlined.",
                },
                {
                  k: "Lane III · State",
                  v: "per-proposal acceptance (pending, accepted, or rejected) with attribution and time.",
                },
              ].map((row) => (
                <div
                  key={row.k}
                  className="grid grid-cols-[auto_1fr] gap-x-4 border-t border-ink/15 pt-3"
                >
                  <dt className="label-mono whitespace-nowrap text-accent">
                    {row.k}
                  </dt>
                  <dd className="font-body text-[0.98rem] leading-snug text-ink-soft">
                    {row.v}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* the showpiece figure — live: accept or reject the proposal */}
          <ThreeLaneFigure />
        </div>
      </Container>
    </section>
  );
}
