// Single source of truth for the FAQ: rendered in §8 (faq.tsx) and emitted as
// FAQPage JSON-LD in page.tsx. Edit here, both stay in step.
export const faq = [
  {
    q: "Is .aim really just HTML?",
    a: "Yes. An .aim file is valid HTML5 with a small set of custom elements and a Tailwind utility subset. It renders in any browser with no viewer. The custom elements carry the structure ordinary HTML cannot, and degrade to plain inline content anywhere they are not understood.",
  },
  {
    q: "What is the license?",
    a: "MIT. The format, the spec, the MCP server, and the SDK are open source. There is no hosted dependency: the MCP server runs locally over stdio.",
  },
  {
    q: "Why not just use Markdown?",
    a: "Markdown is the closest open analog and we admire it, but it is text only. No fixed-canvas slides, no positioned layout, no propose-and-accept, no stable per-chunk identity. .aim keeps Markdown's openness and adds the things layout-rich, agent-edited documents need.",
  },
  {
    q: "Does the AI need a special model or hosting?",
    a: "No. Any frontier model can read a plain .aim file because it is HTML. The MCP server adds chunk-level propose, accept, reject, and navigation; it is local and ships nothing off your machine.",
  },
  {
    q: "How do exports work?",
    a: "Deterministically. Because the file is the styled artifact with real coordinates, PDF, DOCX, and PPTX are transforms of one source, not separate rewrites. The same input always produces the same output.",
  },
  {
    q: "Where is the repository?",
    a: "Public on GitHub at github.com/tndmhq/aimformat, under the MIT License. The v0.1 spec and launch notices land first to newsletter subscribers.",
  },
];
