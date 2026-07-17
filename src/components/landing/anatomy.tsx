import {
  Container,
  RunningHead,
  SectionHeader,
} from "@/components/aim/primitives";
import { CodePlate } from "@/components/aim/code-plate";
import { anatomyFile } from "@/lib/snippets";

const elements = [
  {
    term: 'data-aim="id"',
    gloss: "A stable chunk id on a plain HTML element: the unit you address, cite, and edit.",
    why: "So proposals, history, and cross-references stay pinned to the same passage even after the text is rewritten.",
  },
  {
    term: "<aim-proposals>",
    gloss: "The pending lane: suggested changes as cards, each with author, action, and payload.",
    why: "This is lane II. Suggestions sit beside the accepted text: visible, attributed, and inert until decided.",
  },
  {
    term: "application/aim-meta+json",
    gloss: "A derived head cache: an AI-readable summary and TOC, stamped with the doc hash.",
    why: "An agent orients here first (and verifies the hash before trusting it) instead of loading the entire document.",
  },
  {
    term: "application/aim-history+jsonl",
    gloss: "An append-only record of every state change, written invertibly.",
    why: "Any past version is reconstructible, and every accept or reject stays attributed inside the file itself.",
  },
  {
    term: "<aim-slide>",
    gloss: "A fixed-canvas slide with absolutely positioned children.",
    why: "Real layout. The same source exports deterministically to PDF; PPTX is on the roadmap.",
  },
  {
    term: "<style data-aim-css>",
    gloss: "The embedded, machine-managed stylesheet for the Tailwind subset.",
    why: "The raw file renders styled in any browser: no viewer to ship, no build step, nothing external to load.",
  },
];

const annotations = [
  ["application/aim-meta+json", "An agent reads this first to orient (summary and TOC) instead of loading the whole file."],
  ['<style data-aim-css="0.2">', "The embedded stylesheet. Machine-managed, never content; the file renders with nothing installed."],
  ['data-aim="a7f3c1e0"', "A stable id. It survives rewrites, so proposals and history stay pinned to this passage."],
  ['class="text-2xl…"', "Plain Tailwind. The model already writes this fluently; it is also the rendered style."],
  ["<aim-proposals>", "Lane II. Pending suggestions wait here, visible and inert, for a human accept or reject."],
  ["application/aim-history+jsonl", "The append-only history: every change recorded invertibly, so past versions are reconstructible."],
];

export function Anatomy() {
  return (
    <section id="anatomy" className="relative scroll-mt-16">
      <RunningHead section="§3" folio="The Vocabulary" />
      <Container className="py-20 sm:py-24">
        <SectionHeader
          n="§3"
          eyebrow="§3 · The Vocabulary"
          title="Anatomy of an .aim file"
          lede="An .aim file is valid HTML5. Open it in a browser and it renders; there is nothing to install to read one. The structure lives in a small vocabulary of attributes and custom elements, each one plain markup a model already knows how to balance."
        />

        {/* type specimen of the custom elements */}
        <div className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2">
          {elements.map((el) => (
            <div key={el.term} className="border-t border-ink/15 pt-4">
              <code className="font-mono text-[0.95rem] font-medium text-oxblood">
                {el.term}
              </code>
              <p className="mt-1.5 font-body text-[1.05rem] italic leading-snug text-ink">
                {el.gloss}
              </p>
              <p className="mt-2 font-body text-[0.92rem] leading-snug text-ink-soft">
                {el.why}
              </p>
            </div>
          ))}
        </div>

        {/* the file, set as a plate, with margin annotations */}
        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-[1.45fr_1fr] lg:items-start">
          <CodePlate
            code={anatomyFile}
            filename="report.aim"
            label="Fig. 2"
          />
          <div className="lg:pt-2">
            <p className="label-mono mb-4 text-ink-soft">
              Fig. 2 · Read the margins
            </p>
            <ol className="space-y-3">
              {annotations.map(([target, note]) => (
                <li
                  key={target}
                  className="border-l border-oxblood/35 pl-3.5"
                >
                  <code className="font-mono text-[0.78rem] text-oxblood">
                    {target}
                  </code>
                  <p className="mt-1 font-body text-[0.95rem] italic leading-snug text-ink-soft">
                    {note}
                  </p>
                </li>
              ))}
            </ol>
            <p className="mt-5 font-body text-[0.95rem] leading-relaxed text-ink-soft">
              Optional per-chunk embeddings ride alongside the text, each stored
              with a text-hash and a model-id, so staleness is detectable the
              moment you change embedding models.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
