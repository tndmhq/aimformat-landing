import { Container, RepoLink } from "@/components/aim/primitives";
import { PressButton } from "@/components/aim/press-button";
import { LeafCard } from "@/components/aim/leaf";
import { RedlineDemo } from "@/components/aim/redline";
import { highlight } from "@/lib/highlight";
import { heroSourceSliver } from "@/lib/snippets";

/* The format's vital facts as a colophon: label over value, laid out in a
   row that spans the rule above it (first fact flush left, last flush
   right), never strung on a separator glyph. */
function Colophon({ specVersion }: { specVersion: string }) {
  const facts = [
    { label: "License", value: "MIT" },
    { label: "Spec version", value: specVersion },
    { label: "Substrate", value: "HTML5 + Tailwind" },
    { label: "Agents", value: "MCP over stdio" },
  ];
  return (
    <dl className="mt-8 grid max-w-xl grid-cols-2 gap-x-6 gap-y-4 border-t border-ink/15 pt-4 sm:grid-cols-[repeat(4,auto)] sm:justify-between">
      {facts.map((f) => (
        <div key={f.label}>
          <dt className="label-note text-ink-faint">{f.label}</dt>
          <dd className="mt-0.5 whitespace-nowrap font-body text-[0.98rem] leading-snug text-ink [font-variant-numeric:lining-nums]">
            {f.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function CropMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      aria-hidden
    >
      <path d="M10 0v20M0 10h20" opacity="0.5" />
    </svg>
  );
}

export function Hero({ specVersion }: { specVersion: string }) {
  return (
    <section id="top" className="relative scroll-mt-16">
      <Container wide className="relative pb-16 pt-14 sm:pt-20 lg:pb-24 lg:pt-24">
        {/* faint registration / crop marks framing the issue */}
        <CropMark className="pointer-events-none absolute -top-1 left-3 hidden h-4 w-4 text-ink-soft sm:block" />
        <CropMark className="pointer-events-none absolute -top-1 right-3 hidden h-4 w-4 text-ink-soft sm:block" />

        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[1.04fr_0.96fr] lg:gap-12">
          {/* ------------------------------------------------ the claim */}
          <div>
            <p className="label-serif text-rubric">
              An open document format by Tndm
            </p>

            <h1 className="mt-6 font-display text-[clamp(2.6rem,5.6vw,4.9rem)] font-normal leading-[1.03] tracking-[-0.02em] text-ink text-balance">
              .aim: the open format for documents humans and AI write together
            </h1>

            <p className="measure mt-7 font-body text-[1.24rem] leading-[1.65] text-ink text-pretty">
              There is no Markdown for layout-rich, AI-native documents. So we
              set one in type. .aim is
              valid HTML5 with a Tailwind subset, extended with stable chunks,
              slides, and track-changes that live in the file itself. It
              renders in any browser, because it is the page.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-4">
              <PressButton href="#cta">
                Subscribe for the launch letter
              </PressButton>
              <RepoLink variant="button">View the source</RepoLink>
            </div>

            <p className="mt-5 max-w-md font-body text-[0.95rem] leading-snug text-ink-soft">
              The format is open source on GitHub, MIT-licensed. Launch news
              lands here first: a few letters a year, no more.
            </p>

            <Colophon specVersion={specVersion} />
          </div>

          {/* ------------------------------------------------ the artifact */}
          <div className="relative">
            {/* the dark "view source" plate peeking from beneath the leaf */}
            <div
              aria-hidden
              className="absolute -bottom-6 left-2 right-8 top-12 -rotate-[1.3deg] overflow-hidden rounded-[3px] bg-code-panel shadow-plate ring-1 ring-black/20"
            >
              <div className="border-b border-white/10 px-3 py-1.5">
                <span className="label-note text-code-text/45">source</span>
              </div>
              <pre className="code-text overflow-hidden px-4 py-3 text-[0.8rem] leading-[1.6] text-code-text">
                <code>{highlight(heroSourceSliver, "markup")}</code>
              </pre>
            </div>

            <LeafCard
              tilt
              deckle
              stamp
              runningHead={{ left: "Proposal", right: "Scope of Work" }}
              className="relative z-10"
            >
              <p className="font-body text-[0.95rem] leading-[1.8] text-ink/90">
                The parties agree to the terms set forth herein. Delivery,
                acceptance, and payment proceed as follows.
              </p>

              <div className="my-4 h-px w-full bg-accent/25" />

              <RedlineDemo proseClassName="text-[1.02rem]" />

              {/* the half-peeled "view source" tab on the leaf edge */}
              <span className="label-note absolute -left-3 top-24 hidden rotate-180 [writing-mode:vertical-rl] rounded-l-[2px] border border-ink/15 bg-paper px-1.5 py-2 text-ink-soft sm:inline-block">
                view source
              </span>
            </LeafCard>
          </div>
        </div>
      </Container>
    </section>
  );
}
