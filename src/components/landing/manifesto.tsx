import { Container, RunningHead } from "@/components/aim/primitives";

function Sup({ children }: { children: React.ReactNode }) {
  return (
    <sup className="ml-0.5 align-super font-mono text-[0.58em] text-oxblood">
      {children}
    </sup>
  );
}

export function Manifesto() {
  return (
    <section id="format" className="relative scroll-mt-16">
      <RunningHead section="§1" folio="The Thesis" />
      <Container className="py-20 sm:py-24">
        <p className="label-mono mb-6 text-center text-oxblood">
          §1 · The Thesis
        </p>
        <h2 className="mx-auto mb-10 max-w-2xl text-center font-display text-[clamp(1.8rem,3.2vw,2.4rem)] font-medium leading-[1.15] tracking-[-0.01em] text-ink text-balance">
          The format that does not exist yet
        </h2>

        <div className="mx-auto measure">
          <p className="dropcap font-body text-[1.28rem] leading-[1.72] text-ink text-pretty">
            For <span className="small-caps tracking-[0.04em]">forty years</span>{" "}
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
            <span className="text-oxblood">.</span>aim closes that gap. It is one
            open file a person and an agent can hold at the same time, where
            every change is proposed, attributed, and tracked, and where the
            styled artifact and its source are the same object. Not a
            representation you transform. The page itself.
          </p>

          {/* the builder's bill — the toll every AI-document system pays today */}
          <div className="mt-12 border border-ink/20 bg-surface/60 p-6 sm:p-8">
            <p className="label-mono text-oxblood">
              The builder&rsquo;s bill
            </p>
            <p className="mt-3 font-body text-[1.1rem] leading-[1.65] text-ink text-pretty">
              If you are building AI for documents — a legal editor, a proposal
              tool, an agent that writes decks — you are paying this bill right
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
                  className="flex gap-3.5 border-t border-ink/15 pt-2.5 font-body text-[1.02rem] leading-snug text-ink/85"
                >
                  <span className="label-mono mt-1 shrink-0 text-oxblood">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
            <p className="mt-6 font-body text-[1.1rem] leading-[1.65] text-ink text-pretty">
              None of it is your product, none of it is reusable, and none of
              it interoperates with anyone else&rsquo;s stack.{" "}
              <span className="text-oxblood">.</span>aim pays the whole bill in
              the file, once: chunks, identity, summaries, embeddings, and
              propose-and-accept are properties of the format — so your system
              never rebuilds them.
            </p>
          </div>

          <div className="mt-10 space-y-2 border-t border-ink/20 pt-5">
            <p className="font-body text-[0.92rem] leading-[1.5] text-ink-soft">
              <Sup>1</Sup> PDF: binary, read-only, hostile to structured edits.
            </p>
            <p className="font-body text-[0.92rem] leading-[1.5] text-ink-soft">
              <Sup>2</Sup> DOCX / PPTX: zipped XML schemas no language model
              edits reliably.
            </p>
            <p className="font-body text-[0.92rem] leading-[1.5] text-ink-soft">
              <Sup>3</Sup> Markdown: text only, no slides, no positioned layout,
              no propose-and-accept.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
