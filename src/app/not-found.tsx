import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/landing/site-header";
import { SiteFooter } from "@/components/landing/site-footer";
import {
  Container,
  RunningHead,
  SectionHeader,
} from "@/components/aim/primitives";
import { getSpecVersion } from "@/lib/aim-version";

// Any unmatched URL lands here. Set in the site's own type, not Next's
// default page (a system sans with a rule between "404" and the message).
export const metadata: Metadata = {
  title: "Not found",
};

export default async function NotFound() {
  const specVersion = await getSpecVersion();
  return (
    <>
      <SiteHeader />
      <main id="main" className="relative flex-1">
        <section className="relative">
          <RunningHead title="Not found" specVersion={specVersion} />
          <Container className="py-20 sm:py-28">
            <SectionHeader
              title="There is no page here"
              lede={
                <>
                  The address may be mistyped, or the page has moved. Start
                  again from the{" "}
                  <Link
                    href="/"
                    className="text-accent underline-offset-4 hover:underline"
                  >
                    home page
                  </Link>
                  .
                </>
              }
            />
          </Container>
        </section>
      </main>
      <SiteFooter specVersion={specVersion} />
    </>
  );
}
