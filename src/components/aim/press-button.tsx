import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

const pressButtonClasses =
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-[3px] bg-oxblood px-5 py-3 font-mono text-[0.78rem] uppercase tracking-[0.12em] text-[#fbf6ea] shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_10px_22px_-12px_rgba(90,31,26,0.75)] transition-colors hover:bg-oxblood-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oxblood disabled:pointer-events-none disabled:opacity-60";

/**
 * The page's one primary action, set as inked type on an oxblood plate.
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
