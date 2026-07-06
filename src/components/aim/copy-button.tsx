"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

export function CopyButton({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 1600);
        } catch {
          /* clipboard unavailable; no-op */
        }
      }}
      aria-label={copied ? "Copied to clipboard" : "Copy code"}
      className={cn(
        "label-mono inline-flex items-center gap-1.5 rounded-[2px] border border-code-text/25 px-2 py-1 text-[10px] text-code-text/65 transition-colors hover:border-code-text/50 hover:text-code-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-code-accent",
        className,
      )}
    >
      {copied ? (
        <Check className="size-3" aria-hidden />
      ) : (
        <Copy className="size-3" aria-hidden />
      )}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}
