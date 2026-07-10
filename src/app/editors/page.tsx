import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteHeader } from "@/components/landing/site-header";
import { SiteFooter } from "@/components/landing/site-footer";
import {
  Container,
  MetaPill,
  RunningHead,
  SectionHeader,
} from "@/components/aim/primitives";

export const metadata: Metadata = {
  title: "Editors",
  description:
    "Where .aim files open: the directory of editors and viewers for the open .aim document format — from Tndm, the flagship review editor, to the zero-install tier of any web browser.",
  alternates: { canonical: "/editors" },
};

const linkClass = "text-oxblood underline-offset-4 hover:underline";

const entries: {
  name: string;
  pill: string;
  body: ReactNode;
}[] = [
  {
    name: "Tndm",
    pill: "Flagship · coming soon",
    body: (
      <>
        The flagship editor, by the format&apos;s authors. Collaborative
        review with the red-and-green ink built into the writing surface:
        word-level diffs, one-click accept and reject, and every decision
        attributed in the file&apos;s own history.{" "}
        <a href="https://usetndm.com" className={linkClass}>
          usetndm.com
        </a>
      </>
    ),
  },
  {
    name: "Reference viewer",
    pill: "Planned",
    body: (
      <>
        A minimal viewer maintained alongside the specification, for reading
        and reviewing without a full editor. Planned; tracked in the
        spec&apos;s Future Extensions.
      </>
    ),
  },
  {
    name: "Any browser",
    pill: "Zero install",
    body: (
      <>
        The tier every file ships with. Because a .aim document is valid
        HTML5 with its stylesheet embedded, the raw file renders its content
        plus a readable memo of pending changes — no editor, no extension,
        no build step.
      </>
    ),
  },
];

export default function EditorsPage() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="relative flex-1">
        <section className="relative">
          <RunningHead section="Editors" folio="A Directory" />
          <Container className="py-20 sm:py-24">
            <SectionHeader
              eyebrow="Editors & Viewers"
              title="Where .aim files open"
              lede=".aim renders in any browser, because it is the page; an editor adds the review surface — word-level diffs, one-click accept/reject, slide navigation."
            />

            <div className="mt-14 max-w-3xl space-y-10">
              {entries.map((e) => (
                <article key={e.name} className="border-t border-ink/20 pt-6">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
                    <h3 className="font-display text-[1.4rem] font-medium leading-tight text-ink">
                      {e.name}
                    </h3>
                    <MetaPill>{e.pill}</MetaPill>
                  </div>
                  <p className="measure mt-3 font-body text-[1.08rem] leading-[1.72] text-ink/85 text-pretty">
                    {e.body}
                  </p>
                </article>
              ))}

              <p className="measure border-t border-ink/20 pt-6 font-body text-[1rem] leading-[1.7] text-ink-soft">
                Building an editor or viewer for .aim? The format is open,
                and so is this list — write to{" "}
                <a href="mailto:contact@usetndm.com" className={linkClass}>
                  contact@usetndm.com
                </a>{" "}
                to get listed.
              </p>
            </div>
          </Container>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
