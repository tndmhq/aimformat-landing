import {
  Container,
  RunningHead,
  SectionHeader,
} from "@/components/aim/primitives";
import { CodePlate } from "@/components/aim/code-plate";
import { LeafCard } from "@/components/aim/leaf";
import { substrateDocx, substrateAst, substrateAim } from "@/lib/snippets";

const scriptLoop = [
  "Ask for code that writes the file, run it, render it.",
  "The model never sees the output; it guesses from the code.",
  "Each tweak edits the script, then regenerates everything.",
  "Nothing has a stable id, so review means rereading it all.",
];

const aimLoop = [
  "The file is the artifact; the model edits it directly.",
  "A tweak is one proposal against one chunk id.",
  "Accept or reject it in place; nothing regenerates.",
];

const plates = [
  {
    code: substrateDocx,
    lang: "markup" as const,
    filename: "word/document.xml",
    verdict: "DOCX. Verbose, namespaced, zipped. The model guesses.",
  },
  {
    code: substrateAst,
    lang: "json" as const,
    filename: "document.json",
    verdict: "Bespoke AST. Compact, but invented. No model has seen it.",
  },
  {
    code: substrateAim,
    lang: "markup" as const,
    filename: "report.aim",
    verdict: ".aim. HTML the model already writes. It just edits.",
  },
];

export function Substrate() {
  return (
    <section id="substrate" className="relative scroll-mt-16">
      <RunningHead section="§4" folio="The Substrate" />
      <Container className="py-20 sm:py-24">
        <SectionHeader
          n="§4"
          eyebrow="§4 · The Substrate"
          title="Why HTML5 and a Tailwind subset"
          lede="The substrate is the whole bet, so we will defend it plainly. Frontier models are massively over-trained on HTML and Tailwind. They read it and write it natively and accurately, far better than they handle DOCX XML or a bespoke AST they have never seen."
        />

        <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_18rem]">
          <p className="measure font-body text-[1.1rem] leading-[1.74] text-ink text-pretty">
            That fluency is the difference between an agent that edits your
            document and one that corrupts it. The same choice pays a second
            time at render: an .aim file is the styled artifact, so it displays
            in any browser for free, with no viewer to ship and no vendor to
            trust.
          </p>
          <p className="border-l border-accent/35 pl-4 font-body text-[0.95rem] leading-snug text-ink-soft">
            We know the tradeoff. HTML with utility classes is more verbose than
            a packed binary. We pay those tokens on purpose, and buy
            model-familiarity and free, deterministic rendering with them.
          </p>
        </div>

        {/* the same clause, three substrates */}
        <p className="label-mono mt-14 mb-5 text-ink-soft">
          Fig. 3 · The same heading, three ways. One a model can actually edit.
        </p>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {plates.map((p) => (
            <figure key={p.filename}>
              <CodePlate
                code={p.code}
                lang={p.lang}
                filename={p.filename}
                copy={false}
                bodyClassName="text-[0.72rem] min-h-[12rem]"
              />
              <figcaption className="mt-3 font-body text-[0.92rem] leading-snug text-ink-soft">
                {p.verdict}
              </figcaption>
            </figure>
          ))}
        </div>

        {/* the loop it replaces: script-mediated generation */}
        <div className="mt-14 border border-ink/20 bg-surface/60 p-6 sm:p-8">
          <p className="label-serif text-rubric">The loop it replaces</p>
          <p className="mt-3 font-body text-[1.1rem] leading-[1.65] text-ink text-pretty">
            Ask an agent for a formatted document today and what you usually
            get is a script: python-docx or python-pptx code that regenerates
            the file on every run. The document is a side effect of a program
            the model keeps rewriting.
          </p>
          <div className="mt-6 grid gap-x-10 gap-y-6 sm:grid-cols-2">
            <div>
              <p className="label-mono mb-3 text-ink-soft">
                One tweak, by script
              </p>
              <ol className="space-y-2.5">
                {scriptLoop.map((step, i) => (
                  <li
                    key={i}
                    className="flex gap-3.5 border-t border-ink/15 pt-2.5 font-body text-[0.98rem] leading-snug text-ink"
                  >
                    <span className="label-mono mt-0.5 shrink-0 text-accent">
                      {i + 1}.
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
            <div>
              <p className="label-mono mb-3 text-ink-soft">
                The same tweak, in .aim
              </p>
              <ol className="space-y-2.5">
                {aimLoop.map((step, i) => (
                  <li
                    key={i}
                    className="flex gap-3.5 border-t border-ink/15 pt-2.5 font-body text-[0.98rem] leading-snug text-ink"
                  >
                    <span className="label-mono mt-0.5 shrink-0 text-accent">
                      {i + 1}.
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <p className="mt-6 font-body text-[1.1rem] leading-[1.65] text-ink text-pretty">
            This is where the verbosity pays itself back. A script is the
            document wrapped in API calls, paid for again on every round; a
            proposal is the size of the change. An edit costs in proportion
            to what changed, not to the document it changed in.
          </p>
        </div>

        {/* source is the artifact */}
        <div className="mt-14">
          <p className="label-mono mb-5 text-ink-soft">
            It is the styled artifact, not a representation you transform
          </p>
          <div className="grid grid-cols-1 items-center gap-5 md:grid-cols-[1fr_auto_1fr]">
            <CodePlate code={substrateAim} filename="report.aim" copy={false} />
            <div
              className="flex items-center justify-center font-display text-3xl text-accent md:flex-col"
              aria-label="renders as"
            >
              ≡
            </div>
            <LeafCard innerClassName="min-h-[9rem]">
              <p className="label-mono mb-3 text-ink-faint">rendered, in any browser</p>
              <h2 className="font-body text-2xl font-semibold text-ink">
                Scope of Work
              </h2>
              <p className="mt-2 font-body text-[0.95rem] leading-relaxed text-ink/90">
                The Vendor shall deliver the completed milestones within sixty
                (60) days of the effective date.
              </p>
            </LeafCard>
          </div>
        </div>
      </Container>
    </section>
  );
}
