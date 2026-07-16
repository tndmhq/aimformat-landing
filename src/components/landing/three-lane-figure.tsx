"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { LeafCard } from "@/components/aim/leaf";
import { RedlineDemo } from "@/components/aim/redline";
import { CodePlate } from "@/components/aim/code-plate";
import { threeLaneSourceFor, type ProposalStatus } from "@/lib/snippets";

function Lane({
  numeral,
  label,
  children,
}: {
  numeral: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-surface p-5">
      <p className="label-mono mb-3 text-ink-soft">
        <span className="text-oxblood">{numeral}.</span> {label}
      </p>
      {children}
    </div>
  );
}

/**
 * Fig. 1, live. The redline, the three lane boxes, and the literal source are
 * one piece of state: accept or reject the proposal above and watch every
 * lane — and the file itself — record it.
 */
export function ThreeLaneFigure() {
  const [status, setStatus] = useState<ProposalStatus>("pending");

  return (
    <figure className="lg:sticky lg:top-20">
      <LeafCard runningHead="Fig. 1 · One chunk, three lanes · try it">
        <RedlineDemo status={status} onStatusChange={setStatus} />

        <div className="mt-6 grid gap-px overflow-hidden rounded-[3px] border border-ink/15 bg-ink/10 sm:grid-cols-3">
          <Lane numeral="I" label="Accepted">
            <p className="font-body text-[0.86rem] leading-relaxed text-ink/80">
              {status === "accepted" ? (
                <>
                  …within{" "}
                  <span className="rounded-[2px] bg-greenline/15 px-0.5">
                    thirty (30) business days
                  </span>{" "}
                  of the effective date.
                </>
              ) : (
                <>…within sixty (60) days of the effective date.</>
              )}
            </p>
          </Lane>
          <Lane numeral="II" label="Proposed">
            {status === "pending" ? (
              <p className="font-body text-[0.86rem] leading-relaxed">
                <span className="redline">sixty (60) days</span>{" "}
                <span className="greenline">thirty (30) business days</span>
              </p>
            ) : (
              <p className="font-body text-[0.86rem] italic leading-relaxed text-ink-soft">
                {status === "accepted"
                  ? "folded into lane I"
                  : "withdrawn, unapplied"}
              </p>
            )}
          </Lane>
          <Lane numeral="III" label="State">
            <ul className="space-y-0.5 font-mono text-[0.7rem] text-ink-soft">
              <li>id p-3b9d</li>
              <li>
                status{" "}
                <span
                  className={cn(
                    status === "pending" && "text-oxblood",
                    status === "accepted" && "text-greenline",
                    status === "rejected" && "text-redline",
                  )}
                >
                  {status}
                </span>
              </li>
              <li>author claude</li>
              <li>at 14:32</li>
            </ul>
          </Lane>
        </div>
      </LeafCard>

      <details className="group mt-4">
        <summary className="label-mono inline-flex cursor-pointer list-none items-center gap-2 text-ink-soft transition-colors hover:text-oxblood">
          <span className="transition-transform group-open:rotate-90">▸</span>
          View the literal source
        </summary>
        <CodePlate
          code={threeLaneSourceFor(status)}
          filename="proposal.aim"
          className="mt-3"
        />
      </details>

      <figcaption className="mt-4 font-body text-[0.9rem] italic leading-snug text-ink-soft">
        {status === "pending" &&
          "Accept the proposal and lane II folds into lane I; the decision is recorded in the file's own history."}
        {status === "accepted" &&
          "Lane II folded into lane I. Open the source: the pending lane has cleared, and the history script records who proposed, who decided, and the exact change."}
        {status === "rejected" &&
          "The document stands unchanged, but the file remembers what was proposed and declined: the record a contract review needs."}
      </figcaption>
    </figure>
  );
}
