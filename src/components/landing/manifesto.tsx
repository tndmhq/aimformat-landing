import { Container, RunningHead } from "@/components/aim/primitives";

/* Footnote markers are apparatus, not ink: they sit inside sentences, so per
   the one-ink-per-text-run rule they stay a neutral gray, never a press ink. */
function Sup({ children }: { children: React.ReactNode }) {
  return (
    <sup className="ml-0.5 align-super font-body text-[0.62em] text-ink-faint [font-variant-numeric:lining-nums]">
      {children}
    </sup>
  );
}

/* A footnote in the list under the text: the marker set full size in its own
   column (a superscript at this size would fall under the 11px floor). */
function Footnote({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <p className="flex items-baseline gap-2 font-body text-[0.92rem] leading-[1.5] text-ink-soft">
      <span className="label-note w-3 shrink-0 text-ink-faint">{n}</span>
      <span>{children}</span>
    </p>
  );
}

export function Manifesto({ specVersion }: { specVersion: string }) {
  return (
    <section id="format" className="relative scroll-mt-16">
      <RunningHead title="The thesis" specVersion={specVersion} />
      <Container className="py-20 sm:py-24">
        <p className="label-serif mb-6 text-center text-rubric">The thesis</p>
        {/* Chapter 1 of the home page's numbered sequence, centered: the bare
            numeral sits on the title's rule like SectionHeader's. On a narrow
            screen the title wraps, so the numeral stands centered above it
            instead of pinned to the left edge. */}
        <div className="mx-auto mb-10 flex max-w-2xl flex-col items-center gap-1 border-b border-accent/30 pb-4 sm:flex-row sm:items-baseline sm:justify-center sm:gap-4">
          <span
            className="font-display text-[1.4rem] font-medium leading-none text-rubric [font-variant-numeric:lining-nums]"
            aria-hidden
          >
            1
          </span>
          <h2 className="text-center font-display text-[clamp(1.8rem,3.2vw,2.4rem)] font-medium leading-[1.15] tracking-[-0.01em] text-accent text-balance">
            The format that does not exist yet
          </h2>
        </div>

        <div className="mx-auto measure">
          <p className="dropcap font-body text-[1.28rem] leading-[1.72] text-ink text-pretty">
            For <span className="small-caps tracking-[0.03em]">forty years</span>{" "}
            our documents have been written for printers and readers, never for
            the machines now asked to edit them. PDF is binary and read-only.
            <Sup>1</Sup> DOCX and PPTX are zipped XML that no model reasons about
            reliably.<Sup>2</Sup> Markdown is honest and open, but it is text
            only: no layout, no slides, no way to propose a change and have it
            accepted.<Sup>3</Sup> So when an AI agent edits your document today,
            it does so blind, rewriting whole files and hoping the diff
            survives.
          </p>
          <p className="mt-5 font-body text-[1.28rem] leading-[1.72] text-ink text-pretty">
            .aim closes that gap. It is one
            open file a person and an agent can hold at the same time, where
            every change is proposed, attributed, and tracked, and where the
            styled artifact and its source are the same object: not a
            representation you transform, but the page itself.
          </p>

          {/* the builder's bill — the toll every AI-document system pays today */}
          <div className="mt-12 border border-ink/20 bg-surface/60 p-6 sm:p-8">
            <p className="label-serif text-rubric">
              The builder&rsquo;s bill
            </p>
            <p className="mt-3 font-body text-[1.1rem] leading-[1.65] text-ink text-pretty">
              If you are building AI for documents (a legal editor, a proposal
              tool, an agent that writes decks), you are paying this bill right
              now, in-house, like everyone else:
            </p>
            <ol className="mt-5 space-y-2.5">
              {[
                "Convert the file into text the model can read, losing formatting on the way in.",
                "Chunk it with heuristics and visual cues, so the model only consumes the relevant parts.",
                "Embed and summarize the chunks, so it can be searched and ranked.",
                "Reinvent propose-and-accept, change history, and attribution against a format that has none.",
                "Map everything back on export, losing formatting again on the way out.",
              ].map((step, i) => (
                <li
                  key={i}
                  className="flex items-baseline gap-3.5 border-t border-ink/15 pt-2.5 font-body text-[1.02rem] leading-snug text-ink"
                >
                  <span className="label-note w-4 shrink-0 text-[0.88rem] text-accent">
                    {i + 1}.
                  </span>
                  {step}
                </li>
              ))}
            </ol>
            <p className="mt-6 font-body text-[1.1rem] leading-[1.65] text-ink text-pretty">
              None of it is your product, none of it is reusable, and none of
              it interoperates with anyone else&rsquo;s stack.{" "}
              .aim pays the whole bill in
              the file, once: chunks, identity, summaries, embeddings, and
              propose-and-accept are properties of the format, so your system
              never rebuilds them.
            </p>
          </div>

          <div className="mt-10 space-y-2 border-t border-ink/20 pt-5">
            <Footnote n={1}>
              PDF: binary, read-only, hostile to structured edits.
            </Footnote>
            <Footnote n={2}>
              DOCX and PPTX: zipped XML schemas no language model edits
              reliably.
            </Footnote>
            <Footnote n={3}>
              Markdown: text only, no slides, no positioned layout, no
              propose-and-accept.
            </Footnote>
          </div>
        </div>
      </Container>
    </section>
  );
}
