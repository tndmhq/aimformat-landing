import { SiteHeader } from "@/components/landing/site-header";
import { Hero } from "@/components/landing/hero";
import { Manifesto } from "@/components/landing/manifesto";
import { ThreeLanes } from "@/components/landing/three-lanes";
import { Anatomy } from "@/components/landing/anatomy";
import { Substrate } from "@/components/landing/substrate";
import { Agents } from "@/components/landing/agents";
import { LayoutExport } from "@/components/landing/layout-export";
import { Ledger } from "@/components/landing/ledger";
import { EditorNote } from "@/components/landing/editor-note";
import { Faq } from "@/components/landing/faq";
import { Newsletter } from "@/components/landing/newsletter";
import { SiteFooter } from "@/components/landing/site-footer";
import { faq } from "@/lib/faq";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: ".aim",
      url: "https://aim-format.tndm.dev",
      description:
        "An open, MIT-licensed document file format where humans and AI agents co-author the same rich document.",
      publisher: { "@type": "Organization", name: "Tndm" },
    },
    {
      "@type": "FAQPage",
      mainEntity: faq.map(({ q, a }) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    },
  ],
};

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="relative flex-1">
        <Hero />
        <Manifesto />
        <ThreeLanes />
        <Anatomy />
        <Substrate />
        <Agents />
        <LayoutExport />
        <Ledger />
        <EditorNote />
        <Faq />
        <Newsletter />
      </main>
      <SiteFooter />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
