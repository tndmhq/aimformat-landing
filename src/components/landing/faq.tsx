"use client";

import {
  Container,
  RunningHead,
  SectionHeader,
} from "@/components/aim/primitives";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faq as queries } from "@/lib/faq";

export function Faq({ specVersion }: { specVersion: string }) {
  return (
    <section id="faq" className="relative scroll-mt-16">
      <RunningHead title="Notes and queries" specVersion={specVersion} />
      <Container className="py-20 sm:py-24">
        <SectionHeader
          n="8"
          title="Notes and queries"
          lede="Seven questions a careful reader asks before adopting a new format, answered plainly."
        />

        <div className="mt-10 measure">
          <Accordion className="w-full" defaultValue={[queries[0].q]}>
            {queries.map((item, i) => (
              <AccordionItem
                key={item.q}
                value={item.q}
                className="border-b border-ink/15"
              >
                <AccordionTrigger className="py-4 text-left hover:no-underline">
                  <span className="flex items-baseline gap-3">
                    <span className="label-note w-5 shrink-0 text-[0.95rem] text-accent">
                      {i + 1}.
                    </span>
                    <span className="font-display text-[1.2rem] font-medium text-ink">
                      {item.q}
                    </span>
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="measure-tight pb-2 font-body text-[1.02rem] leading-[1.7] text-ink">
                    {item.a}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Container>
    </section>
  );
}
