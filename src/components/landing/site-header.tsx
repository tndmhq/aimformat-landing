import Link from "next/link";
import {
  AimWordmark,
  Monogram,
  RepoLink,
} from "@/components/aim/primitives";

// Hrefs are "/#…" (not bare "#…") so the links also work from subpages
// like /editors; on the home page they still behave as fragment jumps.
// Names only: chapter numbers in a nav bar are noise.
const navLinks = [
  { label: "Thesis", href: "/#format" },
  { label: "Three lanes", href: "/#three-lanes" },
  { label: "Anatomy", href: "/#anatomy" },
  { label: "Substrate", href: "/#substrate" },
  { label: "Agents", href: "/#agents" },
  { label: "Layout", href: "/#layout" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink/15 bg-paper">
      <div className="mx-auto flex h-12 max-w-6xl items-center justify-between gap-4 px-6 sm:px-10">
        {/* Maker and mark kept apart by space and weight alone. */}
        <Link href="/#top" className="flex items-baseline gap-3" aria-label=".aim home">
          <Monogram />
          <AimWordmark className="text-[1.05rem]" />
        </Link>

        <nav className="hidden items-center gap-5 lg:flex" aria-label="Sections">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="label-note text-[0.92rem] text-ink-soft transition-colors hover:text-accent"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <RepoLink className="hidden md:inline-flex" />
          <Link
            href="/#cta"
            className="label-note text-[0.92rem] text-accent underline-offset-4 hover:underline"
          >
            Subscribe
          </Link>
        </div>
      </div>
    </header>
  );
}
