import {
  AimWordmark,
  Monogram,
  RepoComingSoon,
} from "@/components/aim/primitives";

const navLinks = [
  { label: "§1 Thesis", href: "#format" },
  { label: "§2 Three Lanes", href: "#three-lanes" },
  { label: "§3 Anatomy", href: "#anatomy" },
  { label: "§4 Substrate", href: "#substrate" },
  { label: "§5 Agents", href: "#agents" },
  { label: "§6 Layout", href: "#layout" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink/15 bg-paper/95 backdrop-blur-md">
      <div className="mx-auto flex h-12 max-w-6xl items-center justify-between gap-4 px-6 sm:px-10">
        <a href="#top" className="flex items-baseline gap-2" aria-label=".aim home">
          <Monogram />
          <span className="text-ink/25" aria-hidden>
            ·
          </span>
          <AimWordmark className="text-[0.98rem]" />
        </a>

        <nav className="hidden items-center gap-5 lg:flex" aria-label="Sections">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="label-mono text-ink-soft transition-colors hover:text-oxblood"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <RepoComingSoon className="hidden md:inline-flex" />
          <a
            href="#cta"
            className="label-mono text-oxblood underline-offset-4 hover:underline"
          >
            Subscribe
          </a>
        </div>
      </div>
    </header>
  );
}
