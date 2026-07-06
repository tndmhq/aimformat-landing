import {
  Container,
  RunningHead,
  SectionHeader,
} from "@/components/aim/primitives";
import { CodePlate } from "@/components/aim/code-plate";
import { anatomyFile } from "@/lib/snippets";

const elements = [
  {
    term: "<aim-chunk id>",
    gloss: "A unit of content with a stable UUID that survives edits and full rewrites.",
    why: "So change-logs, comments, and cross-references stay pinned to the same passage even after the text is rewritten.",
  },
  {
    term: "<aim-proposal>",
    gloss: "A proposed change to a chunk: a deletion, an insertion, or both.",
    why: "This is lane II. It sits beside the accepted text and carries its own acceptance state.",
  },
  {
    term: "<aim-summary>",
    gloss: "An AI-readable summary of the whole file.",
    why: "An agent reads it first to decide where to work, instead of loading the entire document.",
  },
  {
    term: "<aim-toc>",
    gloss: "A table of contents for agent navigation.",
    why: "Jump to the right region of a 60-page proposal without spending the context window getting there.",
  },
  {
    term: "<aim-slide width height>",
    gloss: "A fixed-canvas slide with absolutely positioned children.",
    why: "Real layout. The same source exports deterministically to PPTX and PDF.",
  },
  {
    term: "<aim-pagebreak/>",
    gloss: "An explicit page boundary for paged export.",
    why: "Deterministic pagination when the file becomes PDF or DOCX.",
  },
];

const annotations = [
  ["<aim-summary>", "An agent reads this first to orient, instead of loading the whole file."],
  ["<aim-toc>", "Navigation for agents: jump to a region without spending the context window."],
  ['id="a7f3c1e0…"', "A stable UUID. It survives rewrites, so comments and proposals stay pinned to this passage."],
  ['class="text-2xl…"', "Plain Tailwind. The model already writes this fluently; it is also the rendered style."],
  ["<aim-pagebreak/>", "An explicit page boundary for deterministic PDF / DOCX export."],
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
          lede="An .aim file is valid HTML5. Open it in a browser and it renders; there is nothing to install to read one. The structure lives in a small set of custom elements, each one a plain tag a model already knows how to balance."
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
