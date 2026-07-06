import type { ReactNode } from "react";

export type Lang = "markup" | "json" | "shell";

type Rule = { pattern: RegExp; className: string };

const rules: Record<Lang, Rule[]> = {
  markup: [
    { pattern: /<!--[\s\S]*?-->/g, className: "text-code-comment italic" },
    { pattern: /<\/?[a-zA-Z][\w-]*|\/?>/g, className: "text-code-accent" },
    { pattern: /"[^"]*"/g, className: "text-code-string" },
    { pattern: /\b[a-zA-Z-]+(?==)/g, className: "text-code-text/70" },
  ],
  json: [
    { pattern: /"[^"]*"(?=\s*:)/g, className: "text-code-accent" },
    { pattern: /"[^"]*"/g, className: "text-code-string" },
    { pattern: /\b(true|false|null|\d+(\.\d+)?)\b/g, className: "text-code-text/70" },
  ],
  shell: [
    { pattern: /^#.*$/gm, className: "text-code-comment italic" },
    { pattern: /^\$ /gm, className: "text-code-comment" },
    { pattern: /"[^"]*"/g, className: "text-code-string" },
    { pattern: /\b(uvx|pip|install|claude|cursor)\b/g, className: "text-code-accent" },
  ],
};

/** Minimal regex highlighter; returns the code as styled React spans. */
export function highlight(code: string, lang: Lang = "markup"): ReactNode {
  const marks: { start: number; end: number; className: string }[] = [];
  for (const rule of rules[lang]) {
    for (const m of code.matchAll(rule.pattern)) {
      const start = m.index ?? 0;
      const end = start + m[0].length;
      if (marks.some((x) => start < x.end && end > x.start)) continue;
      marks.push({ start, end, className: rule.className });
    }
  }
  marks.sort((a, b) => a.start - b.start);

  const out: ReactNode[] = [];
  let cursor = 0;
  marks.forEach((mark, i) => {
    if (mark.start > cursor) out.push(code.slice(cursor, mark.start));
    out.push(
      <span key={i} className={mark.className}>
        {code.slice(mark.start, mark.end)}
      </span>,
    );
    cursor = mark.end;
  });
  if (cursor < code.length) out.push(code.slice(cursor));
  return out;
}
