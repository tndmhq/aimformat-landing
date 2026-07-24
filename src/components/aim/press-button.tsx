import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

const pressButtonClasses =
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-[3px] bg-accent px-5 py-2.5 font-display text-[0.98rem] font-medium tracking-[0.01em] text-surface shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_10px_22px_-12px_rgba(26,79,55,0.75)] transition-colors hover:bg-accent-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-60";

/**
 * The page's one primary action: a bookplate — display type in sentence case
 * on a plate of the leading press ink. (Not tracked-caps mono; that reads
 * as generated.)
 * Renders an anchor when given `href`, a real button otherwise.
 */
export function PressButton({
  href,
  className,
  children,
  ...props
}: {
  href?: string;
  className?: string;
  children: ReactNode;
} & Omit<ComponentProps<"button"> & ComponentProps<"a">, "href" | "className">) {
  if (href) {
    return (
      <a href={href} className={cn(pressButtonClasses, className)} {...props}>
        {children}
      </a>
    );
  }
  return (
    <button className={cn(pressButtonClasses, className)} {...props}>
      {children}
    </button>
  );
}
