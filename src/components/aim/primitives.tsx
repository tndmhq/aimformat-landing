import type { ReactNode } from "react";
import { Lock } from "lucide-react";
import { cn } from "@/lib/utils";

/* ----------------------------------------------------------------- layout */

export function Container({
  children,
  className,
  wide,
}: {
  children: ReactNode;
  className?: string;
  wide?: boolean;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-6 sm:px-10",
        wide ? "max-w-6xl" : "max-w-5xl",
        className,
      )}
    >
      {children}
    </div>
  );
}

/* --------------------------------------------------------------- wordmarks */

export function AimWordmark({
  className,
  dotClassName,
}: {
  className?: string;
  dotClassName?: string;
}) {
  return (
    <span className={cn("font-display tracking-tight", className)}>
      <span className={cn("text-oxblood", dotClassName)}>.</span>aim
    </span>
  );
}

export function Monogram({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "font-display text-[0.95rem] font-medium tracking-[0.02em] text-ink",
        className,
      )}
      style={{ textShadow: "0 1px 0 rgba(255,255,255,0.45)" }}
    >
      Tndm
    </span>
  );
}

/* -------------------------------------------------------------- meta-pills */

export function MetaPill({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "label-mono inline-flex items-center rounded-[2px] border border-ink/25 px-1.5 py-1 text-[0.6rem] text-ink-soft",
        className,
      )}
    >
      {children}
    </span>
  );
}

/* ------------------------------------------------------------- running head */

export function RunningHead({
  section,
  folio,
}: {
  section: string;
  folio: string;
}) {
  return (
    <div className="relative z-10 border-y border-ink/20 bg-paper/30">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-1.5 sm:px-10">
        <span className="label-mono small-caps text-ink-soft">
          .aim · vol. 0.1 · {section}
        </span>
        <span className="label-mono small-caps text-ink-soft">{folio}</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------ section header */

export function SectionHeader({
  n,
  eyebrow,
  title,
  lede,
  pills,
  className,
  titleClassName,
}: {
  n?: string;
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  pills?: ReactNode;
  className?: string;
  titleClassName?: string;
}) {
  return (
    <header className={cn("relative", className)}>
      {eyebrow && (
        <p className="label-mono mb-4 text-oxblood">{eyebrow}</p>
      )}
      <div className="flex items-baseline gap-4">
        {n && (
          <span
            className="font-display text-[1.4rem] font-medium leading-none text-oxblood small-caps"
            aria-hidden
          >
            {n}
          </span>
        )}
        <h2
          className={cn(
            "font-display text-[clamp(1.9rem,3.4vw,2.5rem)] font-medium leading-[1.1] tracking-[-0.01em] text-ink text-balance",
            titleClassName,
          )}
        >
          {title}
        </h2>
      </div>
      {lede && (
        <p className="measure mt-5 font-body text-[1.18rem] leading-[1.72] text-ink/85 text-pretty">
          {lede}
        </p>
      )}
      {pills && <div className="mt-6 flex flex-wrap gap-2">{pills}</div>}
    </header>
  );
}

/* --------------------------------------------------------------- ornaments */

export function Fleuron({ className }: { className?: string }) {
  return (
    <div
      className={cn("flex items-center justify-center gap-4 py-2", className)}
      aria-hidden
    >
      <span className="h-px w-16 bg-ink/20" />
      <span className="font-display text-oxblood/70">❦</span>
      <span className="h-px w-16 bg-ink/20" />
    </div>
  );
}

export function Pressmark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={cn("text-ink-soft", className)}
      fill="none"
      stroke="currentColor"
      aria-hidden
    >
      <circle cx="24" cy="24" r="15" strokeWidth="1" opacity="0.6" />
      <path d="M24 9v30M9 24h30" strokeWidth="0.75" opacity="0.4" />
      <path
        d="M24 14c5 4 5 16 0 20-5-4-5-16 0-20Z"
        strokeWidth="1"
        className="text-oxblood"
      />
      <circle cx="24" cy="24" r="2" className="fill-oxblood" stroke="none" />
    </svg>
  );
}

export function InkStamp({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={cn("text-stamp", className)}
      aria-hidden
    >
      <defs>
        <path
          id="stamp-arc-top"
          d="M60 60 m -42 0 a 42 42 0 1 1 84 0"
          fill="none"
        />
        <path
          id="stamp-arc-bottom"
          d="M60 60 m -38 0 a 38 38 0 1 0 76 0"
          fill="none"
        />
      </defs>
      <circle
        cx="60"
        cy="60"
        r="54"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeDasharray="1.5 3"
        opacity="0.65"
      />
      <circle
        cx="60"
        cy="60"
        r="47"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.85"
      />
      <text
        fill="currentColor"
        fontFamily="var(--font-mono), monospace"
        fontSize="9.5"
        letterSpacing="2.4"
      >
        <textPath href="#stamp-arc-top" startOffset="50%" textAnchor="middle">
          OPEN DOCUMENT FORMAT
        </textPath>
      </text>
      <text
        fill="currentColor"
        fontFamily="var(--font-mono), monospace"
        fontSize="9.5"
        letterSpacing="2.4"
      >
        <textPath
          href="#stamp-arc-bottom"
          startOffset="50%"
          textAnchor="middle"
        >
          · MIT LICENSE ·
        </textPath>
      </text>
      <text
        x="60"
        y="56"
        textAnchor="middle"
        className="font-display"
        fill="currentColor"
        fontSize="20"
        fontStyle="italic"
      >
        .aim
      </text>
      <text
        x="60"
        y="72"
        textAnchor="middle"
        fill="currentColor"
        fontFamily="var(--font-mono), monospace"
        fontSize="8.5"
        letterSpacing="2"
      >
        v0.1
      </text>
    </svg>
  );
}

/* ----------------------------------------------------- repo coming soon seal */

export function RepoComingSoon({
  variant = "inline",
  className,
}: {
  variant?: "inline" | "seal";
  className?: string;
}) {
  if (variant === "seal") {
    return (
      <div
        className={cn(
          "inline-flex select-none items-center gap-2 rounded-full border border-dashed border-ink/30 bg-paper/50 px-3.5 py-2 text-ink-faint",
          className,
        )}
      >
        <Lock className="size-3.5" aria-hidden />
        <span className="label-mono">Repo — coming soon</span>
      </div>
    );
  }
  return (
    <span
      title="The public repository follows the spec; subscribers see it first."
      className={cn(
        "label-mono inline-flex cursor-default select-none items-center gap-1.5 text-ink-faint",
        className,
      )}
    >
      <Lock className="size-3" aria-hidden />
      Repo — coming soon
    </span>
  );
}
