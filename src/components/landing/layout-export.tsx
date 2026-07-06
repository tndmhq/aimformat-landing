import {
  Container,
  RunningHead,
  SectionHeader,
} from "@/components/aim/primitives";
import { CodePlate } from "@/components/aim/code-plate";
import { slideSource } from "@/lib/snippets";

function SlideArtifact() {
  return (
    <figure>
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[2px] border border-ink/15 bg-[#fbf6ea] shadow-leaf">
        {/* coordinate rulers */}
        <div
          className="absolute inset-x-0 top-0 z-10 h-4 border-b border-ink/10 bg-paper/70"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to right, color-mix(in oklab, var(--ink) 22%, transparent) 0 1px, transparent 1px 48px)",
          }}
          aria-hidden
        />
        <div
          className="absolute inset-y-0 left-0 z-10 w-4 border-r border-ink/10 bg-paper/70"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to bottom, color-mix(in oklab, var(--ink) 22%, transparent) 0 1px, transparent 1px 48px)",
          }}
          aria-hidden
        />
        <span className="absolute left-5 top-0.5 z-20 font-mono text-[0.5rem] text-ink-faint">
          0
        </span>
        <span className="absolute left-1/2 top-0.5 z-20 font-mono text-[0.5rem] text-ink-faint">
          960
        </span>
        <span className="absolute right-1 top-0.5 z-20 font-mono text-[0.5rem] text-ink-faint">
          1920
        </span>

        {/* the positioned children of the canvas */}
        <div className="absolute inset-0 pl-4 pt-4">
          <h3 className="absolute left-[8%] top-[18%] max-w-[42%] font-body text-[clamp(1.1rem,2.6vw,1.9rem)] font-semibold leading-tight tracking-tight text-zinc-900">
            Q3 in one page
          </h3>
          <p className="absolute left-[8%] top-[36%] max-w-[42%] font-body text-[clamp(0.7rem,1.4vw,1rem)] leading-snug text-zinc-500">
            Revenue, retention, and the road to v0.1
          </p>
          <div className="absolute right-[7%] top-[16%] h-[64%] w-[40%] rounded-sm border border-zinc-300 bg-white">
            <div className="flex h-full items-end gap-[6%] p-[6%]">
              {[40, 62, 55, 78, 92].map((h, i) => (
                <span
                  key={i}
                  className="flex-1 rounded-[1px] bg-oxblood/25"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>
          <span className="absolute bottom-[7%] left-[8%] font-mono text-[0.6rem] text-zinc-400">
            report.aim · §6
          </span>
        </div>
      </div>
      <figcaption className="mt-3 font-body text-[0.92rem] italic leading-snug text-ink-soft">
        Fig. 5 · An aim-slide rendered to scale, with faint coordinate rulers.
        Real HTML, real coordinates.
      </figcaption>
    </figure>
  );
}

function ExportFan() {
  const targets = ["PDF", "DOCX", "PPTX"];
  return (
    <div className="flex flex-wrap items-center gap-5">
      <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-[2px] border border-ink/20 bg-surface text-center shadow-leaf">
        <span className="font-display text-sm text-ink">
          <span className="text-oxblood">.</span>aim
        </span>
        <span className="label-mono mt-0.5 text-[0.5rem] text-ink-faint">
          one source
        </span>
      </div>
      <svg
        viewBox="0 0 60 96"
        className="h-20 w-12 shrink-0 text-oxblood/60"
        fill="none"
        stroke="currentColor"
        aria-hidden
      >
        <path d="M2 48 H30 V14 H58" strokeWidth="1" />
        <path d="M2 48 H58" strokeWidth="1" />
        <path d="M2 48 H30 V82 H58" strokeWidth="1" />
      </svg>
      <div className="space-y-2">
        {targets.map((t) => (
          <div
            key={t}
            className="flex items-center gap-2 rounded-[2px] border border-ink/20 bg-surface px-3 py-1.5"
          >
            <span className="font-mono text-[0.82rem] font-medium text-ink">
              {t}
            </span>
            <span className="label-mono text-[0.55rem] text-greenline">
              deterministic
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function LayoutExport() {
  return (
    <section id="layout" className="relative scroll-mt-16">
      <RunningHead section="§6" folio="Layout & Export" />
      <Container className="py-20 sm:py-24">
        <SectionHeader
          n="§6"
          eyebrow="§6 · Layout &amp; Export"
          title="Fixed canvas, deterministic export"
          lede="This is where the case for a new format lands hardest. A slide is a fixed canvas with positioned children, and Markdown has no way to say so. .aim does. An aim-slide defines the canvas; its children are placed with ordinary Tailwind positioning."
        />

        <div className="mt-12 grid grid-cols-1 items-start gap-10 lg:grid-cols-2">
          <SlideArtifact />
          <CodePlate code={slideSource} filename="deck.aim" />
        </div>

        <div className="mt-14 flex flex-col gap-8 border-t border-ink/15 pt-10 md:flex-row md:items-center md:justify-between">
          <p className="measure-tight font-body text-[1.1rem] leading-[1.7] text-ink/85 text-pretty">
            Because the slide is real HTML with real coordinates, export is a
            transform, not a rewrite. One source produces a deterministic PPTX
            and a deterministic PDF, every time. Author once, in the open
            format. Let the exports fall out of it.
          </p>
          <ExportFan />
        </div>
      </Container>
    </section>
  );
}
