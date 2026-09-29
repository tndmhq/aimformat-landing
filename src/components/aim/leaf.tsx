import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { InkStamp } from "./primitives";

/**
 * A raised cream "leaf" laid on the paper desk: warm shadow, optional deckled
 * (torn) right edge, a slight tilt, a running head, and an ink stamp. The hero
 * artifact and the frame for rendered-output figures.
 *
 * The running head is set by position, as on a printed page: `left` flush
 * left, `right` flush right. No glyph strings the two together.
 */
export function LeafCard({
  children,
  className,
  innerClassName,
  tilt = false,
  deckle = false,
  stamp = false,
  runningHead,
}: {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  tilt?: boolean;
  deckle?: boolean;
  stamp?: boolean;
  runningHead?: { left: ReactNode; right?: ReactNode };
}) {
  return (
    <div className={cn("relative", tilt && "rotate-[0.4deg]", className)}>
      <div
        className={cn(
          "relative bg-surface shadow-leaf ring-1 ring-ink/10",
          deckle && "deckle-r",
          innerClassName,
        )}
      >
        {runningHead && (
          <div className="flex items-baseline justify-between gap-4 border-b border-accent/30 px-6 pb-2 pt-5">
            <span className="label-note text-ink-soft">{runningHead.left}</span>
            {runningHead.right && (
              <span className="label-note italic text-ink-soft">
                {runningHead.right}
              </span>
            )}
          </div>
        )}
        <div className="px-6 py-6 sm:px-8">{children}</div>
      </div>
      {stamp && (
        <InkStamp className="pointer-events-none absolute -bottom-4 right-3 h-20 w-20 rotate-[-9deg] opacity-90 sm:right-5" />
      )}
    </div>
  );
}
