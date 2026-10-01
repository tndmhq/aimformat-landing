import type { ReactNode } from "react";
import { SiteHeader } from "@/components/landing/site-header";
import { SiteFooter } from "@/components/landing/site-footer";
import {
  Container,
  RunningHead,
  SectionHeader,
} from "@/components/aim/primitives";
import { PressButton } from "@/components/aim/press-button";
import { pageMeta } from "@/lib/meta";
import { getSpecVersion } from "@/lib/aim-version";

export const metadata = pageMeta({
  title: "Editors",
  description:
    "Where .aim files open: the directory of editors and viewers for the open .aim document format, including Tndm (the flagship review editor, on the web and as a Mac app) and the zero-install tier of any web browser.",
  path: "/editors",
});

const linkClass = "text-accent underline-offset-4 hover:underline";

const entries: {
  name: string;
  /** One-word status set beside the name, never a glyph-joined run. */
  status: string;
  body: ReactNode;
  /** The entry's one press button. */
  cta?: { href: string; label: string };
  /** A secondary action, set as a plain link beside the button. */
  link?: { href: string; label: string };
}[] = [
  {
    name: "Tndm",
    status: "Live",
    cta: { href: "https://app.usetndm.com", label: "Open the Tndm editor" },
    link: {
      href: "https://usetndm.com/download",
      label: "Download the Mac app",
    },
    body: (
      <>
        The flagship editor, by the format&apos;s authors. Collaborative review
        with the red-and-green ink built into the writing surface: word-level
        diffs, one-click accept and reject, and every decision attributed in the
        file&apos;s own history. It runs online at{" "}
        <a href="https://app.usetndm.com" className={linkClass}>
          app.usetndm.com
        </a>
        , where no account is needed to upload a file and read its pending
        changes, and as a{" "}
        <a href="https://usetndm.com/download" className={linkClass}>
          Mac app
        </a>{" "}
        that opens the .aim files in a folder on your machine and updates live
        while an agent writes to them. More at{" "}
        <a href="https://usetndm.com" className={linkClass}>
          usetndm.com
        </a>
        .
      </>
    ),
  },
  {
    name: "Reference viewer",
    status: "Planned",
    body: (
      <>
        A minimal viewer maintained alongside the specification, for reading and
        reviewing without a full editor. Planned; tracked in the spec&apos;s
        Future Extensions.
      </>
    ),
  },
  {
    name: "Any browser",
    status: "Zero install",
    body: (
      <>
        The tier every file ships with. Because a .aim document is valid HTML5
        with its stylesheet embedded, the raw file renders its content with no
        editor, no extension and no build step, followed by a list of the
        pending changes: what each one targets, who proposed it, and why. The
        proposed wording itself is not shown (payloads are inert templates that
        browsers deliberately do not render), so seeing the redline, or acting
        on it, needs an editor.
      </>
    ),
  },
];

export default async function EditorsPage() {
  const specVersion = await getSpecVersion();
  return (
    <>
      <SiteHeader />
      <main id="main" className="relative flex-1">
        <section className="relative">
          <RunningHead title="Editors and viewers" specVersion={specVersion} />
          <Container className="py-20 sm:py-24">
            <SectionHeader
              eyebrow="Editors and viewers"
              title="Where .aim files open"
              lede=".aim renders in any browser, because it is the page; an editor adds the review surface: word-level diffs, one-click accept and reject, slide navigation."
            />

            <div className="mt-14 max-w-3xl space-y-10">
              {entries.map((e) => (
                <article key={e.name} className="border-t border-ink/20 pt-6">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
                    <h3 className="font-display text-[1.4rem] font-medium leading-tight text-ink">
                      {e.name}
                    </h3>
                    <span className="label-note text-[0.92rem] italic text-ink-soft">
                      {e.status}
                    </span>
                  </div>
                  <p className="measure mt-3 font-body text-[1.08rem] leading-[1.72] text-ink text-pretty">
                    {e.body}
                  </p>
                  {(e.cta || e.link) && (
                    <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
                      {e.cta && (
                        <PressButton href={e.cta.href}>
                          {e.cta.label}
                        </PressButton>
                      )}
                      {e.link && (
                        <a
                          href={e.link.href}
                          className={`${linkClass} font-display text-[0.98rem] font-medium`}
                        >
                          {e.link.label}
                        </a>
                      )}
                    </div>
                  )}
                </article>
              ))}

              <p className="measure border-t border-ink/20 pt-6 font-body text-[1rem] leading-[1.7] text-ink-soft">
                Building an editor or viewer for .aim? The format is open, and
                so is this list. Write to{" "}
                <a href="mailto:contact@usetndm.com" className={linkClass}>
                  contact@usetndm.com
                </a>{" "}
                to get listed.
              </p>
            </div>
          </Container>
        </section>
      </main>
      <SiteFooter specVersion={specVersion} />
    </>
  );
}
