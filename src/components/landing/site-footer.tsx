import {
  AimWordmark,
  Container,
  Fleuron,
  InkStamp,
  Monogram,
  Pressmark,
  RepoComingSoon,
} from "@/components/aim/primitives";

const columns = [
  {
    heading: "The Format",
    items: [
      { label: "§1 Thesis", href: "#format" },
      { label: "§2 Three Lanes", href: "#three-lanes" },
      { label: "§3 Anatomy", href: "#anatomy" },
      { label: "§4 Substrate", href: "#substrate" },
    ],
  },
  {
    heading: "For Agents",
    items: [
      { label: "§5 MCP & SDK", href: "#agents" },
      { label: "§6 Layout & Export", href: "#layout" },
      { label: "§7 Ledger", href: "#comparison" },
      { label: "§8 Notes & Queries", href: "#faq" },
    ],
  },
  {
    heading: "Imprint",
    items: [
      { label: "License: MIT", href: "#faq" },
      { label: "Edition: Vol. 0.1", href: "#top" },
      { label: "Repo — coming soon", href: null },
      { label: "Contact", href: "mailto:contact@lucacampanella.com" },
      { label: "Subscribe", href: "#cta" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-ink/25 bg-paper-deep/60">
      <Container wide className="py-16">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          {/* brand block */}
          <div>
            <AimWordmark className="text-3xl" />
            <p className="mt-4 max-w-xs font-body text-[1.05rem] italic leading-snug text-ink-soft">
              One file humans and agents can both hold.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <InkStamp className="h-16 w-16 rotate-[-6deg] opacity-90" />
              <p className="font-body text-[0.88rem] leading-snug text-ink-soft">
                by Tndm, the vowel-dropped
                <br />
                tandem of human and agent.
              </p>
            </div>
            <p className="mt-6 max-w-xs font-body text-[0.92rem] leading-snug text-ink-soft">
              Set by{" "}
              <span className="text-ink">Luca Campanella</span> — three years
              at Typewise (YC S22), past CTO of CuratedAI.{" "}
              <a
                href="mailto:contact@lucacampanella.com"
                className="text-oxblood underline-offset-4 hover:underline"
              >
                contact@lucacampanella.com
              </a>
            </p>
          </div>

          {/* link columns */}
          {columns.map((col) => (
            <nav key={col.heading} aria-label={col.heading}>
              <p className="label-mono mb-4 text-ink-soft">{col.heading}</p>
              <ul className="space-y-2.5">
                {col.items.map((item) =>
                  item.href ? (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        className="font-body text-[1rem] text-ink/80 underline-offset-4 transition-colors hover:text-oxblood hover:underline"
                      >
                        {item.label}
                      </a>
                    </li>
                  ) : (
                    <li key={item.label}>
                      <RepoComingSoon />
                    </li>
                  ),
                )}
              </ul>
            </nav>
          ))}
        </div>

        <Fleuron className="mt-14" />

        <div className="mt-6 flex flex-col items-center gap-5 text-center sm:flex-row sm:justify-between sm:text-left">
          <div className="flex items-center gap-3">
            <Pressmark className="h-7 w-7" />
            <p className="font-body text-[0.85rem] leading-snug text-ink-soft">
              Open source under the MIT License. Set in Fraunces and Newsreader,
              with IBM Plex Mono.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Monogram />
            <span className="font-body text-[0.85rem] text-ink-soft">
              © 2026 Tndm
            </span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
