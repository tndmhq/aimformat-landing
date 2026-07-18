import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** The open format's public repository. */
export const REPO_URL = "https://github.com/tndmhq/aimformat";

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

/* ------------------------------------------------------------ meta colophon */

/** One fact in a colophon run (plain mono text; the parent `.meta-run`
 *  container draws the interpunct separators — no pill chrome). */
export function MetaPill({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={cn("label-mono text-ink-soft", className)}>
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
        <span className="label-mono text-ink-soft">
          .aim · vol. 0.2 · {section}
        </span>
        <span className="label-mono text-ink-soft">{folio}</span>
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
        <p className="label-serif mb-4 text-oxblood">{eyebrow}</p>
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
      {pills && (
        <div className="meta-run mt-6 flex flex-wrap items-baseline gap-x-2.5 gap-y-1.5">
          {pills}
        </div>
      )}
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
        v0.2
      </text>
    </svg>
  );
}

/* ---------------------------------------------------------- github repo link */

/** The GitHub mark, hand-set as SVG (lucide dropped its brand glyphs). */
export function GitHubMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className} fill="currentColor" aria-hidden>
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.76-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  );
}

/**
 * Link to the public repository. The secondary action to Subscribe.
 * - `button`: underlined body-type link — the hero's companion to the press
 *   button (deliberately not a second button shape).
 * - `seal`: quiet mono link, echoing the running heads.
 * - `inline`: quiet mono link for the header and footer.
 */
export function RepoLink({
  variant = "inline",
  className,
  children,
}: {
  variant?: "button" | "seal" | "inline";
  className?: string;
  children?: ReactNode;
}) {
  const external = {
    href: REPO_URL,
    target: "_blank",
    rel: "noreferrer",
  } as const;

  if (variant === "button") {
    return (
      <a
        {...external}
        className={cn(
          "inline-flex cursor-pointer items-center gap-2 py-2 font-body text-[1.05rem] text-ink underline decoration-ink/30 underline-offset-4 transition-colors hover:text-oxblood hover:decoration-oxblood focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oxblood",
          className,
        )}
      >
        <GitHubMark className="size-4" />
        {children ?? "View the source"}
      </a>
    );
  }

  if (variant === "seal") {
    return (
      <a
        {...external}
        className={cn(
          "inline-flex items-center gap-2 text-ink-soft transition-colors hover:text-oxblood",
          className,
        )}
      >
        <GitHubMark className="size-3.5" />
        <span className="label-mono underline-offset-4 hover:underline">
          {children ?? "Read the source on GitHub"}
        </span>
      </a>
    );
  }

  return (
    <a
      {...external}
      className={cn(
        "label-mono inline-flex items-center gap-1.5 text-ink-soft transition-colors hover:text-oxblood",
        className,
      )}
    >
      <GitHubMark className="size-3" />
      {children ?? "Repo"}
    </a>
  );
}
