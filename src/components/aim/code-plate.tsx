import { highlight, type Lang } from "@/lib/highlight";
import { cn } from "@/lib/utils";
import { CopyButton } from "./copy-button";

/**
 * The single dark "inked plate" surface of the page: code set in the text
 * face (Newsreader, lining tabular figures, ligatures off) on warm
 * near-black, with a 2px accent left-rule and a typeset filename tab. The
 * plate, not a typewriter font, is what marks it as code; the tonal
 * inversion makes the technical sections read like a pressman's metal type
 * tray against the cream.
 */
export function CodePlate({
  code,
  lang = "markup",
  filename,
  label,
  copy = true,
  className,
  bodyClassName,
}: {
  code: string;
  lang?: Lang;
  filename?: string;
  label?: string;
  copy?: boolean;
  className?: string;
  bodyClassName?: string;
}) {
  const hasChrome = Boolean(filename || label || copy);

  return (
    <figure
      className={cn(
        "relative min-w-0 max-w-full overflow-hidden rounded-[3px] bg-code-panel shadow-plate ring-1 ring-black/20",
        className,
      )}
    >
      {hasChrome && (
        <div className="flex items-center justify-between gap-3 border-b border-white/10 px-3.5 py-2">
          <span className="label-note inline-flex min-w-0 items-center gap-2 truncate text-[0.85rem] text-code-text/55">
            {filename ? (
              <span className="truncate text-code-accent/90">
                {filename}
              </span>
            ) : (
              label
            )}
          </span>
          {copy && <CopyButton text={code} className="shrink-0" />}
        </div>
      )}
      <div className="relative">
        <span
          aria-hidden
          className="absolute inset-y-0 left-0 w-[2px] bg-accent/80"
        />
        <pre
          className={cn(
            "code-text overflow-x-auto px-4 py-4 text-[0.9rem] leading-[1.6] text-code-text",
            bodyClassName,
          )}
        >
          <code>{highlight(code, lang)}</code>
        </pre>
      </div>
    </figure>
  );
}
