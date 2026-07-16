import { Container, MetaPill, RepoLink } from "@/components/aim/primitives";
import { PressButton } from "@/components/aim/press-button";
import { LeafCard } from "@/components/aim/leaf";
import { RedlineDemo } from "@/components/aim/redline";
import { highlight } from "@/lib/highlight";
import { heroSourceSliver } from "@/lib/snippets";

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

export function Hero() {
  return (
    <section id="top" className="relative scroll-mt-16">
      <Container wide className="relative pb-16 pt-14 sm:pt-20 lg:pb-24 lg:pt-24">
        {/* faint registration / crop marks framing the issue */}
        <CropMark className="pointer-events-none absolute -top-1 left-3 hidden h-4 w-4 text-ink-soft sm:block" />
        <CropMark className="pointer-events-none absolute -top-1 right-3 hidden h-4 w-4 text-ink-soft sm:block" />

        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[1.04fr_0.96fr] lg:gap-12">
          {/* ------------------------------------------------ the claim */}
          <div>
            <p className="label-mono text-oxblood">
              An open document format · by Tndm
            </p>

            <h1 className="mt-6 font-display text-[clamp(2.6rem,5.6vw,4.9rem)] font-normal leading-[1.03] tracking-[-0.02em] text-ink text-balance">
              <span className="text-oxblood">.</span>aim: the open format for
              documents humans and AI write together
            </h1>

            <p className="measure mt-7 font-body text-[1.24rem] leading-[1.65] text-ink/85 text-pretty">
              There is no Markdown for layout-rich, AI-native documents. So we
              set one in type. <span className="text-oxblood">.</span>aim is
              valid HTML5 with a Tailwind subset, extended with stable chunks,
              slides, and track-changes that live in the file itself. It
              renders in any browser, because it is the page.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-4">
              <PressButton href="#cta">
                Subscribe for the launch letter
                <span aria-hidden>→</span>
              </PressButton>
              <RepoLink variant="button">View the source</RepoLink>
            </div>

            <p className="mt-5 max-w-md font-body text-[0.95rem] italic leading-snug text-ink-soft">
              The format is open source on GitHub, MIT-licensed. Launch news
              lands here first: a few letters a year, no more.
            </p>

            <div className="mt-7 flex flex-wrap gap-2">
              <MetaPill>MIT</MetaPill>
              <MetaPill>v0.2</MetaPill>
              <MetaPill>HTML5 + Tailwind</MetaPill>
              <MetaPill>stdio · MCP</MetaPill>
            </div>
          </div>

          {/* ------------------------------------------------ the artifact */}
          <div className="relative">
            {/* the dark "view source" plate peeking from beneath the leaf */}
            <div
              aria-hidden
              className="absolute -bottom-6 left-2 right-8 top-12 -rotate-[1.3deg] overflow-hidden rounded-[3px] bg-code-panel shadow-plate ring-1 ring-black/20"
            >
              <div className="border-b border-white/10 px-3 py-1.5">
                <span className="label-mono text-code-text/45">source</span>
              </div>
              <pre className="overflow-hidden px-4 py-3 font-mono text-[0.72rem] leading-[1.6] text-code-text">
                <code>{highlight(heroSourceSliver, "markup")}</code>
              </pre>
            </div>

            <LeafCard
              tilt
              deckle
              stamp
              runningHead="Proposal · §2 Scope of Work · folio 4"
              className="relative z-10"
            >
              <p className="font-body text-[0.95rem] leading-[1.8] text-ink/80">
                The parties agree to the terms set forth herein. Delivery,
                acceptance, and payment proceed as follows.
              </p>

              <div className="my-4 h-px w-full bg-oxblood/25" />

              <RedlineDemo proseClassName="text-[1.02rem]" />

              {/* the half-peeled "view source" tab on the leaf edge */}
              <span className="label-mono absolute -left-3 top-24 hidden rotate-180 [writing-mode:vertical-rl] rounded-l-[2px] border border-ink/15 bg-paper px-1.5 py-2 text-ink-soft sm:inline-block">
                view source
              </span>
            </LeafCard>
          </div>
        </div>
      </Container>
    </section>
  );
}
